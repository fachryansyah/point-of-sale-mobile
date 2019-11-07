import React, {Component} from 'react'
import {
    View,
    StyleSheet, 
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ToastAndroid
} from 'react-native'
import {
    Text,
    Button
} from 'react-native-ui-kitten'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import Rupiah from 'rupiah-format'
import { pushCart } from '../../Redux/Actions/Cart'

class CardProduct extends Component {
    
    constructor(props){
        super(props)
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
                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                        data={this.props.product}
                        renderItem={({item}) => (
                            <View style={styles.wrapCard}>
                                <View style={styles.card}>
                                    <TouchableOpacity onPress={() => alert('test')}>
                                        <Image source={{uri: item.image}} style={styles.cardImage} />
                                        <View style={styles.cardContent}>
                                            <Text category='h5' style={styles.cardBrand}>{item.name}</Text>
                                        </View>
                                        <View style={styles.cardFooter}>
                                            <View style={styles.priceTag}>
                                                <Text category='s1' style={styles.titleWhite}>{Rupiah.convert(item.price)}</Text>
                                            </View>
                                            <View style={styles.viewQty}>
                                                <Text category='s1' style={styles.titleWhite}>{item.qty}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Button appearance='outline' status='danger' style={styles.btnCart} onPress={() => {
                                        this.onAddToCart(item)
                                    }}>
                                        <Icon name="ios-cart" size={20} color="#f5365c" />  ADD TO CART
                                    </Button>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
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
    wrapCard: {
        paddingHorizontal: 20,
        width: SCREEN_WIDTH,
    },
    card:{
        marginTop: 60,
        marginVertical: 40,
        paddingHorizontal: 22,
        paddingVertical: 12,
        
        borderTopRightRadius:26,
        borderBottomLeftRadius:26,

        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 9.84,

        elevation: 8,
        backgroundColor: '#fff',
    },
    cardContent: {
        marginTop: 90,
    },
    cardImage: {
        width: SCREEN_WIDTH * 0.55,
        height: SCREEN_WIDTH * 0.4,
        resizeMode: 'stretch',
        top:-60,
        right: SCREEN_WIDTH * 0.12,
        position: 'absolute'
    },
    cardBrand: {
        color: '#4a4a4a',
        marginTop: 12,
        fontFamily: 'Montserrat-Bold'
    },
    cardFooter: {
        flex: 1,
        flexDirection: 'row',
    },
    priceTag: {
        backgroundColor:"#f5365c",
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH * 0.4,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 6,
        marginVertical: 16
    },
    titleWhite: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold'
    },
    viewQty: {
        backgroundColor:"#edadba",
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: SCREEN_WIDTH * 0.34
    },
    btnCart: {
        marginVertical: 12
    }
})

const mapStateToProps = state => {
    return {
        cart: state.Cart
    }
}

export default connect(mapStateToProps)(CardProduct)