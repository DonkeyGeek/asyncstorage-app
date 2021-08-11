import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

const Listes = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Listes</Text>
        </View>
    )
}

export default Listes

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
