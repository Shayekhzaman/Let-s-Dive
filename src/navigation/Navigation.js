import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ActorScreen from "../screens/ActorScreen";
import RiderScreen from "../screens/RiderScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import TrafficPoliceScreen from "../screens/TrafficPoliceScreen";
import AdminScreen from "../screens/AdminScreen";
import AdminWork from "../screens/AdminWork";
import AddRider from "../screens/AddRider";
import UpdateRider from "../screens/UpdateRider";
import RiderDetails from "../screens/RiderDetails";
import EditRiderDetails from "../screens/EditRiderDetails";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Actor" component={ActorScreen} />
        <Stack.Screen name="Rider" component={RiderScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="TrafficPolice" component={TrafficPoliceScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="AdminWork" component={AdminWork} />
        <Stack.Screen name="AddRider" component={AddRider} />
        <Stack.Screen name="UpdateRider" component={UpdateRider} />
        <Stack.Screen name="RiderDetails" component={RiderDetails} />
        <Stack.Screen name="EditRider" component={EditRiderDetails}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
