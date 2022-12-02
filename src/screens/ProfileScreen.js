import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";

import { fetchUserDataFromFirestore } from '../firestore/queries';

export default function ProfileScreen({ navigation }) {

  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useState({name: "NaN", hcp: "NaN", home_club: "NaN"});

  React.useEffect(() => {
    const loggedInUser = auth.currentUser;
    getAndSetUserData(loggedInUser.uid);
  }, [isFocused]);

  const getAndSetUserData = async (uid) => {
    const userData = await fetchUserDataFromFirestore(uid);
    console.log("&&&", userData);
    setLoggedInUser(userData);
  }

  // const fetchDataFromFirestore = async (uid) => {
  //   // await getDocs(collection(db, "users"))
  //   //   .then((querySnapshot) => {               
  //   //     const newData = querySnapshot.docs
  //   //       .filter((doc) => doc.id === uid);
  //   //     setLoggedInUser({id: newData[0].id, ...newData[0].data()});   
  //   //     console.log("2", loggedInUser);
  //   // });
  //   // await getDoc(doc(db, "users", uid)).then(qsnap => {
  //   //   console.log("OK", qsnap.data());
  //   // })
  //   const newData = await getDoc(doc(db, "users", uid));
  //   // const courseData = await getDoc(doc(db, "golf_courses", nlytE8G7fzEgVfKXh72i));
  //   console.log("//", {id: newData.id, ...newData.data()}, newData.data().home_club.id);
  //   // console.log("##", courseData);
  //   setLoggedInUser({id: newData.id, ...newData.data()});
  // };

  const handleEditProfile = () => {
    console.log("Edit Profile button pressed.");
    navigation.navigate("EditProfile", loggedInUser);
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
          <Text numberOfLines={2} style={styles.nameText}>{loggedInUser.name}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.clubNameBox}>{loggedInUser.home_club}</Text>
          <Text style={styles.hcpBox}>{loggedInUser.hcp}</Text>
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
