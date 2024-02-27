/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  env: {
    MONGO_URI:
      "mongodb://vaibhav:vaibhav1312@ac-r6kfvxo-shard-00-00.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-01.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-02.0tm31b4.mongodb.net:27017/?ssl=true&replicaSet=atlas-jdudka-shard-0&authSource=admin&retryWrites=true&w=majority&appName=KanbanCluster",
    TOKEN_SECRET: "KanBan@1312",
  },
};

export default nextConfig;
