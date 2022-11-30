import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function EditProfileScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [handicap, setHandicap] = React.useState('');
    const [homeClub, setHomeClub] = React.useState('');

    const isFocused = useIsFocused();

    React.useEffect(() => {
        setEmail(auth.currentUser?.email);
    }, [isFocused]);

    const handleSaveButton = () => {

    };

    

    const InputBox = (props) => {
        return (
            <View>
                <Text>{props.inputTitle}</Text>
                <TextInput
                    placeholder={props.inputValue}
                    value={props.inputValue}
                    onChangeText={text => props.inputSetValue(text)}
                    style={styles.input}
                />
            </View>
        )
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            onPress={() => {Keyboard.dismiss}}
        >
            <View>
                <Text>Account Details</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <InputBox inputTitle="First Name" inputValue={firstname} inputSetValue={setFirstname} />
                <InputBox inputTitle="Last Name" inputValue={lastname} inputSetValue={setLastname} />
                <InputBox inputTitle="Hcp" inputValue={handicap} inputSetValue={setHandicap} />
                <InputBox inputTitle="Home Club" inputValue={homeClub} inputSetValue={setHomeClub} />
            </View>

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
        </KeyboardAvoidingView>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a6d7de",
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
})