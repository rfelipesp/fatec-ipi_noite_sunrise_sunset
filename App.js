import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import PrevisaoItem from './componentes/PrevisaoItem';

export default function App() {
  const endPointCord = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const endPointSunrise = "https://api.openweathermap.org/data/2.5/onecall?lang=pt_br&units=metric&";  
  const apiKey = "";

  const obterPrevisoes = () => {
    if (cidade === '') {
      ToastAndroid.show("Insira uma cidade", ToastAndroid.SHORT)
    } else {
      setPrevisoes([]);
      const target = endPointCord + cidade + '&appid=' + apiKey;
      fetch(target)
        .then((dados => dados.json()))
        .then(dados => {
          setPrevisoes(dados["list"]);
          var city = dados["city"];
          getSunrise(city.coord.lat, city.coord.lon);
          Keyboard.dismiss();
          setCity(cidade);
          setCidade('');
        });
    }
  }

  const getSunrise = (lat, lon) => {
    setSunrise([]);
    const target = endPointSunrise + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(target)
      .then((dados => dados.json()))
      .then(dados => {
        setSunrise(dados["daily"]);
      });
  }

  const [sunrise, setSunrise] = useState([]);
  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  const capturarCidade = (cidade) => {
    setCidade(cidade)
  }
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade"
          onChangeText={capturarCidade}
        />
        <Button
          title="OK"
          onPress={obterPrevisoes}
        />
      </View>
      <View>

      </View>
      <FlatList
        data={sunrise}
        renderItem={
          previsao => <PrevisaoItem previsao={previsao.item}></PrevisaoItem>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  entrada: {
    flexDirection: 'column'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    marginBottom: 4,
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 40
  }
});
