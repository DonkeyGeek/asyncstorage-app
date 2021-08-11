import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

const Sujets = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sujets</Text>
        </View>
    )
}

export default Sujets

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24
    },
})
