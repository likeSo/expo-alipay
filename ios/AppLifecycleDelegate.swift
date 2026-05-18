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
        return handleOpenURL(url)
    }
    
    public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return handleOpenURL(url)
    }

    public func application(_ application: UIApplication,
                            continue userActivity: NSUserActivity,
                            restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return AFServiceCenter.handleOpenUniversalLink(userActivity) { result in
            self.emitPayResult(result)
        }
    }

    private func handleOpenURL(_ url: URL) -> Bool {
        if url.host == "safepay" {
            AlipaySDK.defaultService().processOrder(withPaymentResult: url) { result in
                self.emitPayResult(result)
            }
            return true
        }
        if url.host == "oauth" {
            AlipaySDK.defaultService().processAuth_V2Result(url) { result in
                self.emitAuthResult(result)
            }
            return true
        }
        return false
    }

    private func emitPayResult(_ result: Any?) {
        ExpoAlipayModule.moduleInstance?.sendEvent("onPayResult", (result as? [String: Any]) ?? [:])
    }

    private func emitAuthResult(_ result: Any?) {
        ExpoAlipayModule.moduleInstance?.sendEvent("onAuthResult", (result as? [String: Any]) ?? [:])
    }
}
