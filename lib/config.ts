const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY || '',
            privateKey: process.env.NEXT_IMAGE_PRIVATE_KEY || '',
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
            
        },
        databaseUrl: process.env.DATABASE_URL || '',
        Upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL || '',
            redisToken: process.env.UPSTASH_REDIS_TOKEN || '',
            qstashUrl: process.env.UPSTASH_QSTASH_URL || '',
            qstashToken: process.env.UPSTASH_QSTASH_TOKEN || '',
        }
    }
}

export default config

