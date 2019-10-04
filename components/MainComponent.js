import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
})

const ContactUsNavigator = createStackNavigator({
    ContactUs: { screen: ContactUs }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
})

const AboutUsNavigator = createStackNavigator({
    AboutUs: { screen: AboutUs }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
})

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: 'AboutUs',
            drawerLabel: 'AboutUs'
        }
    },
    ContactUs: {
        screen: ContactUsNavigator,
        navigationOptions: {
            title: 'ContactUs',
            drawerLabel: 'ContactUs'
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }} >
                <MainNavigator />
            </View>
        );
    }
}

export default Main;