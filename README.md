### TVReanimated

This is a demo project that allows the examples from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) to run on Apple TV and Android TV using the [react-native-tvos](https://github.com/react-native-tvos/react-native-tvos) fork of React Native.

The project includes small patches needed for `react-native-screens`, `react-native-reanimated`, and `react-native-svg` to build and run on Apple TV.

The navigation menus have been modified to display better on TV.  Also, for TV platforms, only demos that work on TV (i.e. don't require touchscreen gestures) are shown in the navigation screens.

Getting started:

```bash
# Installation
git clone https://github.com/react-native-tvos/TVReanimated
cd TVReanimated
yarn
cd ios
pod install
cd ..
# iOS
react-native run-ios
# Apple TV
react-native run-ios --scheme="TVReanimated-tvOS" --simulator="Apple TV"
# Android (either phone or TV simulator or device already running and connected)
react-native run-android
```



https://user-images.githubusercontent.com/6577821/126576737-9b48fcb8-b27e-4419-be9a-5b3bae1c405e.mov



https://user-images.githubusercontent.com/6577821/126576764-e1b58073-9013-449c-9dbc-8cdd32e3f995.mov

