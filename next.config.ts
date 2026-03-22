import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  outputFileTracingRoot: path.join(process.cwd())
};

export default nextConfig;
