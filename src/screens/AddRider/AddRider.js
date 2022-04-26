import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, FAB, Button, TextInput } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";


const AddRider = () => {
  // const [data, setData] = useState([]);

  const navigation = useNavigation();

  const [licenseNo, setLicenseNo] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [validity, setValidity] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [image, setImage] = useState("");

  const riderDetails = {
    license_no: licenseNo,
    name: name,
    birthday: birthday,
    blood_group: bloodGroup,
    fathers_name: fathersName,
    issue_date: issueDate,
    validity: validity,
    issuing_authority: issuingAuthority,
    image: image,
  };

  const insertRider = () => {
    fetch("http://192.168.0.104:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(riderDetails),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const licenseNumber = data.license_no;
        navigation.navigate("UpdateRider", {
          licenseId: licenseNumber,
        })
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Add New Rider</Text>
        <View style={styles.root}>
          <CustomInput
            placeholder="License No"
            value={licenseNo}
            setValue={setLicenseNo}
          />

          <CustomInput placeholder="Name" value={name} setValue={setName} />

          <CustomInput
            placeholder="Birth Day"
            value={birthday}
            setValue={setBirthday}
          />

          <CustomInput
            placeholder="Blood Group"
            value={bloodGroup}
            setValue={setBloodGroup}
          />

          <CustomInput
            placeholder="Fathers Name"
            value={fathersName}
            setValue={setFathersName}
          />

          <CustomInput
            placeholder="Issue Date"
            value={issueDate}
            setValue={setIssueDate}
          />

          <CustomInput
            placeholder="Validity"
            value={validity}
            setValue={setValidity}
          />

          <CustomInput
            placeholder="Issuing Authority"
            value={issuingAuthority}
            setValue={setIssuingAuthority}
          />

          <CustomInput
            placeholder="Image url"
            value={image}
            setValue={setImage}
          />
        </View>
        <Button
          style={{ margin: 10 }}
          onPress={insertRider}
          icon="pencil"
          mode="contained"
        >
          {" "}
          Insert Rider
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddRider;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    marginTop: 72,
    fontSize: 25,
    color: "blue",
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  root: {
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#F9EBEA",
  },
  inputStyle: {
    padding: 10,
    marginTop: 30,
  },
});
