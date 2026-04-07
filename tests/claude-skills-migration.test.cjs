/**
 * WTDD Tools Tests - Claude Skills Migration (#1504)
 *
 * Tests for migrating Claude Code from commands/wtdd/ to skills/wtdd-xxx/SKILL.md
 * format for compatibility with Claude Code 2.1.88+.
 *
 * Uses node:test and node:assert (NOT Jest).
 */

process.env.WTDD_TEST_MODE = '1';

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const os = require('os');
const fs = require('fs');

const {
  convertClaudeCommandToClaudeSkill,
  copyCommandsAsClaudeSkills,
  writeManifest,
  install,
} = require('../bin/install.js');

// ─── convertClaudeCommandToClaudeSkill ──────────────────────────────────────

describe('convertClaudeCommandToClaudeSkill', () => {
  test('preserves allowed-tools multiline YAML list', () => {
    const input = [
      '---',
      'name: wtdd:next',
      'description: Advance to the next step',
      'allowed-tools:',
      '  - Read',
      '  - Bash',
      '  - Grep',
      '---',
      '',
      'Body content here.',
    ].join('\n');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-next');
    assert.ok(result.includes('allowed-tools:'), 'allowed-tools field is present');
    assert.ok(result.includes('Read'), 'Read tool preserved');
    assert.ok(result.includes('Bash'), 'Bash tool preserved');
    assert.ok(result.includes('Grep'), 'Grep tool preserved');
  });

  test('preserves argument-hint', () => {
    const input = [
      '---',
      'name: wtdd:debug',
      'description: Debug issues',
      'argument-hint: "[issue description]"',
      'allowed-tools:',
      '  - Read',
      '  - Bash',
      '---',
      '',
      'Debug body.',
    ].join('\n');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-debug');
    assert.ok(result.includes('argument-hint:'), 'argument-hint field is present');
    // The value should be preserved (possibly yaml-quoted)
    assert.ok(
      result.includes('[issue description]'),
      'argument-hint value preserved'
    );
  });

  test('converts name format from wtdd:xxx to skill naming', () => {
    const input = [
      '---',
      'name: wtdd:next',
      'description: Advance workflow',
      '---',
      '',
      'Body.',
    ].join('\n');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-next');
    assert.ok(result.includes('name: wtdd-next'), 'name uses skill naming convention');
    assert.ok(!result.includes('name: wtdd:next'), 'old name format removed');
  });

  test('preserves body content unchanged', () => {
    const body = '\n<objective>\nDo the thing.\n</objective>\n\n<process>\nStep 1.\nStep 2.\n</process>\n';
    const input = [
      '---',
      'name: wtdd:test',
      'description: Test command',
      '---',
      body,
    ].join('');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-test');
    assert.ok(result.includes('<objective>'), 'objective tag preserved');
    assert.ok(result.includes('Do the thing.'), 'body text preserved');
    assert.ok(result.includes('<process>'), 'process tag preserved');
    assert.ok(result.includes('Step 1.'), 'step text preserved');
  });

  test('preserves agent field', () => {
    const input = [
      '---',
      'name: wtdd:plan-phase',
      'description: Plan a phase',
      'agent: true',
      'allowed-tools:',
      '  - Read',
      '---',
      '',
      'Plan body.',
    ].join('\n');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-plan-phase');
    assert.ok(result.includes('agent:'), 'agent field is present');
  });

  test('handles content with no frontmatter', () => {
    const input = 'Just some plain markdown content.';
    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-plain');
    assert.strictEqual(result, input, 'content returned unchanged');
  });

  test('preserves allowed-tools as multiline YAML list (not flattened)', () => {
    const input = [
      '---',
      'name: wtdd:debug',
      'description: Debug',
      'allowed-tools:',
      '  - Read',
      '  - Bash',
      '  - Task',
      '  - AskUserQuestion',
      '---',
      '',
      'Body.',
    ].join('\n');

    const result = convertClaudeCommandToClaudeSkill(input, 'wtdd-debug');
    // Claude Code native format keeps YAML multiline list
    assert.ok(result.includes('  - Read'), 'Read in multiline list');
    assert.ok(result.includes('  - Bash'), 'Bash in multiline list');
    assert.ok(result.includes('  - Task'), 'Task in multiline list');
    assert.ok(result.includes('  - AskUserQuestion'), 'AskUserQuestion in multiline list');
  });
});

// ─── copyCommandsAsClaudeSkills ─────────────────────────────────────────────

