import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ['node_modules', 'unpackage', '.prettierrc.cjs', '.prettierignore', 'package.json', 'manifest.json', 'pages.json', 'jsconfig.json'],
  },
  pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        uni: true,
        wx: true,
        App: true,
        Page: true,
        getCurrentPages: true,
        getApp: true,
        Component: true,
        requirePlugin: true,
        requireMiniProgram: true,
      },
    },
  },
  {
    rules: { 'vue/multi-word-component-names': 0, 'no-var': 2 },
  },
]);
