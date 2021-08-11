import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

const Moments = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Moments</Text>
        </View>
    )
}

export default Moments

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
