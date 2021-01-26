import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Toolbar} from "./Toolbar";

export default class Connection extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar text={"Connection"}/>
                    <Text style={styles.textStyle}>Connection Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f8ff",

    },
    textStyle: {
        marginTop: 180,
        textAlign: 'center',
        fontSize: 22,
    }
});