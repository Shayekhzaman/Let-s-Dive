import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {Button} from 'react-native-paper';
import { auth } from "../../../firebase/Admin/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ConfirmEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    setError("");
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setError("  Check the email and reset the password, \n                             Thank you");
      })
      .catch((err) => {
        const message = err.message;
        if (message === "Firebase: Error (auth/user-not-found).") {
          setError("This user is not valid, Please insert valid user");
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
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#f9ecf2'}}>
      <View style={styles.root}>
        <View style={styles.gap} />
        <Text style={styles.title}>Give the valid Email</Text>

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />

        {/* <CustomButton text="Confirm" onPress={onConfirmPressed} /> */}
        {
          error !== "" &&<Text style={{ color: "red"}}>{error}</Text>
        }
       
        <Button
            style={{
              width: 370,
              height: 50,
              backgroundColor: "#1a1aff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 15,
              // marginBottom: 15,
              borderRadius: 10,
            }}
            onPress={onConfirmPressed}
            icon={require("../../../assets/icons/email.png")}
            mode="contained"
          >
            {" "}
            confirm
          </Button>

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
