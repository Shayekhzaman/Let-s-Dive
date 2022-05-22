import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, FAB, Button, TextInput } from "react-native-paper";

const RiderProfile = (props) => {
  const navigation = useNavigation();
  const { licenseNumber, name, image } = props.route.params;
  const [riderCaseHistory, setRiderCaseHistory] = useState([]);
  const [error, setError] = useState("Loading...");

  const handleLogout = () => {
    navigation.navigate("Actor");
  };

  // get rider case
  useEffect(() => {
    fetch(`http://192.168.31.160:3000/riderCase/${licenseNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.length === 0){
          setError("Dont have any case file yet")
        }
        setRiderCaseHistory(data)
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  // console.warn(riderCaseHistory);

  const renderData = (item) => {
    
    return (
      <Card style={styles.cardStyle}>
        <Text style={{ fontSize: 18, color: "#24248f" }}>
          Case: {item.casePurpose}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 16, color: "#cc3300" }}>
              Fine: {item.fine} Tk
            </Text>
            <Text style={{ fontSize: 15, color: "#4d9900" }}>
              Date: {item.date}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#F6DDCC" }}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 35,
            marginBottom: 60,
          }}
        >
          <Image
            style={{
              width: 100,
              height: 110,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: 15,
              borderRadius: 30,
            }}
            source={{ uri: `${image}` }}
          />
          <View style={{ marginRight: "auto", marginTop: 25 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#009900" }}
            >
              {" "}
              {name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#e63900",
                  marginTop: 18,
                }}
              >
                {" "}
                Case History
              </Text>
              <Button
                style={{
                  // width: 150,
                  backgroundColor: "red",
                  marginLeft: 60,
                  // marginRight: -40,
                  marginTop: 15,
                  // marginBottom: 0
                }}
                onPress={handleLogout}
                icon="logout"
                mode="contained"
              >
                {" "}
                Logout
              </Button>
            </View>
          </View>
        </View>

        {/* case history */}
        {riderCaseHistory.length > 0 ? (
          <FlatList
            data={riderCaseHistory}
            renderItem={({ item }) => {
              return renderData(item);
              
            }}
            keyExtractor={(item) => `${item._id}`}
          />
        ) : (
          <Text style={styles.caseText}>{error}</Text>
          
        )}
      </View>
    </ScrollView>
  );
};

export default RiderProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F6DDCC",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 20,
    height: "100%",
  },
  cardStyle: {
    // margin: 20 ,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    // fontWeight:"bold",
  },
  caseText: {
    color: "#006600",
    textAlign: "center",
    alignItems: "center",
    // justifyContent: "center",
    fontWeight: "bold",
    marginTop: 250,
  },
});
