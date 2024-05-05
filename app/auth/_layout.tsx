import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Colors, Spacings as S } from "react-native-ui-lib";
const Spacings = S as any;

export const authStyles = StyleSheet.create({
  Btn: {
    backgroundColor: 'white',
    width: 300,
    marginBottom:20,
    borderWidth: 2,
    borderColor: '#4ab7fd',
  },
  RegBtn:{
    backgroundColor: 'white',
    width: 200,
    marginBottom:20,
    borderWidth: 2,
    borderColor: '#4ab7fd'
  },
  ReglabelStyle:{
    color: '#003b6f',
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
    padding:3
  },
  LoginBtn:{
    backgroundColor: 'white',
    width: 200,
    marginBottom:20,
    borderWidth: 2,
    borderColor: '#4ab7fd'
  },
  LoginlabelStyle:{
    color: '#003b6f',
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
    padding:3
  },
  labelStyle: {
    color: '#003b6f',
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
    padding:3
  },
  LogBtn: {
    borderWidth: 2,
    borderColor: '#4ab7fd',
    marginBottom:35,
    backgroundColor: '#4ab7fd',
    width: 300,
  },
  LoglabelStyle: {
    fontSize: 25,
    fontFamily:'Inter_600SemiBold',
    padding:3
  },
  calIcn:{
    color:"rgba(0, 59, 111, 0.8)",
    position: 'absolute',
    right: 35,
    top:10,
  },
  backIcon: {
    position: 'absolute',
    left: 35,
    top: 625,
     color:"#003b6f"
  },
  SecHeader:{
    fontFamily: "Inter_600SemiBold",
    color: '#003b6f',
    fontSize: 40,
    marginBottom: 10
  },
  Header: {
    fontFamily: "Inter_600SemiBold",
    color: '#003b6f',
    fontSize: 50,
    marginBottom: 30
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50
  },
  form: {
    flex: 1,
    flexDirection: "column",
    padding: Spacings.text / 2,
    justifyContent: "flex-start",
    alignItems:"center"
  },
  textField: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: '#4ab7fd',
    borderRadius: 32,
      width: 250,
      padding: Spacings.text,
  },
  textFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPlain: {
    color: Colors.black,
    padding: Spacings.page,
    flex: 0.2,
    fontSize: 16,
  },
  LogLabel:{
    color: Colors.black,
    fontFamily: "Inter_600SemiBold",
    marginBottom:7,
    marginLeft:23,
    fontSize:18
  },
  textFieldLabel: {
    color: Colors.black,
    fontFamily: "Inter_600SemiBold",
    paddingHorizontal: Spacings.text / 2,
    fontSize: 14,
    width:120
  },
  label: {
    color:'#4ab7fd',
    fontFamily: "Inter_400Regular",
    padding: Spacings.text,
    fontSize: 20,
    marginTop: Spacings.page,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: Colors.primaryBlue,
    backgroundColor: "white",
    width: 300,
    margin: Spacings.text,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    fontSize: 20,
    padding: Spacings.text,
  },
});
export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="customerRegister" />
      <Stack.Screen name="supplierRegister" />
    </Stack>
  );
}
