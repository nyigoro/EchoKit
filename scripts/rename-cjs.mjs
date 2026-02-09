import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/cjs');

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (entry.name.endsWith('.js')) {
      const content = await fs.readFile(fullPath, 'utf8');
      const updated = content.replace(
        /sourceMappingURL=([^\s]+)/,
        (match, url) =>
          url.endsWith('.js.map')
            ? `sourceMappingURL=${url.replace('.js.map', '.cjs.map')}`
            : match,
      );
      await fs.writeFile(fullPath, updated);
      await fs.rename(fullPath, fullPath.replace(/\.js$/, '.cjs'));
      continue;
    }

    if (entry.name.endsWith('.js.map')) {
      const raw = await fs.readFile(fullPath, 'utf8');
      const map = JSON.parse(raw);
      if (typeof map.file === 'string' && map.file.endsWith('.js')) {
        map.file = map.file.replace(/\.js$/, '.cjs');
      }
      await fs.writeFile(fullPath, JSON.stringify(map));
      await fs.rename(fullPath, fullPath.replace(/\.js\.map$/, '.cjs.map'));
    }
  }
};

await walk(root);
