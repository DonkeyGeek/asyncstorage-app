import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { fetchInSQLite } from '../database/db';

const Portfolio = ({ navigation, route}) => {

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const fetchUserInfos = async () => {
        try {
            const userData = await fetchInSQLite();
            //console.log(userData);

            /*
            WebSQLResultSet {
                "insertId": undefined,
                "rows": WebSQLRows {
                    "_array": Array [
                    Object {
                        "id": 1,
                        "latitude": 37.785834,
                        "longitude": -122.406417,
                    },
                    Object {
                        "id": 2,
                        "latitude": 37.785834,
                        "longitude": -122.406417,
                    },
                    ],
                    "length": 2,
                },
                "rowsAffected": 0,
                }
            */

            // destructuring
            const {latitude, longitude} = userData.rows._array[0];

            setLatitude(latitude);
            setLongitude(longitude);

        } catch (error) {
            throw error;
        }
        
    }

    useEffect(() => {
        fetchUserInfos();
    }, []);

    const goToMap = () => {
        navigation.navigate('Map', {
            latitude: latitude,
            longitude: longitude
        })
    }

    const {lastName, firstName, profilImage} = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.profilInfos}>
                <Image 
                    source={{uri: profilImage}}
                    style={styles.smallProfilImg}
                />
                <Text style={styles.profilName}>{firstName} {lastName}</Text>
                <Text style={styles.profilName}>lat: {latitude} | Long {longitude}</Text>
            </View>

            <Button title="Voir la carte" onPress={goToMap} />
        </View>
    )
}

export default Portfolio

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profilInfos: {
        backgroundColor: '#1A91DA',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    smallProfilImg: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        margin: 9,
        borderWidth: 6,
        borderColor: "white"
    },
    profilName: {
        color: "white",
        fontSize: 25
    }
    
})