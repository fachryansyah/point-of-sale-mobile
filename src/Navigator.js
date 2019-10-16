import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Http from './Helper/Http'
import { fromRight } from 'react-navigation-transitions'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import CartScreen from './Screens/CartScreen'

const MainNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Cart: {
        screen: CartScreen
    }
},{
    initialRouteName: 'Home',
    transitionConfig: () => fromRight()
})

const Navigator = createAppContainer(MainNavigator)

export default Navigator
