import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    Image,
    Button,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserInfos } from '../redux/actions/actionUserInfos';
import * as ImagePicker from 'expo-image-picker';

const ProfilInfos = ({ navigation }) => {

    const dispatch = useDispatch();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilImage, setProfilImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (lastName.length > 0 && firstName.length > 0 && profilImage.length > 0) {
            setIsLoading(true);

            await dispatch(setUserInfos(firstName, lastName, profilImage));

            navigation.replace('GeoLocation');

        } else {
            alert('veuillez remplir tous les champs!')
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5, // entre 0 et 1
        })

        console.log(result);

        /*
        Object {
        "cancelled": false,
        "height": 1669,
        "type": "image",
        "uri": "file:///Users/axxam/Library/Developer/CoreSimulator/Devices/C1D239B5-1E0B-4DDA-BF30-EF7FB92CA9A6/data/Containers/Data/Application/018C3805-E3ED-4CBF-9CA1-995542C97C34/Library/Caches/ExponentExperienceData/%2540anonymous%252Fmon-projet-3ab313c4-4115-4c4b-9de9-4b6420429616/ImagePicker/F682FC49-DEB5-47E2-AF20-3B0803B52036.jpg",
        "width": 1668,
        }
        */

        if (!result.cancelled) {
            setProfilImage(result.uri);
        }
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
        >
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>

                    <Text style={styles.text}>Indiquez vos informations</Text>

                    <TextInput 
                        placeholder='Votre Nom'
                        style={styles.input}
                        onChangeText={ text => setLastName(text) }
                    />

                    <TextInput 
                        placeholder='Votre Prénom'
                        style={styles.input}
                        onChangeText={ text => setFirstName(text) }
                    />

                    {/* Photo Picker */}
                    <View style={styles.photoContainer}>
                        <View style={styles.wrapper}>
                            <Image 
                                style={styles.photo}
                                source={{uri: profilImage}}
                            />
                        </View>
                        <Button 
                            title="Sélectionner une photo" 
                            color="yellow" 
                            onPress={pickImage}
                        />
                    </View>


                    {
                        isLoading ? 
                        <ActivityIndicator size="large" color="white" /> :
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={handleSubmit}
                        >
                            <View style={styles.btnContainer}>
                                <Text style={styles.btnText}>Valider</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A91DA',
        flex: 1,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 50
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 9,
        textAlign: 'center',
        fontSize: 19,
        marginVertical: 10
    },
    touchable: {
        marginVertical: 9
    },
    text: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center'
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
    photoContainer: {
        alignItems: 'center'
    },
    wrapper: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 9,
        borderColor: 'white',
        borderWidth: 1
    },
    photo: {
        width: '100%',
        height: '100%'
    }
})

export default ProfilInfos
