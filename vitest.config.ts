import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/features/',
        'src/models/',
        'vitest.config.ts',
        'src/index.ts',
        'src/app.ts',
        'src/controllers/',
        'src/validators/',
        'src/services/sale.service.ts',
      ],
    },
  },
});
