/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    // Configurar alias para resolver el path ~ correctamente
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve("./src"),
      "@": path.resolve("./src"),
    };
    
    return config;
  },
};

export default config;
