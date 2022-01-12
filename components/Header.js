import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { useFonts } from "expo-font"; //para usar fuentes externas

export default function Header() {
  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={styles.encabezado}>Criptomonedas</Text>;
}

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === "ios" ? 50 : 50, //es para usar diferentes plataformas O SEA aPPLE aNDROID
    fontFamily: "LatoBlack",
    backgroundColor: "#5e49e2",
    paddingBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    color: "#FFF",
    marginBottom: 30,
  },
});
