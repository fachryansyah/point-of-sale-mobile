import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Button, Text, Input } from 'react-native-ui-kitten'
import Http from '../Helper/Http'


class RegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            retypePassword: '',
            isEmailValid: true,
            isPasswordValid: true
        }
    }

    async onLogin(){
        await Http.get('/category')
        .then((res) => {
            console.log(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onChangeText(value){
        this.setState({value})
    }

    onChangeEmail(value){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (reg.test(value) === false) {
            this.setState({
                email: value,
                isEmailValid: false
            })
        }else{
            this.setState({
                email: value,
                isEmailValid: true
            })
        }
    }

    render(){
        return(
            <>
                <View style={styles.container}>

                    <ScrollView style={styles.scrollView}>
                        <View>
                            <Text category="h5" style={styles.title}>REGISTER ACCOUNT</Text>
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.firstname}
                                onChangeText={this.onChangeText}
                                placeholder='Firstname'
                            />
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.lastname}
                                onChangeText={this.onChangeText}
                                placeholder='Lastname'
                            />
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.email}
                                onChangeText={(value) => this.onChangeEmail(value)}
                                placeholder='Email'
                                status={this.state.isEmailValid ? '' : 'danger'}
                                caption={this.state.isEmailValid ? '' : 'Email invalid'}
                            />
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.password}
                                onChangeText={this.onChangeText}
                                placeholder='Password'
                            />
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.retypePassword}
                                onChangeText={this.onChangeText}
                                placeholder='Retype Password'
                            />
                            <Button style={styles.button} status='danger'>REGISTER</Button>

                            <View style={{flexDirection: 'row', marginTop: 18, justifyContent: 'center'}}>
                                <Text>Already have account ? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Text style={styles.textDanger}>Sign in here.</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}

function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: '#f5365c',
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.1,
        shadowRadius: 0.8 * elevation
    };
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    scrollView: {
        paddingRight: 12,
        paddingLeft: 12,
    },
    input: {
        marginHorizontal: 4,
        marginTop: 8
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 4,
        marginTop: 24
    },
    title: {
        marginBottom: 18,
        color: '#4a4a4a',
        fontFamily: 'Montserrat-Bold'
    },
    textDanger: {
        color: '#f5365c'
    }
})

export default RegisterScreen