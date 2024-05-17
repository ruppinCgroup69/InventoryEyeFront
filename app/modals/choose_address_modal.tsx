import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native-ui-lib";

const LocationModalContext = React.createContext<any>(null);

export const LocationModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  return (
    <LocationModalContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationModalContext.Provider>
  );
};
export const useLocationModal = () => {
  const context = React.useContext(LocationModalContext);
  if (!context) {
    throw new Error("useLocationModal used outside of LocationModalContext");
  }
  return context;
};

export default function ChooseAddress() {
  const { setSelectedLocation } = useLocationModal();
  const getPlaceGeometryId = async (id: string) => {
    try {
      const { results } = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=AIzaSyBkC2aOxt-ilf1o8ff06iJb5UeJ1GvSVWk`
        )
        .then((r) => r.data);
      if (results && results.length > 0) return results[0]?.geometry?.location;
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <View style={{ flex: 1 , padding:8}}>
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            height: "100%",
            flex: 1,
            marginVertical: 0,
            paddingVertical: 0,
            fontSize: 14,
          },
        }}
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        placeholder="Address"
        onPress={async (data, details = null) => {
          if (!details) return;
          const location = await getPlaceGeometryId(details.place_id);
          if (location) {
            setSelectedLocation({ location, name: (details as any).description });
            router.back();
          }
        }}
        onFail={(e) => console.log(e)}
        query={{
          // Todo: Move to environment variables
          key: "AIzaSyC9bMzuBQ3M2Ot2KhuhkdFknSvzHuy9pBw",
          language: "en",
        }}
      />
    </View>
  );
}
