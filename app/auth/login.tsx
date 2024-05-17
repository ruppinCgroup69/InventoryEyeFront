import { Link, router } from "expo-router";
import { TextField, View, Button} from "react-native-ui-lib";
import { Text, Image } from "react-native-ui-lib";
import { Alert, Linking } from "react-native";
import { authStyles } from "./_layout";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { UserLogin } from "@/types/auth.types";

export default function LoginScreen() {

  // const { login, register, loading, user, error} = useAuth()

  const {login, loading,error, clearErrors} = useAuth()



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  useEffect(() => {
    clearErrors()
  }, [])
  useEffect(() => {
    if(error){
      if(typeof error === 'string')
        Alert.alert(error)
      else {
        Alert.alert((error as any).message)
      }
    }
  },[error])
  const onLoginSubmit = async () => {

    const loginDto : UserLogin = {
      email,
      password
    }

    const loginResult = await login(loginDto)
    if(loginResult) {
      router.replace("/home")
    }
  }

  const ErrorComponent = useCallback(() => {
        if(!error) {
          return null 
        }
        const errorText = typeof error == 'string' ? error : (error as any).message
        return <View>
          <Text>{errorText}</Text>
        </View>
  }, [error])

  return (
    <View style={authStyles.container}>
      
      <Text style={authStyles.SecHeader}>Login</Text>
      <Image style={{ width: 170, height: 170}} source={require('../../images/logo.png')} />
      <View style={{marginTop:20}}>
        <Text style={authStyles.LogLabel}>Email:</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter Your Email"
          fieldStyle={authStyles.textField}
          enableErrors
          onChangeText={setEmail}
          validate={["required"]}
          validationMessage={["Enter Your Email"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={{marginTop:10,marginBottom:0}}>
        <Text style={authStyles.LogLabel}>Password:</Text>
        <TextField
          keyboardType="visible-password"
          onChangeText={setPassword}
          placeholder="Enter Your Password"
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Enter Your Password"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={{marginBottom:10}}>
        <Text style={{fontFamily: "Inter_600SemiBold"}}>I forgot my password</Text>
      </View>
      <View style={{marginTop:5}} >
        <Button label="Login" onPress={onLoginSubmit}  labelStyle={authStyles.LoginlabelStyle} style={authStyles.LoginBtn} />
      </View>
      <View style={{flexDirection: "row",}}>
        <Text style={{fontFamily: "Inter_600SemiBold"}}>Don't have an account yet? </Text>
        <Link href="/auth/register" asChild>
          <Text style={{ color: '#003b6f', fontFamily: "Inter_600SemiBold" }}>
          Register Now!
          </Text>
        </Link>
        </View>

        <ErrorComponent/>
    </View>
  );
}
