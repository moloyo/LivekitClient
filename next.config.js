/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET,
        AZURE_AD_B2C_TENANT_NAME: process.env.AZURE_AD_B2C_TENANT_NAME,
        AZURE_AD_B2C_CLIENT_ID: process.env.AZURE_AD_B2C_CLIENT_ID,
        AZURE_AD_B2C_CLIENT_SECRET: process.env.AZURE_AD_B2C_CLIENT_SECRET,
        AZURE_AD_B2C_PRIMARY_USER_FLOW: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
    rewrites: () => {
        return [
            {
                source: "/viewcamera/:path*",
                destination: "http://20.121.224.54/viewcamera/:path*",
            },
        ];
    },
}

module.exports = nextConfig
