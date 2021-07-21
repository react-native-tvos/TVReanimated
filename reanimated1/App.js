import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';

import ChatHeads from './chatHeads';
import Code from './code';
import Colors from './colors';
import DifferentSpringConfigs from './differentSpringConfigs';
import ImageViewer from './imageViewer';
import Imperative from './imperative';
import InteractablePlayground, {
  SCREENS as INTERACTABLE_SCREENS,
} from './interactablePlayground';
import PanRotateAndZoom from './PanRotateAndZoom';
import ProgressBar from './progressBar';
import Rotations from './rotations';
import Snappable from './snappable';
import Interpolate from './src/interpolate';
import StartAPI from './startAPI';
import Test from './test';
import TransitionsProgress from './transitions/progress';
import TransitionsSequence from './transitions/sequence';
import TransitionsShuffle from './transitions/shuffle';
import TransitionsTicket from './transitions/ticket';
import WidthAndHeight from './widthAndHeight';

LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
// refers to bug in React Navigation which should be fixed soon
// https://github.com/react-navigation/react-navigation/issues/3956

const SCREENS = {
  Snappable: { screen: Snappable, title: 'Snappable' , tv: false },
  Test: { screen: Test, title: 'Test' , tv: true },
  ImageViewer: { screen: ImageViewer, title: 'Image Viewer' , tv: false },
  Interactable: { screen: InteractablePlayground, title: 'Interactable' , tv: true },
  Interpolate: { screen: Interpolate, title: 'Interpolate' , tv: true },
  Colors: { screen: Colors, title: 'Colors' , tv: false },
  StartAPI: { screen: StartAPI, title: 'Start API' , tv: false },
  chatHeads: { screen: ChatHeads, title: 'Chat heads (iOS only)' , tv: false },
  code: { screen: Code, title: 'Animated.Code component' , tv: false },
  width: { screen: WidthAndHeight, title: 'width & height & more' , tv: false },
  rotations: { screen: Rotations, title: 'rotations (concat node)' , tv: false },
  imperative: {
    screen: Imperative,
    title: 'imperative (set value / toggle visibility)',
    tv: false,
  },
  panRotateAndZoom: {
    screen: PanRotateAndZoom,
    title: 'Pan, rotate and zoom (via native event function)',
    tv: false,
  },
  progressBar: {
    screen: ProgressBar,
    title: 'Progress bar',
    tv: false,
  },
  differentSpringConfigs: {
    screen: DifferentSpringConfigs,
    title: 'Different Spring Configs',
    tv: false,
  },
  transitionsSequence: {
    screen: TransitionsSequence,
    title: 'Transitions sequence',
    tv: false,
  },
  transitionsShuffle: {
    screen: TransitionsShuffle,
    title: 'Transitions shuffle',
    tv: false,
  },
  transitionsProgress: {
    screen: TransitionsProgress,
    title: 'Transitions progress bar',
    tv: false,
  },
  transitionsTicket: {
    screen: TransitionsTicket,
    title: 'Transitions – flight ticket demo',
    tv: false,
  },
};

const SCREEN_KEYS = Object.keys(SCREENS).filter((key) => SCREENS[key].tv || !Platform.isTV);

class MainScreen extends React.Component {
  static navigationOptions = {
    title: '👵 Reanimated 1.x Examples',
  };

  render() {
    const data = SCREEN_KEYS.map((key) => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
        renderScrollComponent={(props) => <ScrollView {...props} />}
        ListFooterComponent={() => (
          <LaunchReanimated2 setUseRea2={this.props.setUseRea2} />
        )}
      />
    );
  }
}

function LaunchReanimated2({ setUseRea2 }) {
  return (
    <>
      <ItemSeparator />
      <TouchableOpacity style={styles.button} onPress={() => setUseRea2?.(true)}>
        <Text style={styles.buttonText}>🎬 Reanimated 2.x Examples</Text>
      </TouchableOpacity>
    </>
  );
}

const ItemSeparator = () => <View style={styles.separator} />;

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const { key } = this.props.item;
    return (
      <TouchableOpacity style={styles.button} onPress={this._onPress}>
        <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
      </TouchableOpacity>
    );
  }
}

const Stack = createStackNavigator();

const Navigator = (setUseRea2) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{ title: '👵 Reanimated 1.x Examples' }}
      children={(props) => <MainScreen {...props} setUseRea2={setUseRea2} />}
    />
    {SCREEN_KEYS.map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={{ title: SCREENS[name].title || name }}
      />
    ))}
    {Object.keys(INTERACTABLE_SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => INTERACTABLE_SCREENS[name].screen}
        options={{ title: INTERACTABLE_SCREENS[name].title || name }}
      />
    ))}
  </Stack.Navigator>
);

export default Navigator;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
