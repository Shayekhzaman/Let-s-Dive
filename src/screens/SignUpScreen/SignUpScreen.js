import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Logo from "../../../assets/images/Logo7.png";
import Heading from "../../components/Heading";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {auth} from '../../../firebase/Admin/firebase.config';

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";



import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
   
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [drivingLicense, setDrivingLicenseNumber] = useState("");

  const [rider, setRider] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const licenseNumber = Number(drivingLicense)
// console.warn(typeof drivingLicense)
  const onRegisterPressed = () => {
    fetch(`http://192.168.31.160:5000/get/${drivingLicense}/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRider(data);

        if (data.name !== undefined) {
          setError("");
          handleSignUp();
        } else if (data.name === undefined) {
          setError("Please Give The Valid License Number");
        }
      })
      .catch((err) => {
        setError("License Number Required");
        // console.warn(err);
      });
  };

  //   Rider Sign Up
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { email } = res.user;
        handleEmailVerification();
        handleTakeUserDetails();
        alert(`Create account Successfully. please check the mail on ${email} `);
        navigation.navigate("Actor");
       
      })
      .catch((err) => {
        const message = err.message;
        console.warn(err)
        setError(message);
      });
  };

  //   Email verification
  const handleEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {})
      .catch((err) => {});
  };

  //   Take user details
  const handleTakeUserDetails = () => {
    updateProfile(auth.currentUser, { displayName: drivingLicense })
      .then((result) => {})
      .catch((err) => {
        console.warn(err.message);
      });
  };



  // terms alert
  const onTermsUsePressed = () => {
    alert("Your given information will be use");
  };

  const onPrivacyPressed = () => {
    alert("Your information will be stored");
  };

  const onSignInPressed = () => {
    navigation.navigate("Actor");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Heading Logo={Logo} />

        <Text style={styles.title}>Create an accounts</Text>

        {/* <CustomInput
          placeholder="Username"
          value={userName}
          setValue={setUserName}
          // secureTextEntry={false}
        /> */}

        <CustomInput
          placeholder="Email"
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

        <CustomInput
          placeholder="Driving License Number"
          value={drivingLicense}
          setValue={setDrivingLicenseNumber}
          secureTextEntry={false}
          // or just secureTextEntry
        />

        {rider.name === undefined && (
          <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>
        )}

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsUsePressed}>
            Terms of Use{"  "}
          </Text>
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
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
  logo: {
    width: "50%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignUpScreen;
