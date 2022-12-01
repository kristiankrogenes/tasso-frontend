import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { auth, db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function EditProfileScreen({ route, navigation }) {
    const [user, setUser] = React.useState({});
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [handicap, setHandicap] = React.useState('');
    const [homeClub, setHomeClub] = React.useState('');

    const isFocused = useIsFocused();

    React.useEffect(() => {
        setName(route.params.name);
        setHandicap(route.params.hcp.toString());
        setHomeClub(route.params.home_club);
    }, [isFocused]);

    const updateUserDoc = async (e) => {
        const userRef = doc(db, "users", route.params.id);
        try {
            const docRef = await updateDoc(userRef, {
                name: name,
                hcp: handicap,
                home_club: homeClub

            });
            console.log("Document updated with ID: ", userRef.id);
            navigation.navigate("Profile")
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    const handleSaveButton = () => {
        console.log("Save button pressed.");
        updateUserDoc();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            onPress={() => {Keyboard.dismiss}}
        >
            <View style={{width: "100%"}}>
                <View style={{width: "100%", borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                    <Text>Account Details</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <View style={styles.inputBox}>
                        <Text>Email</Text>
                        <TextInput
                            placeholder={email}
                            value={email}
                            // onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Full Name</Text>
                        <TextInput
                            placeholder={name}
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Hcp</Text>
                        <TextInput
                            placeholder={handicap}
                            value={handicap}
                            onChangeText={text => setHandicap(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Home Club</Text>
                        <TextInput
                            placeholder={homeClub}
                            value={homeClub}
                            onChangeText={text => setHomeClub(text)}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveButton}
                >
                    <Text style={{fontSize: 25}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={{fontSize: 25}}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a6d7de",
    width: "100%",
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  inputContainer: {
    width: '100%'
  },
  inputBox: {
    width: "100%",
    marginTop: 10
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
})