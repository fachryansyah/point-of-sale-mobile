import React, {Component} from 'react'
import {API_BASE_URL} from 'react-native-dotenv'
import {
    View,
    StyleSheet, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    FlatList,
    Dimensions
} from 'react-native'
import {
    Text,
    Button
} from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

class CardProduct extends Component {
    
    constructor(props){
        super(props)
    }

    Card({name, image, price, qty}){
        return(
            <View style={styles.wrapCard}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => alert('test')}>
                        <Image source={{uri: `${API_BASE_URL}/images/${image}`}} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text category='h5' style={styles.cardBrand}>{name}</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <View style={styles.priceTag}>
                                <Text category='s1' style={styles.titleWhite}>{price}</Text>
                            </View>
                            <View style={styles.viewQty}>
                                <Text category='s1' style={styles.titleWhite}>{qty}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Button appearance='outline' status='danger' style={styles.btnCart}>
                        <Icon name="ios-cart" size={20} color="#f5365c" />  ADD TO CART
                    </Button>
                </View>
            </View>
        )
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
                        renderItem={({item}) => <this.Card name={item.name} image={item.image} price={item.price} qty={item.qty} />}
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

export default CardProduct