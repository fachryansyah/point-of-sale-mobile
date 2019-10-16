import React, { Component } from 'react'
import {View} from 'react-native'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/Ionicons'

class FabButton extends Component {
    render(){
        return(
            <>
                <FAB
                    buttonColor="#f5365c" 
                    iconTextColor="#FFFFFF" 
                    onClickAction={() => {console.log("FAB pressed")}} 
                    visible={true}
                    iconTextComponent={
                        <Icon name="ios-cart" size={20} color="#f5365c" />
                    }
                />
            </>
        )
    }
}

export default FabButton