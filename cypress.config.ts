import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/api/**/*.{cy,spec}.ts',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    supportFile: 'cypress/support/api.ts',
  },
  env: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
    endpoints: {
      users: '/users',
      posts: '/posts',
    },
  },
});
