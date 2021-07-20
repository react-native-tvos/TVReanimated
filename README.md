### TVReanimated

This is a demo project that allows the examples from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) to run on Apple TV and Android TV using the [react-native-tvos](https://github.com/react-native-tvos/react-native-tvos) fork of React Native.

The project includes small patches needed for `react-native-screens`, `react-native-reanimated`, and `react-native-svg` to build and run on Apple TV.

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
