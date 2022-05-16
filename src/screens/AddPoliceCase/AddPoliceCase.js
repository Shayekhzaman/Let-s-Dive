import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";

const AddPoliceCase = (props) => {
  const { licenseNumber } = props.route.params;
  const [casePurpose, setCasePurpose] = useState("");
  const [fine, setFine] = useState("");
  const [date, setDate] = useState("");

  
  const submitCase = () => {
    const newCase = {licenseNumber, casePurpose, fine, date};
    console.warn(newCase);
    fetch('http://192.168.31.160:3000/riderCase', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newCase)
    })
    .then((resp) => resp.json())
    .then((data) =>{
        console.warn("Update successful");
       
    })
    .catch((err) =>{
        console.warn(err);
    })

  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>AddPoliceCase {licenseNumber}</Text>

      <TextInput
        style={{ margin: 20 }}
        label="Case purpose"
        mode="outlined"
        value={casePurpose}
        onChangeText={(text) => setCasePurpose(text)}
      />

      <TextInput
        style={{ margin: 20 }}
        label="Fine"
        mode="outlined"
        value={fine}
        onChangeText={(text) => setFine(text)}
      />

      <TextInput
        style={{ margin: 20 }}
        label="Date"
        mode="outlined"
        value={date}
        onChangeText={(text) => setDate(text)}
      />

      <Button
        style={{
          //   width: 150,
          backgroundColor: "#273746",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 5,
        }}
        onPress={submitCase}
        icon="plus"
        mode="contained"
      >
        {" "}
        Submit case file
      </Button>
    </ScrollView>
  );
};

export default AddPoliceCase;

const styles = StyleSheet.create({});
