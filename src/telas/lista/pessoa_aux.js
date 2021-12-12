import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { Icon } from 'react-native-elements'
import axios from '../../axios';
import estilo from '../../estilo'

export default function App({ navigation }) {
  const [lista, setlista] = useState([])
  useEffect(() => {
    axios.get('/dados/', { responseType: "json" })
      .then(Response => {
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])

  return (
    <View>
      <TextInput placeholder="Digite no nome Aqui" style={estilo.input} onChangeText={(Text) => {
        const nome = String(Text).trim();
        axios.get('/GetNome/', { responseType: "json", params: { nome: nome } })
          .then(Response => {
            console.log(Response.data)
            setlista(Response.data)
          })
          .catch(Error => console.log(Error))
      }}
      ></TextInput>
      <FlatList
        data={lista}
        renderItem={({ item, index }) => CardItem(item, index, navigation)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const CardItem = (item, index, navigation) => {
  return (
    <View >
      <TouchableOpacity style={styles.container} onPress={() => {
        axios.get('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
          .then(Response => {
              navigation.state.params.onPlaceChosen('123');
              navigation.pop();
          })
          .catch(Error => console.log(Error))
      }}>
        <Text style={styles.cardText}>{item.idpessoa} - {item.nome} {item.sobrenome}</Text>
        <Text>{item.logradouro} - {item.numero} - {item.bairro} - {item.localidade}</Text>
        <Text>{item.email}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#d6cece'
  },
  cardText: {
    fontSize: 24
  }
});