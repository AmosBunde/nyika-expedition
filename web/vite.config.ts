import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

export default defineConfig({
  // Served from https://amosbunde.github.io/nyika-expedition/
  base: "/nyika-expedition/",
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [tailwindcss(), reactRouter()],
})
