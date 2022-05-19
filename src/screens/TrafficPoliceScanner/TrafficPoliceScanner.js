import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, FAB } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import licenseLogo from "../../../assets/images/licenseLogo.png";

import { useNavigation } from "@react-navigation/native";

const TrafficPoliceScanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("Not Yet scanned");
  const [camera, setCamera] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // what happens when we scan the barcode
  const handleBarCodeScan = ({ type, data }) => {
    setScanned(true);
    setData(data);
    // console.warn("type:" + type + "\nData:" + data);
  };

  // check permission and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10, fontSize: 18 }}>No access to Camera</Text>
        <Button onPress={() => askForCameraPermission()}> Allow Camera</Button>
      </View>
    );
  }

  const licenseNumber = Number(data);
  // console.warn(typeof licenseNumber, licenseNumber);

  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <Image
          style={{
            width: 85,
            height: 85,
            marginLeft: 5,
            marginRight: "auto",
          }}
          source={`${licenseLogo}`}
        />
        <View style={{ marginTop: 10, marginRight: "auto" }}>
          <Text style={styles.titleText}>পেশাদার মোটর ড্রাইভিং লাইসেন্স </Text>
          <Text style={styles.titleText}>
            Professional Motor Driving License
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <>
          <Button
            style={{
              backgroundColor: "#9B2109",
              width: 180,
            }}
            onPress={()=> navigation.navigate("Actor")}
            mode="contained"
            icon="logout"
          >
            {" "}
            logout
          </Button>
        </>

        <>
          {camera ? (
            <Button
              style={{
                backgroundColor: "#E74C3C",
                width: 180,
              }}
              onPress={() => {
                setCamera(false), setData("Not Yet scanned");
              }}
              mode="contained"
              icon="qrcode"
            >
              Cancel
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#239B56",
              }}
              onPress={() => setCamera(true)}
              mode="contained"
              icon="qrcode"
            >
              Let's Scan
            </Button>
          )}
        </>
      </View>

      {camera && (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScan}
            style={styles.scanner}
          />
          <Text style={{ margin: 10 }}>{data}</Text>
          {scanned && (
            <Button
              style={{
                backgroundColor: "#239B56",
              }}
              onPress={() => {
                setScanned(false), setData("Not Yet scanned");
              }}
              mode="contained"
              icon="qrcode"
            >
              {" "}
              scan again?
            </Button>
          )}
        </View>
      )}

      {licenseNumber > 100 && (
        <FAB
          style={styles.fab}
          // small
          icon={{ uri: "https://i.ibb.co/qrmpkmr/ashik.png" }}
          onPress={() => {
            navigation.navigate("ViewDetailsToPolice", {
              licenseNumber: data,
            }),
              setData("Not Yet scanned");
          }}
        />
      )}
    </View>
  );
};

export default TrafficPoliceScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E414AB",
  },
  root: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#A88EED",
  },
  scanner: {
    height: 400,
    width: 400,
    borderRadius: 20,
  },
  title: {
    marginTop: 120,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 60,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  fab: {
    position: "absolute",
    margin: 105,
    // left: 195,
    right: -60,
    bottom: -70,
    // marginBottom:0,
    backgroundColor: "#186A3B",
  },
});
