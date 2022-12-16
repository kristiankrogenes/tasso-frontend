import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import AddScore from "../../components/AddScore";


export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.homeScreenContainer}>
      <Text>This is the Home Screen.</Text>
      <AddScore />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Weather")}
      >
        <Text style={{fontSize: 25}}>Check weather</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a6d7de",
    padding: 10,
    margin: 5,
    borderRadius: 10
  }
});
