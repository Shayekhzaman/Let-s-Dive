import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, FAB, Button, TextInput } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import Logo7 from "../../../assets/images/Logo7.png";
import Logo3 from "../../../assets/images/Logo3.png";
import Logo4 from "../../../assets/images/Logo4.png";

import bdLogo from "../../../assets/images/bdLogo.png";
import licenseLogo from "../../../assets/images/licenseLogo.png";

import { useNavigation } from "@react-navigation/native";


const RiderScreen = (props) => {
  const { licenseNumber } = props.route.params;
  const [rider, setRider] = useState("");
  const [qrCode, setQrCode] = useState(false);
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
        // console.warn(err);
      });
  }, []);

  // go to riderProfile
  const riderProfile = () => {
    navigation.navigate("RiderProfile",{
      licenseNumber: license_no,
      name: name,
    });
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* carf title */}
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
        <Card style={styles.cardStyle}>
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

        {/*get qr code button */}

        {qrCode !== true && (
          <View>
            <Button
              style={{
                width: 290,
                backgroundColor: "#3B4CFA",
                height: 50,
                marginTop: 15,
                // marginBottom: 70,
              }}
              onPress={() => {
                setQrCode(true);
              }}
              icon="qrcode"
              mode="contained"
            >
              {" "}
              Get QR Code
            </Button>
            <FAB 
              style={styles.fab} 
              // small
              icon={{uri:`${image}`}}
              onPress={()=>riderProfile()}
            />
          </View>
        )}

        {/* cancel qr code  */}

        {qrCode === true && (
          <View>
            <Button
              style={{
                // width: 250,
                backgroundColor: "#C0392B",
                height: 50,
                // marginRight: "auto",
                marginTop: 15,
              }}
              onPress={() => {
                setQrCode(false);
              }}
              icon="qrcode"
              mode="contained"
            >
              {" "}
              Close QR Code
            </Button>

            <View style={styles.qrStyle}>
              <QRCode
                value={`${licenseNumber}`}
                size={290}
                color="black"
                backgroundColor="white"
                logo={Logo4}
                logoSize={50}
                logoMargin={2}
                logoBorderRadius={20}
                logoBackgroundColor="#148F77"
              />
            </View>
          </View>
        )}

        {qrCode === false && <View style={{ marginTop: 102 }}></View>}
      </View>
    </ScrollView>
  );
};

export default RiderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6DDCC",
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
  cardStyle: {
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
  fab: {
    position: 'absolute',
    margin: 105,
    left: 195,
    // bottom: -50,
    // marginBottom:0,
    backgroundColor: "#7D3C98",
  },
});
