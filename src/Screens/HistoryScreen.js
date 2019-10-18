import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Moment from 'moment-timezone'
import {Text, Spinner} from 'react-native-ui-kitten'
import Rupiah from 'rupiah-format'
import Http from '../Helper/Http'
import Modal from "react-native-modal"

class HistoryScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
            isLoading: true,
            modalLoading: false
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
        this.setState({
            isLoading: true
        })
        await Http.get('/order?limit=100')
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                orders: res.data.data.results,
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

    async getHistoryDetail(orderId, navigate) {
        this.toggleModalLoading()
        await Http.get(`/order/d/${orderId}`)
        .then((res) => {
            this.toggleModalLoading()
            navigate('Checkout', {
                receiptNo: res.data.data.receipt_no,
                amount: res.data.data.amount,
                items: res.data.data.items
            })
        })
        .catch((err) => {
            this.toggleModalLoading()
            console.log(err)
        })
    }

    toggleModalLoading(){
        const modalLoading = !this.state.modalLoading
        this.setState({modalLoading})
    }

    __renderHistoryList(){
        if (this.state.isLoading) {
            return(
                <View style={{ alignItems:'center', marginTop: 50 }}>
                    <Spinner size='large' status='alternative'/>
                </View>
            )
        }else{
            return(
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
            )
        }
    }

    render(){
        return(
            <>
                <View>
                    <Modal
                        isVisible={this.state.modalLoading}
                        animationIn='zoomIn'
                        animationOut='fadeOut'
                        animationInTiming={400}
                        animationOutTiming={200}
                    >
                        <View style={styles.modal}>
                            <Text category='h6' style={styles.modalTitle}>Loading</Text>
                            <Spinner status='alternative'/>
                        </View>
                    </Modal>
                    {this.__renderHistoryList()}
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
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center'
    },
    modalTitle: {
        fontFamily: 'Montserrat-Bold',
        marginBottom: 24
    }
})

export default HistoryScreen