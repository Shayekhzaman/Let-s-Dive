import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Logo from "../../../assets/images/Logo5.png";
import Heading from "../../components/Heading";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

import { useNavigation } from "@react-navigation/native";

import { auth } from "../../../firebase/Admin/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const AdminScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //   admin sign In

  const handleAdminSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { displayName } = res.user;
        navigation.navigate("AdminWork", {
          user: displayName,
        });
      })
      .catch((err) => {
        const message = err.message;
        if (message === "Firebase: Error (auth/user-not-found).") {
          alert(`${email} is not an Admin`);
        }
        if (message === "Firebase: Error (auth/wrong-password).") {
          alert("Wrong Password");
        } else
          () => {
            alert(message);
          };
      });
  };

  // Admin Password reset push

  const handleAdminPasswordReset = () => {
    navigation.navigate("ConfirmEmail");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Heading Logo={Logo} />

        <View style={styles.gap} />
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          //   secureTextEntry={false}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          // or just secureTextEntry
        />

        <View style={{ marginTop: "6%" }} />

        <CustomButton text="Sign In" onPress={handleAdminSignIn} />

        <CustomButton
          text="Forgot Password? Reset It"
          onPress={handleAdminPasswordReset}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9EBEA",
    height: "100%",
  },
  gap: {
    marginTop: "50%",
  },
});

export default AdminScreen;
