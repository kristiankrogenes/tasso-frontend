import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

export default function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [loggedInUserEmail, setLoggedInUserEmail] = React.useState(auth.currentUser?.email);

  React.useEffect(() => {
    setLoggedInUserEmail(auth.currentUser?.email);
  }, [isFocused]);

  const handleEditProfile = () => {
    console.log("Edit Profile button pressed.");
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message));
  }



  return (
    <View style={styles.profileScreenContainer}>

      <View>
        <View style={styles.nameContainer}>
          <MaterialCommunityIcons name="account" size={200} />
          <Text numberOfLines={2} style={styles.nameText}>{loggedInUserEmail}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.clubNameBox}>Asker Golfklubb</Text>
          <Text style={styles.hcpBox}>17.5</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEditProfile}
        >
          <Text style={{fontSize: 25}}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignOut}
        >
          <Text style={{fontSize: 25}}>Sign Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    profileScreenContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    nameContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameText: {
      textAlign: 'center',
      width: '100%',
      padding: 5,
      fontSize: 25,
      borderRadius: 10,
      backgroundColor: '#a6d7de',
      overflow: 'hidden',
    },
    userInfoContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    clubNameBox: {
      textAlign: 'center',
      width: '60%',
      fontSize: 25,
      borderRadius: 10,
      backgroundColor: 'lightgrey',
      overflow: 'hidden',
      padding: 5,
    },
    hcpBox: {
      textAlign: 'center',
      width: '25%',
      fontSize: 25,
      borderRadius: 10,
      backgroundColor: 'lightgrey',
      overflow: 'hidden',
      padding: 5,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },  
    button: {
      alignItems: "center",
      backgroundColor: "#a6d7de",
      padding: 10,
      margin: 5,
      borderRadius: 10
    }

});
