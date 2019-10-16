import React, {Component} from 'react'
import {View, FlatList, StyleSheet, Image, Dimensions} from 'react-native'
import {Text, Button, Icon} from 'react-native-ui-kitten'
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

    Cart({id, name, image, price, qty}){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardBody}>
                        <Image source={{uri: `${API_BASE_URL}/images/${image}`}} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text category='h6' style={styles.textBrand}>{name}</Text>
                            <View style={styles.viewControl}>
                                <Button status='danger' appearance='outline' size='small' icon={MinusIcon} />
                                <Text style={styles.textQty}>12</Text>
                                <Button status='success' appearance='outline' size='small' icon={PlusIcon} />
                            </View>
                            <View style={styles.priceTag}>
                                <Text category='s1' style={styles.titleWhite}>{price}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
            <>
                <FlatList
                    data={this.props.product}
                    renderItem={({item}) => <this.Cart id={item.id} name={item.name} image={item.image} price={item.price} qty={item.qty} />}
                    keyExtractor={item => item.id}
                />
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        marginVertical: 4
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

export default CartList