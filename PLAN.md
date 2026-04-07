# WTDD → WTDD 重命名计划

## 目标
将项目中所有 `WTDD` 替换为 `WTDD`，`what-the-dog-doing` 替换为 `what-the-dog-doing`。

## 阶段 1: 文件夹重命名

### 1.1 重命名主文件夹
- [ ] `what-the-dog-doing/` → `what-the-dog-doing/`

## 阶段 2: 文件重命名

### 2.1 Agents 文件夹 (agents/)
- [ ] `wtdd-advisor-researcher.md` → `wtdd-advisor-researcher.md`
- [ ] `wtdd-assumptions-analyzer.md` → `wtdd-assumptions-analyzer.md`
- [ ] `wtdd-code-fixer.md` → `wtdd-code-fixer.md`
- [ ] `wtdd-code-reviewer.md` → `wtdd-code-reviewer.md`
- [ ] `wtdd-codebase-mapper.md` → `wtdd-codebase-mapper.md`
- [ ] `wtdd-debugger.md` → `wtdd-debugger.md`
- [ ] `wtdd-doc-verifier.md` → `wtdd-doc-verifier.md`
- [ ] `wtdd-doc-writer.md` → `wtdd-doc-writer.md`
- [ ] `wtdd-executor.md` → `wtdd-executor.md`
- [ ] `wtdd-intel-updater.md` → `wtdd-intel-updater.md`
- [ ] `wtdd-nyquist-auditor.md` → `wtdd-nyquist-auditor.md`
- [ ] `wtdd-phase-researcher.md` → `wtdd-phase-researcher.md`
- [ ] `wtdd-plan-checker.md` → `wtdd-plan-checker.md`
- [ ] `wtdd-planner.md` → `wtdd-planner.md`
- [ ] `wtdd-project-researcher.md` → `wtdd-project-researcher.md`
- [ ] `wtdd-research-synthesizer.md` → `wtdd-research-synthesizer.md`
- [ ] `wtdd-roadmapper.md` → `wtdd-roadmapper.md`
- [ ] `wtdd-security-auditor.md` → `wtdd-security-auditor.md`
- [ ] `wtdd-ui-auditor.md` → `wtdd-ui-auditor.md`
- [ ] `wtdd-ui-checker.md` → `wtdd-ui-checker.md`
- [ ] `wtdd-ui-researcher.md` → `wtdd-ui-researcher.md`
- [ ] `wtdd-user-profiler.md` → `wtdd-user-profiler.md`
- [ ] `wtdd-verifier.md` → `wtdd-verifier.md`

### 2.2 Assets 文件夹 (assets/)
- [ ] `wtdd-logo-2000-transparent.svg` → `wtdd-logo-2000-transparent.svg`
- [ ] `wtdd-logo-2000.svg` → `wtdd-logo-2000.svg`

### 2.3 Hooks 文件夹 (hooks/)
- [ ] `wtdd-check-update.js` → `wtdd-check-update.js`
- [ ] `wtdd-context-monitor.js` → `wtdd-context-monitor.js`
- [ ] `wtdd-phase-boundary.sh` → `wtdd-phase-boundary.sh`
- [ ] `wtdd-prompt-guard.js` → `wtdd-prompt-guard.js`
- [ ] `wtdd-read-guard.js` → `wtdd-read-guard.js`
- [ ] `wtdd-statusline.js` → `wtdd-statusline.js`
- [ ] `wtdd-validate-commit.sh` → `wtdd-validate-commit.sh`
- [ ] `wtdd-workflow-guard.js` → `wtdd-workflow-guard.js`

### 2.4 Commands 文件夹 (commands/wtdd/)
- [ ] 重命名文件夹: `commands/wtdd/` → `commands/wtdd/`
- [ ] 该文件夹内所有文件保持名称不变

### 2.5 Get-shit-done 内部文件 (重命名后的 what-the-dog-doing/)
- [ ] `bin/wtdd-tools.cjs` → `bin/wtdd-tools.cjs`

## 阶段 3: 文件内容替换

