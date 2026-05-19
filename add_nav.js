/**
 * Patches all HTML files to include the shared nav.js sidebar.
 * Computes the correct relative path based on each file's depth.
 * Run: node add_nav.js
 */
const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// Files to skip
const SKIP = ['nav.js'];

// Recursively collect all HTML files
function collectHtml(dir, files = []) {
  fs.readdirSync(dir).forEach(name => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      // Skip node_modules or hidden dirs
      if (!name.startsWith('.') && name !== 'node_modules') collectHtml(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  });
  return files;
}

const htmlFiles = collectHtml(BASE);
let patched = 0, skipped = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');

  // Already patched?
  if (html.includes('nav.js')) { skipped++; return; }

  // Compute relative depth from BASE
  const rel = path.relative(BASE, filePath);
  const segments = rel.split(path.sep);
  const depth = segments.length - 1; // number of directory levels
  const prefix = '../'.repeat(depth);

  const tag = `<script src="${prefix}nav.js"></script>`;

  // Insert before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', `    ${tag}\n</body>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  ✓ [depth ${depth}] ${rel}`);
    patched++;
  } else {
    console.warn(`  ⚠ No </body> found: ${rel}`);
  }
});

console.log(`\n  ✅ Patched ${patched} files, skipped ${skipped} already patched\n`);
