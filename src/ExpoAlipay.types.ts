
/*

  回调结果现在还没有做类型支持，但是以下两个例子也许能够帮到你
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
 
 
 resultStatus=9000
      memo="处理成功"
      result="success=true&auth_code=d9d1b5acc26e461dbfcb6974c8ff5E64&result_code=200"

*/

export type ExpoAlipayModuleEvents = {
  onPayResult: (params: any) => void;
  onAuthResult: (params: any) => void;
};

export type PayResultEventPayload = {

};

export type AuthResultEventPayload = {

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