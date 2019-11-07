import React, {Component} from 'react'
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'
import {Text, Input, Select, Button} from 'react-native-ui-kitten'
import {WaveIndicator} from 'react-native-indicators'
import Http from '../../Helper/Http'

class EditScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            categories: [],
            name: '',
            category_id: '',
            category: '',
            current_category: {},
            price: '',
            quantity: '',
            description: '',
            isLoading: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>{navigation.getParam('name', 'No name')}</Text>
            )
        }
    };

    async componentDidMount(){
        const { navigation } = this.props

        await this.getCategoryData()

        const current_category = this.state.categories.find((category) => category.id == navigation.getParam('category_id'))

        await this.setState({
            id: navigation.getParam('id'),
            name: navigation.getParam('name'),
            category_id: navigation.getParam('category_id'),
            category: navigation.getParam('category'),
            current_category,
            price: navigation.getParam('price'),
            quantity: navigation.getParam('qty'),
            description: navigation.getParam('description')
        })
    }

    async getCategoryData(){
        await Http.get('/category')
        .then((res) => {
            let categories = []
            res.data.data.forEach((val, key) => {
                categories.push({text: val.name, id: val.id})
            })
            this.setState({
                categories
            })
            console.log(categories)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async updateProduct(){
        const {name, description, category_id, image, imagePreview, price, quantity} = this.state

        const formData = new FormData()

        this.setState({
            isLoading: true
        })

        // check value is set
        formData.append("name", name)
        // if (name.length > 0) {
        // }
        formData.append("description", description)
        // if (description.length > 0) {
        // }
        formData.append("category_id", category_id)
        // if (category_id > 0) {
        // }
        // formData.append("image", image)
        // if (imagePreview.length > 0) {
        // }
        formData.append("price", price)
        // if (price > 0) {
        // }
        formData.append("qty", quantity)
        // if (quantity > 0) {
        // }

        console.log(name, description, category_id)

        await Http.put(`/product/${this.state.id}`, formData)
        .then((res) => {
            console.log(res.data)
            if (res.data.status === 304) {
                this.setState({
                    errors: res.data.errors,
                    isLoadingBtn: false
                })
            }

            if (res.data.status === 200) {

                this.props.navigation.navigate('ListProduct', {data: res.data.data, isEdit: true})

                this.setState({
                    isLoadingBtn: false
                })
            }
        })
        .catch((err) => {
            this.setState({
                isLoadingBtn: false
            })
            console.log(err)
        })
    }

    async handleSelectCategory(data){
        await this.setState({
            category_id: data.id,
            category: data.text,
            current_category: data
        })
    }

    onChangeText(value) {
        console.log(value)
    }

    render(){
        const { navigation } = this.props
        return(
            <>
                <ScrollView>
                    <View style={styles.container}>
                        <Image source={{uri: navigation.getParam('image')}} style={styles.imageProduct} />
                        <View style={styles.card}>
                            <Text category='h6' style={styles.cardTitle}>Edit Product</Text>
                            <Input
                                style={styles.input}
                                size='small'
                                placeholder='Small'
                                label='Product Name'
                                onChangeText={(val) => this.setState({name:val})}
                                value={this.state.name}
                            />
                            <Select
                                label='Category'
                                style={styles.input}
                                data={this.state.categories}
                                placeholder='Active'
                                selectedOption={this.state.current_category}
                                onSelect={(data) => this.handleSelectCategory(data)}
                            />
                            <Input
                                keyboardType="numeric"
                                style={styles.input}
                                size='small'
                                placeholder='Price'
                                label='Price'
                                onChangeText={(val) => this.setState({price:val})}
                                value={`${this.state.price}`}
                            />
                            <Input
                                keyboardType="numeric"
                                style={styles.input}
                                size='small'
                                placeholder='Quantity'
                                label='Quantity'
                                onChangeText={(val) => this.setState({quantity:val})}
                                value={`${this.state.quantity}`}
                            />
                            <Input
                                style={styles.input}
                                size='small'
                                placeholder='Description'
                                label='Description'
                                onChangeText={(val) => this.setState({description:val})}
                                value={this.state.description}
                            />
                            {this.state.isLoading ? <WaveIndicator color='#f24f71' /> : <Button status='danger' style={{marginTop: 12}} onPress={() => this.updateProduct()}>Save changes</Button>}
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12
    },
    imageProduct:{
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_WIDTH * 0.36,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginTop: 20
    },
    card: {
        backgroundColor:'#fff',
        padding: 18,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 12
    },
    cardTitle: {
        fontFamily: 'Montserrat-Bold',
        marginBottom: 18
    },
    input: {
        width: '100%'
    }
})

export default EditScreen