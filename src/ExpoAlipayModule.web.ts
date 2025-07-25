import { registerWebModule, NativeModule } from 'expo';

import { ExpoAlipayModuleEvents } from './ExpoAlipay.types';

class ExpoAlipayModule extends NativeModule<ExpoAlipayModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoAlipayModule, 'ExpoAlipayModule');
