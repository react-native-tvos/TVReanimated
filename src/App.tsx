import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVEventControl,
  View,
  LogBox,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';

import 'react-native/tvos-types.d';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Reanimated1 from '../reanimated1/App';

import ExtrapolationExample from './ExtrapolationExample';
import AnimatedStyleUpdateExample from './AnimatedStyleUpdateExample';
import WobbleExample from './WobbleExample';
import DragAndSnapExample from './DragAndSnapExample';
import ScrollEventExample from './ScrollEventExample';
import ChatHeadsExample from './ChatHeadsExample';
import MeasureExample from './MeasureExample';
import SwipeableListExample from './SwipeableListExample';
import ScrollableViewExample from './ScrollableViewExample';
import ScrollToExample from './ScrollToExample';
import AnimatedTabBarExample from './AnimatedTabBarExample';
import LightboxExample from './LightboxExample';
import LiquidSwipe from './LiquidSwipe';
import ScrollExample from './AnimatedScrollExample';
LogBox.ignoreLogs(['Calling `getNode()`']);

type Screens = Record<
  string,
  {screen: React.ComponentType; title?: string; tv?: boolean}
>;

const SCREENS: Screens = {
  AnimatedStyleUpdate: {
    screen: AnimatedStyleUpdateExample,
    title: '🆕 Animated Style Update',
    tv: true,
  },
  WobbleExample: {
    screen: WobbleExample,
    title: '🆕 Animation Modifiers (Wobble Effect)',
    tv: true,
  },
  DragAndSnapExample: {
    screen: DragAndSnapExample,
    title: '🆕 Drag and Snap',
    tv: false,
  },
  MeasureExample: {
    screen: MeasureExample,
    title: '🆕 Synchronous Measure',
    tv: true,
  },
  ScrollEventExample: {
    screen: ScrollEventExample,
    title: '🆕 Scroll Events',
    tv: false,
  },
  ChatHeadsExample: {
    screen: ChatHeadsExample,
    title: '🆕 Chat Heads',
    tv: false,
  },
  ScrollableToExample: {
    screen: ScrollToExample,
    title: '🆕 scrollTo',
    tv: true,
  },
  SwipeableListExample: {
    screen: SwipeableListExample,
    title: '🆕 (advanced) Swipeable List',
    tv: false,
  },
  LightboxExample: {
    screen: LightboxExample,
    title: '🆕 (advanced) Lightbox',
    tv: true,
  },
  ScrollableViewExample: {
    screen: ScrollableViewExample,
    title: '🆕 (advanced) ScrollView imitation',
    tv: false,
  },
  AnimatedTabBarExample: {
    screen: AnimatedTabBarExample,
    title: '🆕 (advanced) Tab Bar Example',
    tv: true,
  },
  LiquidSwipe: {
    screen: LiquidSwipe,
    title: '🆕 Liquid Swipe Example',
    tv: false,
  },
  ExtrapolationExample: {
    screen: ExtrapolationExample,
    title: '🆕 Extrapolation Example',
    tv: false,
  },
  ScrollExample: {
    screen: ScrollExample,
    title: '🆕 Scroll Example',
    tv: false,
  },
};

type RootStackParams = {Home: undefined} & {[key: string]: undefined};
type MainScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'Home'>;
  setUseRea2: (useRea2: boolean) => void;
};

function MainScreen({navigation, setUseRea2}: MainScreenProps) {
  const data = Object.keys(SCREENS)
    .filter((key) => SCREENS[key].tv || !Platform.isTV)
    .map((key) => ({key}));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({key}) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
      ListFooterComponent={() => <LaunchReanimated1 setUseRea2={setUseRea2} />}
    />
  );
}

export function ItemSeparator(): React.ReactElement {
  return <View style={styles.separator} />;
}

type Item = {key: string};
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({key}: Item) => void;
  screens: Screens;
};
export function MainScreenItem({
  item,
  onPressItem,
  screens,
}: MainScreenItemProps): React.ReactElement {
  const {key} = item;
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </TouchableOpacity>
  );
}

function LaunchReanimated1({
  setUseRea2,
}: {
  setUseRea2: (useRea2: boolean) => void;
}) {
  return (
    <>
      <ItemSeparator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setUseRea2?.(false)}>
        <Text style={styles.buttonText}>👵 Reanimated 1.x Examples</Text>
      </TouchableOpacity>
    </>
  );
}

const Stack = createStackNavigator();

const Reanimated2 = (setUseRea2: (useRea2: boolean) => void) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={headerOptions('🎬 Reanimated 2.x Examples')}
      children={(props) => <MainScreen {...props} setUseRea2={setUseRea2} />}
    />
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={headerOptions(SCREENS[name].title || name)}
      />
    ))}
  </Stack.Navigator>
);

function App(): React.ReactElement {
  const [useRea2, setUseRea2] = React.useState(true);

  TVEventControl.enableTVMenuKey();
  return (
    <NavigationContainer>
      {useRea2 ? Reanimated2(setUseRea2) : Reanimated1(setUseRea2)}
    </NavigationContainer>
  );
}

const scale = Platform.isTV && Platform.OS === 'ios' ? 1.0 : 0.5;

const headerOptions = (title: string) => {
  return {
    title,
    headerTitleStyle: styles.headerTitle,
    headerStyle: styles.header,
  };
};

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 30 * scale,
  },
  button: {
    flex: 1,
    height: 100 * scale,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 50 * scale,
  },
  header: {
    height: 200 * scale,
  },
});

export default App;
