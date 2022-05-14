import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Logo from "../../../assets/images/Logo6.png";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase/Admin/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const TrafficPoliceScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handlePoliceSignIn = () => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { displayName } = res.user;
        const licenseNumber = Number(displayName);
        // console.warn(res.user);
        if (licenseNumber < 100) {
          navigation.navigate("PoliceScanner");
        }
        if (licenseNumber > 100) {
          setError("Unusual Email");
        } else {
          setError("Unusual Email");
        }
      })
      .catch((err) => {
        const message = err.message;
        // console.warn(message);
        if (message === "Firebase: Error (auth/user-not-found).") {
          setError("Please Give The Valid Email");
        }
        if (message === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong Password");
        } else
          () => {
            alert(message);
          };
      });
  };

  // Police Password reset push

  const handlePolicePasswordReset = () => {
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

        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

        <CustomButton text="Sign In" onPress={handlePoliceSignIn} />

        <CustomButton
          text="Forgot Password? Reset It"
          onPress={handlePolicePasswordReset}
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
    backgroundColor: "#D5F5E3",
    height: "100%",
  },
  gap: {
    marginTop: "40%",
  },
});

export default TrafficPoliceScreen;
