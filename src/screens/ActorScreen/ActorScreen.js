import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import Logo from "../../../assets/images/Logo8.png";
import Heading from "../../components/Heading";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

const ActorScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onSignInPressed = () => {
    //    validate user
    navigation.navigate("Rider");
  };

  const onRiderSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onTrafficPolice = () => {
    navigation.navigate("TrafficPolice");
  };

  const onAdmin = () => {
    // console.warn("Admin");
    navigation.navigate("Admin");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Heading Logo={Logo} />

        <View style={styles.gap} />

        <CustomInput
          placeholder="Username"
          value={userName}
          setValue={setUserName}
          // secureTextEntry={false}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          // or just secureTextEntry
        />
        <View style={styles.gaps} />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onRiderSignUpPressed}
          type="TERTIARY"
        />

      
        <View style={styles.gaps} />

        <CustomButton
          text="Traffic Police"
          onPress={onTrafficPolice}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        <View style={styles.gaps} />

        <CustomButton
          text="Admin"
          onPress={onAdmin}
          bgColor="#FFA07A"
          fgColor="#363636"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "50%",
    maxWidth: 300,
    maxHeight: 200,
  },
  gap: {
    marginTop: "20%",
  },
  gaps: {
    marginBottom: "5%",
  },
});

export default ActorScreen;
