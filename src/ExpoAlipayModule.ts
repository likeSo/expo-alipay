import { NativeModule, requireNativeModule } from 'expo';

import { AuthOptions, ExpoAlipayModuleEvents, PayOptions } from './ExpoAlipay.types';

declare class ExpoAlipayModule extends NativeModule<ExpoAlipayModuleEvents> {

  getVersion(): Promise<string>

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
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAlipayModule>('ExpoAlipay');
