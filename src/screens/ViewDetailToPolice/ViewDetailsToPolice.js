import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, FAB, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import bdLogo from "../../../assets/images/bdLogo.png";
import licenseLogo from "../../../assets/images/licenseLogo.png";

const ViewDetailsToPolice = (props) => {
  const { licenseNumber } = props.route.params;
  const [rider, setRider] = useState("");
  const navigation = useNavigation();

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

  useEffect(() => {
    fetch(`http://192.168.31.160:5000/get/${licenseNumber}/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRider(data);
      })
      .catch((err) => {
        setError("License Number Required");
        console.warn(err);
      });
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* card title */}
        <View style={styles.cardTitle}>
          <Image
            style={{
              width: 85,
              height: 85,
              // marginLeft: 5,
              marginRight: "auto",
            }}
            source={`${licenseLogo}`}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={styles.titleText}>
              পেশাদার মোটর ড্রাইভিং লাইসেন্স{" "}
            </Text>
            <Text style={styles.titleText}>
              Professional Motor Driving License
            </Text>
          </View>
        </View>

        {/* card */}
        <Card 
        style={styles.cardStyle}
        onPress = {()=> navigation.navigate("AddPoliceCase", {
          licenseNumber : licenseNumber,
          rider: name,
          image: image,
        })}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Image
              style={{
                width: 160,
                height: 220,
                marginLeft: 10,
                marginRight: "auto",
                marginBottom: 15,
                borderRadius: 15,
              }}
              source={{ uri: `${image}` }}
            />
            <View style={{ marginRight: 5 }}>
              <Image
                style={{
                  width: 130,
                  height: 130,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                source={`${bdLogo}`}
              />
              <View>
                <Text style={styles.cardTopText}>গণপ্রজাতন্ত্রী বাংলাদেশ </Text>
                <Text style={styles.cardTopText}>
                  People's Republic of Bangladesh
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ marginRight: "auto", marginLeft: 10 }}>
              <Text style={styles.pointText}>নাম / Name</Text>
              <Text style={styles.detailsText}>{name}</Text>
              <Text style={styles.pointText}>জন্ম তারিখ / Date of Birth</Text>
              <Text style={styles.detailsText}>{birthday}</Text>
              <Text style={styles.pointText}>রক্তের গ্রুপ / Blood Group</Text>
              <Text style={styles.detailsText}>{blood_group}</Text>
              <Text style={styles.pointText}>পিতা/স্বামী / Father/Husband</Text>
              <Text style={styles.detailsText}>{fathers_name}</Text>
              <Text style={styles.pointText}>প্রদান/নবায়ন / Issue/Renewal</Text>
              <Text style={styles.detailsText}>{issue_date}</Text>
              <Text style={styles.pointText}>লাইসেন্স নম্বর / License No.</Text>
              <Text style={styles.detailsText}>{license_no}</Text>
            </View>

            <View style={{ marginTop: "auto", marginRight: 10 }}>
              <Text style={styles.pointText}>মেয়াদ / Validity</Text>
              <Text style={styles.detailsText}>{validity}</Text>
              <Text style={styles.pointText}>
                প্রদানকারী/ Issuing Authority
              </Text>
              <Text style={styles.detailsText}>{issuing_authority}, BRTA</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ViewDetailsToPolice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddffcc",
    alignItems: "center",
   
  },
  cardStyle: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#F4F6F6",
    marginBottom : 170,
  },
  cardText: {
    textAlign: "center",
    fontSize: 16,
    color: "#273746",
    fontWeight: "bold",
  },
  pointText: {
    color: "red",
    fontSize: 11,
  },
  detailsText: {
    fontWeight: "bold",
  },
  qrStyle: {
    marginTop: 20,
    marginBottom: 50,
  },
  cardTopText: {
    color: "green",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardTitle: {
    marginTop: 120,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  
});
