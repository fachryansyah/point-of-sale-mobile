import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native'
import {
    Button,
    Text,
    TopNavigation,
    TopNavigationAction
} from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import Wave from 'react-native-waveview'
import AsyncStorage from '@react-native-community/async-storage'
import Http from '../Helper/Http'
import CardProduct from '../Components/Cards/CardProduct'

const SCREEN_WIDTH = Dimensions.get('window').width

class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            headY: new Animated.Value(0),
            products: [
                {
                    "id": 43,
                    "name": "Lenovo Legion Y550",
                    "description": "intel core i7",
                    "image": "a6b69183-2e01-485d-aa2c-ede8e43281bb.png",
                    "category_id": 4,
                    "price": 15000000,
                    "qty": 6,
                    "created_at": "2019-10-08T03:56:30.000Z",
                    "updated_at": "2019-10-11T19:42:26.000Z",
                    "category": "Laptop"
                },
                {
                    "id": 44,
                    "name": "Asus Rog Strix G",
                    "description": "intel i7",
                    "image": "8d05110b-b38f-4633-8ad2-ec6b2d8e48ac.png",
                    "category_id": 4,
                    "price": 17000000,
                    "qty": 15,
                    "created_at": "2019-10-09T06:45:53.000Z",
                    "updated_at": "2019-10-10T16:52:59.000Z",
                    "category": "Laptop"
                },
                {
                    "id": 46,
                    "name": "MaCBOOK PRO 15 2018",
                    "description": "Intel core i5",
                    "image": "56f3e386-d157-435e-aa9b-121a34402a56.png",
                    "category_id": 4,
                    "price": 24000000,
                    "qty": 11,
                    "created_at": "2019-10-10T04:01:20.000Z",
                    "updated_at": "2019-10-11T10:44:17.000Z",
                    "category": "Laptop"
                },
                {
                    "id": 47,
                    "name": "Razer blade 15 2019",
                    "description": "intel core i9",
                    "image": "3bec7ffa-32e7-4168-bade-27ac1e7d3189.png",
                    "category_id": 4,
                    "price": 56000000,
                    "qty": 11,
                    "created_at": "2019-10-10T04:02:24.000Z",
                    "updated_at": "2019-10-13T06:35:54.000Z",
                    "category": "Laptop"
                }
            ]
        }
    }

    componentDidMount(){
        this.checkAuth()
    }

    async checkAuth(){
        await Http.get('/user')
        .then((res) => {
            if(res.data.status == 403){
                this.props.navigation.replace('Login')
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async logout(){
        await AsyncStorage.removeItem('@token')
        Http.defaults.headers.common['Authorization'] = 'Bearer '
        // console.log(await AsyncStorage.getItem('@token'))
        this.props.navigation.replace('Login')
    }

    render(){
        
        var headMov = this.state.headY.interpolate({
            inputRange: [0, 180, 181],
            outputRange: [0, -180, -180]
        });
          
        return(
            <>
                
                <View style={styles.container}> 
                    <View style={{height: 120}}>
                        <Animated.View style={{transform: [{ translateY: headMov }]}}>
                            <ImageBackground source={require('../Assets/Images/bg-home.png')} style={styles.header}>
                                <TopNavigation
                                    title='POINTZO'
                                    alignment='center'
                                    style={styles.topNav}
                                    titleStyle={styles.titleTopNav}
                                    leftControl={
                                        <TouchableOpacity style={{marginLeft: 12}} onPress={() => alert("open menu")}>
                                            <Icon name="ios-menu" size={30} color="#f5365c" />
                                        </TouchableOpacity>
                                    }
                                />
                                <View style={styles.waveView}>
                                    <Wave
                                        style={styles.wave}
                                        H={25}
                                        waveParams={[
                                            {A: 30, T: SCREEN_WIDTH, fill: 'rgba(245, 245, 245, 0.2)'},
                                            {A: 35, T: SCREEN_WIDTH, fill: 'rgba(245, 245, 245, 0.4)'},
                                            {A: 17, T: SCREEN_WIDTH, fill: 'rgba(245, 245, 245, 1)'},
                                        ]}
                                        animated={true}
                                    />
                                </View>
                            </ImageBackground>
                        </Animated.View>
                    </View>
                    <View style={styles.body}>
                        <Animated.ScrollView 
                            style={{flexGrow:1, backgroundColor: '#f5f5f5'}}
                            endFillColor='#f5365c'
                            scrollEventThrottle={1}
                            onScroll={
                                Animated.event(
                                [
                                    {
                                        nativeEvent: { contentOffset: { y: this.state.headY } }
                                    }
                                ],
                                {
                                    useNativeDriver: true
                                }
                            )}
                        >
                            
                            <CardProduct product={this.state.products} />
                        </Animated.ScrollView>
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        // flex: 15,
        paddingVertical: 12,
        height: 200,
    },
    topNav: {
        borderRadius: 6,
        shadowColor: "#000",
        marginHorizontal: 12,
        elevation: 14
    },
    titleTopNav: {
        fontFamily: 'Montserrat-Bold'
    },
    waveView: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    wave: {
        width: SCREEN_WIDTH,
        height: 60,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    body:{
        flex: 85
    }
})

const mapStateToProps = state => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps)(HomeScreen)