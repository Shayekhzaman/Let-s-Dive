import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Navigation from "./src/navigation";
import Contants from 'expo-constants';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    marginTop: Contants.statusBarHeight
  },
});

export default App;
