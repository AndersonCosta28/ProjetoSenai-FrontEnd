import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, Text, Button } from "react-native";
import { RadioButton } from 'react-native-paper';
import axios from '../../axios';
import { Campo } from '../../campos';

export default function App({ route, navigation }) {

  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedEvent2, setSelectedEvent2] = useState();
  const [selectedPerson2, setSelectedPerson2] = useState();
  const [checked, setChecked] = useState("Inteira");
  const [lista_pessoa, setlista_pessoa] = useState([])
  const [lista_evento, setlista_evento] = useState([])
  useEffect(() => {
    axios.get('/dados/', { responseType: "json" })
      .then(Response => {
        setlista_pessoa(Response.data)
      })
      .catch(Error => console.log(Error))
    axios.get('/evento/', { responseType: "json" })
      .then(Response => {
        setlista_evento(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])

  return (
    <View style={styles.container}>
      <Text>Selecionar Evento:</Text>
      <View>
        <Picker selectedValue={selectedPerson} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}>
          {lista_pessoa.map((item, index) => {
            return (<Picker.Item label={item.nome} value={index} key={index} />)
          })}
        </Picker>
      </View>
      <Text>Selecionar Pessoa:</Text>
      <View>
        <Picker selectedValue={selectedPerson2} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedPerson2(itemValue)}>
          {lista_evento.map((item, index) => {
            return (<Picker.Item label={item.banda} value={index} key={index} />)
          })}
        </Picker>
      </View>
      <View>
        <Text>Selecionar tipo ingresso:</Text>
        <View>
          <Text>Inteira:</Text>
          <RadioButton
            value="Inteira"
            status={checked === 'Inteira' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Inteira')}
          />
        </View>
        <View>
          <Text>Meia:</Text>
          <RadioButton
            value="Meia"
            status={checked === 'Meia' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Meia')}
          />
        </View>
      </View>
      <View>
        <Button
          title="Imprimir ingresso"
          //onPress={() => Alert.alert('Ingresso sendo imprimido!')}
          onPress={() => console.log("Ingresso sendo imprimido!")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});