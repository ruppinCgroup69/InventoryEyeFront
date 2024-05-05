import { Link } from "expo-router";
import {  TextField, View, Button } from "react-native-ui-lib";
import { Text, Image } from "react-native-ui-lib";
import { authStyles } from "./_layout";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from '@expo/vector-icons';

export default function SupplierRegisterScreen() {
  return (
    <View style={authStyles.form}>
      <Text style={[authStyles.SecHeader, { fontSize: 30, marginTop: 10 }]}>Supplier Registration</Text>
      <Image style={{ width: 120, height: 120, marginBottom: 20 }} source={require('../../images/logo.png')} />
      <View style={authStyles.textFieldContainer}>
        <Text style={authStyles.textFieldLabel}>Company Name</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter company name"
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Company Name is required"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={authStyles.textFieldContainer}>
        <Text style={authStyles.textFieldLabel}>Email address</Text>
        <TextField
          placeholder="Enter Email"
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Email address is required"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={authStyles.textFieldContainer}>
        <Text style={authStyles.textFieldLabel}>Password</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter Password"
          secureTextEntry
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Password is required"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={authStyles.textFieldContainer}>
        <Text style={authStyles.textFieldLabel}>Email address</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Re Enter Password"
          secureTextEntry
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Password is required"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={[authStyles.textFieldContainer,{marginBottom:20}]}>
        <Text style={authStyles.textFieldLabel}>Choose Address</Text>
        <View style={[authStyles.textField, { height: 53,flexDirection: 'row', alignItems: 'center' , paddingHorizontal: 8}]}>
        <GooglePlacesAutocomplete styles={{textInput:{height: '100%', flex: 1,marginVertical: 0,paddingVertical: 0,fontSize:14}}}  
          placeholder="Store Address"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          onFail={(e) => console.log(e)}
          query={{
            // Todo: Move to environment variables
            key: "AIzaSyC9bMzuBQ3M2Ot2KhuhkdFknSvzHuy9pBw",
            language: "en",
          }}
        />
        </View>
      </View >
      <View>
      <Link href="auth/welcome" asChild>
      <Ionicons name="arrow-back-circle-outline" size={26} style={{position:'absolute', top:20,color:"#003b6f"}} />
      </Link>
      <View style={{ flexDirection: 'row', marginLeft:120 }}>
      <Link href="/auth/login" asChild>
        <Button label="Register" labelStyle={authStyles.ReglabelStyle} style={authStyles.RegBtn} />
      </Link>
      </View>
      </View>
    </View>
  );
}