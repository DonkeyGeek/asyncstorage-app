import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import Portfolio from '../screens/Portfolio';
const PortfolioStack = createStackNavigator();

const PortfolioStackScreen = ({ navigation }) => {
    return (
        <PortfolioStack.Navigator>
            <PortfolioStack.Screen name="Home" component={Portfolio} options={{
                title: "Portfolio",
                headerLeft: () => (
                    <MaterialIcons 
                       name="menu" 
                       size={24} 
                       color="black" 
                       onPress={() => navigation.openDrawer() }
                    />
                )
            }} />
        </PortfolioStack.Navigator>   
    )
}

export default PortfolioStackScreen;