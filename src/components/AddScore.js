import * as React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { Form, FormItem } from "react-native-form-component";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export default function AddScore() {
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [score, setScore] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [courses, setCourses] = React.useState();
  const [userId, setUserId] = React.useState();
  const scoreInput = React.useRef();

  const isFocused = useIsFocused();

  React.useEffect(() => {
    fetchGolfCourses();
  }, [isFocused]);

  React.useEffect(() => {
    const loggedInUser = auth.currentUser;
    setUserId(loggedInUser.uid);
  }, [isFocused]);

  const fetchGolfCourses = async () => {
    const courseList = [];
    await getDocs(collection(db, "golf_courses")).then((snapShot) => {
      snapShot.forEach((item) => {
        const course = {
          key: item.id,
          value: item.data().name,
          par: item.data().par,
        };
        courseList.push(course);
      });
    });
    setCourses(courseList);
  };

  const handleSubmit = () => {
    try {
      addNewScoreDoc();
      setDate(new Date());
      setScore(null);
      setSelectedCourse(null);
    } catch (e) {}
  };

  const addNewScoreDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, `round_scores`), {
        user: doc(db, "users", userId),
        score: parseInt(score),
        course: doc(db, "golf_courses", selectedCourse),
        date: date,
      });
      console.log("Round written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Form buttonText="Add score" onButtonPress={handleSubmit}>
          <FormItem
            label="Score"
            value={score}
            onChangeText={(score) => setScore(score)}
            ref={scoreInput}
            placeholder="Score of the round"
            textInputStyle={styles.scoreInput}
            keyboardType="numeric"
          />

          <SelectList
            setSelected={(val) => setSelectedCourse(val)}
            data={courses}
            save="key"
            placeholder="Select course"
            maxHeight={200}
          />
          <DateTimePicker
            value={date}
            display="default"
            onChange={(e) => setDate(new Date(e.nativeEvent.timestamp))}
            maximumDate={new Date()}
            themeVariant="light"
            style={styles.datePicker}
          />
        </Form>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    padding: 10,
    width: "100%",
    marginBottom: 25,
    borderWidth: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  scoreInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    width: "100%",
    marginLeft: -7,
    marginRight: -7.5,
  },
  datePicker: {
    marginTop: 30,
    marginRight: 260,
  },
});
