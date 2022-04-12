import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/Logo7.png';
import Heading from '../../components/Heading';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [DrivingLicense, setDrivingLicenseNumber] = useState('');
 
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const onRegisterPressed= () =>{
        navigation.navigate('ConfirmEmail');
    };


    const onTermsUsePressed =() =>{
        console.warn("Your given information will be use");
    };

    const onPrivacyPressed = () =>{
        console.warn("Your information will be stored");
    }

    const onSignInPressed = () =>{
        navigation.navigate('Actor');
    }


    return (
        <ScrollView showsVerticalScrollIndicator ={false}>
         <View style = {styles.root}>
            
            <Heading
                Logo={Logo}
            />

            
            <Text style = {styles.title}>Create an accounts</Text>
        
            <CustomInput
                placeholder="Username"
                value={userName}
                setValue={setUserName}
                // secureTextEntry={false} 
            />

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
                value={DrivingLicense} 
                setValue={setDrivingLicenseNumber} 
                secureTextEntry={true}
                // or just secureTextEntry 
            />

            <CustomButton
                text="Register"
                onPress={onRegisterPressed}
            />

            <Text style={styles.text}>
                By registering, you confirm that you accept our{' '} 
                <Text style={styles.link} onPress={onTermsUsePressed}>
                    Terms of Use{'  '}
                </Text> 
                and {' '} 
                <Text style={styles.link}  onPress={onPrivacyPressed}>Privacy Policy
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
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text:{
        color:'gray',
        marginVertical:10,
    },
    link:{
        color:'#FDB075',

    },
    logo: {
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
    },
});


export default SignUpScreen;