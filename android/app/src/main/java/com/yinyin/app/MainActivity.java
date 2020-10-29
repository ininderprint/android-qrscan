package com.yinyin.app;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
// react navigation
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.soloader.SoLoader;

// react-native-oriention-locker
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
   */
    @Override
    protected String getMainComponentName() {
        return "app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SoLoader.init(this, false);
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    /**
     * react oriention locker add
     */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    /**
     * react navigation add
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
    
}
