import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Alert, FlatList } from "react-native";
import estilo from '../../estilo';
import axios from '../../axios';

export default function App({ route, navigation }) {
  const [lista, setlista] = useState('');
  useEffect(() => {
    axios.get('/venda/', { responseType: "json" })
      .then(Response => {
        console.log(Response.data)
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])
  return (
    <View>
      <FlatList
        data={lista}
        renderItem={({ item, index }) => CardItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const CardItem = (item, index) => {
  return (
    <View >
      <TouchableOpacity style={styles.container} >
        <Text style={styles.cardText}>{item.idvenda}</Text>
        <Text>{item.nome} - {item.telefone}</Text>
        <Text>{item.tipo_ingresso} - R$ {item.valor_ingresso}</Text>
        <Text>{item.banda} - {new Date(item.datahora).toLocaleDateString()} - {new Date(item.datahora).toLocaleTimeString()}</Text>
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