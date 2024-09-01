// remix.config.ts

const config = {
    // The directory of your Remix app's files
    appDirectory: "app",
  
    // The directory where built files will go
    assetsBuildDirectory: "public/build",
  
    // The public path for your built assets
    publicPath: "/build/",
  
    // The path to the server build output
    serverBuildPath: "build/index.js",
  
    // Vercel-specific configuration
    serverModuleFormat: "cjs",
    serverPlatform: "node",
    serverBuildTarget: "vercel",
  };
  
  export default config;
  