import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Formulario = ({
  moneda,
  criptoMoneda,
  setMoneda,
  setCriptoMoneda,
  setConsultarAPI,
}) => {
  const [criptoMonedas, setCriptoMonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCriptoMonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //almacena monedas elegidas por el usuario

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCripto = (cripto) => {
    setCriptoMoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === "" || criptoMoneda.trim() === "") {
      mostrarAlerta();
      return;
    }
    setConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "Ambos campos son obligatorios", [{ text: "OK" }]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
      >
        <Picker.Item label="-Seleccione-" value="" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Real" value="BRL" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptoMoneda}
        onValueChange={(cripto) => obtenerCripto(cripto)}
      >
        <Picker.Item label="-Seleccione-" value="" />
        {criptoMonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "LatoBlack",
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: "#5e49e2",
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: "#fff",
    fontFamily: "LatoBlack",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Formulario;
