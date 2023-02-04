# Adding Capacitor

1. Use `flake.nix` to get a development environment (run `nix develop`)
2. `yarn add @capacitor/core @capacitor/android`
3. `yarn add -D @capacitor/cli`
4. `npx cap init`
5. Choose packageId as `com.arvindpunk.android_0x`, incrementing X as required  
> NOTE: Package/Application ID CANNOT be changed once published.
6. `npx cap add android`
7. Use `npx cap sync` to update native code.

The last step is the only step you need to repeat once project initialization is done.

# Building Debug APK

1. `nix develop` to spawn a shell with all necessary build dependencies
2. `cd android` and `./gradlew assembleDebug`
3. Output should be in `./android/app/build/outputs/apk/debug/app-debug.apk`