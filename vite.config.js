import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    uni(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
});