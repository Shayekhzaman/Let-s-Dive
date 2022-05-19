import React, { useState, useEffect } from "react";
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
import { auth } from "../../../firebase/Admin/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

const ActorScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);

  const navigation = useNavigation();

  const onSignInPressed = () => {
    setError("");
    setForgetPassword(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { displayName, email } = res.user;
        const licenseNumber = Number(displayName);
        if (licenseNumber > 100) {
          setError("");
          setEmail("");
          setPassword("");
          navigation.navigate("Rider", {
            licenseNumber: licenseNumber,
          });
        } else {
          setError("Please Give The Valid Email");
        }
      })
      .catch((err) => {
        const message = err.message;
        // console.warn(message);
        if (message === "Firebase: Error (auth/user-not-found).") {
          setError("Please Create an Account");
        }
        if (message === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong Password");
          setForgetPassword(true);
        } else
          () => {
            alert(message);
          };
      });
  };

  // go to signup screen
  const onRiderSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onTrafficPolice = () => {
    navigation.navigate("TrafficPolice");
  };

  const onAdmin = () => {
    navigation.navigate("Admin");
  };

 

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.root}>
        <Heading Logo={Logo} />

        <View style={styles.gap} />

        <CustomInput
          placeholder="Email Address"
          value={email}
          setValue={setEmail}
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

        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
        {forgetPassword === true && (
          <CustomButton
            text="Forgot Password? Reset It"
            onPress={() => navigation.navigate("ConfirmEmail")}
            type="TERTIARY"
          />
        )}

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
    marginTop: "10%",
  },
  gaps: {
    marginBottom: "5%",
  },
});

export default ActorScreen;
