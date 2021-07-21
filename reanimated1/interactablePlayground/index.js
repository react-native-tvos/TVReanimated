import React, { Component } from 'react';
import { Platform, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Basic Examples
import ChatHeads from './examples/ChatHeads';
import SwipeableCard from './examples/SwipeableCard';
import IconDrawer from './examples/IconDrawer';
import CollapsingHeader from './examples/CollapsingHeader';
import MoreDrawers from './examples/MoreDrawers';
import MoreChatHeads from './examples/MoreChatHeads';
import HandleTouches from './examples/HandleTouches';
import TouchesInside from './examples/TouchesInside';
import TouchesInsideStatic from './examples/TouchesInsideStatic';
import HandleRelayout from './examples/HandleRelayout';
import SideMenu from './examples/SideMenu';
import SnapTo from './examples/SnapTo';
import ChangePosition from './examples/ChangePosition';
import AlertAreas from './examples/AlertAreas';
import CollapsingHeaderWithScroll from './examples/CollapsingHeaderWithScroll';

// Real life Examples
import RowActions1 from './real-life-examples/RowActions1';
import RowActions2 from './real-life-examples/RowActions2';
import NowCard from './real-life-examples/NowCard';
import TinderCard from './real-life-examples/TinderCard';
import NotifPanel from './real-life-examples/NotifPanel';
import MapPanel from './real-life-examples/MapPanel';
import CollapsibleFilter from './real-life-examples/CollapsibleFilter';
import CollapsibleCalendar from './real-life-examples/CollapsibleCalendar';
import RealChatHeads from './real-life-examples/RealChatHeads';

export const SCREENS = {
  IChatHeads: { screen: ChatHeads, title: 'Chat Heads' , tv:false },
  ISwipeableCard: { screen: SwipeableCard, title: 'Swipeable Card' , tv:false },
  IMoreDrawers: { screen: MoreDrawers, title: 'More Drawers (row actions)' , tv:false },
  IMoreChatHeads: { screen: MoreChatHeads, title: 'More Chat Heads' , tv:false },
  IHandleTouches: { screen: HandleTouches, title: 'Handle Touches' , tv:false },
  // ITouchesInside: {
  //   screen: TouchesInside,
  //   title: 'Touches Inside (interactive)',
  // },
  // ITouchesInsideStatic: {
  //   screen: TouchesInsideStatic,
  //   title: 'Touches Inside (static)',
  // },
  // IHandleRelayout: { screen: HandleRelayout, title: 'Handle Relayout' },
  ISideMenu: { screen: SideMenu, title: 'Side Menu (imperative cmd)' , tv:true },
  ISnapTo: { screen: SnapTo, title: 'Snap To (imperative cmd)' , tv:true },
  IChangePosition: {
    screen: ChangePosition,
    title: 'Change Position (imperative cmd)',
    tv:true,
  },
  // IAlertAreas: { screen: AlertAreas, title: 'Alert Areas and Drag Event' },
  ICollapsingHeaderWithScroll: {
    screen: CollapsingHeaderWithScroll,
    title: 'Collapsing Header with Scroll',
    tv:false,
  },
  IRowActions1: { screen: RowActions1, title: 'Row Actions (Google Style)' , tv:false },
  IRowActions2: { screen: RowActions2, title: 'Row Actions (Apple Style)' , tv:false },
  INowCard: { screen: NowCard, title: 'Google Now-Style Card' , tv:false },
  ITinderCard: { screen: TinderCard, title: 'Tinder-Style Card' , tv:false },
  INotifPanel: { screen: NotifPanel, title: 'Notification Panel' , tv:false },
  IMapPanel: { screen: MapPanel, title: 'Apple Maps-Style Panel' , tv:false },
  ICollapsibleFilter: {
    screen: CollapsibleFilter,
    title: 'Collapsible Filter',
    tv:false,
  },
  ICollapsibleCalendar: {
    screen: CollapsibleCalendar,
    title: 'Collapsible Calendar (Any.do-Style)',
    tv:false,
  },
  IRealChatHeads: { screen: RealChatHeads, title: 'Real Chat Heads' , tv:false },
};

const SCREEN_KEYS = Object.keys(SCREENS).filter((key) => SCREENS[key].tv || !Platform.isTV);

export default class MainScreen extends Component {
  static navigationOptions = {
    title: 'react-native-interactable',
  };
  render() {
    const data = SCREEN_KEYS.map(key => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={props => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
        renderScrollComponent={props => <ScrollView {...props} />}
      />
    );
  }
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
