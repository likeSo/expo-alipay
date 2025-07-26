package expo.modules.alipay

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class PayOptions: Record {
    @Field
    var orderInfo: String = ""
    @Field
    var scheme: String? = null
    @Field
    var universalLink: String? = null
}

class AuthOptions: Record {
    @Field
    var authInfo: String = ""
    @Field
    var scheme: String? = null
    @Field
    var universalLink: String? = null
}
