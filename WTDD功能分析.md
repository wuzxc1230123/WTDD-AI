# WTDD (What The Dog Doing) 功能分析

## 概述

WTDD 是一个专为 Claude Code、OpenCode、Gemini CLI 和 Codex CLI 设计的**元提示工程（Meta-Prompting）**和**上下文工程（Context Engineering）**系统，支持规范驱动的开发工作流。

**版本**: 1.34.2  
**作者**: TÂCHES  
**许可证**: MIT

---

## 核心架构组件

### 1. 安装与配置系统 (`bin/install.js`)

- 检测并安装 Claude Code、Codex CLI、Gemini CLI 等 AI 工具
- 配置 agents、commands、hooks 到用户主目录
- 支持工作区隔离和多项目配置
- 自动更新机制

---

### 2. 命令系统 (`commands/wtdd/`)

包含 **74+ 个 Slash 命令**，按类别组织：

#### 项目初始化

| 命令 | 功能 |
|------|------|
| `/wtdd-new-project` | 统一流程：提问→研究→需求→路线图 |
| `/wtdd-map-codebase` | 现有代码库映射（生成7个分析文档） |

#### 阶段规划

| 命令 | 功能 |
|------|------|
| `/wtdd-discuss-phase <N>` | 阶段愿景讨论，创建 CONTEXT.md |
| `/wtdd-research-phase <N>` | 领域深度研究（并行研究员代理） |
| `/wtdd-list-phase-assumptions <N>` | 查看阶段假设（无文件创建） |
| `/wtdd-plan-phase <N>` | 创建可执行阶段计划 |

#### 执行

| 命令 | 功能 |
|------|------|
| `/wtdd-execute-phase <N>` | 按计划执行任务，支持波次并行 |
| `/wtdd-quick [--full]` | 快速模式（跳过多余步骤） |
| `/wtdd-fast [描述]` | 极速模式（内联执行，无计划文件） |
| `/wtdd-autonomous` | 全自动模式（discuss→plan→execute） |

#### 智能路由

| 命令 | 功能 |
|------|------|
| `/wtdd-do <描述>` | 自然语言路由到正确命令 |

#### 里程碑管理

| 命令 | 功能 |
|------|------|
| `/wtdd-new-milestone <名称>` | 新里程碑统一流程 |
| `/wtdd-complete-milestone <版本>` | 完成里程碑并归档 |
| `/wtdd-add-phase <描述>` | 添加新阶段 |
| `/wtdd-insert-phase <后> <描述>` | 插入中间阶段（如 7.1） |
| `/wtdd-remove-phase <N>` | 删除阶段并重编号 |

#### 进度跟踪

| 命令 | 功能 |
|------|------|
| `/wtdd-progress` | 检查项目状态 |
| `/wtdd-resume-work` | 恢复上次会话 |
| `/wtdd-pause-work` | 创建暂停交接文档 |

#### 调试

| 命令 | 功能 |
|------|------|
| `/wtdd-debug [问题描述]` | 系统化调试，持久状态 |
| `/wtdd-forensics` | 问题取证分析 |

#### 质量保证

| 命令 | 功能 |
|------|------|
| `/wtdd-verify-work [阶段]` | 用户验收测试 |
| `/wtdd-review [--phase N]` | 跨 AI 同行评审 |
| `/wtdd-audit-milestone` | 里程碑审计 |
| `/wtdd-audit-uat` | UAT 交叉审计 |
| `/wtdd-validate-phase <N>` | 阶段验证 |
| `/wtdd-ui-review [--phase N]` | UI 评审 |

#### 实用工具

| 命令 | 功能 |
|------|------|
| `/wtdd-add-todo [描述]` | 添加待办 |
| `/wtdd-check-todos [区域]` | 查看待办 |
| `/wtdd-note <文本>` | 快速笔记 |
| `/wtdd-ship [阶段]` | 创建 PR |
| `/wtdd-pr-branch [目标]` | 创建干净的 PR 分支 |
| `/wtdd-settings` | 工作流配置 |
| `/wtdd-set-profile <配置>` | 快速切换模型配置 |
| `/wtdd-help` | 显示命令参考 |
| `/wtdd-update` | 更新 WTDD |
| `/wtdd-cleanup` | 归档完成的阶段目录 |
| `/wtdd-stats` | 显示项目统计 |
| `/wtdd-session-report` | 生成会话报告 |

