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

			<AddScore />

			<View style={styles.buttonCointainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("PersonalScores")}
				>
					<Text style={{fontSize: 25}}>See My Scores</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Weather")}
				>
					<Text style={{fontSize: 25}}>Check weather</Text>
				</TouchableOpacity>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	homeScreenContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		margin: 20,
	},
	button: {
		width: '100%',
		alignItems: "center",
		backgroundColor: "#a6d7de",
		padding: 10,
		margin: 5,
		borderRadius: 10
	},
	buttonCointainer: {
		width: '100%'
	}
});
