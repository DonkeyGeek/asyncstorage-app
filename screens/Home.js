import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {

    // const authUser = useSelector( state => state.users );
    // console.log(authUser);
    // /*
    // Object {
    //    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtbmF0aXZlLWE5ZjJmIiwiYXVkIjoicmVhY3QtbmF0aXZlLWE5ZjJmIiwiYXV0aF90aW1lIjoxNjI1NDk3MTA2LCJ1c2VyX2lkIjoiN2N5WWFKUHA2Y05KYmNZSHZYcXp5OWJRa0V3MSIsInN1YiI6IjdjeVlhSlBwNmNOSmJjWUh2WHF6eTliUWtFdzEiLCJpYXQiOjE2MjU0OTcxMDYsImV4cCI6MTYyNTUwMDcwNiwiZW1haWwiOiJoZWxsb3dvcmxkMzNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhlbGxvd29ybGQzM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mZt6hqV5fLZwvQQenq1JIejaSkJeuGhoTn2Q9mYuxoBgiHgtjAHQ3YMP-LmwEhlJksbolC9A9xCAzPNMROlq0ho5GEx2hBd333PqHk9qmn1qTXgiFCScL0s_p7K_PMK5ruEpZ8e4tD4vPF4xNH3OxuOFH1aiX__W64iUqLx5QJTcezkimKUS1WundkxH5c-dZM3hALYfHByCtqZgJYYfkaZCRbce-SLL0xuJfyOQEMESj7rgUrqb6OI3issQ5ZMKZHSw5ZQDdMDQTGI7NJRxtbimhmKiUPVjqWlDBgl4q0Jn-ZBbg1cPt0MQj0CEhWoSq1MUzD9hjh_okYsAqU38Hg",
    //     "userId": "7cyYaJPp6cNJbcYHvXqzy9bQkEw1",
    // }
    // */

    const userInfos = useSelector(state => state.infos);
    console.log(userInfos);
    /*
        Object {
            "firstName": "Toto2",
            "lastName": "Toto",
            "profilImage": "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg",
            "userId": "-MeivSMG5obs_pn3Cd75",
        }
    */

    const remove = async() => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            alert(error)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={({pressed}) => ({ backgroundColor: pressed ? 'lightseagreen' : 'rebeccapurple' }) }
                onPress={remove}
            >
                <Text style={styles.btn}>Effacer</Text>
            </Pressable>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24
    },
    btn: {
        padding: 12,
        color: "white"
    }
})