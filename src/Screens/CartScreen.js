import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-ui-kitten'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/Ionicons'
import Http from '../Helper/Http'
import CartList from '../Components/Lists/CartList'

class CartScreen extends Component {
    
    static navigationOptions = {
        title: 'Your Cart',
    };

    constructor(props){
        super(props)
        this.state = {
            products : []
        }
    }

    componentDidMount(){
        this.getProducts()
    }

    async getProducts(){
        await Http.get('/product')
        .then((res) => {
            console.log(res.data.data.results)
            this.setState({
                products: res.data.data.results
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    render(){
        return(
            <>
                <View style={styles.container}>
                    <View style={{ flex: 95 }}>
                        <CartList product={this.state.products} />
                    </View>
                    <View style={styles.viewControl}>
                        <FAB
                            buttonColor="#d9fae7" 
                            iconTextColor="#6be39b" 
                            onClickAction={() => alert('hey')} 
                            visible={true}
                            iconTextComponent={
                                <Icon name="md-checkmark" size={20} />
                            }
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text category='h5' style={styles.textTotal}>Total Rp. 200.000.000</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
})

export default CartScreen