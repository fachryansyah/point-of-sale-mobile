import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Moment from 'moment-timezone'
import {Text} from 'react-native-ui-kitten'
import Rupiah from 'rupiah-format'
import Http from '../Helper/Http'

class HistoryScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [
                {
                    "id": 31,
                    "user_id": 1,
                    "receipt_no": "1570726350764",
                    "amount": 15000000,
                    "created_at": "2019-10-10T16:52:30.000Z",
                    "updated_at": "0000-00-00 00:00:00"
                },
                {
                    "id": 20,
                    "user_id": 1,
                    "receipt_no": "1570723910056",
                    "amount": 24000000,
                    "created_at": "2019-10-10T16:11:50.000Z",
                    "updated_at": "2019-10-10T16:14:24.000Z"
                },
                {
                    "id": 19,
                    "user_id": 1,
                    "receipt_no": "1570703916528",
                    "amount": 136000000,
                    "created_at": "2019-10-10T10:38:37.000Z",
                    "updated_at": "2019-10-10T13:13:32.000Z"
                }
            ]
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>History</Text>
            )
        }
    }

    componentDidMount(){
        this.getHistoryData()
    }

    async getHistoryData(){
        await Http.get('/order')
        .then((res) => {
            this.setState({
                orders: res.data.data.results
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    async getHistoryDetail(orderId, navigate) {
        await Http.get(`/order/d/${orderId}`)
        .then((res) => {
            navigate('Checkout', {
                receiptNo: res.data.data.receipt_no,
                amount: res.data.data.amount,
                items: res.data.data.items
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <>
                <View>
                    <FlatList
                        data={this.state.orders}
                        renderItem={({item, index}) => (
                            <TouchableOpacity onPress={() => this.getHistoryDetail(item.id, this.props.navigation.navigate)}>
                                <View style={styles.list}>
                                    <View style={[styles.displayColumn, styles.floatLeft]}>
                                        <Text category='h6' style={styles.textTitle}>{item.receipt_no}</Text>
                                        <View style={styles.priceTag}>
                                            <Text style={{color: '#fff'}}>{Rupiah.convert(item.amount)}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.floatRight}>{Moment.tz(item.created_at, 'Asia/Jakarta').format('MMMM Do YYYY')}</Text>
                                </View>
                            </TouchableOpacity>
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
    list: {
        padding: 18,
        flexDirection: 'row',
        borderBottomColor: '#a8a8a8',
        borderBottomWidth: 1
    },
    textTitle: {
        fontFamily: 'Montserrat-Bold'
    },
    displayColumn:{
        flexDirection: 'column'
    },
    floatRight:{
        marginLeft: 'auto'
    },
    floatLeft:{
        marginRight: 'auto'
    },
    priceTag: {
        backgroundColor:"#f5365c",
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH * 0.4,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        padding: 4,
        marginTop: 8
    },
})

export default HistoryScreen