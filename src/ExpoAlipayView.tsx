import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoAlipayViewProps } from './ExpoAlipay.types';

const NativeView: React.ComponentType<ExpoAlipayViewProps> =
  requireNativeView('ExpoAlipay');

export default function ExpoAlipayView(props: ExpoAlipayViewProps) {
  return <NativeView {...props} />;
}
