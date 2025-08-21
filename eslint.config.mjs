import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    rules: {
      // Add your spacing rules here
      'space-infix-ops': 'error', // Enforce space around =, +, etc.
      'key-spacing': [
        'error',
        {
          beforeColon: true, // space before :
          afterColon: true, // space after :
        },
      ],
      'comma-spacing': [
        'error',
        {
          before: false, // no space before ,
          after: true, // space after ,
        },
      ],
    },
    extends: ['plugin:js/recommended'],
  },
]);
