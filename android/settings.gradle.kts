
rootProject.name = "Lumina Glass UI"

include(":app")
include(":capacitor-android")
include(":capacitor-cordova-android-plugins")

project(":capacitor-android").projectDir = File("../node_modules/@capacitor/android/capacitor")
project(":capacitor-cordova-android-plugins").projectDir = File("capacitor-cordova-android-plugins")

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
    }
}