### 3.1 配置文件
- [ ] `.clinerules` - 替换 WTDD → WTDD, what-the-dog-doing → what-the-dog-doing
- [ ] `.gitignore` - 替换 wtdd → wtdd
- [ ] `package.json` - 替换 wtdd → wtdd, WTDD → WTDD
- [ ] `tsconfig.json` - 如有需要替换
- [ ] `vitest.config.ts` - 如有需要替换

### 3.2 GitHub 配置 (.github/)
- [ ] `ISSUE_TEMPLATE/*.yml` - 替换所有 WTDD → WTDD
- [ ] `workflows/*.yml` - 替换所有 WTDD → WTDD, what-the-dog-doing → what-the-dog-doing

### 3.3 Agents 文件内容 (agents/)
- [ ] 所有 `wtdd-*.md` 文件内部内容替换:
  - WTDD → WTDD
  - wtdd → wtdd
  - what-the-dog-doing → what-the-dog-doing

### 3.4 Commands 文件内容 (commands/wtdd/)
- [ ] 所有 `.md` 文件内部替换 WTDD → WTDD, what-the-dog-doing → what-the-dog-doing

### 3.5 Bin 文件夹 (bin/)
- [ ] `install.js` - 替换 wtdd → wtdd, WTDD → WTDD

### 3.6 Hooks 文件内容 (hooks/)
- [ ] 所有 `wtdd-*.js/sh` 文件内部替换 wtdd → wtdd, WTDD → WTDD

### 3.7 Scripts 文件夹 (scripts/)
- [ ] `build-hooks.js` - 替换 wtdd → wtdd
- [ ] `prompt-injection-scan.sh` - 替换 wtdd → wtdd

### 3.8 Tests 文件夹 (tests/)
- [ ] 所有 `.test.cjs` 文件内部替换 wtdd → wtdd, WTDD → WTDD, what-the-dog-doing → what-the-dog-doing

### 3.9 What-the-dog-doing 文件夹内容 (what-the-dog-doing/)
- [ ] 所有 `.md`, `.cjs` 文件内部替换 wtdd → wtdd, WTDD → WTDD, what-the-dog-doing → what-the-dog-doing

### 3.10 Assets 文件夹 (assets/)
- [ ] SVG 文件内部如有 wtdd 引用则替换

## 阶段 4: 验证

### 4.1 检查遗漏
- [ ] 运行 `grep -r "WTDD" --include="*.{md,js,cjs,ts,yml,yaml,json,sh,svg}" .` 确认无遗漏
- [ ] 运行 `grep -r "what-the-dog-doing" --include="*.{md,js,cjs,ts,yml,yaml,json,sh,svg}" .` 确认无遗漏
- [ ] 运行 `grep -r "wtdd" --include="*.{md,js,cjs,ts,yml,yaml,json,sh,svg}" . | grep -v "wtdd"` 检查残留

### 4.2 功能测试
- [ ] 检查 package.json 中的脚本是否正常工作
- [ ] 检查所有配置文件语法正确

## 执行建议

1. **备份**: 在执行前创建 git 提交或分支
2. **分步执行**: 按阶段顺序执行，每阶段完成后验证
3. **大小写敏感**: 注意 WTDD/wtdd 的不同大小写形式
4. **路径更新**: 确保文件内容中的路径引用同步更新

## 快速执行命令参考

```bash
# 1. 重命名文件夹
mv what-the-dog-doing what-the-dog-doing
mv commands/wtdd commands/wtdd

# 2. 批量重命名 agents 文件
for f in agents/wtdd-*.md; do mv "$f" "${f/wtdd-/wtdd-}"; done

# 3. 批量重命名 hooks 文件
for f in hooks/wtdd-*.{js,sh}; do mv "$f" "${f/wtdd-/wtdd-}"; done

# 4. 批量重命名 assets 文件
for f in assets/wtdd-*.{svg,png}; do mv "$f" "${f/wtdd-/wtdd-}"; done

# 5. 内容替换 (使用 sed 或类似工具)
# 注意: Windows 上可能需要使用 Git Bash 或 WSL
```