---

### 3. 代理系统 (`agents/wtdd/`)

包含 **22 个专业代理**：

| 代理 | 职责 |
|------|------|
| `wtdd-planner` | 创建可执行阶段计划，任务分解，依赖分析 |
| `wtdd-executor` | 执行计划，原子提交，检查点处理 |
| `wtdd-research-synthesizer` | 研究综合 |
| `wtdd-phase-researcher` | 阶段领域研究 |
| `wtdd-project-researcher` | 项目研究 |
| `wtdd-roadmapper` | 路线图规划 |
| `wtdd-codebase-mapper` | 代码库映射 |
| `wtdd-user-profiler` | 用户画像 |
| `wtdd-verifier` | 验证工作 |
| `wtdd-debugger` | 调试代理 |
| `wtdd-code-fixer` | 代码修复 |
| `wtdd-code-reviewer` | 代码审查 |
| `wtdd-ui-researcher` | UI 研究 |
| `wtdd-ui-auditor` | UI 审计 |
| `wtdd-ui-checker` | UI 检查 |
| `wtdd-security-auditor` | 安全审计 |
| `wtdd-assumptions-analyzer` | 假设分析 |
| `wtdd-doc-verifier` | 文档验证 |
| `wtdd-doc-writer` | 文档编写 |
| `wtdd-plan-checker` | 计划检查 |
| `wtdd-advisor-researcher` | 顾问研究 |
| `wtdd-intel-updater` | 情报更新 |
| `wtdd-nyquist-auditor` | Nyquist 审计（代码质量） |

---

### 4. Hooks 系统 (`hooks/`)

8 个工作流钩子，在关键节点自动执行：

| Hook | 功能 |
|------|------|
| `wtdd-check-update.js` | 更新检查 |
| `wtdd-context-monitor.js` | 上下文监控 |
| `wtdd-phase-boundary.sh` | 阶段边界处理 |
| `wtdd-prompt-guard.js` | 提示保护 |
| `wtdd-read-guard.js` | 读取保护 |
| `wtdd-session-state.sh` | 会话状态 |
| `wtdd-statusline.js` | 状态行 |
| `wtdd-validate-commit.sh` | 提交验证 |
| `wtdd-workflow-guard.js` | 工作流保护 |

---

### 5. 工具库 (`what-the-dog-doing/bin/`)

`wtdd-tools.cjs` 提供 60+ CLI 命令：

#### 状态管理
- `state load` - 加载项目配置+状态
- `state update <字段> <值>` - 更新 STATE.md 字段
- `state patch --field val ...` - 批量更新
- `state begin-phase` - 新阶段开始

#### 阶段操作
- `phase add <描述>` - 添加阶段
- `phase insert <后> <描述>` - 插入阶段
- `phase remove <阶段>` - 删除阶段
- `phase complete <阶段>` - 标记完成

#### 路线图操作
- `roadmap analyze` - 完整路线图解析
- `roadmap update-plan-progress <N>` - 更新进度

#### 需求管理
- `requirements mark-complete <ids>` - 标记需求完成

#### 里程碑操作
- `milestone complete <版本>` - 完成里程碑

#### 验证套件
- `verify plan-structure <文件>` - 检查 PLAN.md 结构
- `verify-summary <路径>` - 验证 SUMMARY.md

#### 前端处理
- `frontmatter get <文件>` - 提取 frontmatter
- `frontmatter validate <文件>` - 验证必需字段

#### Git 提交
- `commit <消息>` - 提交规划文档
- `commit-to-subrepo` - 路由到子仓库

#### 智能查询
- `intel query <术语>` - 查询情报文件
- `history-digest` - 聚合所有 SUMMARY.md 数据

---

### 6. 工作流系统 (`what-the-dog-doing/workflows/`)

