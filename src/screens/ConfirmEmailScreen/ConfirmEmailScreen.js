import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../../firebase/Admin/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ConfirmEmailScreen = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        alert("Check the email and reset the password, Thank you");
      })
      .catch((err) => {
        const message = err.message;
        if (message === "Firebase: Error (auth/user-not-found).") {
          alert("This user is not valid, Please insert valid user");
        } else
          () => {
            alert(message);
          };
      });
  };

  const onSignInPressed = () => {
    navigation.navigate("Actor");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.gap} />
        <Text style={styles.title}>Give the valid Email</Text>

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  gap: {
    marginTop: "60%",
  },
});

export default ConfirmEmailScreen;
