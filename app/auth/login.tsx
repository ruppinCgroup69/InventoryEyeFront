import { Link, router } from "expo-router";
import { TextField, View, Button } from "react-native-ui-lib";
import { Text, Image } from "react-native-ui-lib";
import { Alert, Linking } from "react-native";
import { authStyles } from "./_layout";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { UserLogin } from "@/types/auth.types";
import { ZodError } from "zod";

export default function LoginScreen() {
  const { login, loading, error, clearErrors } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    password: null,
  });

  useEffect(() => {
    clearErrors();
  }, []);
 
  const onLoginSubmit = async () => {
    try {
      clearErrors()
      const loginDto: UserLogin = {
        email,
        password,
      };

      const loginResult = await login(loginDto);
      console.log(loginResult)
      if (loginResult) {
        router.replace("/home");
      }
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.issues
          .map((issue) => {
            const { path, message } = issue;
            const fieldName = path.join(".");
            return { [fieldName]: message };
          })
          .reduce((prev, next) => ({ ...prev, ...next }), {});
        setFormErrors({ ...formErrors, ...errors });
        console.error(errors);
      } else {
        // Handle other errors
        console.error(e);
      }
    }
  };

  const ErrorComponent = useCallback(() => {
    if (!error) {
      return null;
    }
    const errorText = typeof error == "string" ? error : (error as any).message;
    const normalized = errorText === 'Network Error' ? "Incorrect email or password" : "Unknown error, please check your network connection"
    return (
      <View>
        <Text red10 style={{padding: 8}}>{normalized}</Text>
      </View>
    );
  }, [error]);

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.SecHeader}>Login</Text>
      <Image style={{ width: 170, height: 170 }} source={require("../../images/logo.png")} />
      <View style={{ marginTop: 20 }}>
        <Text style={authStyles.LogLabel}>Email:</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter Your Email"
          fieldStyle={authStyles.textField}
          onChangeText={setEmail}
          placeholderTextColor={"lightgray"}
        />
        {formErrors.email && (
          <Text red10 style={authStyles.textFieldError}>
            {formErrors.email}
          </Text>
        )}
      </View>
      <View style={{ marginTop: 10, marginBottom: 0 }}>
        <Text style={authStyles.LogLabel}>Password:</Text>
        <TextField
          keyboardType="visible-password"
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Enter Your Password"
          fieldStyle={authStyles.textField}
          placeholderTextColor={"lightgray"}
        />
        {formErrors.password && (
          <Text red10 style={authStyles.textFieldError}>
            {formErrors.password}
          </Text>
        )}
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text /*style={{fontFamily: "Inter_600SemiBold"}}*/>I forgot my password</Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Button
          label="Login"
          onPress={onLoginSubmit}
          labelStyle={authStyles.LoginlabelStyle}
          style={authStyles.LoginBtn}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text /*style={{fontFamily: "Inter_600SemiBold"}}*/>Don't have an account yet? </Text>
        <Link href="/auth/register" asChild>
          <Text style={{ color: "#003b6f" /*fontFamily: "Inter_600SemiBold"*/ }}>
            Register Now!
          </Text>
        </Link>
      </View>

      <ErrorComponent />
    </View>
  );
}