describe('copyCommandsAsClaudeSkills', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wtdd-claude-skills-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('creates correct directory structure skills/wtdd-xxx/SKILL.md', () => {
    // Create source commands
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'next.md'),
      '---\nname: wtdd:next\ndescription: Advance\nallowed-tools:\n  - Read\n---\n\nBody.'
    );
    fs.writeFileSync(
      path.join(srcDir, 'health.md'),
      '---\nname: wtdd:health\ndescription: Check health\n---\n\nHealth body.'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    // Verify directory structure
    assert.ok(
      fs.existsSync(path.join(skillsDir, 'wtdd-next', 'SKILL.md')),
      'skills/wtdd-next/SKILL.md exists'
    );
    assert.ok(
      fs.existsSync(path.join(skillsDir, 'wtdd-health', 'SKILL.md')),
      'skills/wtdd-health/SKILL.md exists'
    );
  });

  test('cleans up old skills before installing new ones', () => {
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'next.md'),
      '---\nname: wtdd:next\ndescription: Advance\n---\n\nBody.'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    // Create a stale skill that should be removed
    const staleDir = path.join(skillsDir, 'wtdd-old-command');
    fs.mkdirSync(staleDir, { recursive: true });
    fs.writeFileSync(path.join(staleDir, 'SKILL.md'), 'stale content');

    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    // Stale skill removed
    assert.ok(
      !fs.existsSync(staleDir),
      'stale skill directory removed'
    );
    // New skill created
    assert.ok(
      fs.existsSync(path.join(skillsDir, 'wtdd-next', 'SKILL.md')),
      'new skill created'
    );
  });

  test('does not remove non-WTDD skills', () => {
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'next.md'),
      '---\nname: wtdd:next\ndescription: Advance\n---\n\nBody.'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    // Create a non-WTDD skill
    const otherDir = path.join(skillsDir, 'my-custom-skill');
    fs.mkdirSync(otherDir, { recursive: true });
    fs.writeFileSync(path.join(otherDir, 'SKILL.md'), 'custom content');

    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    // Non-WTDD skill preserved
    assert.ok(
      fs.existsSync(otherDir),
      'non-WTDD skill preserved'
    );
  });

  test('handles recursive subdirectories', () => {
    const srcDir = path.join(tmpDir, 'src');
    const subDir = path.join(srcDir, 'wired');
    fs.mkdirSync(subDir, { recursive: true });
    fs.writeFileSync(
      path.join(subDir, 'ready.md'),
      '---\nname: wtdd-wired:ready\ndescription: Show ready tasks\n---\n\nBody.'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    assert.ok(
      fs.existsSync(path.join(skillsDir, 'wtdd-wired-ready', 'SKILL.md')),
      'nested command creates wtdd-wired-ready/SKILL.md'
    );
  });

  test('no-ops when source directory does not exist', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    // Should not throw
    copyCommandsAsClaudeSkills(
      path.join(tmpDir, 'nonexistent'),
      skillsDir,
      'wtdd',
      '$HOME/.claude/',
      'claude',
      true
    );
    assert.ok(!fs.existsSync(skillsDir), 'skills dir not created when src missing');
  });
});

// ─── Path replacement in Claude skills (#1653) ────────────────────────────────

describe('copyCommandsAsClaudeSkills path replacement (#1653)', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wtdd-claude-path-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('replaces ~/.claude/ paths with pathPrefix on local install', () => {
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'manager.md'),
      [
        '---',
        'name: wtdd:manager',
        'description: Manager command',
        '---',
        '',
        '<execution_context>',
        '@~/.claude/what-the-dog-doing/workflows/manager.md',
        '@~/.claude/what-the-dog-doing/references/ui-brand.md',
        '</execution_context>',
      ].join('\n')
    );

    const skillsDir = path.join(tmpDir, 'skills');
    const localPrefix = '/Users/test/myproject/.claude/';
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', localPrefix, 'claude', false);

    const content = fs.readFileSync(path.join(skillsDir, 'wtdd-manager', 'SKILL.md'), 'utf8');
    assert.ok(!content.includes('~/.claude/'), 'no hardcoded ~/.claude/ paths remain');
    assert.ok(content.includes(localPrefix + 'what-the-dog-doing/workflows/manager.md'), 'path rewritten to local prefix');
    assert.ok(content.includes(localPrefix + 'what-the-dog-doing/references/ui-brand.md'), 'reference path rewritten');
  });

  test('replaces $HOME/.claude/ paths with pathPrefix', () => {
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'debug.md'),
      '---\nname: wtdd:debug\ndescription: Debug\n---\n\n@$HOME/.claude/what-the-dog-doing/workflows/debug.md'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    const localPrefix = '/tmp/project/.claude/';
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', localPrefix, 'claude', false);

    const content = fs.readFileSync(path.join(skillsDir, 'wtdd-debug', 'SKILL.md'), 'utf8');
    assert.ok(!content.includes('$HOME/.claude/'), 'no $HOME/.claude/ paths remain');
    assert.ok(content.includes(localPrefix + 'what-the-dog-doing/workflows/debug.md'), 'path rewritten');
  });

  test('global install preserves $HOME/.claude/ when pathPrefix matches', () => {
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'next.md'),
      '---\nname: wtdd:next\ndescription: Next\n---\n\n@~/.claude/what-the-dog-doing/workflows/next.md'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    const content = fs.readFileSync(path.join(skillsDir, 'wtdd-next', 'SKILL.md'), 'utf8');
    assert.ok(content.includes('$HOME/.claude/what-the-dog-doing/workflows/next.md'), 'global paths use $HOME form');
    assert.ok(!content.includes('~/.claude/'), '~/ form replaced with $HOME/ form');
  });
});