80+ 个工作流定义文件，覆盖完整生命周期：

**核心工作流：**
- `new-project.md` - 新项目初始化
- `new-milestone.md` - 新里程碑
- `discuss-phase.md` - 阶段讨论
- `research-phase.md` - 阶段研究
- `plan-phase.md` - 阶段规划
- `execute-phase.md` - 阶段执行
- `execute-plan.md` - 计划执行
- `complete-milestone.md` - 里程碑完成

**辅助工作流：**
- `quick.md` - 快速任务
- `fast.md` - 极速任务
- `debug.md` - 调试
- `verify-work.md` - 工作验证
- `autonomous.md` - 自主模式

---

### 7. 参考文档 (`what-the-dog-doing/references/`)

30+ 个参考文档：

**思考模型：**
- `thinking-models-planning.md` - 规划思考模型
- `thinking-models-execution.md` - 执行思考模型
- `thinking-models-research.md` - 研究思考模型
- `thinking-models-verification.md` - 验证思考模型
- `thinking-models-debug.md` - 调试思考模型

**协议与指南：**
- `checkpoints.md` - 检查点协议
- `git-integration.md` - Git 集成
- `git-planning-commit.md` - 规划提交
- `security.md` - 安全威胁建模
- `verification-patterns.md` - 验证模式
- `ui-brand.md` - UI/品牌指南
- `user-profiling.md` - 用户画像

**方法论：**
- `goal-backward.md` - 目标回溯
- `tdd.md` - 测试驱动开发
- `domain-probes.md` - 领域探针

---

### 8. 模板系统 (`what-the-dog-doing/templates/`)

50+ 个模板：

**项目文档：**
- `project.md` - 项目文档
- `requirements.md` - 需求文档
- `roadmap.md` - 路线图
- `milestone.md` - 里程碑

**代码库映射：**
- `codebase/stack.md` - 技术栈
- `codebase/architecture.md` - 架构
- `codebase/structure.md` - 结构
- `codebase/conventions.md` - 规范
- `codebase/testing.md` - 测试
- `codebase/integrations.md` - 集成
- `codebase/concerns.md` - 关注点

**阶段文档：**
- `phase-prompt.md` - 阶段提示
- `summary.md` - 摘要
- `context.md` - 上下文
- `verification.md` - 验证
- `UAT.md` - 用户验收测试

**研究项目：**
- `research-project/ARCHITECTURE.md`
- `research-project/FEATURES.md`
- `research-project/PITFALLS.md`
- `research-project/STACK.md`
- `research-project/SUMMARY.md`

---

## 核心工作流

```
/wtdd-new-project 
    ↓ (统一流程: 提问 → 研究 → 需求 → 路线图)
/wtdd-plan-phase N
    ↓ (创建 PLAN.md 可执行计划)
/wtdd-execute-phase N
    ↓ (执行 → 验证 → 提交 → SUMMARY.md)
重复直到里程碑完成
/wtdd-complete-milestone
```

---

## 项目结构

```
.planning/
├── PROJECT.md            # 项目愿景
├── ROADMAP.md            # 当前阶段分解
├── STATE.md              # 项目记忆与上下文
├── RETROSPECTIVE.md      # 实时回顾（每个里程碑更新）
├── config.json           # 工作流模式与门控
├── REQUIREMENTS.md       # 需求文档
├── MILESTONES.md         # 里程碑记录
├── VERIFICATION.md       # 验证文档
│
├── todos/                # 捕获的想法和任务
│   ├── pending/          # 待办
│   └── done/             # 已完成
│
├── debug/                # 活跃调试会话
│   └── resolved/         # 已归档问题
│
├── milestones/           # 归档的里程碑
│   ├── v1.0-ROADMAP.md
│   ├── v1.0-REQUIREMENTS.md
│   └── v1.0-phases/
│
├── codebase/             # 代码库映射（棕地项目）
│   ├── STACK.md
│   ├── ARCHITECTURE.md
│   ├── STRUCTURE.md
│   ├── CONVENTIONS.md
│   ├── TESTING.md
│   ├── INTEGRATIONS.md
│   └── CONCERNS.md
│
├── research/             # 研究文档
│   └── DISCOVERY.md
│
└── phases/               # 阶段目录
    ├── 01-foundation/
    │   ├── 01-CONTEXT.md
    │   ├── 01-RESEARCH.md
    │   ├── 01-01-PLAN.md
    │   └── 01-01-SUMMARY.md
    └── 02-core-features/
        ├── 02-CONTEXT.md
        ├── 02-01-PLAN.md
        └── 02-01-SUMMARY.md
```

