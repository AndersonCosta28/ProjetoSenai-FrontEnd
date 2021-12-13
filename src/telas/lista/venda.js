import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import estilo from '../../estilo';
import axios from '../../axios';
import { Campo } from '../../campos'

export default function App({ route, navigation }) {

  const [listaEvento, setlistaEvento] = useState([])
  
  useEffect(() => {
    axios.get('/evento/', { responseType: "json" })
      .then(Response => {
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])

  const [listaPEssoa, setlistaPessoa] = useState([])
  useEffect(() => {
    axios.get('/dados/', { responseType: "json" })
      .then(Response => {
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])

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
        {/* <Text>{item.ingresso_inteira} - {item.ingresso_meia}</Text> */}
    
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
                          Alert.alert('Falha ao deletar a venda', '', [{ text: "Cancelar", style: "cancel" }])
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
      <TouchableOpacity style={styles.container} onPress={() => {
        axios.get('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
          .then(Response => {
            navigation.navigate('Pessoa_S', Response.data[0])
          })
          .catch(Error => console.log(Error))
      }}>
        <Text style={styles.cardText}>{item.idpessoa} - {item.nome} {item.sobrenome} - {item.numero}</Text>
        {/* <Text>{item.logradouro} -  - {item.bairro} - {item.localidade}</Text> */}
        {/* <Text>{item.email}</Text> */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {
            axios.get('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
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
                    axios.delete('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
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