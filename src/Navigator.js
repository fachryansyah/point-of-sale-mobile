import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Http from './Helper/Http'
import { fromRight } from 'react-navigation-transitions'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import CartScreen from './Screens/CartScreen'
import CheckoutScreen from './Screens/CheckoutScreen'
import HistoryScreen from './Screens/HistoryScreen'
import StatisticScreen from './Screens/StatisticScreen'
import ProductScreen from './Screens/ProductScreen'

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
    },
    Checkout: {
        screen: CheckoutScreen
    },
    History: {
        screen: HistoryScreen
    },
    Statistic: {
        screen: StatisticScreen
    },
    Product: {
        screen: ProductScreen
    }
},{
    initialRouteName: 'Home',
    transitionConfig: () => fromRight()
})

const Navigator = createAppContainer(MainNavigator)

export default Navigator
