import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button , FlatList} from 'react-native';
import firebase from '../Connection';

export default function App() {

  const [nome, setNome] = useState("Caregando...")
  const [idade, setIdade] = useState("Caregando...")
  const [nomeF, setnomeF] = useState('')
  const [idadeF, setidadeF] = useState('')
  const [lista, setlista] = useState([])
  // useEffect (() => {

  //   async function Dados() {

  //     //Para inserir informações no banco firebase(um nó, caso exista ele atualiza)
  //     //await firebase.database().ref('tipo').set('Cliente');

  //     //Para remover o nó
  //     //await firebase.database().ref('tipo').remove();

  //     //Para inserir um novo usuario no firebase
  //    //await firebase.database().ref('usuarios').child(3).set({nome:'Lucas', cargo: 'DS'});

  //     //Para atualizar o usuario no firebase
  //     //await firebase.database().ref('usuarios').child(3).update({nome:'Luciano santos'});


  //     //await firebase.database().ref('usuarios/1/nome').on('value', (snapshot) => {
  //    /* await firebase.database().ref('usuarios/1').on('value', (snapshot) => {
  //     setNome(snapshot.val().nome)
  //     setIdade(snapshot.val().idade)
  //     });*/

  //   }

  //   Dados();

  // }, []);
  // useEffect(() => {
  //   async function Dados() {
  //     await firebase.database().ref('usuarios/3').on('value', (snapshot) => {
  //       setnomeF(snapshot.val().nome)
  //       setidadeF(snapshot.val().idade)
  //     })
  //   }
  //   Dados();
  // }, []);


  const gravar = async function () {
    await firebase.database().ref('usuarios').child(3).set({ nome: nome, idade: idade });
  }
  const ler = async function () {
    await firebase.database().ref('usuarios').on('value', (snapshot) => {
      // setnomeF(snapshot.val().nome)
      // setidadeF(snapshot.val().idade)
      let newLista = []
      let newLista2 = []
      newLista = snapshot.val().map(a => a.nome)
      newLista.forEach(element => {
        const obj = {key: element}
        newLista2.push(obj)
      });
      console.log(newLista2)
      setlista(newLista2)
    });
  }
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 25 }}> Nome do usuario: {nomeF}.</Text>
      <Text style={{ fontSize: 25 }}> Idade do usuario: {idadeF} anos.</Text>
      <TextInput placeholder="Nome" onChangeText={Text => setNome(Text)} />
      <TextInput placeholder="Idade" onChangeText={Text => setIdade(Text)} />
      <Button title="Gravar" onPress={gravar} ></Button>
      <Button title="Ler" onPress={ler}></Button>
      <FlatList
        data={lista}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
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