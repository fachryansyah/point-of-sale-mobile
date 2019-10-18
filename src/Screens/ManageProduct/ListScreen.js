import React, { Component } from 'react'
import { 
    View, 
    FlatList, 
    StyleSheet, 
    Image, 
    Dimensions, 
    ToastAndroid, 
    TouchableOpacity,
    TextInput,
    RefreshControl
} from 'react-native'
import { Text, Button, Icon, Input, Spinner } from 'react-native-ui-kitten'
import FAB from 'react-native-fab'
import {connect} from 'react-redux'
import { pushCart } from '../../Redux/Actions/Cart'
import Rupiah from 'rupiah-format'
import { SwipeListView } from 'react-native-swipe-list-view'
import { API_BASE_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation'
import Modal from "react-native-modal"
import Http from '../../Helper/Http'
import {WaveIndicator} from 'react-native-indicators'

class ListScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: [],
            search: '',
            showModalDelete: false,
            deleteProductId: '',
            isLoading: true,
            isLoadingDelete: false
        }
    }

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state
        
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Manage Product</Text>
            )
        }
    }

    componentDidMount(){
        this.getProductData()
    }

    async getProductData(){
        
        this.setState({
            isLoading: true
        })

        await Http.get('/product?sort=created_at&mode=desc&limit=100')
        .then((res) => {
            this.setState({
                products: res.data.data.results,
                isLoading: false
            })
        })
        .catch((err) => {
            console.log(err.message)
            this.setState({
                isLoading: false
            })
        })
    }

    async searchProduct(event){

        this.setState({
            isLoading: true
        })

        await Http.get(`/product?sort=created_at&mode=desc&search=${event.nativeEvent.text}`)
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

    async deleteProduct(){
        this.setState({
            isLoadingDelete: true
        })
        await Http.delete(`/product/${this.state.deleteProductId}`)
        .then((res) => {
            console.log(res.data.data)

            if (res.data.status == 200) {
                const productIndex = this.state.products.map((val) => {
                    return val.id
                }).indexOf(this.state.deleteProductId)

                let products = this.state.products
                products.splice(productIndex, 1)

                this.setState({
                    products
                })

                ToastAndroid.show(
                    'Product has been deleted', 
                    ToastAndroid.LONG
                )
            }

            if(res.data.status == 500){
                ToastAndroid.show(
                    'Something went wrong', 
                    ToastAndroid.LONG
                )
            }

            this.setState({
                isLoadingDelete: false
            })

            this.toggleModalDelete()
        })
        .catch((err) => {
            console.log(err.message)
            this.setState({
                isLoadingDelete: false
            })
            this.toggleModalDelete()
        })
    }

    resetSearch(){
        this.setState({
            search: ''
        })
        this.getProductData()
    }

    screenDidFocus(){
        const {navigation} = this.props
        if (navigation.getParam('isEdit')) {
            const productIndex = this.state.products.map((val) => {
                return val.id
            }).indexOf(navigation.getParam('data').id)
            
            let products = this.state.products
    
            products[productIndex].name = navigation.getParam('data').name
            products[productIndex].category_id = navigation.getParam('data').category_id
            products[productIndex].price = navigation.getParam('data').price
            products[productIndex].qty = navigation.getParam('data').qty
            products[productIndex].description = navigation.getParam('data').description
    
            this.setState({
                products: products
            })
        }else{
            this.setState({
                products: [...this.state.products, navigation.getParam('data')]
            })
        }
    }

    toggleModalDelete(id){
        const showModalDelete = !this.state.showModalDelete
        this.setState({
            showModalDelete,
            deleteProductId: id
        })
    }
    
    renderIconSearch = (style) => {
        return (
            <Icon {...style} name='close-outline' />
        );
    };

    __renderProductList(){
        if (this.state.isLoading) {
            return(
                <View style={{ alignItems:'center', marginTop: 20 }}>
                    <Spinner status='alternative'/>
                </View>
            )
        }else{
            return(
                <SwipeListView
                    data={this.state.products}
                    renderHiddenItem={ (data, index) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditScreen', data.item)}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name='edit-2-outline' fill='#6000FF' width={32} height={32} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.toggleModalDelete(data.item.id)}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name='trash-2-outline' fill='#f5365c' width={32} height={32} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-80}
                    renderItem={({item, index}) => (
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => alert('test')} activeOpacity={1}>
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
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.getProductData()} />
                    }
                />
            )
        }
    }

    render(){
        return(
            <>
                <NavigationEvents
                    onDidFocus={payload => this.screenDidFocus()}
                />

                <Modal
                    isVisible={this.state.showModalDelete}
                    animationIn='zoomIn'
                    animationOut='fadeOut'
                    animationInTiming={400}
                    animationOutTiming={200}
                >
                    <View style={styles.modal}>
                        <Text category='h6' style={styles.modalTitle}>Are you sure want to clear ?</Text>
                        <View style={styles.modalFooter}>
                            {this.state.isLoadingDelete ? <WaveIndicator color='#f24f71' /> : <Button style={styles.modalActionYes} status='danger' onPress={() => this.deleteProduct()}>Yes, sure!</Button>}
                            <Button style={styles.modalActionNo} status='basic' appearance='outline' onPress={() => this.toggleModalDelete()}>Cancel</Button>
                        </View>
                    </View>
                </Modal>

                <View style={styles.container}>
                    <Input
                        style={{marginTop: 12}}
                        size='small'
                        placeholder='Search..'
                        value={this.state.search}
                        icon={this.renderIconSearch}
                        onIconPress={() => this.resetSearch()}
                        onChangeText={(val) => this.setState({search: val})}
                        onSubmitEditing={(event) => this.searchProduct(event)}
                    />
                    <View style={{ marginTop: 12 }}>
                        {this.__renderProductList()}
                    </View>
                </View>
                <FAB
                    buttonColor="#f5365c" 
                    iconTextColor="#FFFFFF" 
                    onClickAction={() => this.props.navigation.navigate('AddScreen')} 
                    visible={true}
                    iconTextComponent={
                        <Icon name='plus-outline' width={30} height={30} fill='#fff' />
                    }
                />
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        marginBottom: 40
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
        width: 25,
        height: 25,
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

export default connect(mapStateToProps)(ListScreen)