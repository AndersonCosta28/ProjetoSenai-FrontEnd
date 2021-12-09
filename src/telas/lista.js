import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { Icon } from 'react-native-elements'
import axios from 'axios';


//style={{ backgroundColor: '#2089dc', width: 70, height: 40, marginLeft: 100, alignItems: 'center', justifyContent: 'center' }}


export default function App({ navigation }) {
  const [lista, setlista] = useState([])
  useEffect(() => {
    axios.get('https://projetosenai-backend.herokuapp.com/dados', { responseType: "json" })
      .then(Response => {
        //console.log(Response.data)
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])
  return (
    <View>
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
        axios.get('https://projetosenai-backend.herokuapp.com/dados', { responseType: "json", params: { idpessoa: item.idpessoa } })
          .then(Response => {
            navigation.navigate('Pessoa_S', Response.data[0])
          })
          .catch(Error => console.log(Error))
      }}>
        <Text style={styles.cardText}>{item.idpessoa} - {item.nome} {item.sobrenome}</Text>
        <Text>{item.logradouro} - {item.numero} - {item.bairro} - {item.localidade}</Text>
        <Text>{item.email}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {
            axios.get('https://projetosenai-backend.herokuapp.com/dados', { responseType: "json", params: { idpessoa: item.idpessoa } })
              .then(Response => {
                navigation.navigate('Pessoa_U', Response.data[0])
              })
              .catch(Error => console.log(Error))
          }}><Icon raised name='pencil' type='font-awesome' color='#2089dc' /></TouchableOpacity>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {
            Alert.alert("Deletar", `Deseja deletar o usuário ${item.idpessoa}?`,
              [
                {
                  text: "Cancelar", style: "cancel"
                },
                {
                  text: "Deletar", style: "default", onPress: () => {
                    axios.delete('https://projetosenai-backend.herokuapp.com/dados', { responseType: "json", params: { idpessoa: item.idpessoa } })
                      .then(Response => {
                        if (Response.data) {
                          navigation.navigate('Home')
                        }
                        else {
                          Alert.alert('Falha ao deletar a pessoa', '', [{ text: "Cancelar", style: "cancel" }])
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