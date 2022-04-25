import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Card, FAB, Button, TextInput } from "react-native-paper";
import { auth } from "../../../firebase/Admin/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const AdminWork = (props) => {
  const { user } = props.route.params;
  if (user === undefined) {
    console.warn("null");
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //   sign up
  const addAdmin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { email } = res.user;
        handleEmailVerification();
        handleUpdateUser();
        alert(
          `${email} is Admin Now. Please check the email and verified asap`
        );
      })
      .catch((err) => {
        const message = err.message;
        if (
          message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          alert("Weak password: should be at least 6 characters");
        }
        if (message === "Firebase: Error (auth/email-already-in-use).") {
          alert("Already in use, Try another one");
        } else
          () => {
            alert(message);
          };
      });
  };

  //   update user profile
  const handleUpdateUser = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then((result) => {})
      .catch((err) => {
        console.warn(err.message);
      });
  };

  //   Email verification
  const handleEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {})
      .catch((err) => {});
  };

  // go to add rider screen

  const addRider = () => {
    // alert("click")
    navigation.navigate("AddRider");
  };

  // go to update screens
  const updateRider = () => {
    // alert("click");
    navigation.navigate("UpdateRider");
  };

  const handleLogout = () => {
    navigation.navigate("Actor");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.gap} />

        <View>
          <Text style={styles.title}>Admin Panel</Text>
          {user != undefined && <Text style={styles.user}>Hello {user}</Text>}

          <Text
            style={{
              marginLeft: 10,
              fontSize: 13,
              fontWeight: "bold",
              marginTop: 37,
            }}
          >
            Make an Admin
          </Text>
        </View>
        <View style={styles.root}>
          <CustomInput
            placeholder="User Name"
            value={name}
            setValue={setName}

            //   secureTextEntry={false}
          />

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

          <View style={styles.gap} />

          <CustomButton text="Add Admin" onPress={addAdmin} />
        </View>
      </View>
      <Text style={{ textAlign: "center", marginTop: 60, color: "#EF0EA4" }}>
        Handle New Rider Account{" "}
      </Text>
      <View style={{ marginTop: 60, backgroundColor: "#D3D6F9", height: 180 }}>
        <View style={styles.btnStyle}>
          <Button
            style={{ width: 206 }}
            onPress={updateRider}
            icon="update"
            mode="contained"
          >
            {" "}
            Update Rider
          </Button>

          <Button
            style={{ width: 207 }}
            onPress={addRider}
            icon="plus"
            mode="contained"
          >
            {" "}
            Add New Rider
          </Button>
        </View>
        
      </View>
      <Button
            style={{ width: 150, backgroundColor:"red", marginLeft:'auto', marginRight:'auto', marginTop:5}}
            onPress={handleLogout}
            icon="logout"
            mode="contained"
          >
            {" "}
            Logout
          </Button>
    </ScrollView>
  );
};

export default AdminWork;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9EBEA",
    marginTop: 22,
  },
  gap: {
    marginTop: "5%",
  },
  title: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "bold",
    color: "#051C60",
    backgroundColor: "#FE9B93",
    // marginTop: 30,
    height: 60,
  },
  user: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
    color: "#EF0EA4",
    marginTop: 25,
    marginRight: 12,
    // color:
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    paddingTop: 60,
  },
});
