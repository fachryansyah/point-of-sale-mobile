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
    TopNavigationAction,
    Icon
} from 'react-native-ui-kitten'
import Drawer from 'react-native-drawer'
import Wave from 'react-native-waveview'
import AsyncStorage from '@react-native-community/async-storage'
import Http from '../Helper/Http'
import DrawerContent from '../Components/DrawerContent'
import CardProduct from '../Components/Cards/CardProduct'
import FabButton from '../Components/FabButton'

const SCREEN_WIDTH = Dimensions.get('window').width

class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            headY: new Animated.Value(0),
            openDrawer: false,
            products: []
        }
    }

    componentDidMount(){
        this.checkAuth()
        this.getProductData()
    }

    async getProductData(){
        await Http.get('/product')
        .then((res) => {
            this.setState({
                products: res.data.data.results
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
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

    MenuIcon(style){
        return(
            <Icon {...style} name='menu-2-outline' fill='#f5365c' />
        )
    }

    MenuDrawerAction(){
        return(
            <TopNavigationAction icon={this.MenuIcon} onPress={() => this.setState({openDrawer: true})} />
        )
    }

    render(){
        
        var headMov = this.state.headY.interpolate({
            inputRange: [0, 300, 300],
            outputRange: [0, -185, -185]
        });
          
        return(
            <>
                <Drawer
                    open={this.state.openDrawer}
                    openDrawerOffset={100}
                    tapToClose={true}
                    content={<DrawerContent navigate={this.props.navigation.replace} />}
                >
                    <View style={styles.container}> 
                        <TopNavigation
                            title='POINTZO'
                            alignment='center'
                            style={styles.topNav}
                            titleStyle={styles.titleTopNav}
                            leftControl={this.MenuDrawerAction()}
                        />
                        <Animated.View style={{transform: [{ translateY: headMov }]}}>
                            <ImageBackground source={require('../Assets/Images/bg-home.png')} style={styles.header}>
                                <View style={styles.waveView}>
                                    <Wave
                                        style={styles.wave}
                                        H={25}
                                        waveParams={[
                                            {A: 30, T: SCREEN_WIDTH, fill: 'rgba(255, 255, 255, 0.2)'},
                                            {A: 35, T: SCREEN_WIDTH, fill: 'rgba(255, 255, 255, 0.4)'},
                                            {A: 17, T: SCREEN_WIDTH, fill: 'rgba(255, 255, 255, 1)'},
                                        ]}
                                        animated={true}
                                    />
                                </View>
                            </ImageBackground>
                            
                            <Animated.ScrollView 
                                style={{backgroundColor: '#fff', zIndex: 2}}
                                scrollEventThrottle={16}
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
                                <Text category='h4' style={styles.headerTitle}>Browse Product</Text>
                                <CardProduct product={this.state.products} />
                            </Animated.ScrollView>
                        </Animated.View>
                    </View>

                    <FabButton />

                </Drawer>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        paddingVertical: 14,
        height: 120,
        backgroundColor: 'blue',
        position: 'relative',
        transform: [
            {translateY: -68}
        ],
        zIndex: 2,
    },
    topNav: {
        borderRadius: 6,
        marginTop: 12,
        shadowColor: "#000",
        marginHorizontal: 12,
        elevation: 14,
        zIndex: 2
    },
    titleTopNav: {
        fontFamily: 'Montserrat-Bold'
    },
    headerTitle:{
        color: '#4a4a4a',
        fontFamily: 'Montserrat-Bold',
        marginHorizontal: 18,
        marginBottom: 20
    },
    waveView: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    wave: {
        width: SCREEN_WIDTH,
        height: 120,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    body:{
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps)(HomeScreen)