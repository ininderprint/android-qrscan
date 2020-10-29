package com.yinyin.app;

import android.app.Application;
import android.content.Context;

import androidx.multidex.MultiDexApplication;
import androidx.multidex.MultiDex;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

// bugly
import com.tencent.bugly.crashreport.CrashReport;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new ReactNativeContacts());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // bugly
    CrashReport.initCrashReport(getApplicationContext(), "43fb275467", false);
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  // private static void initializeFlipper(
  //     Context context, ReactInstanceManager reactInstanceManager) {
  //   if (BuildConfig.DEBUG) {
  //     try {
  //       /*
  //         We use reflection here to pick up the class that initializes Flipper,
  //         since Flipper library is not available in release mode
  //       */
  //       Class<?> aClass = Class.forName("cc.mengti.workapp.ReactNativeFlipper");
  //       aClass
  //           .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
  //           .invoke(null, context, reactInstanceManager);
  //     } catch (ClassNotFoundException e) {
  //       e.printStackTrace();
  //     } catch (NoSuchMethodException e) {
  //       e.printStackTrace();
  //     } catch (IllegalAccessException e) {
  //       e.printStackTrace();
  //     } catch (InvocationTargetException e) {
  //       e.printStackTrace();
  //     }
  //   }
  // }

}
