import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, Text, Button, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import axios from '../../axios';



export default function App() {
  const [selectedEvent, setSelectedEvent] = useState("Show 1");
  const [selectedPerson, setSelectedPerson] = useState("Pessoa 1");
  const [checked, setChecked] = useState("Inteira");
  const [lista, setlista] = useState([])
  useEffect(() => {
    axios.get('/dados/', { responseType: "json"})
      .then(Response => {
        setlista(Response.data)
      })
      .catch(Error => console.log(Error))
  }, [])
  function listar(){

  }
  return (
    <View style={styles.container}>
      <Text>Selecionar Evento:</Text>
      <View>
        <Picker selectedValue={selectedPerson} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}>
          <Picker.Item label="Show 1" value="Show1" />
          <Picker.Item label="Show 2" value="Show2" />
        </Picker>
      </View>
      <Text>Selecionar Pessoa:</Text>
      <View>
        <Picker selectedValue={selectedEvent} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedEvent(itemValue)}>
          {<Picker.Item label="Pessoa 1" value="Pessoa 1" />
          <Picker.Item label="Pessoa 2" value="Pessoa 2" />}
          
        </Picker>
      </View>
      <View></View>
      <Text>Selecionar tipo ingresso:</Text>
      <Text>Inteira:</Text>
      <RadioButton
        value="Inteira"
        status={checked === 'Inteira' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('Inteira')}
      />
      <Text>Meia:</Text>
      <RadioButton
        value="Meia"
        status={checked === 'Meia' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('Meia')}
      />

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