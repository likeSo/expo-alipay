import { registerWebModule, NativeModule } from 'expo';
import { ExpoAlipayModuleEvents } from './ExpoAlipay.types';

class ExpoAlipayWebModule extends NativeModule<ExpoAlipayModuleEvents> {
  async getVersion(): Promise<string> {
    throw new Error('ExpoAlipay: Web platform is not supported. Please use native iOS or Android.');
  }

  async registerApp(appId: string): Promise<boolean> {
    throw new Error('ExpoAlipay: Web platform is not supported. Please use native iOS or Android.');
  }

  async setSandboxMode(mode: 'sandbox' | 'online' | 'pre_sandbox'): Promise<void> {
    throw new Error('ExpoAlipay: Web platform is not supported. Please use native iOS or Android.');
  }

  async pay(options: any): Promise<any> {
    throw new Error('ExpoAlipay: Web platform is not supported. Please use native iOS or Android.');
  }

  async auth(options: any): Promise<any> {
    throw new Error('ExpoAlipay: Web platform is not supported. Please use native iOS or Android.');
  }

  async startLog(): Promise<void> {
    throw new Error('ExpoAlipay: startLog is not supported on Web platform.');
  }

  async stopLog(): Promise<void> {
    throw new Error('ExpoAlipay: stopLog is not supported on Web platform.');
  }
}

export default registerWebModule(ExpoAlipayWebModule, 'ExpoAlipay');
