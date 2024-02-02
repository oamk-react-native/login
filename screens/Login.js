import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication'

const STORAGE_KEY = 'login'

export default function Login({navigation}) {
  const [formData, setFormData] = useState({username: '',password: ''})

  useEffect(() => {
    //AsyncStorage.clear()
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log(compatible)
    })()


    getData()
  }, [])
  

  const login = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (formData.username.match(validRegex) && formData.password.length >= 8) {
      storeLogin(formData)
      navigation.navigate('Home')
    }
  }

  const storeLogin = async (value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(value))
    } catch (ex) {
      console.log(ex)
    }
  }

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json!== null) {
        setFormData(json)
        //const user = {username: json.username,password: json.password}
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const loginWithTouchId = async() => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });
    if (result.success === true) {
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        label="Username"
        mode="outlined"
        keyboardType='email-address'
        style={styles.input_field}
        value={formData.username}
        onChangeText={text => setFormData({...formData,username: text})}
      />
      <TextInput 
        label="Password"
        mode="outlined"
        style={styles.input_field}
        value={formData.password}
        onChangeText={text => setFormData({...formData,password: text})}
      />
      <Button style={styles.button} mode="contained" onPress={login}>Submit</Button>
      <Button style={styles.button} mode="outlined" onPress={loginWithTouchId}>Login with touch id</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8
  },
  input_field: {
    width: '100%',
    marginVertical: 8,
  },
  button: {
    width: '100%',
    marginTop: 16, 
  }
});