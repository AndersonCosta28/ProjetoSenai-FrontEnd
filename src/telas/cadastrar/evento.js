import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import estilo from '../../estilo';
import axios from '../../axios';
import { Campo } from '../../campos'


export default function App({ navigation }) {

  const [Evento, setEvento] = useState({ banda: '', datahora: new Date(),valor_inteira: 0, valor_meia: 0 })
  const Salvar = (navigation) => {
    console.log(JSON.stringify(Evento))
    axios.post('/evento/', Evento)
      .then(Response => {
        if (Response.data == true) {
          Alert.alert(
            "Cadastro efetuado com sucesso",
            "Clique para prosseguir",
            [{
              text: "Página inicial", onPress: () => navigation.navigate('Home'), style: "default"
            }]
          )
        }
        else {
          Alert.alert("Falha ao efetuar o cadastro", "Revise os dados antes de prosseguir", [{
            text: "Página inicial", style: "cancel"
          }])
        }
      })
      .catch(Error => console.log(Error))
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  useEffect(() => {
    setEvento(prevPreferences => { return { ...prevPreferences, datahora: date} })
  }, [date, mode, show])

  return (
    <View style={styles.container}>

      <Campo label="Nome do evento: " onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, banda: String(Text).trim() } }) }} />
      <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>Dia</Text></View>
        <TouchableOpacity onPress={showDatepicker} style={estilo.button}><Text>
          {date.toLocaleDateString('pt-br')}
        </Text></TouchableOpacity>
      </View>
      <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>Hora</Text></View>
        <TouchableOpacity onPress={showTimepicker} style={estilo.button}><Text>{date.toTimeString().substring(0, 5)}</Text></TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Campo keyboardType="number-pad" label='Valor Inteira' onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, valor_inteira: Text } }) }}></Campo>
      <Campo keyboardType="number-pad" label='Valor Meia' onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, valor_meia: Text } }) }}></Campo>
      <View style={estilo.btn_salvar}><Button onPress={() => Salvar(navigation)} title="Salvar"></Button></View>
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