import { useEvent } from 'expo';
import ExpoAlipay from 'expo-alipay';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const onPayResultPayload = useEvent(ExpoAlipay, 'onPayResult');
  const onAuthResultPayload = useEvent(ExpoAlipay, 'onAuthResult');
  const onLogPayload = useEvent(ExpoAlipay, 'onLog');

  const handlePay = async () => {
    try {
      // 先注册应用（Android 防黑产）
      await ExpoAlipay.registerApp('your-app-id');

      const result = await ExpoAlipay.pay({
        orderInfo: 'orderString',
        scheme: 'your-scheme',
        universalLink: undefined
      });
      console.log('Pay result:', result);
      Alert.alert('支付结果', JSON.stringify(result));
    } catch (error) {
      console.error('Pay error:', error);
      Alert.alert('支付错误', String(error));
    }
  };

  const handleAuth = async () => {
    try {
      const result = await ExpoAlipay.auth({
        authInfo: 'authString',
        scheme: 'your-scheme',
        universalLink: undefined
      });
      console.log('Auth result:', result);
      Alert.alert('授权结果', JSON.stringify(result));
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('授权错误', String(error));
    }
  };

  const handleStartLog = async () => {
    await ExpoAlipay.startLog();
    Alert.alert('日志', '已开始监听日志，请查看控制台');
  };

  const handleStopLog = async () => {
    await ExpoAlipay.stopLog();
    Alert.alert('日志', '已停止监听日志');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Alipay Example</Text>

        <Group name="支付功能">
          <Button title="发起支付" onPress={handlePay} />
          <View style={styles.spacing} />
          <Text>支付结果事件:</Text>
          <Text style={styles.code}>{JSON.stringify(onPayResultPayload, null, 2)}</Text>
        </Group>

        <Group name="授权登录">
          <Button title="发起授权" onPress={handleAuth} />
          <View style={styles.spacing} />
          <Text>授权结果事件:</Text>
          <Text style={styles.code}>{JSON.stringify(onAuthResultPayload, null, 2)}</Text>
        </Group>

        <Group name="日志调试 (iOS Only)">
          <Button title="开始日志" onPress={handleStartLog} />
          <View style={styles.spacing} />
          <Button title="停止日志" onPress={handleStopLog} />
          <View style={styles.spacing} />
          <Text>最新日志:</Text>
          <Text style={styles.code}>
            {onLogPayload ? `${new Date(onLogPayload.timestamp).toLocaleTimeString()}: ${onLogPayload.message}` : '暂无日志'}
          </Text>
        </Group>

        <Group name="其他方法">
          <Button
            title="获取 SDK 版本"
            onPress={async () => {
              const version = await ExpoAlipay.getVersion();
              Alert.alert('SDK 版本', version);
            }}
          />
          <View style={styles.spacing} />
          <Button
            title="设置沙箱模式 (Android)"
            onPress={async () => {
              await ExpoAlipay.setSandboxMode('sandbox');
              Alert.alert('模式设置', '已切换到沙箱模式');
            }}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold',
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  spacing: {
    height: 10,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
