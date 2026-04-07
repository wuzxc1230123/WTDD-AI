/**
 * Regression test for #1736: local Claude install missing commands/wtdd/
 *
 * After a fresh local install (`--claude --local`), all /wtdd-* commands
 * except /wtdd-help return "Unknown skill: wtdd-quick" because
 * .claude/commands/wtdd/ is not populated. Claude Code reads local project
 * commands from .claude/commands/wtdd/ (the commands/ format), not from
 * .claude/skills/ — only the global ~/.claude/skills/ is used for skills.
 */

'use strict';

process.env.WTDD_TEST_MODE = '1';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const INSTALL_SRC = path.join(__dirname, '..', 'bin', 'install.js');
const { install, copyCommandsAsClaudeSkills } = require(INSTALL_SRC);

// ─── #1736: local install deploys commands/wtdd/ ─────────────────────────────

describe('#1736: local Claude install populates .claude/commands/wtdd/', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wtdd-local-install-1736-'));
  });

  afterEach(() => {
    // Retry cleanup on Windows due to potential file handle delays
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        break;
      } catch (err) {
        if (i === maxRetries - 1) {
          // Last attempt failed, try with sync and ignore errors
          try {
            fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 0 });
          } catch {
            // Ignore final cleanup error - temp files will be cleaned by OS eventually
          }
        } else if (err.code === 'EBUSY' || err.code === 'EPERM') {
          // Wait a bit before retry
          const start = Date.now();
          while (Date.now() - start < 100) {
            // Busy wait for 100ms
          }
        } else {
          throw err;
        }
      }
    }
  });

  test('local install creates .claude/commands/wtdd/ directory', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const commandsDir = path.join(tmpDir, '.claude', 'commands', 'wtdd');
    assert.ok(
      fs.existsSync(commandsDir),
      '.claude/commands/wtdd/ directory must exist after local install'
    );
  });

  test('local install deploys at least one .md command file to .claude/commands/wtdd/', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const commandsDir = path.join(tmpDir, '.claude', 'commands', 'wtdd');
    assert.ok(
      fs.existsSync(commandsDir),
      '.claude/commands/wtdd/ must exist'
    );

    const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
    assert.ok(
      files.length > 0,
      `.claude/commands/wtdd/ must contain at least one .md file, found: ${JSON.stringify(files)}`
    );
  });

  test('local install deploys quick.md to .claude/commands/wtdd/', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const quickCmd = path.join(tmpDir, '.claude', 'commands', 'wtdd', 'quick.md');
    assert.ok(
      fs.existsSync(quickCmd),
      '.claude/commands/wtdd/quick.md must exist after local install'
    );
  });
});
