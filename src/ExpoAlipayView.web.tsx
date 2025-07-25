import * as React from 'react';

import { ExpoAlipayViewProps } from './ExpoAlipay.types';

export default function ExpoAlipayView(props: ExpoAlipayViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
