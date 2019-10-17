import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { authenticate, getUser } from '../Redux/Actions/Auth'
import {WaveIndicator} from 'react-native-indicators'
import { Button, Text, Input } from 'react-native-ui-kitten'
import Http from '../Helper/Http'
import axios from 'axios'


class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            isEmailValid: true,
            emailInValidMessage: '',
            password: '',
            isLoading: false
        }
    }

    componentDidMount(){
        this.checkAuth()
    }

    onChangeEmail(value){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (reg.test(value) === false) {
            this.setState({
                email: value,
                isEmailValid: false,
                emailInValidMessage: "Email doesn't valid"
            })
        }else{
            this.setState({
                email: value,
                isEmailValid: true
            })
        }
    }

    onChangePassword(value){
        this.setState({password: value})
    }

    onSignIn(){
        
        this.setState({
            isLoading: true
        })

        setTimeout( async () => {

            await Http.post('/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then((res) => {
                if (res.data.status == 500) {
                    
                    ToastAndroid.show(
                        res.data.message, 
                        ToastAndroid.LONG, 
                        ToastAndroid.BOTTOM
                    )
                    this.setState({
                        isLoading: false
                    })

                }

                if (res.data.status == 200) {
                    this.saveToken(res.data.data.apiKey)
                    Http.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.apiKey}`
                    this.props.dispatch(authenticate({
                        firstname: res.data.data.firstname,
                        lastname: res.data.data.lastname,
                        email: res.data.data.email,
                    }))
                    this.setState({
                        isLoading: false
                    })
                    this.props.navigation.replace('Home')
                }
                
            })
            .catch((err) => {
                console.log(err.message)
                this.setState({
                    isLoading: false
                })
            })

        }, 1000)
    }

    async saveToken(token){
        try {
            await AsyncStorage.setItem('@token', token)
        } catch (e) {
            console.log(e.message)
        }
    }

    async checkAuth(){
        this.setState({
            isLoading: true
        })
        Http.get('/user')
        .then((res) => {
            if (res.data.status == 200) {
                this.props.navigation.replace('Home')
            }
            this.setState({
                isLoading: false
            })
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err.message)
        })
    }

    __renderBtnSignIn(){
        if (this.state.isLoading) {
            return(
                <WaveIndicator color='#f24f71' />
            )
        }else{
            return(
                <Button 
                    style={styles.button} 
                    status='danger' 
                    onPress={() => this.onSignIn()}>
                        SIGN IN
                </Button>
            )
        }
    }

    render(){
        return(
            <>
                <View style={styles.container}>

                    <ScrollView style={styles.fluid}>
                        <View>
                            <View style={{alignItems: 'center'}}>
                                <Text category="h2" style={styles.title}>POINTZO</Text>
                            </View>
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.email}
                                onChangeText={(value) => this.onChangeEmail(value)}
                                placeholder='Email'
                                status={this.state.isEmailValid ? '' : 'danger'}
                                caption={this.state.isEmailValid ? '' : this.state.emailInValidMessage}
                            />
                            <Input
                                size='small'
                                style={styles.input}
                                value={this.state.password}
                                onChangeText={(value) => this.onChangePassword(value)}
                                placeholder='Password'
                                secureTextEntry={true}
                            />

                            {this.__renderBtnSignIn()}

                            <View style={{flexDirection: 'row', marginTop: 18, justifyContent: 'center'}}>
                                <Text>Don't have account ? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                    <Text style={styles.textDanger}>Register here.</Text>
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
    fluid: {
        paddingRight: 12,
        paddingLeft: 12
    },
    input: {
        marginTop: 8,
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

const mapStateToProps = state => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps)(LoginScreen)