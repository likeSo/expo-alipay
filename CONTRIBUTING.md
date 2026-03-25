# Contributing to expo-alipay

感谢你对 expo-alipay 的兴趣！我们欢迎所有形式的贡献。

## 开发环境设置

1. Fork 并克隆仓库

```bash
git clone https://github.com/your-username/expo-alipay.git
cd expo-alipay
```

2. 安装依赖

```bash
npm install
```

3. 进入 example 目录并安装依赖

```bash
cd example
npm install
```

## 项目结构

```
expo-alipay/
├── android/                    # Android 原生代码
│   └── src/main/java/...
├── ios/                        # iOS 原生代码
│   └── ExpoAlipayModule.swift
├── src/                        # TypeScript 代码
│   ├── ExpoAlipay.types.ts     # 类型定义
│   ├── ExpoAlipayModule.ts     # 原生模块
│   └── ExpoAlipayModule.web.ts # Web 实现
├── example/                    # 示例应用
│   ├── App.tsx                 # 示例代码
│   ├── ios/                    # iOS 示例项目
│   └── android/                # Android 示例项目
└── README.md                   # 文档
```

## 开发流程

### iOS 开发

1. 打开 iOS 示例项目

```bash
npm run open:ios
```

2. 在 Xcode 中修改 `ios/ExpoAlipayModule.swift`

3. 运行示例应用测试

### Android 开发

1. 打开 Android 示例项目

```bash
npm run open:android
```

2. 在 Android Studio 中修改 `android/src/main/java/...`

3. 运行示例应用测试

### TypeScript 开发

修改 `src/` 目录下的文件，确保：

1. 类型定义完整
2. 导出正确的类型
3. Web 平台提供合理的降级方案

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建过程或辅助工具的变动

示例：

```
feat: 添加支付宝授权登录功能
fix: 修复 iOS 支付回调不触发的问题
docs: 更新 API 文档
```

## 发布流程

维护者使用以下流程发布新版本：

1. 更新 `package.json` 版本号
2. 更新 `CHANGELOG.md`
3. 提交并打标签
4. 发布到 npm

```bash
npm version patch  # 或 minor/major
npm publish
```

## 问题报告

报告问题时，请包含：

1. 使用的 expo-alipay 版本
2. Expo SDK 版本
3. React Native 版本
4. 平台（iOS/Android）及版本
5. 详细的错误信息
6. 复现步骤

## 安全漏洞

如果你发现了安全漏洞，请通过邮件私下报告：

[请填写维护者邮箱]

不要公开披露安全问题。

## 行为准则

- 友善和尊重
- 欢迎新手
- 专注于建设性讨论
- 尊重不同观点

感谢你的贡献！
