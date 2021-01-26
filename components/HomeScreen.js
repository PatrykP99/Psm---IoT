import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal, TextInput, ToastAndroid } from 'react-native';
import {Toolbar} from "./Toolbar";
import {getData, storeData} from "../utils/Storage";

export default class HomeScreen extends React.Component {

    state = {
        devices: [],
        modalVisible: false,
        nameText: "",
        placeText: "",
        commandText: ""
    }

    componentDidMount() {
        getData("devices").then(r => {
            if(r === undefined){
                this.setState({
                    devices: [{name: "+", place: "", command: ""}]
                })
            } else {
                this.setState({devices: JSON.parse(r)})
            }
        })
    }

    addNewDevice = (name) => {
        if(name === "+") {
            this.setState({
                modalVisible: true
            })
        }
    }

    cancelButtonMethod = () => {
        this.setState({
            modalVisible: false,
        })
    }

    saveDevice = (nameText, placeText, commandText) => {

        if(nameText === "" || placeText === "" || commandText === ""){
            ToastAndroid.show("Some fields are empty", ToastAndroid.SHORT);
        }else {
            const {devices} = this.state;
            this.setState({
                devices: devices.splice(0, 0, {name: nameText, place: placeText, command: commandText})
            })

            storeData(JSON.stringify(devices), "devices").then(r => {
                this.setState({
                    devices: devices,
                    modalVisible: false
                })
            })
        }

        // storeData("", "devices").then(r => {
        //     this.setState({devices: devices})
        // })

    }

    render() {
        const { devices, modalVisible, nameText, placeText, commandText } = this.state;
        return (
            <View style={styles.container}>
                <Modal  visible={modalVisible}>
                    <Toolbar text={"New device"}/>
                    <View style={styles.modalView}>
                        <TextInput  style={{height: 40,backgroundColor: 'white', fontSize: 20, marginTop: 20}}
                                    placeholder="Name" onChangeText={(nameText) => this.setState({nameText})}/>
                        <TextInput  style={{height: 40,backgroundColor: 'white', fontSize: 20, marginTop: 20}}
                                    placeholder="Place" onChangeText={(placeText) => this.setState({placeText})}/>
                        <TextInput  style={{height: 40,backgroundColor: 'white', fontSize: 20, marginTop: 20}}
                                    placeholder="Command" onChangeText={(commandText) => this.setState({commandText})}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40}}>
                            <TouchableOpacity style={styles.modalButtonsStyle} onPress={() => this.cancelButtonMethod()}>
                                <Text style={{fontFamily: 'roboto-medium'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonsStyle} onPress={() => this.saveDevice(nameText, placeText, commandText)}>
                                <Text style={{fontFamily: 'roboto-medium'}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <SafeAreaView>
                    <ScrollView>
                <Toolbar text={"Devices"}/>
                <View style={styles.DevicesView}>
                    <View style={[styles.rowDirect, {marginVertical: 20}]}>
                        {devices.map((item, key) =>
                            <TouchableOpacity onPress={() => this.addNewDevice(item.name)}
                                              style={styles.deviceTouchable} key={key}>
                                <Text style={styles.deviceUpText}>{item.name}</Text>
                                <Text style={styles.deviceDownText}>{item.place} </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f8ff",

    },
    rowDirect: {
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center'
    },

    DevicesView: {
        marginVertical: 20,
        marginHorizontal: 35,
        justifyContent: 'space-evenly',
    },
    deviceUpText: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'roboto-medium'
    },
    deviceDownText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'raleway-medium',
    },
    deviceTouchable: {
        borderWidth: 1,
        margin: 5,
        backgroundColor: "#A9D0F5",
        borderRadius: 7,
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: "#f1f8ff",
        paddingBottom: 100,
        paddingHorizontal: 40,
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },

    modalButtonsStyle: {
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: "#fff",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 7,
    }
});
