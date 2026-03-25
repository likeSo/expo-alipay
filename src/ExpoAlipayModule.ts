import { NativeModule, requireNativeModule } from 'expo';

import { AuthOptions, ExpoAlipayModuleEvents, PayOptions } from './ExpoAlipay.types';

declare class ExpoAlipayModule extends NativeModule<ExpoAlipayModuleEvents> {
  /**
   * 获取支付宝 SDK 版本号。
   */
  getVersion(): Promise<string>;

  /**
   * 注册支付宝应用（Android 防黑产场景使用）。
   * @param appId 支付宝开放平台应用 ID。
   */
  registerApp(appId: string): Promise<boolean>;

  /**
   * 设置沙箱模式（仅 Android）。
   * @param mode "sandbox" | "online" | "pre_sandbox"
   */
  setSandboxMode(mode: 'sandbox' | 'online' | 'pre_sandbox'): Promise<void>;

  /**
   * 支付宝支付。
   * @param options 支付参数。
   * @returns 支付调用结果。
   */
  pay(options: PayOptions): Promise<any>;

  /**
   * 支付宝授权登录。
   * @param options 授权参数。
   * @returns 授权调用结果。
   */
  auth(options: AuthOptions): Promise<any>;

  /**
   * 开启支付宝 SDK 日志（仅 iOS）。
   */
  startLog(): Promise<void>;

  /**
   * 关闭支付宝 SDK 日志（仅 iOS）。
   */
  stopLog(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAlipayModule>('ExpoAlipay');
