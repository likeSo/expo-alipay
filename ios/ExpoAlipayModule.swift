import ExpoModulesCore
import AlipaySDK

public class ExpoAlipayModule: Module {
    static var moduleInstance: ExpoAlipayModule?
    
  public func definition() -> ModuleDefinition {
      Name("ExpoAlipay")
      
      
      Events("onPayResult", "onAuthResult", "onLog")
      
      OnCreate {
          Self.moduleInstance = self
      }
      
      AsyncFunction("setSandboxMode") { (mode: String) in
          return true
      }
      
      AsyncFunction("registerApp") { (appId: String) in
          return true
      }
      
      AsyncFunction("pay") { (options: PayOptions, promise: Promise) in
          AlipaySDK.defaultService()
              .payOrder(options.orderInfo,
                        fromScheme: options.scheme ?? "",
                        fromUniversalLink: options.universalLink) { result in
                  let resultDict = (result as? [String: Any]) ?? [:]
                  promise.resolve(resultDict)
                  // H5 支付场景：回调会被调用，发送事件
                  // App 支付场景：回调不会被调用，通过 AppLifecycleDelegate 发送事件
                  self.sendEvent("onPayResult", resultDict)
              }
      }
      
      AsyncFunction("auth") { (options: AuthOptions, promise: Promise) in
          AlipaySDK.defaultService()
              .auth_V2(withInfo: options.authInfo,
                       fromScheme: options.scheme ?? "") { result in
                  let resultDict = (result as? [String: Any]) ?? [:]
                  promise.resolve(resultDict)
                  // H5 授权场景：回调会被调用，发送事件
                  // App 授权场景：回调不会被调用，通过 AppLifecycleDelegate 发送事件
                  self.sendEvent("onAuthResult", resultDict)
              }
      }
      
      AsyncFunction("getVersion") {
          return AlipaySDK.defaultService().currentVersion()
      }
      
      AsyncFunction("startLog") {
          AlipaySDK.startLog { [weak self] log in
              let logMessage = String(describing: log)
              self?.sendEvent("onLog", [
                  "message": logMessage,
                  "timestamp": Date().timeIntervalSince1970 * 1000
              ])
          }
      }
      
      AsyncFunction("stopLog") {
          AlipaySDK.stopLog()
      }
  }
}
