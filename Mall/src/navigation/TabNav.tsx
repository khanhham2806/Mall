import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewsScreen from '../screens/NewsScreen/NewsScreen';

const Tab = createBottomTabNavigator()

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName!: string;
          let color!: string;
          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? '#0190f3' : 'gray';
          } else if (route.name === 'News') {
            iconName = 'newspaper-o';
            color = focused ? '#0190f3' : 'gray';
          } else if (route.name === 'User') {
            iconName = 'user';
            color = focused ? '#0190f3' : 'gray';
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
        headerShown: false
      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='News' component={NewsScreen} />
      <Tab.Screen name='User' component={UserScreen} />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({
  container: {}
});
