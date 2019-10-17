import React, { Component } from 'react'
import {View, Dimensions, ScrollView, StyleSheet, ToastAndroid} from 'react-native'
import {Text} from 'react-native-ui-kitten'
import Rupiah from 'rupiah-format'
import {LineChart, BarChart} from 'react-native-chart-kit'

class StatisticScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <Text category='h6' style={{fontFamily: 'Montserrat-Bold'}}>Statistic Report</Text>
            )
        }
    }

    render(){
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: [
                        15000000,
                        13000000,
                        11000000,
                        0,
                        0,
                        0,
                        20000000,
                        0,
                        0,
                        0,
                        0,
                        30000000,
                    ]
                },
                {
                    data: [
                        12000000,
                        10000000,
                        15000000,
                        0,
                        12000000,
                        0,
                        10000000,
                        0,
                        2000000,
                        0,
                        20000000,
                        13000000,
                    ]
                }
            ]
        }

        const chartConfig = {
            barPercentage:1,
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 0,
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }

        return(
            <>
                <View style={{marginTop: 20}}>
                    <View style={styles.container}>
                        <Text category="h4" style={styles.textTitle}>Revenue</Text>    
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <LineChart
                            data={data}
                            width={Dimensions.get("window").width * 1.5}
                            height={260}
                            yAxisLabel={"Rp."}
                            chartConfig={chartConfig}
                            onDataPointClick={({value}) => ToastAndroid.showWithGravity(
                                Rupiah.convert(value), 
                                ToastAndroid.SHORT, 
                                ToastAndroid.CENTER
                            )}
                            verticalLabelRotation={20}
                            bezier
                            style={{
                                marginVertical: 4,
                                borderRadius: 0
                            }}
                        />
                    </ScrollView>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20
    },
    textTitle: {
        fontFamily: 'Montserrat-Bold',
        color: '#454545',
        marginBottom: 2
    },
})

export default StatisticScreen