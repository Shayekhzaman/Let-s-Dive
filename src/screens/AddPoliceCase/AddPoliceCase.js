import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import React, { useState, useEffect } from "react";

const AddPoliceCase = (props) => {
  const { licenseNumber, rider, image } = props.route.params;
  const [casePurpose, setCasePurpose] = useState("");
  const [fine, setFine] = useState("");
  const [date, setDate] = useState("");

  const [riderCaseHistory, setRiderCaseHistory] = useState([]);

  const submitCase = () => {
    
    const newCase = { licenseNumber, casePurpose, fine, date };
    // console.warn(newCase);
    fetch("http://192.168.31.160:3000/riderCase", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCase),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.warn("Update successful");
       
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // get rider case
  useEffect(() => {
    fetch("http://192.168.31.160:3000/riderCase")
      .then((res) => res.json())
      .then((data) => setRiderCaseHistory(data))
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  



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
          <View>
            <Button
              style={{ margin: 10, backgroundColor: "blue" }}
              // onPress={insertRider}
              icon="pencil"
              mode="contained"
            >
              {" "}
              Update
            </Button>
            <Button
              style={{ margin: 10, backgroundColor: "red" }}
              // onPress={insertRider}
              icon="pencil"
              mode="contained"
            >
              {" "}
              Delete
            </Button>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            marginTop: 35,
            fontWeight: "bold",
            color: "#0033cc",
          }}
        >
          Traffic Case File{" "}
        </Text>

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
            backgroundColor: "#ff4d4d",
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

        <View style={{ marginTop: 40 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
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
                {rider}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#e63900" }}
              >
                {" "}
                Case History
              </Text>
            </View>
          </View>
          <FlatList
            data={riderCaseHistory}
            renderItem={({ item }) => {
              return renderData(item);
            }}
            keyExtractor={(item) => `${item._id}`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPoliceCase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // textAlign: "center"
    backgroundColor: "#ffbb33",
  },
  cardStyle: {
    margin: 10,
    padding: 10,
    // fontWeight:"bold",
  },
});
