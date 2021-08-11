import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

const Signets = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Signets</Text>
        </View>
    )
}

export default Signets

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
