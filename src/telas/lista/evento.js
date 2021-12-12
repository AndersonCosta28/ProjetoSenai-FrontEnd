import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { Icon } from 'react-native-elements'
import axios from '../../axios';
import estilo from '../../estilo'

export default function App({ navigation }) {
  const [lista, setlista] = useState([])
  useEffect(() => {
    axios.get('/evento/', { responseType: "json" })
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
        axios.get('/evento/', { responseType: "json", params: { idevento: item.idevento } })
          .then(Response => {
            navigation.navigate('evento_S', Response.data[0])
          })
          .catch(Error => console.log(Error))
      }}>
        <Text style={styles.cardText}>{item.idevento} - {item.banda}</Text>
        <Text>{item.ingresso_inteira} - {item.ingresso_meia}</Text>
        <Text>{item.email}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {
            axios.get('/evento/', { responseType: "json", params: { idevento: item.idevento } })
              .then(Response => {
                navigation.navigate('evento_U', Response.data[0])
              })
              .catch(Error => console.log(Error))
          }}><Icon raised name='pencil' type='font-awesome' color='#2089dc' /></TouchableOpacity>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {
            Alert.alert("Deletar", `Deseja deletar o usuário ${item.idevento}?`,
              [
                {
                  text: "Cancelar", style: "cancel"
                },
                {
                  text: "Deletar", style: "default", onPress: () => {
                    axios.delete('/evento/', { responseType: "json", params: { idevento: item.idevento } })
                      .then(Response => {
                        if (Response.data) {
                          navigation.navigate('Home')
                        }
                        else {
                          Alert.alert('Falha ao deletar o evento', '', [{ text: "Cancelar", style: "cancel" }])
                        }
                      })
                      .catch(Error => Error)
                  }
                }
              ])
          }

          }><Icon raised name='trash' type='font-awesome' color='#2089dc' /></TouchableOpacity>
        </View>
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