import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import React, { useRef, useState } from 'react';
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    console.log('Authentication response:', response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to authenticate with ImageKit: ${errorText}`);
    }

    const data = await response.json();
    console.log('Authentication data:', data);
    const { signature, expire, token } = data;

    return { token, signature, expire };
  } catch (error: any) {
    console.error('Authentication error:', error);
    throw new Error('Failed to authenticate with ImageKit');
  }
};

const ImageUpload = ({ onFileChange }: { onFileChange: (filepath: string) => void }) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ fileId: string; filePath: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onError = (error: any) => {
    console.error('Upload error:', error);
    setIsUploading(false);

    toast({
      title: 'Image Upload Error',
      message: error.message || 'Cannot upload image',
      variant: 'destructive'
    });
  };

  const onSuccess = (res: any) => {
    console.log('Upload success response:', res);
    setFile(res);
    setIsUploading(false);

    // Make sure we're passing the correct path to the parent component
    // Some ImageKit responses use filePath, others use filepath
    const path = res.filePath || res.filepath;
    onFileChange(path);

    toast({
      title: 'Success',
      message: `Image uploaded successfully`,
    });
    setIsUploaded(true);
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <div className="flex flex-col gap-4">
        <IKUpload
          className="hidden"
          ref={ikUploadRef}
          onSuccess={onSuccess}
          onError={onError}
          fileName={`image-${Date.now()}.png`}
          useUniqueFileName={true}
          onUploadStart={() => setIsUploading(true)}
          onUploadProgress={(progress) => console.log('Upload progress:', progress)}
        />

        <button
          className={`upload-btn ${isUploaded ? 'hidden' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setIsUploading(true);

            if (ikUploadRef.current) {
              ikUploadRef.current.click();
            }
          }}
          disabled={isUploading}
        >
          <Image src="/icons/upload.svg" alt="upload" width={24} height={24} className="object-contain" />
          <p className='text-base text-light-100'>
            {isUploading ? 'Uploading...' : 'Upload a File'}
          </p>
        </button>

        {file && (
          <div className="mt-2">
            <p className="text-base text-light-100">
              {file.filePath || file.filepath || 'Image uploaded'}
            </p>

            <div className="mt-4 border rounded overflow-hidden">
              <IKImage
                path={file.filePath || file.filepath}

                width={600}
                height={600}
                loading="lazy"
                className="w-full h-auto"
                alt="Uploaded image"
              />
            </div>
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;