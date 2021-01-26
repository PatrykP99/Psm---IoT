import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Toolbar = (props) => {
    const { text } = props
    return(
        <View style={styles.toolbarView}>
            <Text style={styles.toolbarText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    toolbarView:{
        justifyContent:'center',
        backgroundColor: '#E8E8E8',
        height: 80,
        borderBottomWidth: 2
    },
    toolbarText:{
        fontSize: 45,
        fontFamily: 'roboto-medium',
        textAlign: 'center',
    }
})
export {Toolbar};
