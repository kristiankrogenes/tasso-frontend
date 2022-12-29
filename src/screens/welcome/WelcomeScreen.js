import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Image, ImageBackground } from 'react-native';

import { auth } from '../../../firebase';
import { useIsFocused } from '@react-navigation/native';

import { fetchUserDataFromFirestore, fetchGolfCoursesFromFireStore } from '../../firestore/queries';
import { login, logout, setCourses } from "../../store/index";
import { useDispatch, useSelector  } from "react-redux";

function LoginScreen({ navigation }) {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    React.useEffect(() => {
        getGolfCoursesAndSetGolfCoursesDataToReduxStore();
        auth.onAuthStateChanged(user => {
            if (user) {
                getLoggedInUserAndSetUserDataToReduxStore(user.uid, user.email);
                navigation.navigate("NavStack");
            } else {
                console.log("Not logged in.");
            }
        });
    }, [isFocused]);

    const getLoggedInUserAndSetUserDataToReduxStore = async (uid, email) => {
        const userData = await fetchUserDataFromFirestore(uid, email);
        dispatch(login({id: userData.id, email: userData.email, name: userData.name, home_club: userData.home_club, hcp: userData.hcp}));
    }

    const getGolfCoursesAndSetGolfCoursesDataToReduxStore = async () => {
        const golfCoursesData = await fetchGolfCoursesFromFireStore();
        dispatch(setCourses(golfCoursesData));
    }

    return (
        <View style={{flex: 1}}>
          <ImageBackground 
            source={require('../../../static/img/TigerWoods.webp')} 
            resizeMode="cover" 
            style={{flex: 1, width: '100%'}}
          >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', margin: 50}}>
              <View style={{width: '100%', marginTop: 30, alignItems: 'center', backgroundColor: '#344D6775', borderRadius: 25}}>
                <Text style={{fontSize: 50, fontWeight: 'bold', color: '#FFFFFF'}}>TASSO</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#344D67',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    borderColor: '#344D67',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    // fontFamily: 'Noteworthy',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#344D67',
  },
});