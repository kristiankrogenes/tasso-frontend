import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useIsFocused } from '@react-navigation/native';

import { updateUserDoc } from '../../firestore/queries';

import { useDispatch, useSelector  } from "react-redux";

function EditProfileScreen({ route, navigation }) {
    const loggedInUser = useSelector((state) => state.user.value);

    const courses = useSelector((state) => state.golfCourses.value);
    const dropDownGolfCourses = courses.map(course => ({key: course.id, value: course.name}));

    const [email, setEmail] = React.useState(loggedInUser.email);
    const [name, setName] = React.useState(loggedInUser.name);
    const [handicap, setHandicap] = React.useState(loggedInUser.hcp);
    const [homeClub, setHomeClub] = React.useState(loggedInUser.home_club.id);

    const handleSaveButton = async () => {
        const docUpdated = await updateUserDoc({uid: loggedInUser.id, name: name, hcp: handicap, club: homeClub});
        if (docUpdated) {
            navigation.navigate("Welcome");
        }
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
                            editable={false}
                            onChangeText={text => setEmail(text)}
                            style={[styles.input, {color: 'grey', backgroundColor: 'lightgrey'}]}
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
                        <SelectList 
                            setSelected={(val) => setHomeClub(val)} 
                            data={dropDownGolfCourses} 
                            save="key"
                            maxHeight={200}
                            placeholder={loggedInUser.home_club.name}
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