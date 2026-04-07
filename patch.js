const fs = require('fs');

let content = fs.readFileSync('bin/install.js', 'utf8');

// Find and replace the insertion logic in ensureCodexHooksFeature
const oldLogic = `    const sectionBody = configContent.slice(featuresSection.headerEnd, featuresSection.end);
    const needsSeparator = sectionBody.length > 0 && !sectionBody.endsWith('\n') && !sectionBody.endsWith('\r\n');
    const insertPrefix = sectionBody.length === 0 && featuresSection.headerEnd === configContent.length ? eol : '';
    const insertText = \`\${insertPrefix}\${needsSeparator ? eol : ''}codex_hooks = true\${eol}\`;
    const merged = configContent.slice(0, featuresSection.end) + insertText + configContent.slice(featuresSection.end);`;

const newLogic = `    const sectionBody = configContent.slice(featuresSection.headerEnd, featuresSection.end);
    const needsSeparator = sectionBody.length > 0 && !sectionBody.endsWith('\n') && !sectionBody.endsWith('\r\n');
    // When [features] is at EOF or followed by another table, insert codex_hooks right after [features] header
    // Find the insertion point: after [features] header, before any existing content or next table
    const insertAt = featuresSection.headerEnd;
    const prefix = sectionBody.length === 0 || sectionBody.startsWith('\n') || sectionBody.startsWith('\r\n') ? '' : eol;
    const insertText = \`\${prefix}codex_hooks = true\${eol}\`;
    const merged = configContent.slice(0, insertAt) + insertText + configContent.slice(insertAt);`;

if (content.includes(oldLogic)) {
  content = content.replace(oldLogic, newLogic);
  fs.writeFileSync('bin/install.js', content);
  console.log('Patch applied successfully');
} else {
  console.log('Could not find the exact pattern to replace');
  console.log('Looking for:');
  console.log(oldLogic);
}
