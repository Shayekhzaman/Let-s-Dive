import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Card, FAB, Button, TextInput } from "react-native-paper";


const UpdateRider = (props) => {

  // const {licenseId} = props.route.params;
  // console.warn(licenseId);

  const [licenseNumber, setLicenseNumber] = useState("");
  const [rider, setRider] = useState("");
  const [error, setError] = useState("");

  const { name, license_no, image } = rider;
  // console.warn(name, license_no, image);
  
// search rider
  const searchRider = () => {
    setRider("");
    fetch(`http://192.168.0.104:5000/get/${licenseNumber}/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if(data.name === undefined){
          setError("Rider Not Found")
        }
        
        setRider(data);
      })
      .catch((err) => {
        // alert("");
        setError("Please Give The Valid License Number");
      });
  };

  // const local = {
  //   name: "S. M. Ashik Uz-Zaman",
  //   image: "https://i.ibb.co/QDw13Pr/jayed-removebg-preview.png",
  //   licenseNumber: 28476523,
  // };

  const handleDelete = () => {
    alert("Delete");
  };

  const handleUpdate = () => {
    alert("update");
  };
  return (
    <View style={{ marginTop: 50, backgroundColor: "#FCF3CF", height: "100%" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "#A569BD",
          fontWeight: "bold",
        }}
      >
        Rider Update or Delete
      </Text>
      <TextInput
        style={{ margin: 20 }}
        label="License No"
        mode="outlined"
        value={licenseNumber}
        onChangeText={(text) => setLicenseNumber(text)}
      />

      <Button
        style={{
          //   width: 150,
          backgroundColor: "#273746",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 5,
        }}
        onPress={searchRider}
        icon="bike"
        mode="contained"
      >
        {" "}
        Search for Rider
      </Button>

      {name !== undefined && (
        <View>
          <Card style={styles.cardStyle}>
            <Image
              style={{
                width: 160,
                height: 220,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              source={{ uri: `${image}` }}
            />
            <Text style={styles.cardText}> {name}</Text>
            <Text style={styles.cardText}>License Number: {license_no}</Text>
          </Card>

          <View style={styles.btnStyle}>
            <Button
              style={{
                //   width: 150,
                backgroundColor: "red",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 5,
              }}
              onPress={handleDelete}
              icon="delete"
              mode="contained"
            >
              {" "}
              Delete
            </Button>
            <Button
              style={{
                //   width: 150,
                backgroundColor: "#2980B9",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 5,
              }}
              onPress={handleUpdate}
              icon="pencil"
              mode="contained"
            >
              {" "}
              Update
            </Button>
          </View>
        </View>
      )}
      {
        name === undefined && <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  );
};

export default UpdateRider;

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 60,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 20,
    paddingTop:20,
    backgroundColor: "#F6DDCC",
  },
  cardText: {
    textAlign: "center",
    fontSize: 16,
    color: "#273746",
    fontWeight: "bold",
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    paddingTop: 60,
  },
  errorText:{
    textAlign: "center",
    fontSize:18,
    color: "red",
    marginTop:300
  }
});
