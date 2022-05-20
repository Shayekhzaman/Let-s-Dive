import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#ffffff" }}
    >
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../assets/images/Logo4.png")}
            style={{ height: 270, width: 190 }}
          />
        </View>
      </ImageBackground>

      {/* Bottom */}

      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: "#4632A1", fontSize: 34 }}>Welcome</Text>
          <Text>
            Don't have an account?
            <Text
              style={{
                color: "#004d00",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
              onPress={onRiderSignUpPressed}
            >
              {" "}
              Register now
            </Text>
          </Text>

          {/* input view */}
          <View style={{ marginTop: 50 }}>
            <TextInput
              style={styles.input}
              label="Name"
              // mode="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              label="Password"
              // mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />

            {/* error and forgot pass word view */}
            <View style={{ alignItems: "center" }}>
              {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
              {forgetPassword === true && (
                <Text onPress={() => navigation.navigate("ConfirmEmail")}>
                  {" "}
                  Forgot Password?{" "}
                  <Text style={{ color: "#66004d" }}>Reset It </Text>
                </Text>
              )}
            </View>

            <Button
              style={{
                width: 270,
                backgroundColor: "#000066",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 45,
                marginBottom: 15,
                borderRadius: 20,
              }}
              onPress={onSignInPressed}
              icon="login"
              mode="contained"
            >
              {" "}
              Sign in
            </Button>

            {/* traffic and admin view */}
            <View style={styles.buttonStyle}>
              <Button
                style={{
                  // width: 270,
                  backgroundColor: "#cc3300",
                  marginLeft: "auto",
                  marginRight: "auto",
                  // marginTop: 45,
                  // marginBottom: 15,
                  borderRadius: 20,
                }}
                onPress={onTrafficPolice}
                icon={require("../../../assets/icons/police.png")}
                mode="contained"
              >
                {" "}
                police
              </Button>
              <Button
                style={{
                  // width: 270,
                  backgroundColor: "#002080",
                  marginLeft: "auto",
                  marginRight: "auto",
                  // marginTop: 45,
                  // marginBottom: 15,
                  borderRadius: 20,
                }}
                onPress={onAdmin}
                icon={require("../../../assets/icons/admin.png")}
                mode="contained"
              >
                {" "}
                admin
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#ffffff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  input: {
    margin: 5,
    borderColor: "#7a42f4",
    borderBottomWidth: 2,
    height: 55,
    backgroundColor: "#ffffff",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    paddingTop: 60,
  },
});

export default ActorScreen;
