import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Logo from "../../../assets/images/Logo6.png";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase/Admin/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-native-paper";

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
          setError("");
          setEmail("");
          setPassword("");
        }
        if (licenseNumber > 100) {
          setError("Please give the valid Email");
        }
        else{
          setError("Unusual Email");
        }
      })
      .catch((err) => {
        const message = err.message;
        console.warn(message);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#ccccff" }}
    >
      <Heading Logo={Logo} />

      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={styles.title}>Traffic Police Sign In</Text>
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
          {/* error */}
          <View style={{ alignItems: "center" }}>
            {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
          </View>

          {/* <CustomButton text="Sign In" onPress={handlePoliceSignIn} /> */}
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
            onPress={handlePoliceSignIn}
            icon={require("../../../assets/icons/login.png")}
            mode="contained"
          >
            {" "}
            Sign in
          </Button>

          <CustomButton
            text="Forgot Password? Reset It"
            onPress={handlePolicePasswordReset}
            type="TERTIARY"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: "#e6faff",
    // bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    marginTop: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    marginBottom: 60,
  },
});

export default TrafficPoliceScreen;
