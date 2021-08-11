import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackNav';
import Settings from '../screens/Settings';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                        size = focused ? 30 : 20;
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                        size = focused ? 30 : 20;
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor: 'rebeccapurple',
                inactiveTintColor: "grey",
                showLabel: false
            }}
        >
            <Tab.Screen 
               name="Home" 
               component={HomeStackScreen} 
               options={{
                   title: 'Accueil',
                   tabBarBadge: 8
                }} />
            <Tab.Screen name="Settings" component={Settings} options={{title: 'Réglages'}} />
        </Tab.Navigator>
    )
}

export default BottomTabNav

const styles = StyleSheet.create({})
