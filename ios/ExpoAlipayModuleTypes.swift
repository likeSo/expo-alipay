//
//  ExpoAlipayModuleTypes.swift
//  ExpoAlipay
//
//  Created by Aron on 2025/7/26.
//

import Foundation
import ExpoModulesCore


struct PayOptions: Record {
    @Field
    var orderInfo: String = ""
    @Field
    var scheme: String?
    @Field
    var universalLink: String?
}

struct AuthOptions: Record {
    @Field
    var authInfo: String = ""
    @Field
    var scheme: String?
    @Field
    var universalLink: String?
}