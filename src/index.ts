// Reexport the native module. On web, it will be resolved to ExpoAlipayModule.web.ts
// and on native platforms to ExpoAlipayModule.ts
export { default } from './ExpoAlipayModule';
export { default as ExpoAlipayView } from './ExpoAlipayView';
export * from  './ExpoAlipay.types';
