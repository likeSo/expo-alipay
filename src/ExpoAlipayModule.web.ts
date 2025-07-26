import { registerWebModule, NativeModule } from 'expo';

import { ExpoAlipayModuleEvents } from './ExpoAlipay.types';

class ExpoAlipayModule extends NativeModule<ExpoAlipayModuleEvents> {
  
}

export default registerWebModule(ExpoAlipayModule, 'ExpoAlipayModule');
