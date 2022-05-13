import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, FAB, Button, TextInput } from "react-native-paper";

const RiderProfile = (props) => {
  const navigation = useNavigation();
  const { licenseNumber, name } = props.route.params;
  console.warn(licenseNumber, name);

  const handleLogout = () => {
    navigation.navigate("Actor");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello {name}</Text>
        <Text>Case History</Text>
        <Button
          style={{
            width: 150,
            backgroundColor: "red",
            marginLeft: "auto",
            marginRight: "auto",
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
    </ScrollView>
  );
};

export default RiderProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6DDCC",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 20,
    marginLeft: 20,
  },
});
