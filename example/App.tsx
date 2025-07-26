import { useEvent } from 'expo';
import ExpoAlipay from 'expo-alipay';
import { Alert, Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const onPayResultPayload = useEvent(ExpoAlipay, 'onPayResult');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Async functions">
          <Button
            title="支付"
            onPress={async () => {
              const result = await ExpoAlipay.pay({
                orderInfo: 'orderString',
                scheme: undefined,
                universalLink: undefined
              });
              console.log(result);
            }}
          />
        </Group>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
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

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
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
  view: {
    flex: 1,
    height: 200,
  },
};
