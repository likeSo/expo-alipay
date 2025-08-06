import ExpoModulesCore
import AlipaySDK

public class ExpoAlipayModule: Module {
    static var moduleInstance: ExpoAlipayModule?
    
  public func definition() -> ModuleDefinition {
      Name("ExpoAlipay")
      
      
      Events("onPayResult", "onAuthResult")
      
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
                  promise.resolve(result)
              }
      }
      
      AsyncFunction("auth") { (options: AuthOptions, promise: Promise) in
          AlipaySDK.defaultService()
          AlipaySDK.defaultService()
              .auth_V2(withInfo: options.authInfo,
                       fromScheme: options.scheme ?? "") { result in
                  promise.resolve(result)
              }
      }
      
      AsyncFunction("getVersion") {
          return AlipaySDK.defaultService().currentVersion()
      }
      
      AsyncFunction("startLog") {
          AlipaySDK.startLog { log in
              print("ExpoAlipayModule：\(String(describing: log))")
          }
      }
      
      AsyncFunction("stopLog") {
          AlipaySDK.stopLog()
      }
  }
}
