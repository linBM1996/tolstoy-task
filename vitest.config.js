import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['Tests/**/*.test.{js,ts,jsx}'],
  },
});
