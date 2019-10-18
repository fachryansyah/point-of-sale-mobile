import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class ProductDetailScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            product:{}
        }
    }

    render() {
        return(
            <>
                <View style={styles.container}>
                    
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12
    }
})

export default ProductDetailScreen