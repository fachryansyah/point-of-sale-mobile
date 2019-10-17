import React, {Component} from 'react'
import {View, StyleSheet, StatusBar, Dimensions, ToastAndroid} from 'react-native'
import {Text, Button} from 'react-native-ui-kitten'
import { connect } from 'react-redux'
import { fetchCart, pushCart, cleanCart } from '../Redux/Actions/Cart'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/Ionicons'
import Http from '../Helper/Http'
import CartList from '../Components/Lists/CartList'
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-community/async-storage'
import Rupiah from 'rupiah-format'

class CartScreen extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            products : [],
            isLoadingCheckout: false,
            modalClearVisible: false,
            modalCheckoutVisible: false
        }
    }

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Your Cart</Text>
            )
        }
    };

    componentDidMount(){
        this.getProducts()
        this.props.navigation.setParams({ handleCancelCheckout: this.cancelCheckout })
    }

    async getProducts(){
        await this.props.dispatch(fetchCart())
    }

    async cancelCheckout(){
        await this.props.dispatch(cleanCart())
        await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
        this.toggleModalClear()
    }

    async onCheckout(){
        await this.props.navigation.navigate('Checkout')
        this.toggleModalCheckout()
    }

    async checkoutProduct(){

        if (this.props.cart.cartList.length < 1) {
            this.toggleModalCheckout()
            return ToastAndroid.show(
                'No product in cart', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM
            )
        }

        this.setState({
            isLoadingCheckout: true
        })

        let amount = 0
        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            this.props.cart.cartList.forEach((val, key) => {
                amount += val.price
            })
        }

        await Http.post('/order', JSON.stringify({
                amount: amount,
                items: this.props.cart.cartList
            }), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( async (res) => {
            console.log(res.data.data)
            console.log(this.props.cart.cartList)
            if (res.data.status == 200) {
                this.setState({
                    checkout: res.data.data,
                    isLoadingCheckout: false
                })
                await this.props.dispatch(cleanCart())
                await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
                await this.props.navigation.navigate('Checkout')
                this.toggleModalCheckout()
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    toggleModalClear(){
        const modalClearVisible = !this.state.modalClearVisible
        this.setState({modalClearVisible})
    }

    toggleModalCheckout(){
        const modalCheckoutVisible = !this.state.modalCheckoutVisible
        this.setState({modalCheckoutVisible})
    }

    __renderTotalCart(){
        let total = 0
        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            this.props.cart.cartList.forEach((val, key) => {
                total += val.price
            })
        }
        return (<Text category='h6' style={styles.textTotal}>Total {Rupiah.convert(total)}</Text>)
    }

    render(){
        return(
            <>
                <StatusBar barStyle="light-content" backgroundColor="#000" />

                <Modal
                    isVisible={this.state.modalClearVisible}
                    animationIn='zoomIn'
                    animationOut='fadeOut'
                    animationInTiming={400}
                    animationOutTiming={200}
                >
                    <View style={styles.modal}>
                        <Text category='h6' style={styles.modalTitle}>Are you sure want to clear ?</Text>
                        <View style={styles.modalFooter}>
                            <Button style={styles.modalActionYes} status='danger' onPress={() => this.cancelCheckout()}>Yes, sure!</Button>
                            <Button style={styles.modalActionNo} status='basic' appearance='outline' onPress={() => this.toggleModalClear()}>Cancel</Button>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.modalCheckoutVisible}
                    animationIn='zoomIn'
                    animationOut='fadeOut'
                    animationInTiming={400}
                    animationOutTiming={200}
                >
                    <View style={styles.modal}>
                        <Text category='h6' style={styles.modalTitle}>Continue checkout ?</Text>
                        <View style={styles.modalFooter}>
                            <Button style={styles.modalActionYes} status='danger' onPress={() => this.checkoutProduct()}>Yes, sure!</Button>
                            <Button style={styles.modalActionNo} status='basic' appearance='outline' onPress={() => this.toggleModalCheckout()}>Cancel</Button>
                        </View>
                    </View>
                </Modal>

                <View style={styles.container}>
                    <View style={{ flex: 95 }}>
                        <Button size='large' onPress={() => this.toggleModalClear()} appearance='ghost' status='danger'>
                            <Icon name='ios-trash' size={20} color='#f5365c' />  CLEAR
                        </Button>
                        <CartList product={this.props.cart.cartList} />
                        <FAB
                            buttonColor="#d9fae7"
                            iconTextColor="#6be39b" 
                            onClickAction={() => this.toggleModalCheckout()} 
                            visible={true}
                            iconTextComponent={
                                <Icon name="md-checkmark" size={20} />
                            }
                        />
                    </View>
                    <View style={styles.viewControl}>
                        <View style={{ flexDirection: 'row' }}>
                            {this.__renderTotalCart()}
                        </View>
                    </View>
                </View>
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        fontFamily: 'Montserrat-Bold'
    },
    viewControl: {
        flex: 5,
        padding: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#f5365c',
        elevation: 10
    },
    textTotal: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8
    },
    modalTitle: {
        fontFamily: 'Montserrat-Bold',
        marginBottom: 24
    },
    modalFooter: {
        flexDirection: 'row'
    },
    modalActionYes: {
        marginRight: 'auto',
        width: SCREEN_WIDTH * 0.38
    },
    modalActionNo:{
        marginLeft: 'auto',
        width: SCREEN_WIDTH * 0.38
    }
})

const mapStateToProps = state => {
    return {
        cart: state.Cart
    }
}

export default connect(mapStateToProps)(CartScreen)