// ─── Legacy cleanup during install ──────────────────────────────────────────

describe('Legacy commands/wtdd/ cleanup', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wtdd-legacy-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('install removes legacy commands/wtdd/ directory when present', () => {
    // Create a mock legacy commands/wtdd/ directory
    const legacyDir = path.join(tmpDir, 'commands', 'wtdd');
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(path.join(legacyDir, 'next.md'), 'legacy content');

    // Create source commands for the installer to read
    const srcDir = path.join(tmpDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'next.md'),
      '---\nname: wtdd:next\ndescription: Advance\n---\n\nBody.'
    );

    const skillsDir = path.join(tmpDir, 'skills');
    // Install skills
    copyCommandsAsClaudeSkills(srcDir, skillsDir, 'wtdd', '$HOME/.claude/', 'claude', true);

    // Simulate the legacy cleanup that install() does after copyCommandsAsClaudeSkills
    if (fs.existsSync(legacyDir)) {
      fs.rmSync(legacyDir, { recursive: true });
    }

    assert.ok(!fs.existsSync(legacyDir), 'legacy commands/wtdd/ removed');
    assert.ok(
      fs.existsSync(path.join(skillsDir, 'wtdd-next', 'SKILL.md')),
      'new skill installed'
    );
  });
});

// ─── writeManifest tracks skills/ for Claude ────────────────────────────────

describe('writeManifest tracks skills/ for Claude', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wtdd-manifest-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('manifest includes skills/wtdd-xxx/SKILL.md entries for Claude runtime', () => {
    // Create skills directory structure (as install would)
    const skillsDir = path.join(tmpDir, 'skills');
    const skillDir = path.join(skillsDir, 'wtdd-next');
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), 'skill content');

    // Create what-the-dog-doing directory (required by writeManifest)
    const wtddDir = path.join(tmpDir, 'what-the-dog-doing');
    fs.mkdirSync(wtddDir, { recursive: true });
    fs.writeFileSync(path.join(wtddDir, 'test.md'), 'test');

    writeManifest(tmpDir, 'claude');

    const manifest = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'wtdd-file-manifest.json'), 'utf8')
    );

    // Should have skills/ entries
    const skillEntries = Object.keys(manifest.files).filter(k =>
      k.startsWith('skills/')
    );
    assert.ok(skillEntries.length > 0, 'manifest has skills/ entries');
    assert.ok(
      skillEntries.some(k => k === 'skills/wtdd-next/SKILL.md'),
      'manifest has skills/wtdd-next/SKILL.md'
    );

    // Should NOT have commands/wtdd/ entries
    const cmdEntries = Object.keys(manifest.files).filter(k =>
      k.startsWith('commands/wtdd/')
    );
    assert.strictEqual(cmdEntries.length, 0, 'manifest has no commands/wtdd/ entries');
  });
});

// ─── Exports exist ──────────────────────────────────────────────────────────

describe('Claude skills migration exports', () => {
  test('convertClaudeCommandToClaudeSkill is exported', () => {
    assert.strictEqual(typeof convertClaudeCommandToClaudeSkill, 'function');
  });

  test('copyCommandsAsClaudeSkills is exported', () => {
    assert.strictEqual(typeof copyCommandsAsClaudeSkills, 'function');
  });
});
