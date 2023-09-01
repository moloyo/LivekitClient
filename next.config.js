/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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