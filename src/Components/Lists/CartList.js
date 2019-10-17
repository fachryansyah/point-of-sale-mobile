import React, {Component} from 'react'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import {Text, Button, Icon} from 'react-native-ui-kitten'
import { addQtyCart, reduceQtyCart, removeCart } from '../../Redux/Actions/Cart'
import Rupiah from 'rupiah-format'
import {API_BASE_URL} from 'react-native-dotenv'

const PlusIcon = (style) => (
    <Icon {...style} name='plus-outline' fill='#6be39b' />
)

const MinusIcon = (style) => (
    <Icon {...style} name='minus-outline' fill='#f5365c' />
)

class CartList extends Component {

    constructor(props){
        super(props)
    }

    async removeFromCart(index){
        await this.props.dispatch(removeCart(index))
        await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
    }

    async addQtyProduct(index){
        let cart = this.props.cart.cartList

        await this.props.dispatch(addQtyCart(index, cart[index].currentPrice, cart[index].currentQty))
        await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
    }

    async recudeQtyProduct(index){
        let cart = this.props.cart.cartList

        await this.props.dispatch(reduceQtyCart(index, cart[index].currentPrice))
        await AsyncStorage.setItem("@carts", JSON.stringify(this.props.cart.cartList))
    }

    render(){
        return(
            <>
                <SwipeListView
                    data={this.props.product}
                    renderHiddenItem={ ({data, index}) => (
                        <TouchableOpacity onPress={() => this.removeFromCart(index)} style={styles.rowBack}>
                            <View style={{alignItems: 'center'}}>
                                <Icon name='close-outline' fill='#fff' width={32} height={32} />
                            </View>
                        </TouchableOpacity>
                    )}
                    rightOpenValue={-80}
                    renderItem={({item, index}) => (
                        <View style={[styles.container, styles.rowFront]}>
                            <View style={styles.card}>
                                <View style={styles.cardBody}>
                                    <Image source={{uri: `${API_BASE_URL}/images/${item.image}`}} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text category='h6' style={styles.textBrand}>{item.name}</Text>
                                        <View style={styles.viewControl}>
                                            <Button status='danger' appearance='outline' size='small' icon={MinusIcon} onPress={() => this.recudeQtyProduct(index)} />
                                            <Text style={styles.textQty}>{item.qty}</Text>
                                            <Button status='success' appearance='outline' size='small' icon={PlusIcon} onPress={() => this.addQtyProduct(index)} />
                                        </View>
                                        <View style={styles.priceTag}>
                                            <Text category='s1' style={styles.titleWhite}>{Rupiah.convert(item.price)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        // marginVertical: 4
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#d13030',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        position: 'absolute',
        right:0
    },
    rowFront: {
        backgroundColor: '#fff'
    },
    card: {
        borderRadius: 4,
        padding: 12
    },
    cardBody: {
        flexDirection: 'row'
    },
    cardContent: {
        paddingHorizontal: 14,
        paddingVertical: 6
    },
    cardImage: {
        width: 100,
        height: 75,
        resizeMode: 'stretch'
    },
    textBrand: {
        color: '#4a4a4a',
        fontFamily: 'Montserrat-Bold'
    },
    priceTag: {
        backgroundColor:"#f76884",
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH * 0.4,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 6,
        marginTop: 6
    },
    titleWhite: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold'
    },
    viewControl:{
        flexDirection: 'row',
        marginVertical: 6
    },
    buttonControl:{
        marginVertical: 6
    },
    textQty: {
        alignSelf: 'center',
        marginHorizontal: 12
    }
})

const mapStateToProps = state => {
    return {
        cart: state.Cart
    }
}

export default connect(mapStateToProps)(CartList)