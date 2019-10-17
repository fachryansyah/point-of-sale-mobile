import React, {Component} from 'react'
import {View, FlatList, StyleSheet, Dimensions} from 'react-native'
import {API_BASE_URL} from 'react-native-dotenv'
import {Text, Button} from 'react-native-ui-kitten'
import Rupiah from 'rupiah-format'

class CheckoutScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [
                {
                    "id": 43,
                    "name": "Lenovo Legion Y550",
                    "description": "intel core i7",
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
                    "category_id": 4,
                    "price": 17000000,
                    "qty": 15,
                    "created_at": "2019-10-09T06:45:53.000Z",
                    "updated_at": "2019-10-10T16:52:59.000Z",
                    "category": "Laptop"
                },
            ]
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Receipt no. {navigation.getParam('receiptNo', '0')}</Text>
            )
        }
    }

    render(){
        const { navigation } = this.props
        return(
            <>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <FlatList
                            data={navigation.getParam('items', [])}
                            renderItem={({item, index}) => (
                                <View style={styles.list}>
                                    <Text category='h6' style={styles.textBrand}>{item.product.name}</Text>
                                    <View style={styles.displayRow}>
                                        <Text category='s1' style={[styles.textPrice, styles.floatLeft]}>{Rupiah.convert(item.total_price)}</Text>
                                        <Text category='h6' style={[styles.textQty, styles.floatRight]}>{item.qty}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={[styles.displayRow, styles.displayAction]}>
                        <Button status='primary' style={[styles.floatLeft, styles.buttonAction]} onPress={() => alert('successfully printed')}>PRINT</Button>
                        <Button status='danger' style={[styles.floatRight, styles.buttonAction]} onPress={() => alert('successfully sended to your email')}>SEND EMAIL</Button>
                    </View>
                    <View style={[styles.priceTag, styles.displayRow]}>
                        <Text category='s1' style={[styles.textTotalPrice, styles.floatLeft]}>Total</Text>
                        <Text category='s1' style={[styles.textTotalPrice, styles.floatRight]}>{Rupiah.convert(navigation.getParam('amount', '0'))}</Text>
                    </View>
                </View>
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16
    },
    card: {
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 8,
        borderColor: '#f5365c',
        borderWidth: 1.6,
        backgroundColor: '#fff'
    },
    cardTitle: {
        fontFamily: 'Montserrat-Bold',
        marginBottom: 18
    },
    list: {
        borderBottomColor: '#999999',
        borderBottomWidth: 0.8,
        marginVertical: 10
    },
    textBrand: {
        color: '#4a4a4a',
        fontFamily: 'Montserrat-Regular'
    },
    priceTag: {
        backgroundColor:"#f76884",
        alignItems:"center",
        justifyContent:"center",
        width: '100%',
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 2,
        marginTop: 6
    },
    floatRight: {
        marginLeft: 'auto'
    },
    floatLeft: {
        marginRight: 'auto'
    },
    textPrice: {
        color: '#f5365c',
    },
    displayRow:{
        flexDirection: 'row',
        width: '100%',
        marginVertical: 6
    },
    displayAction: {
        marginTop: 24
    },
    buttonAction: {
        width: SCREEN_WIDTH * 0.4
    },
    textQty: {
        alignSelf: 'center',
        marginHorizontal: 12,
        fontFamily: 'Montserrat-Bold',
    },
    priceTag: {
        backgroundColor:"#f5365c",
        position: 'absolute',
        bottom: 0,
        right: 17,
        width: '100%',
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 12,
        marginTop: 26,
        marginVertical: 16
    },
    textTotalPrice: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
    }
})

export default CheckoutScreen