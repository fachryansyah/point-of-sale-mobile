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
        this.props.navigation.replace('Login')
    }

    SettingIcon(style){
        return(
            <Icon {...style} name='home-outline'/>
        )
    }

    HistoryIcon(style){
        return(
            <Icon {...style} name='clipboard-outline'/>
        )
    }

    StatisticIcon(style){
        return(
            <Icon {...style} name='pie-chart-outline'/>
        )
    }

    ManageIcon(style){
        return(
            <Icon {...style} name='options-2-outline'/>
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
            title: 'Home',
            screen: 'Home',
            icon: this.SettingIcon
        },
        {
            title: 'History',
            screen: 'History',
            icon: this.HistoryIcon
        },
        {
            title: 'Statistic Report',
            screen: 'Statistic',
            icon: this.StatisticIcon
        },
        {
            title: 'Manage Product',
            screen: 'ListProduct',
            icon: this.SettingIcon
        }
    ];

    onRouteSelect = (index) => {
        const { [index]: route } = this.drawerData;
        // navigate with React Navigation
        this.props.navigation.navigate(route.screen);
    }

    __renderProfileHeader = () => (
        <DrawerHeaderFooter
            title='Fahriansyah'
            description='Iam a Mr.Stark'
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