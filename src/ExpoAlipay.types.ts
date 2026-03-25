
/*

  支付结果例子
 {
     "memo" : "xxxxx",
     "result" : "{
                     \"alipay_trade_app_pay_response\":{
                         \"code\":\"10000\",
                         \"msg\":\"Success\",
                         \"app_id\":\"2014072300007148\",
                         \"out_trade_no\":\"081622560194853\",
                         \"trade_no\":\"2016081621001004400236957647\",
                         \"total_amount\":\"9.00\",
                         \"seller_id\":\"2088702849871851\",
                         \"charset\":\"utf-8\",
                         \"timestamp\":\"2016-10-11 17:43:36\"
                     },
                     \"sign\":\"NGfStJf3i3ooWBuCDIQSumOpaGBcQz+aoAqyGh3W6EqA/gmyPYwLJ2REFijY9XPTApI9YglZyMw+ZMhd3kb0mh4RAXMrb6mekX4Zu8Nf6geOwIa9kLOnw0IMCjxi4abDIfXhxrXyj********\",
                     \"sign_type\":\"RSA2\"
                 }",
     "resultStatus" : "9000"
 }
 
 登录结果例子
 resultStatus=9000
      memo="处理成功"
      result="success=true&auth_code=d9d1b5acc26e461dbfcb6974c8ff5E64&result_code=200"

*/

export type PayResultEventPayload = {
  resultStatus?: string;
  result_status?: string;
  result?: string;
  memo?: string;
  [key: string]: any;
};

export type AuthResultEventPayload = {
  resultStatus?: string;
  result_status?: string;
  result?: string;
  memo?: string;
  [key: string]: any;
};

export type LogEventPayload = {
  message: string;
  timestamp: number;
};

export type ExpoAlipayModuleEvents = {
  onPayResult: (params: PayResultEventPayload) => void;
  onAuthResult: (params: AuthResultEventPayload) => void;
  onLog: (params: LogEventPayload) => void;
};

export type PayOptions = {
  orderInfo: string;
  scheme: string | null | undefined;
  universalLink: string | null | undefined;
};

export type AuthOptions = {
  authInfo: string;
  scheme: string | null | undefined;
  universalLink: string | null | undefined;
};