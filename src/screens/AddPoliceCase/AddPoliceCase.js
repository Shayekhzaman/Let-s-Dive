import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const AddPoliceCase = (props) => {
  const { licenseNumber } = props.route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>AddPoliceCase {licenseNumber}</Text>
    </ScrollView>
  );
};

export default AddPoliceCase;

const styles = StyleSheet.create({});
