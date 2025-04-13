import ImageKit from 'imagekit';
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
    try {
        const authParams = imageKit.getAuthenticationParameters();
        return NextResponse.json(authParams);
    } catch (error) {
        console.error('ImageKit auth error:', error);
        return NextResponse.json(
            { error: 'Failed to generate authentication parameters' },
            { status: 500 }
        );
    }
}