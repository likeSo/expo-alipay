//
//  AppLifecycleDelegate.swift
//  ExpoAlipay
//
//  Created by Aron on 2025/7/26.
//

import Foundation
import ExpoModulesCore
import AlipaySDK

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
        if url.host == "safepay" {
            AlipaySDK.defaultService().processOrder(withPaymentResult: url) { result in
                ExpoAlipayModule.moduleInstance?.sendEvent("onPayResult", (result as? [String: Any]) ?? [:])
            }
        } else if url.host == "oauth" {
            AlipaySDK.defaultService().processAuth_V2Result(url) { result in
                ExpoAlipayModule.moduleInstance?.sendEvent("onAuthResult", (result as? [String: Any]) ?? [:])
            }
        }
        return true
    }
    
    public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if url.host == "safepay" {
            AlipaySDK.defaultService().processOrder(withPaymentResult: url) { result in
                ExpoAlipayModule.moduleInstance?.sendEvent("onPayResult", (result as? [String: Any]) ?? [:])
            }
        } else if url.host == "oauth" {
            AlipaySDK.defaultService().processAuth_V2Result(url) { result in
                ExpoAlipayModule.moduleInstance?.sendEvent("onAuthResult", (result as? [String: Any]) ?? [:])
            }
        }
        return true
    }
}
