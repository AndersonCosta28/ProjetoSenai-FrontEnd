import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Tile } from 'react-native-elements';


export default function App({ navigation }) {

  const [email, setEmail] = useState(null)
  //const [email, setEmail] = useState("")
  const [password, setPassword] = useState(null)

  const entrar = () => {
    console.log("entrou")
    console.log(email)
    console.log(password)
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'beige',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  const requisicao = () => {
    axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    // axios.get('http://localhost:3000/dados', { responseType: "json", params: {nome: "Teste"} })
    //   .then(Response => console.log(Response.data))
    //   .catch(Error => console.log(Error))
    axios.get('http://localhost:3000/dados', { responseType: "json", params: { id: 1 } })
      .then(Response => console.log(" <-->" + Response.data))
      .catch(Error => console.log(Error))

      // axios({
      //   method: 'get',
      //   url: 'http://localhost:3000/dados/',
      //   responseType: 'JSON',
      //   params: {id: 1}
      // })
      //   .then(function (response) {
      //     console.log(response.data)
      //   })
      //   .catch(e=> {
      //     console.log(e)
      //   })
  }

  return (
    <View style={styles.container}>
      <Text style={styles} h1 >Seja bem-vindo</Text>
      <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        style={styles}
        onChangeText={value => setEmail(value)}
        KeyboardType="email-adress"
      />

      <Input
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        style={styles}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        icon={
          <Icon name="arrow-right" size={15} color="white" />
        } title="Entrar"
        onPress={() => {
          requisicao()
          navigation.navigate('Home')
        }}
      />
      <Text>Esqueceu a senha</Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
