import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'index.ts',
    'components/index.ts', 
    'contexts/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'lucide-react'],
})
