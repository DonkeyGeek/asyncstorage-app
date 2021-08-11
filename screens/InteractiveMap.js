import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

/*
    - iOS Plans Apple + Google maps
    - Android Google maps 
*/

const InteractiveMap = ({route}) => {

    // La partie du monde qu'on souhaite cibler 
    const regionInfos = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const markerCoord = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
    }

    return (
        <MapView style={styles.map} region={regionInfos}>
            <Marker 
                coordinate={markerCoord}
                title="Vous êtes ici"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default InteractiveMap
