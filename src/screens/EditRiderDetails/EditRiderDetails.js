import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";

const EditRiderDetails = (props) => {
  const navigation = useNavigation();
  const { rider } = props.route.params;
  const {
    name,
    birthday,
    blood_group,
    fathers_name,
    issue_date,
    validity,
    license_no,
    issuing_authority,
    image,
  } = rider;

  const [licenseNumber, setLicenseNumber] = useState(`${license_no}`);
  const [riderName, setRiderName] = useState(`${name}`);
  const [birthTime, setBirthTime] = useState(`${birthday}`);
  const [bloodGroup, setBloodGroup] = useState(`${blood_group}`);
  const [fathersName, setFathersName] = useState(`${fathers_name}`);
  const [issueDate, setIssueDate] = useState(`${issue_date}`);
  const [valiDate, setValiDate] = useState(`${validity}`);
  const [issuingAuthority, setIssuingAuthority] = useState(
    `${issuing_authority}`
  );
  const [riderImage, setRiderImage] = useState(`${image}`);

  const riderDetails = {
    license_no: licenseNumber,
    name: riderName,
    birthday: birthTime,
    blood_group: bloodGroup,
    fathers_name: fathersName,
    issue_date: issueDate,
    validity: valiDate,
    issuing_authority: issuingAuthority,
    image: riderImage,
  };

  const editRiderDetails = () => {
    fetch(`http://192.168.31.160:5000/update/${license_no}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(riderDetails),
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert("Update Successfully");
        navigation.navigate("UpdateRider");
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <View>
        <TextInput
          style={{ margin: 20 }}
          label="Name"
          mode="outlined"
          value={riderName}
          onChangeText={(text) => setRiderName(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Date of Birth"
          mode="outlined"
          value={birthTime}
          onChangeText={(text) => setBirthTime(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Blood Group"
          mode="outlined"
          value={bloodGroup}
          onChangeText={(text) => setBloodGroup(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Father/Husband"
          mode="outlined"
          value={fathersName}
          onChangeText={(text) => setFathersName(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Issue/Renewal"
          mode="outlined"
          value={issueDate}
          onChangeText={(text) => setIssueDate(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Validity"
          mode="outlined"
          value={valiDate}
          onChangeText={(text) => setValiDate(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Issuing Authority"
          mode="outlined"
          value={issuingAuthority}
          onChangeText={(text) => setIssuingAuthority(text)}
        />

        <TextInput
          style={{ margin: 20 }}
          label="Image Link"
          mode="outlined"
          value={riderImage}
          onChangeText={(text) => setRiderImage(text)}
        />

        {/* <TextInput
          style={{ margin: 20 }}
          label="License Number"
          mode="outlined"
          value={licenseNumber}
          onChangeText={(text) => setLicenseNumber(text)}
        /> */}

        <Button
          style={{
            width: 250,
            backgroundColor: "#2874A6",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 5,
            marginBottom :15,
          }}
          onPress={editRiderDetails}
          icon="update"
          mode="contained"
        >
          {" "}
          Update
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditRiderDetails;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F4ECF7",
    height: "100%",
  },
});
