import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Http from '../Helper/Http'
import {Drawer, Icon, DrawerHeaderFooter, Button}  from 'react-native-ui-kitten'


class DrawerContent extends Component {
    
    constructor(props){
        super(props)
    }

    async logout(){
        await AsyncStorage.removeItem('@token')
        Http.defaults.headers.common['Authorization'] = 'Bearer '
        // console.log(await AsyncStorage.getItem('@token'))
        this.props.navigate('Login')
    }

    SettingIcon(style){
        return(
            <Icon {...style} name='home-outline'/>
        )
    }

    PersonIcon(style){
        return(
            <Icon {...style} name='person'/>
        )
    }

    LogoutIcon = (style) => (
        <Icon {...style} name='log-out'/>
    );
    
    LogoutButton = (style) => (
        <Button style={style} icon={this.LogoutIcon} status='danger' onPress={() => this.logout()} />
    );

    drawerData = [
        {
            title: 'Dashboard',
            icon: this.SettingIcon
        },
        {
            title: 'History',
            icon: this.SettingIcon
        },
        {
            title: 'Statistic Report',
            icon: this.SettingIcon
        },
        {
            title: 'Manage Product',
            icon: this.SettingIcon
        }
    ];

    onRouteSelect = (index) => {
        // const { [index]: route } = this.drawerData;
        // navigate with React Navigation
        // this.props.navigation.navigate(route.title);
    }

    __renderProfileHeader = () => (
        <DrawerHeaderFooter
            title='John Doe'
            description='React Native Developer'
            icon={this.PersonIcon}
        />
    )

    __renderFooter = () => (
        <DrawerHeaderFooter
            title='Sign out'
            accessory={this.LogoutButton}
        />
    )

    render(){
        return(
            <>
                <View style={styles.container}>
                    <Drawer
                        data={this.drawerData}
                        header={this.__renderProfileHeader}
                        footer={this.__renderFooter}
                        onSelect={this.onRouteSelect}
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      width: '100%'
    }
});

export default DrawerContent