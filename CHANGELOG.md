# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-03-25

版本号升级、修改项目描述。

## [0.1.1] - 2026-03-25

### Added
- 完善 TypeScript 类型定义，支持 `PayResultEventPayload` 和 `AuthResultEventPayload`
- 添加 `[key: string]: any` 索引签名，应对未来支付宝返回字段变化
- 新增 iOS 日志事件 `onLog`，支持将支付宝 SDK 日志转发到 JS 层
- 新增 `startLog` 和 `stopLog` 方法（iOS 可用，Android 为 no-op）
- Web 平台提供友好的错误提示

### Changed
- 优化示例应用，展示完整功能（支付、授权、日志、版本获取等）
- 更新文档，添加完整 API 参考和使用示例

### Fixed
- 修复示例应用中未定义变量的问题

## [0.1.0] - 2026-03-24

### Added
- 支付宝支付功能（iOS & Android）
- 支付宝授权登录功能（iOS & Android）
- 支持 iOS URL Scheme 和 Universal Link
- 支持 Android 防黑产 `registerApp` 方法
- 支持 Android 沙箱模式切换
- 基础事件监听机制（`onPayResult`, `onAuthResult`）
- 获取支付宝 SDK 版本号
