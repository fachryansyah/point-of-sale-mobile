import React, { Component } from 'react'
import { 
    View, 
    FlatList, 
    StyleSheet, 
    Image, 
    Dimensions, 
    ToastAndroid, 
    TouchableOpacity,
    TextInput
} from 'react-native'
import { Text, Button, Icon, Input } from 'react-native-ui-kitten'
import {connect} from 'react-redux'
import { pushCart } from '../Redux/Actions/Cart'
import Rupiah from 'rupiah-format'
import { SwipeListView } from 'react-native-swipe-list-view'
import { API_BASE_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'
import Http from '../Helper/Http'
import FabButton from '../Components/FabButton'

class ProductScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: [],
            search: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state
        
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Browse Product</Text>
            )
        }
    }

    componentDidMount(){
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

    async searchProduct(event){

        this.setState({
            isLoading: true
        })

        await Http.get(`/product?search=${event.nativeEvent.text}`)
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                products: res.data.data.results,
                isLoading: false
            })
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err)
        })
    }

    async onAddToCart(product){
        const { id, name, image, price, qty } = product

        let isProductAlreadyAdded = false

        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            isProductAlreadyAdded = this.props.cart.cartList.find(cart => cart.id == id)
        }

        if (!isProductAlreadyAdded) {
            let cart = { id, name, image, qty: 1, price, currentPrice: price, currentQty: qty }

            await this.props.dispatch(pushCart(cart))

            await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
            
            ToastAndroid.show(
                'Successfully added to cart!', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM
            )

        }else{
            ToastAndroid.show(
                'Product already exist in cart!', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM
            )
        }
    }

    render(){
        return(
            <>
                <View style={styles.container}>
                    <Input
                        style={{marginTop: 12}}
                        size='small'
                        placeholder='Search..'
                        value={this.state.search}
                        onChangeText={(val) => this.setState({search: val})}
                        onSubmitEditing={(event) => this.searchProduct(event)}
                    />
                    <View style={{ marginTop: 12 }}>
                        <SwipeListView
                            data={this.state.products}
                            renderHiddenItem={ (data, index) => (
                                <TouchableOpacity onPress={() => this.onAddToCart(data.item)} style={styles.rowBack}>
                                    <View style={{alignItems: 'center'}}>
                                        <Icon name='shopping-cart-outline' fill='#f5365c' width={32} height={32} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            rightOpenValue={-50}
                            renderItem={({item, index}) => (
                                <View style={{ width: '100%' }}>
                                    <View style={styles.card}>
                                        <View style={[styles.displayRow, {padding: 12} ]}>
                                            <Image source={{uri: `${API_BASE_URL}/images/${item.image}`}} style={styles.imageProduct} />
                                            <View style={{ padding: 6, width: SCREEN_WIDTH * 0.7 }}>
                                                <Text category='h6' style={styles.textTitle}>{item.name}</Text>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={styles.priceTag}>
                                                        <Text category='s1' style={styles.textWhite}>{Rupiah.convert(item.price)}</Text>
                                                    </View>
                                                    <View style={styles.viewQty}>
                                                        <Text category='s1' style={styles.textWhite}>{item.qty}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <FabButton navigate={this.props.navigation.navigate} />
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
    },
    topNavigation: {
        // elevation: 6
    },
    card: {
        backgroundColor: '#fff',
        elevation: 6,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 12
    },
    textTitle: {
        fontFamily: 'Montserrat-Bold'
    },
    textWhite: {
        color: '#fff'
    },
    displayRow: {
        flexDirection: 'row'
    },
    imageProduct: {
        width: 100,
        height: 75,
        resizeMode: 'stretch'
    },
    priceTag: {
        backgroundColor:"#f76884",
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH * 0.4,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 2,
        marginTop: 16
    },
    viewQty: {
        backgroundColor:"#edadba",
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 90,
        top: 2
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        position: 'absolute',
        right:0
    },
})

const mapStateToProps = state => {
    return {
        cart: state.Cart
    }
}

export default connect(mapStateToProps)(ProductScreen)