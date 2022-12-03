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

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenContainer}>
      <Text>This is the Home Screen.</Text>
      <AddScore />
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
});
