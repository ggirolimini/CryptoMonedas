import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import axios from "axios";

export default function App() {
  const [moneda, setMoneda] = useState("");
  const [criptoMoneda, setCriptoMoneda] = useState("");
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        //consultar la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`; // se reemplaza desppues fsyms y tsyms con ${moneda o criptomoneda}
        const resultado = await axios.get(url);
        setCargando(true);
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );
  return (
    <>
      <ScrollView>
        <Header />
        <Image
          source={require("./assets/img/cryptomonedas.png")}
          style={styles.imagen}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptoMoneda={criptoMoneda}
            setMoneda={setMoneda}
            setCriptoMoneda={setCriptoMoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        {componente}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
