const fs = require('fs');

let content = fs.readFileSync('bin/install.js', 'utf8');

// Fix the insertPrefix line that was corrupted by sed
const corruptedPattern = /const insertPrefix = sectionBody\.length === 0 \|\| sectionBody\.startsWith\('[\s\S]*?'\) \|\| sectionBody\.startsWith\('[\s\S]*?'\) \? '' : eol;/;

const fixedLine = `const insertPrefix = sectionBody.length === 0 || sectionBody.startsWith(eol) ? '' : eol;`;

if (corruptedPattern.test(content)) {
  content = content.replace(corruptedPattern, fixedLine);
  fs.writeFileSync('bin/install.js', content);
  console.log('Fixed insertPrefix logic');
} else {
  console.log('Pattern not found, trying alternative approach');
  // Try to find and fix the line directly
  const lines = content.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const insertPrefix = sectionBody.length === 0') && lines[i].includes('startsWith')) {
      lines[i] = fixedLine;
      found = true;
      break;
    }
  }
  if (found) {
    fs.writeFileSync('bin/install.js', lines.join('\n'));
    console.log('Fixed insertPrefix logic (alternative approach)');
  } else {
    console.log('Could not find the line to fix');
  }
}
