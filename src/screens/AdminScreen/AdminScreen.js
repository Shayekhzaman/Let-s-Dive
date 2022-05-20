import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Logo from "../../../assets/images/Logo5.png";
import Heading from "../../components/Heading";
import {Button} from 'react-native-paper';
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

import { useNavigation } from "@react-navigation/native";

import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { auth } from "../../../firebase/Admin/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const AdminScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  //   admin sign In

  const handleAdminSignIn = () => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { displayName } = res.user;
        const licenseNumber = Number(displayName);
        // console.warn(res.user);
        if (licenseNumber > 0) {
          setError(`${email} is not an Admin`);
        } else {
          navigation.navigate("AdminWork", {
            user: displayName,
          });

          setEmail("");
          setPassword("");
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

  // Admin Password reset push

  const handleAdminPasswordReset = () => {
    navigation.navigate("ConfirmEmail");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#1affd1" }}
    >
      <Heading Logo={Logo} />
      {/* bottom view */}
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={styles.title}>Admin Sign In</Text>
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
          {/* error message */}
          <View style={{ alignItems: "center" }}>
            {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
          </View>

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
            onPress={handleAdminSignIn}
            icon={require("../../../assets/icons/login.png")}
            mode="contained"
          >
            {" "}
            Sign in
          </Button>

          <CustomButton
         
            text="Forgot Password? Reset It"
            onPress={handleAdminPasswordReset}
            type="TERTIARY"
          />
          <View  style={{marginBottom:60}}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: "#aaff80",
    // bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    marginBottom: 60,
  },
  gap: {
    marginTop: "50%",
  },
});

export default AdminScreen;
