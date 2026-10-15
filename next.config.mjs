const backendOrigin = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
).replace(/\/api\/v1\/?$/, '');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  
async rewrites() {
  return {
    beforeFiles: [],
    afterFiles: [
      {
        source: "/sanctum/:path*",
        destination: `${backendOrigin}/sanctum/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${backendOrigin}/api/v1/:path*`,
      },
    ],
    fallback: [],
  };
},

};

export default nextConfig;