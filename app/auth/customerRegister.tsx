import { DateTimePicker, TextField, View, Button } from "react-native-ui-lib";
import { Text, Image } from "react-native-ui-lib";
import { authStyles } from "./_layout";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Alert, ScrollView } from "react-native";
import { UserRegister, UserRegisterScheme, UserType } from "@/types/auth.types";
import { ZodError } from "zod";
import { Link, router } from "expo-router";
import { StyleSheet } from "react-native";
import { useLocationModal } from "@/app/modals/choose_address_modal";
const CustomerRegisterScreenStyles = StyleSheet.create({
  scrollView: {
    ...authStyles.form,
  },
});
export default function CustomerRegisterScreen() {
  const { selectedLocation } = useLocationModal();

  const { register, loading, error, clearErrors } = useAuth();
  const [rePassword, setRePassword] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({
    fullName: null,
    userType: null,
    email: null,
    password: null,
    rePassword: null,
    addressLatitude: null,
    addressLongtitude: null,
    birthDate: null,
  });
  const [userRegister, setUserRegister] = useState<UserRegister>({
    fullName: "",
    userType: UserType.NORMAL,
    email: "",
    password: "",
    imageUrl: "https://i.ibb.co/1mbj19Q/profile-sacred.png",
    addressLatitude: 0,
    addressLongtitude: 0,
    birthDate: 0,
  });

  useEffect(() => {
    clearErrors();
  }, []);

  const onRegisterSubmit = async () => {
    try {
      clearErrors();
      if (!selectedLocation) {
        Alert.alert("Please choose address");
        return;
      }
      userRegister.addressLatitude = selectedLocation.location.lat;
      userRegister.addressLongtitude = selectedLocation.location.lng;
      const parsed = UserRegisterScheme.parse(userRegister);
      const registerResult = await register(parsed);
      console.log(parsed);
      if (registerResult) {
        router.replace("/auth/login");
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

  const onChangeField = <T extends keyof UserRegister>(key: T, value: UserRegister[T]) => {
    setUserRegister({ ...userRegister, [key]: value });
    onChangeFieldError(key, null); // remove errors when user types in for this field
  };

  const onLocationSelect = (addressLatitude: number, addressLongtitude: number) => {
    setUserRegister({ ...userRegister, addressLatitude, addressLongtitude });
  };

  const onChangeFieldError = <T extends keyof UserRegister>(
    key: T | "rePassword",
    value: string | null
  ) => {
    setFormErrors({ ...formErrors, [key]: value });
  };

  const ErrorComponent = useCallback(() => {
    if (!error) {
      return null;
    }
    const errorText = typeof error == "string" ? error : (error as any).message;
    return (
      <View>
        <Text>{errorText}</Text>
      </View>
    );
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={CustomerRegisterScreenStyles.scrollView}>
        <Text style={[authStyles.SecHeader, { fontSize: 30, marginTop: 10 }]}>
          Customer Registration
        </Text>
        <Image
          style={{ width: 120, height: 120, marginBottom: 20 }}
          source={require("../../images/logo.png")}
        />
        <View style={authStyles.textFieldContainerPrimary}>
          <Text style={authStyles.textFieldLabel}>Full Name</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <TextField
              // defaultValue="Avi"
              keyboardType="visible-password"
              placeholder="Enter full name"
              fieldStyle={authStyles.textField}
              onChangeText={(text:string) => onChangeField("fullName", text)}
              placeholderTextColor={"lightgray"}
            />
            {formErrors.fullName && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.fullName}
              </Text>
            )}
          </View>
        </View>
        <View style={authStyles.textFieldContainerPrimary}>
          <Text style={authStyles.textFieldLabel}>Email address</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <TextField
              
              placeholder="Enter Email"
              fieldStyle={authStyles.textField}
              onChangeText={(text:string) => onChangeField("email", text)}
              placeholderTextColor={"lightgray"}
            />
            {formErrors.email && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.email}
              </Text>
            )}
          </View>
        </View>
        <View style={authStyles.textFieldContainerPrimary}>
          <Text style={authStyles.textFieldLabel}>Password</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <TextField
              keyboardType="visible-password"
              
              placeholder="Enter Password"
              secureTextEntry
              onChangeText={(text:string) => onChangeField("password", text)}
              fieldStyle={authStyles.textField}
              placeholderTextColor={"lightgray"}
            />
            {formErrors.password && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.password}
              </Text>
            )}
          </View>
        </View>
        <View style={authStyles.textFieldContainerPrimary}>
          <Text style={authStyles.textFieldLabel}>Re Enter password</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <TextField
              keyboardType="visible-password"
              
              placeholder="Re Enter Password"
              secureTextEntry
              fieldStyle={authStyles.textField}
              onChangeText={(text:string) => setRePassword(text)}
              placeholderTextColor={"lightgray"}
            />
            {formErrors.rePassword && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.rePassword}
              </Text>
            )}
          </View>
        </View>
        <View style={authStyles.textFieldContainerPrimary}>
          <Text style={authStyles.textFieldLabel}>Birth Date</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <View style={[authStyles.textField, { height: 51, marginBottom: 20 }]}>
              <AntDesign name="calendar" style={authStyles.calIcn} size={24} />
              <DateTimePicker
                style={{ fontSize: 14 }}
                placeholder="DD/MM/YYYY"
                onChange={(date:Date) => {
                  
                  onChangeField("birthDate", date.getTime());
                }}
                minimumDate={new Date(Date.now() - 120 * 365 * (24 * 60 * 60 * 1000))}
                maximumDate={new Date(Date.now() - 16 * 365 * (24 * 60 * 60 * 1000))}
              />
              {formErrors.birthDate && (
                <Text red10 style={authStyles.textFieldError}>
                  {formErrors.birthDate}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[authStyles.textFieldContainerPrimary, { marginBottom: 20 }]}>
          <Text style={authStyles.textFieldLabel}>Choose Address</Text>
          <View style={authStyles.textFieldContainerSecondary}>
            <View
              style={[
                authStyles.textField,
                { flexDirection: "row", alignItems: "center", paddingHorizontal: 8 },
              ]}
            >
              <Link href="/modals">
                {selectedLocation ? (
                  <Text>{selectedLocation.name} </Text>
                ) : (
                  <Text>Choose address</Text>
                )}
              </Link>
            </View>
            {(formErrors.addressLatitude || formErrors.addressLongtitude) && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.addressLatitude}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Link href="auth/welcome" asChild>
            <Ionicons
              name="arrow-back-circle-outline"
              size={26}
              style={{ position: "absolute", top: 20, color: "#003b6f" }}
            />
          </Link>
          <View style={{ flexDirection: "row", marginLeft: 120 }}>
            <Button
              label="Register"
              onPress={onRegisterSubmit}
              labelStyle={authStyles.ReglabelStyle}
              style={authStyles.RegBtn}
            />
          </View>
        </View>
        <ErrorComponent />
      </ScrollView>
    </View>
  );
}
