import { NativeModule, requireNativeModule } from 'expo';

import { ExpoAlipayModuleEvents } from './ExpoAlipay.types';

declare class ExpoAlipayModule extends NativeModule<ExpoAlipayModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAlipayModule>('ExpoAlipay');
