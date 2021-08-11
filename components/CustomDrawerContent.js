import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import { 
    Text, 
    Avatar, 
    Title, 
    Caption, 
    Paragraph, 
    Drawer, 
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { actionLogout } from '../redux/actions/actionAuth';
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {

    const dispatch = useDispatch();

    const [isDark, setIsDark] = useState(false);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilImage, setProfilImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [isAuth, setIsAuth] = useState(false);

    const load = async() => {
        try {
            let jsonValue = await AsyncStorage.getItem('userProfilInfos');

            if (jsonValue !== null) {
                let user = JSON.parse(jsonValue);
                /*
                    {
                        userId: userId,
                        firstName: firstName,
                        lastName: lastName,
                        profilImage: profilImage
                    }
                */

               const userId = user.userId;    

               fetchData(userId);

            }
        } catch (error) {
            Alert.alert(
                'Erreur',
                'Nous avons un problème',
                [{text: 'OK', onPress: () => props.navigation.navigate('Login') }]
            )
        }
    }

    const fetchData = async (userId) => {
        const firebaseResp = await fetch(`https://react-native-a9f2f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`);
        const fetchedData = await firebaseResp.json();

        setLastName(fetchedData.lastName);
        setFirstName(fetchedData.firstName);
        setProfilImage(fetchedData.profilImage);
        setIsAuth(true);
    }

    useEffect(() => {
        load();
    }, []);

    const toggleDarkTheme = () => {
        setIsDark(!isDark)
    }

    const handleLogout = async () => {
        dispatch(actionLogout()); // Vider Redux

        try {
            await AsyncStorage.clear();
            props.navigation.navigate('Login');
        } catch (error) {
            alert(error)
        }
    }
 
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContentContainer}>
                    <View style={styles.userInfoContainer}>
                        {
                            isAuth ? 
                            <View style={styles.userInfoDetails}>
                                <Avatar.Image
                                    source={{uri: profilImage}}
                                    size={90}
                                />
                                <View style={styles.name}>
                                    <Title style={styles.title}>{firstName} {lastName}</Title>
                                    <Caption style={styles.caption}>@{lastName}</Caption>
                                </View>
                            </View> :
                            <ActivityIndicator size="large" color="#1A91DA" />
                        }

                        <View style={styles.followers}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.section]}>24</Paragraph>
                                <Caption style={styles.caption}>Abonnements</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.section]}>48</Paragraph>
                                <Caption style={styles.caption}>Abonnés</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            label="Profil"
                            icon={({color, size}) => <MaterialIcons name="face" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Profil', {
                                lastName: lastName,
                                firstName: firstName,
                                profilImage: profilImage
                            }) }
                        />

                        <DrawerItem 
                            label="Listes"
                            icon={({color, size}) => <MaterialIcons name="list-alt" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Listes') }
                        />

                        <DrawerItem 
                            label="Sujets"
                            icon={({color, size}) => <MaterialIcons name="comment" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Sujets') }
                        />

                        <DrawerItem 
                            label="Signets"
                            icon={({color, size}) => <MaterialIcons name="bookmark-border" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Signets') }
                        />

                        <DrawerItem 
                            label="Moments"
                            icon={({color, size}) => <MaterialIcons name="flash-on" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Moments') }
                        />
                    </Drawer.Section>

                    <Drawer.Section title="Réglages">
                        <DrawerItem 
                            label="Paramètres de confidentialité"
                            icon={({color, size}) => <MaterialIcons name="settings" size={size} color={color} />}
                            onPress={() => props.navigation.navigate('Settings') }
                        />

                        <TouchableRipple
                            onPress={() => toggleDarkTheme()}
                        >
                            <View style={styles.settings}>
                                <Text>Mode sombre</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>    
            </DrawerContentScrollView>

            <Drawer.Section style={styles.logOutSection}>
                <DrawerItem 
                    label="Déconnexion"
                    icon={({color, size}) => <MaterialIcons name="logout" size={size} color={color} />}
                    onPress={handleLogout}
                />
            </Drawer.Section>
        </View>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: { flex: 1},
    drawerContentContainer: {flex: 1},
    userInfoContainer: { paddingLeft: 20},
    userInfoDetails: {marginTop: 15},
    name: {
        marginTop: 15,
        justifyContent: 'center'
    },
    title: {
        fontSize: 19,
        marginTop: 5,
        fontWeight: 'bold'
    },
    caption: { fontSize: 15 },
    followers: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 9
    },
    paragraph: {
        fontWeight: 'bold'
    },
    drawerSection: {
        marginTop: 19,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc'
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    logOutSection: {
        marginBottom: 19,
        borderTopWidth: 0.5,
        borderTopColor: "#ccc"
    }
})
