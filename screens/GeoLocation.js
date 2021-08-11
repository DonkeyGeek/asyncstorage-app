import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { addUserGeo } from '../database/db';

const GeoLocation = ({ navigation }) => {

    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLocating, setIsLocating] = useState(false);


    const handleGoloLocation = async () => {
        // permission (objet)
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Géolocalisation refusée!');
            return;
        }

        // vérifier géoloc
        try {

            setIsLocating(true);
            
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            /*
            Object {
            "coords": Object {
                "accuracy": 5,
                "altitude": 0,
                "altitudeAccuracy": -1,
                "heading": -1,
                "latitude": 37.785834,
                "longitude": -122.406417,
                "speed": -1,
            },
            "timestamp": 1626603763814.129,
            }
            */

            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setIsLocating(false);


        } catch (error) {
            setErrorMsg("Problème de géolocalisation");
        }
    }

    const saveToSQLite = async (latitude, longitude) => {
        try {

            const dbInsertResult = await addUserGeo(latitude, longitude);
            console.log(dbInsertResult);

            /*
            WebSQLResultSet {
            "insertId": 1,
            "rows": WebSQLRows {
                "_array": Array [],
                "length": 0,
            },
            "rowsAffected": 1,
            }
            */
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleSubmit = async () => {
        if (latitude !== null && longitude !== null) {

            // Enregistrer en BDD
            saveToSQLite(latitude, longitude);

            // Redirection
            navigation.replace('Home');

        } else {
            alert('Veuillez indiquer votre géolocalisation')
        }
    }

    let geoLocText = '';
    if (errorMsg) {
        geoLocText = errorMsg
    } else if (latitude !== null && longitude !== null) {
        geoLocText = 'OK'
    }

    return (
        <View style={styles.container}>

            {
                isLocating && <ActivityIndicator size="large" color="white" />
            }
            
            <TouchableOpacity
                style={styles.touchable}
                onPress={handleGoloLocation}
            >
                <View style={styles.globeContainer}>
                    <Text style={{color: 'white', marginBottom: 16, fontSize: 19}}>
                        Cliquez pour vous géolocaliser
                    </Text>
                    <Entypo name="globe" size={120} color="white" />
                </View>
            </TouchableOpacity>

            {
                geoLocText === 'OK' &&
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleSubmit}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Bravo, vous pouvez valider</Text>
                    </View>
                </TouchableOpacity>
            }
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A91DA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchable: {
        marginVertical: 9
    },
    globeContainer: {
        alignItems: 'center'
    },
    btnContainer: {
        backgroundColor: 'turquoise',
        borderRadius: 7,
        padding: 9
    },
    btnText: {
        fontSize: 17,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
})

export default GeoLocation
