package expo.modules.alipay

import android.util.Log
import com.alipay.sdk.app.AlipayApi
import com.alipay.sdk.app.AuthTask
import com.alipay.sdk.app.EnvUtils
import com.alipay.sdk.app.PayTask
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoAlipayModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoAlipay")

        Events("onPayResult", "onAuthResult")

        AsyncFunction("registerApp") { appId: String ->
            appContext.reactContext.let {
                AlipayApi.registerApp(it, appId)
            }
        }

        AsyncFunction("getVersion") {
            val payTask = PayTask(appContext.currentActivity)
            return@AsyncFunction payTask.version
        }

        AsyncFunction("setSandboxMode") { mode: String ->

            when (mode) {
                "sandbox" -> {
                    EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX)
                }

                "online" -> {
                    EnvUtils.setEnv(EnvUtils.EnvEnum.ONLINE)
                }

                "pre_sandbox" -> {
                    EnvUtils.setEnv(EnvUtils.EnvEnum.PRE_SANDBOX)
                }
            }
        }

        AsyncFunction("auth") { options: AuthOptions, promise: Promise ->
            val runnable = Runnable {
                val alipay = AuthTask(appContext.currentActivity)
                val result = alipay.authV2(options.authInfo, true)
                promise.resolve(result)
                sendEvent("onAuthResult", result)
            }
            Thread(runnable).start()
        }

        AsyncFunction("pay") { options: PayOptions, promise: Promise ->
            val runnable = Runnable {
                val alipay = PayTask(appContext.currentActivity)
                val result = alipay.payV2(options.orderInfo, true)
                promise.resolve(result)
                sendEvent("onPayResult", result)
            }

            Thread(runnable).start()
        }


        AsyncFunction("startLog") {

        }
    }
}