---

## 特色功能

### 1. 分层规划
项目 → 里程碑 → 阶段 → 计划 → 任务 → 波次

### 2. 并行执行
同一波次的计划并行执行（使用 Task 工具）

### 3. 偏差规则（4条自动处理规则）
- **规则1**: 自动修复 bug
- **规则2**: 自动添加缺失的关键功能
- **规则3**: 自动修复阻塞问题
- **规则4**: 询问架构变更

### 4. 检查点协议
- `checkpoint:human-verify` - 人工验证（90%）
- `checkpoint:decision` - 实现选择（9%）
- `checkpoint:human-action` - 人工操作（1%）

### 5. 威胁建模
内置 STRIDE 安全分析，每个计划包含威胁模型

### 6. 多模型支持
- `quality` - 全 Opus
- `balanced` - Opus 规划，Sonnet 执行（默认）
- `budget` - Sonnet 编写，Haiku 研究/验证
- `inherit` - 继承当前会话模型

### 7. TDD 集成
支持测试驱动开发计划（RED→GREEN→REFACTOR）

### 8. 目标回溯
从目标倒推必需任务（Goal-Backward Methodology）

### 9. 上下文预算
每计划控制在 ~50% 上下文使用，保持质量

### 10. 跨 AI 评审
支持 Gemini、Codex、CodeRabbit 等并行评审

---

## 工作流模式

### Interactive Mode（交互模式）
- 确认每个重大决策
- 在检查点暂停等待批准
- 全程提供更多指导

### YOLO Mode（自动模式）
- 自动批准大多数决策
- 无需确认执行计划
- 仅在关键检查点停止

---

## 常用工作流示例

### 启动新项目
```
/wtdd-new-project        # 统一流程
/clear
/wtdd-plan-phase 1       # 第一阶段规划
/clear
/wtdd-execute-phase 1    # 执行第一阶段
```

### 恢复工作
```
/wtdd-progress           # 查看进度并继续
```

### 添加紧急工作
```
/wtdd-insert-phase 5 "关键安全修复"
/wtdd-plan-phase 5.1
/wtdd-execute-phase 5.1
```

### 完成里程碑
```
/wtdd-complete-milestone 1.0.0
/clear
/wtdd-new-milestone      # 开始下一个里程碑
```

### 捕获想法
```
/wtdd-add-todo           # 从对话上下文捕获
/wtdd-check-todos        # 查看并处理待办
```

### 调试问题
```
/wtdd-debug "表单提交失败"
# ... 调查进行中 ...
/clear
/wtdd-debug              # 从断点恢复
```

---

## 配置选项

`.planning/config.json` 示例：

```json
{
  "planning": {
    "commit_docs": true,
    "search_gitignored": false
  },
  "workflow": {
    "mode": "interactive",
    "researcher": true,
    "plan_checker": true,
    "verifier": true
  },
  "models": {
    "profile": "balanced"
  }
}
```

---

## 总结

WTDD 提供了一个完整的**规范驱动开发框架**，通过分层规划、并行执行、自动偏差处理和全面的质量保证，帮助独立开发者与 AI 助手高效协作完成复杂项目。

其核心优势在于：
1. **结构化但不僵化** - 有清晰的流程但允许灵活调整
2. **自动化优先** - 尽可能自动化，仅在必要时人工介入
3. **上下文管理** - 精心设计的上下文预算和检查点机制
4. **质量保证** - 内置验证、审计和跨 AI 评审
5. **可追踪性** - 完整的项目历史、决策记录和工件归档
