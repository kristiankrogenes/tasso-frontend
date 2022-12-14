import * as React from 'react';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Keyboard, 
    Image, 
    mageBackground 
} from 'react-native';

import { LoginFromWelcomeScreen } from '../../firestore/auth';

function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
      LoginFromWelcomeScreen(email, password);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            onPress={() => {Keyboard.dismiss}}
        >
            <View style={{width: '150%', marginTop: 30, alignItems: 'center', backgroundColor: '#344D67'}}>
                <Text style={{fontSize: 50, fontWeight: 'bold', color: '#FFFFFF'}}>TASSO</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Welcome")}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={[styles.buttonText, styles.buttonOutlineText]}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 50,
    },
    inputContainer: {
        marginTop: 200,
        width: '100%'
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