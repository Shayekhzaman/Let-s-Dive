import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../../../assets/images/Logo6.png";
import Heading from "../../components/Heading";

const TrafficPoliceScreen = () => {
  return (
    <View style={styles.root}>
      <Heading Logo={Logo} />
      <Text>Traffic Police Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});

export default TrafficPoliceScreen;
