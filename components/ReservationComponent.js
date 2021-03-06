import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import { Notifications } from 'expo';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification')
            }
        }
        return permission;
    }

    async persentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            android: {
                sound: true,
                vibrate: true
            }
        })
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to add Calendar Event')
            }
        }
        return permission;
    }

    addReservationToCalendar = async (date) => {
        let start = new Date(Date.parse(date));
        let end = new Date(Date.parse(date));
        end.setTime(start.getTime() + (2 * 60 * 60 * 1000));
        await this.obtainCalendarPermission();

        const allCalanders = await Calendar.getCalendarsAsync();
        const Default = allCalanders.find(({ accessLevel }) => accessLevel === 'owner');
        await Calendar.createEventAsync(Default.id, {
            title: 'Con Fusion Table Reservation',
            startDate: start,
            endDate: end,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
        ToastAndroid.show('Reservation added to Calander', ToastAndroid.LONG);
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.resetForm();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    render() {

        const confirmReservation = () => Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\n Smoking? ' + this.state.smoking + '\n Date and Time: ' + this.state.date,
            [
                {
                    text: 'Cancle',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.addReservationToCalendar(this.state.date);
                        this.persentLocalNotification(this.state.date);
                        this.handleReservation()
                    }
                },

            ],
            { cancelable: false }
        )

        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={1500} >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />

                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#0fbbc4'
                            onValueChange={(value) => this.setState({ smoking: value })}
                        >

                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2016-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancle'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}

                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#0fbbc4'
                            onPress={() => confirmReservation()}
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>

                {/* <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color='#0fbbc4'
                            title="Close"
                        />
                    </View>
                </Modal> */}
            </ScrollView >

        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 24
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#0fbbc4',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;