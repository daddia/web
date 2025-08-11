import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'globals.css');
const distDir = path.join(rootDir, 'dist');
const distPath = path.join(distDir, 'globals.css');

async function build() {
  try {
    // Create dist directory
    await fs.promises.mkdir(distDir, { recursive: true });

    // Copy globals.css to dist
    const content = await fs.promises.readFile(sourcePath, 'utf8');
    await fs.promises.writeFile(distPath, content);

    console.log('✅ Built tailwind-config:');
    console.log(`   - globals.css → dist/globals.css`);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes...');

  fs.watch(sourcePath, async () => {
    console.log('🔄 Rebuilding...');
    await build();
  });

  // Initial build
  build();
} else {
  build();
}
