import * as React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { Form, FormItem } from "react-native-form-component";

export default function AddScore() {
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [score, setScore] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const scoreInput = React.useRef();

  const golfclub_data = [
    { key: "1", label: "Asker Golfklubb", value: "Asker Golfklubb", par: 70 },
    {
      key: "2",
      label: "Holtsmark Golfklubb",
      value: "Holtsmark Golfklubb",
      par: 72,
    },
    { key: "3", label: "Oslo Golfklubb", value: "Oslo Golfklubb", par: 72 },
    {
      key: "4",
      label: "Le Rovedine Golf Club",
      value: "Le Rovedine Golf Club",
      par: 72,
    },
  ];

  const handleSubmit = () => {
    console.log({ score });
    console.log({ selectedCourse });
    console.log({ date });
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
            data={golfclub_data}
            save="value"
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
