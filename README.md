# expo-alipay

支付宝支付与授权登录。React Native Alipay support.

# 安装

```shell
npx expo install expo-alikit
```
为什么是`expo-alikit`？因为`expo-alipay`的名字在npm中已经被占用，但后者看起来只是一个demo项目，目前我正在尝试联系作者，看看是否可以让他删掉那个仓库。
目前为止，用户可能会在alikit和alipay之间产生歧义，只需要记住，alikit只是npm的包名，其他代码相关的地方保持不变。

# 配置

支付宝支付和授权登录，由于会涉及到唤起支付宝，跳回你的app，为了让支付宝能识别你的app，你需要配置URL Scheme或者 Universal Link。
配置这两项，都需要在`app.json`中进行：

```json
"ios": {
    "scheme": [
        "你的url scheme，需要与支付宝后台保持一致。"
    ],
    "associatedDomains": [
        "applinks:example.com"
    ]
}
```

通用连接配置部分可以参考一下[苹果官方文档](https://developer.apple.com/documentation/xcode/supporting-associated-domains)。

# 使用

> 注意，不支持在expo go中直接使用，请配合`expo-dev-client`一起使用。

```ts
import ExpoAlipay from "expo-alikit";
import type { PayResultEventPayload, AuthResultEventPayload, LogEventPayload } from "expo-alikit";
```

## 支付

```ts

/// 安卓Only，防黑产操作，推荐在调用支付前调用此方法。
/// https://opendocs.alipay.com/open/00dn75?pathHash=22ed0058#%E5%95%86%E6%88%B7appId%E6%B3%A8%E5%86%8C
await ExpoAlipay.registerApp(appId)

/// scheme和universalLink需要与app.json中的配置保持一致，仅iOS上需要提供这两个字段。
const result = await ExpoAlipay.pay({
  orderInfo: "orderString",
  scheme: undefined,
  universalLink: undefined,
});
```

获取支付结果有两种办法。对于安卓平台，`pay`方法会直接返回支付结果，同时也会发布一条`onPayResult`事件。对于iOS平台，你只能通过`onPayResult`事件来获取支付结果。

## 授权登录

```ts
/// scheme和universalLink需要与app.json中的配置保持一致，仅iOS上需要提供这两个字段。
const result = await ExpoAlipay.auth({
  authInfo: "authString",
  scheme: undefined,
  universalLink: undefined,
});
```

获取支付结果有两种办法。对于安卓平台，`auth`方法会直接返回支付结果，同时也会发布一条`onAuthResult`事件。对于iOS平台，你只能通过`onAuthResult`事件来获取支付结果。

## 事件监听

```ts
import ExpoAlipay from "expo-alikit";
import { useEvent } from "expo";

// 监听支付结果
const onPayResultPayload = useEvent(ExpoAlipay, 'onPayResult');

// 监听授权结果
const onAuthResultPayload = useEvent(ExpoAlipay, 'onAuthResult');

// 监听支付宝 SDK 日志（iOS Only）
const onLogPayload = useEvent(ExpoAlipay, 'onLog');
console.log('Alipay Log:', onLogPayload?.message);
```

你也可以用 `ExpoAlipay.addListener()` 语法：

```ts
// 监听支付结果
const subscription = ExpoAlipay.addListener('onPayResult', (payload) => {
  console.log('Pay Result:', payload);
});

// 取消监听
subscription.remove();
```

## 日志调试（iOS Only）

iOS 平台支持开启支付宝 SDK 日志，用于调试：

```ts
// 开始监听日志（建议仅在调试时使用）
await ExpoAlipay.startLog();

// 停止监听日志
await ExpoAlipay.stopLog();
```

日志会通过 `onLog` 事件发送到 JS 层，包含 `message` 和 `timestamp` 字段。

# 联系我

QQ 群：682911244

# Roadmap

- [x] 给支付宝返回数据添加类型。
- [x] iOS 日志转发到 JS 层。

# API 参考

## 方法

### `getVersion(): Promise<string>`

获取支付宝 SDK 版本号。

**支持平台**: iOS, Android

**返回值**: SDK 版本字符串

---

### `registerApp(appId: string): Promise<boolean>`

注册支付宝应用（Android 防黑产场景使用）。

**支持平台**: Android

**参数**:
- `appId`: 支付宝开放平台应用 ID

**返回值**: 是否注册成功

**参考**: [支付宝官方文档](https://opendocs.alipay.com/open/00dn75?pathHash=22ed0058#%E5%95%86%E6%88%B7appId%E6%B3%A8%E5%86%8C)

---

### `setSandboxMode(mode: 'sandbox' | 'online' | 'pre_sandbox'): Promise<void>`

设置沙箱模式（仅 Android）。

**支持平台**: Android

**参数**:
- `mode`: 环境模式
  - `'sandbox'`: 沙箱环境
  - `'online'`: 生产环境
  - `'pre_sandbox'`: 预发布环境

---

### `pay(options: PayOptions): Promise<any>`

发起支付宝支付。

**支持平台**: iOS, Android

**参数**:
- `options.orderInfo`: 订单信息字符串（由后端生成）
- `options.scheme`: iOS URL Scheme，需与 app.json 配置一致
- `options.universalLink`: iOS Universal Link，需与 app.json 配置一致

**返回值**:
- Android: 直接返回支付结果
- iOS: 通过 `onPayResult` 事件返回结果

**注意**: iOS 必须通过事件监听获取结果

---

### `auth(options: AuthOptions): Promise<any>`

发起支付宝授权登录。

**支持平台**: iOS, Android

**参数**:
- `options.authInfo`: 授权信息字符串（由后端生成）
- `options.scheme`: iOS URL Scheme，需与 app.json 配置一致
- `options.universalLink`: iOS Universal Link，需与 app.json 配置一致

**返回值**:
- Android: 直接返回授权结果
- iOS: 通过 `onAuthResult` 事件返回结果

**注意**: iOS 必须通过事件监听获取结果

---

### `startLog(): Promise<void>`

开启支付宝 SDK 日志（用于调试）。

**支持平台**: iOS（Android 为 no-op）

**说明**: 日志会通过 `onLog` 事件发送到 JS 层

---

### `stopLog(): Promise<void>`

关闭支付宝 SDK 日志。

**支持平台**: iOS（Android 为 no-op）

---

## 事件

### `onPayResult`

支付结果回调。

**Payload 类型**: `PayResultEventPayload`

```typescript
{
  resultStatus?: string;    // 结果状态码 (如 "9000" 表示成功)
  result_status?: string;   // 兼容字段
  result?: string;          // 结果详情（JSON 字符串）
  memo?: string;            // 提示信息
  [key: string]: any;       // 其他可能的字段
}
```

**常见 resultStatus**:
- `9000`: 订单支付成功
- `8000`: 正在处理中
- `4000`: 订单支付失败
- `5000`: 重复请求
- `6001`: 用户中途取消
- `6002`: 网络连接出错

---

### `onAuthResult`

授权结果回调。

**Payload 类型**: `AuthResultEventPayload`

```typescript
{
  resultStatus?: string;    // 结果状态码
  result_status?: string;   // 兼容字段
  result?: string;          // 授权结果（包含 auth_code）
  memo?: string;            // 提示信息
  [key: string]: any;       // 其他可能的字段
}
```

---

### `onLog`

支付宝 SDK 日志（iOS Only）。

**Payload 类型**: `LogEventPayload`

```typescript
{
  message: string;    // 日志内容
  timestamp: number;  // 时间戳（毫秒）
}
```

---

## 类型导出

```typescript
import type {
  PayOptions,
  AuthOptions,
  PayResultEventPayload,
  AuthResultEventPayload,
  LogEventPayload,
  ExpoAlipayModuleEvents
} from 'expo-alikit';
```

---

## 平台差异说明

| 功能 | iOS | Android | Web |
|------|-----|---------|-----|
| 支付 | ✅ 支持 | ✅ 支持 | ❌ 不支持 |
| 授权 | ✅ 支持 | ✅ 支持 | ❌ 不支持 |
| 获取版本 | ✅ 支持 | ✅ 支持 | ❌ 不支持 |
| 注册应用 | ❌ 无需 | ✅ 支持 | ❌ 不支持 |
| 沙箱模式 | ❌ 无需 | ✅ 支持 | ❌ 不支持 |
| SDK 日志 | ✅ 支持 | ⚠️ No-op | ❌ 不支持 |

---

## 相关链接

- [支付宝开放平台](https://open.alipay.com/)
- [支付宝 App 支付文档](https://opendocs.alipay.com/open/204/105051/)
- [Expo Modules 文档](https://docs.expo.dev/modules/overview/)
