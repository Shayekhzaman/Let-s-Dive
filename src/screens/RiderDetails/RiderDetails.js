import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Card, FAB, Button, TextInput } from "react-native-paper";

const RiderDetails = (props) => {
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
//   console.warn(name);

  return (
    <View style={{ backgroundColor: "#F6DDCC", height: "100%" }}>
      <Card style={styles.cardStyle}>
      <Image
            style={{
              width: 160,
              height: 220,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 15,

            }}
            source={{ uri: `${image}` }}
          />
     
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        
          {/* marginRight: "auto", */}
          <View style={{ marginRight: "auto", marginLeft: 10 }}>
            <Text style={styles.pointText}>Name</Text>
            <Text style={styles.detailsText}>{name}</Text>
            <Text style={styles.pointText}>Date of Birth</Text>
            <Text style={styles.detailsText}>{birthday}</Text>
            <Text style={styles.pointText}>Blood Group</Text>
            <Text style={styles.detailsText}>{blood_group}</Text>
            <Text style={styles.pointText}>Father/Husband</Text>
            <Text style={styles.detailsText}>{fathers_name}</Text>
            <Text style={styles.pointText}>Issue/Renewal</Text>
            <Text style={styles.detailsText}>{issue_date}</Text>
            <Text style={styles.pointText}>License No.</Text>
            <Text style={styles.detailsText}>{license_no}</Text>
          </View>

          <View style={{ marginTop: "auto", marginRight: 10 }}>
            <Text style={styles.pointText}>Validity</Text>
            <Text style={styles.detailsText}>{validity}</Text>
            <Text style={styles.pointText}>Issuing Authority</Text>
            <Text style={styles.detailsText}>{issuing_authority}, BRTA</Text>
          </View>

        </View>

      </Card>
    </View>
  );
};

export default RiderDetails;

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 120,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#F4F6F6",
  },
  cardText: {
    textAlign: "center",
    fontSize: 16,
    color: "#273746",
    fontWeight: "bold",
  },
  pointText:{
      color: "red",
      fontSize: 11,
  },
  detailsText: {
    fontWeight: "bold",
  }
});
