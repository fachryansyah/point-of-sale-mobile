import React, { Component } from 'react'
import {View, FlatList, StyleSheet, Image} from 'react-native'
import {Text} from 'react-native-ui-kitten'

class CategoryList extends Component {

    constructor(props){
        super(props)
    }

    Category({id, name, icon}){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../Assets/Images/laptop.png')} />
            </View>
        )
    }

    render(){
        return(
            <>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={this.props.category}
                    renderItem={({item}) => <this.Category id={item.id} name={item.name} icon={item.icon} />}
                    keyExtractor={item => item.id}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 66,
        height: 66,
        borderRadius: 100,
        borderColor: '#f5365c',
        backgroundColor: '#fff2f5',
        borderWidth: 2.5,
        marginHorizontal: 8,
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        resizeMode: 'stretch',
        marginTop: 14
    }
})

export default CategoryList