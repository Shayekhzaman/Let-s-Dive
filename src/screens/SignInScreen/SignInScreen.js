import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo8.png';
import Heading from '../../components/Heading';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    


    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignPressed= () =>{
    //    validate user 
        navigation.navigate('Home');
    };

    const onForgotPasswordPressed = () =>{
        navigation.navigate('ForgotPassword');
    };

  
    const onSignUpPressed = () =>{
        navigation.navigate('SignUp');
    }

    return (
        
        <ScrollView showsVerticalScrollIndicator ={false}>
         <View style = {styles.root}>
            
            <Image
            source = {Logo}
            style = {styles.logo, {height: height * 0.3}}
            resizeMode = 'contain'
            />
        
            <CustomInput
                placeholder="Username"
                value={userName}
                setValue={setUserName}
                // secureTextEntry={false} 
            />

            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
                // or just secureTextEntry 
            />

            <CustomButton
                text="Sign In"
                onPress={onSignPressed}
            />

            <CustomButton
                text="Forgot Password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
            />

            <SocialSignInButtons></SocialSignInButtons>

            <CustomButton
                text="Don't have an account? Create one"
                onPress={onSignUpPressed}
                type="TERTIARY"
            />
          </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
    },
});


export default SignInScreen;