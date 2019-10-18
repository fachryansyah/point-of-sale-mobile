import React, { Component } from 'react'
import {View, Dimensions, ScrollView, StyleSheet, ToastAndroid} from 'react-native'
import {Text, Icon, Spinner, Button, ButtonGroup} from 'react-native-ui-kitten'
import Rupiah from 'rupiah-format'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../Helper/Http'
import {LineChart, BarChart} from 'react-native-chart-kit'

const chartConfig = {
    barPercentage:1,
    backgroundColor: "#f5365c",
    backgroundGradientFrom: "#FC4A85",
    backgroundGradientTo: "#FC7B65",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 0,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#e63054"
    }
}

class StatisticScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            todayIncomeOrder: '',
            todayPrecentageIncome: '',
            yearlyIncomeOrder: '',
            yearlyPrecentageIncome: '',
            totalOrder: '',
            precentageOrder: '',
            currentData: [],
            lastData: [],
            chartLable: [],
            chartMode: 'Week',
            chartModeIndex: 0,
            isLoadingTodayIncome: true,
            isLoadingTodayOrder: true,
            isLoadingYearlyIncome: true,
            isLoadingRevenueChart: true
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Statistic Report</Text>
            )
        }
    }

    async componentDidMount(){
        await this.getTodayIncomeOrder()
        await this.getYearlyIncomeOrder()
        await this.getTotalOrder()
        this.getChartWeekly()
    }

    async getTodayIncomeOrder(){
        await Http.get('/order/income')
        .then((res) => {
            this.setState({
                todayIncomeOrder: res.data.data.income,
                todayPrecentageIncome: res.data.data.precentage,
                isLoadingTodayIncome: false
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async getYearlyIncomeOrder(){
        await Http.get('/order/income?mode=yearly')
        .then((res) => {
            this.setState({
                yearlyIncomeOrder: res.data.data.income,
                yearlyPrecentageIncome: res.data.data.precentage,
                isLoadingYearlyIncome: false
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async getTotalOrder(){
        await Http.get('/order/total')
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                totalOrder: res.data.data.total,
                precentageOrder: res.data.data.precentage,
                isLoadingTodayOrder: false
            })
        })
    }

    async getChartWeekly() {

        await this.setState({
            chartMode: 'Week',
            currentData: [0, 0, 0, 0, 0, 0, 0],
            lastData: [0, 0, 0, 0, 0, 0, 0],
            chartLable: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            isLoadingRevenueChart: true
        })

        await Http.get('/order/chart/weekly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

            this.setState({
                isLoadingRevenueChart: false
            })

        })
        .catch((err) => {
            console.log(err)
            this.setState({
                isLoadingRevenueChart: false
            })
        })
    }

    async getChartMonthly(){
        this.setState({
            chartMode: 'Month',
            currentData: [0, 0, 0, 0],
            lastData: [0, 0, 0, 0],
            chartLable: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            isLoadingRevenueChart: true
        })

        await Http.get('/order/chart/monthly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

            this.setState({
                isLoadingRevenueChart: false
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                isLoadingRevenueChart: false
            })
        })
    }

    async getChartYearly(){
        this.setState({
            chartMode: 'Year',
            currentData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            lastData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            chartLable: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            isLoadingRevenueChart: true
        })

        await Http.get('/order/chart/yearly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

            this.setState({
                isLoadingRevenueChart: false
            })

        })
        .catch((err) => {
            console.log(err)
            this.setState({
                isLoadingRevenueChart: false
            })
        })
    }

    __renderTodayIncome(){
        if(this.state.isLoadingTodayIncome){
            return(
                <View style={{ alignItems:'center', marginTop: 6 }}>
                    <Spinner status='alternative'/>
                </View>
            )
        }else{
            return(
                <>
                    <Text category='h6' style={styles.cardValue}>{Rupiah.convert(this.state.todayIncomeOrder)}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{marginRight: 6}} name={this.state.todayPrecentageIncome > 0 ? 'arrow-upward-outline' : 'arrow-downward-outline' } width={20} height={20} fill='#fff' />
                        <Text category='p1' style={styles.cardPercent}>{this.state.todayPrecentageIncome}%</Text>
                    </View>
                </>
            )
        }
    }

    __renderTodayOrder(){
        if (this.state.isLoadingTodayOrder) {
            return(
                <View style={{ alignItems:'center', marginTop: 6 }}>
                    <Spinner status='alternative'/>
                </View>
            )
        }else{
            return(
                <>
                    <Text category='h6' style={styles.cardValue}>{this.state.totalOrder}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{marginRight: 6}} name={this.state.precentageOrder > 0 ? 'arrow-upward-outline' : 'arrow-downward-outline' } width={20} height={20} fill='#fff' />
                        <Text category='p1' style={styles.cardPercent}>{this.state.precentageOrder}%</Text>
                    </View>
                </>
            )
        }
    }

    __renderYearlyIncome(){
        if (this.state.isLoadingYearlyIncome) {
            return(
                <View style={{ alignItems:'center', marginTop: 6 }}>
                    <Spinner status='alternative'/>
                </View>
            )
        }else{
            return(
                <>
                    <Text category='h6' style={styles.cardValue}>{Rupiah.convert(this.state.yearlyIncomeOrder)}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{marginRight: 6}} name={this.state.yearlyPrecentageIncome > 0 ? 'arrow-upward-outline' : 'arrow-downward-outline' } width={20} height={20} fill='#fff' />
                        <Text category='p1' style={styles.cardPercent}>{this.state.yearlyPrecentageIncome}%</Text>
                    </View>
                </>
            )
        }
    }

    __renderRevenueChart(){
        if (this.state.isLoadingRevenueChart) {
            return(
                <View style={{ width: '100%', alignItems: 'center', marginTop: 120, marginBottom: 60 }}>
                    <Spinner size='giant' status='alternative'/>
                </View>
            )
        }else{
            return(
                <>
                    <ScrollView
                        style={{ margin: 0 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <LineChart
                            data={{
                                labels: this.state.chartLable,
                                datasets: [
                                    {
                                        data: this.state.currentData
                                    },
                                    {
                                        data: this.state.lastData
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width * 2}
                            height={260}
                            yAxisLabel={"Rp."}
                            chartConfig={chartConfig}
                            onDataPointClick={({value}) => ToastAndroid.show(
                                Rupiah.convert(value), 
                                ToastAndroid.SHORT
                            )}
                            verticalLabelRotation={20}
                            bezier
                            style={{
                                marginVertical: 4,
                                borderRadius: 0
                            }}
                        />
                    </ScrollView>
                </>
            )
        }
    }

    render(){

        return(
            <>
                
                <ScrollView>
                    <View style={{marginTop: 20, flex: 1}}>
                        <View style={{flexDirection: 'row', marginHorizontal: 6}}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FC4A85', '#FC7B65']} style={[styles.card, styles.cardDanger, {flex:50} ]}>
                                <Text category='s1' style={styles.cardTitle}>TODAY'S INCOME</Text>
                                {this.__renderTodayIncome()}
                            </LinearGradient>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4AD5F3', '#797AF4']} style={[styles.card, styles.cardDanger, {flex:50} ]}>
                                <Text category='s1' style={styles.cardTitle}>TODAY'S ORDERS</Text>
                                {this.__renderTodayOrder()}
                            </LinearGradient>
                        </View>
                        <View style={{marginHorizontal: 6, marginTop: 10}}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4AE5AA', '#4ADFD8']} style={[styles.card, styles.cardDanger]}>
                                <Text category='s1' style={styles.cardTitle}>THIS YEAR'S INCOME</Text>
                                {this.__renderYearlyIncome()}
                            </LinearGradient>
                        </View>
                        <View style={[styles.container, {marginTop: 30}]}>
                            <Text category="h4" style={styles.textTitle}>Revenue</Text> 
                        </View>
                        {this.__renderRevenueChart()}
                        <ButtonGroup style={{margin: 12}} status='danger'>
                            <Button style={{flex:1}} onPress={() => this.getChartWeekly()}>WEEK</Button>
                            <Button style={{flex:1}} onPress={() => this.getChartMonthly()}>MONTH</Button>
                            <Button style={{flex:1}} onPress={() => this.getChartYearly()}>YEAR</Button>
                        </ButtonGroup>
                    </View>
                </ScrollView>
            </>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 18
    },
    textTitle: {
        fontFamily: 'Montserrat-Bold',
        color: '#454545',
        marginBottom: 2
    },
    card: {
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 4,
        elevation: 8
    },
    cardTitle: {
        fontFamily: 'Montserrat-Regular',
        color: '#fff'
    },
    cardValue: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
    },
    cardPercent: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
    },
    cardDanger: {
        backgroundColor: '#f5365c'
    },
    navigationTitle: {
        color: '#f5365c'
    },
    indicatorStyle: {
        backgroundColor: '#f5365c'
    }
})

export default StatisticScreen