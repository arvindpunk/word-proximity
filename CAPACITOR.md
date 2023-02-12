# Adding Capacitor

1. Use `flake.nix` to get a development environment (run `nix develop`)
2. `yarn add @capacitor/core @capacitor/android`
3. `yarn add -D @capacitor/cli`
4. `npx cap init`
5. Choose packageId as `dev.arvindpunk.android_0x`, incrementing X as required  
> NOTE: Package/Application ID CANNOT be changed once published.
6. `npx cap add android`
7. Use `npx cap sync` to update native code.

The last step is the only step you need to repeat once project initialization is done.

# Building Debug APK

1. `nix develop` to spawn a shell with all necessary build dependencies
2. `cd android` and `./gradlew assembleDebug`
3. Output should be in `./android/app/build/outputs/apk/debug/app-debug.apk`

# Generating Key Store
1. `keytool -genkey -alias uploadKey -keyalg RSA -keypass password -storepass password -keystore ./keystore/keystore.jks -validity 9999`
2. Update `android/app/build.gradle` with following:
```
// Create a variable called keystorePropertiesFile, and initialize it to your
// keystore.properties file, in the rootProject folder.
def keystorePropertiesFile = rootProject.file("../keystore/keystore.properties")

// Initialize a new Properties() object called keystoreProperties.
def keystoreProperties = new Properties()

// Load your keystore.properties file into the keystoreProperties object.
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    
    ...


    buildTypes {
        release {
            minifyEnabled true
            signingConfig signingConfigs.release
    ...
```
3. Create a file `keystore/keystore.properties` with the following data:
```
storePassword=password
keyPassword=password
keyAlias=uploadKey
storeFile=keystore.jks
```

4. Verify 
`jarsigner -verify android/app/build/outputs/bundle/release/app-release.aab`