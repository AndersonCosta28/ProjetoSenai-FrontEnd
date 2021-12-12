import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import estilo from '../../estilo';
import axios from '../../axios';
import { Campo } from '../../campos'


export default function App({ route, navigation }) {

  const [Evento, setEvento] = useState({ banda: '', datahora: new Date(), valor_inteira: 0, valor_meia: 0 })
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    console.log(currentDate)
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setEvento(prevPreferences => { return { ...prevPreferences, datahora: currentDate }})
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
    const { banda, datahora, idevento, ingresso_inteira, ingresso_meia } = route.params
    setEvento({ banda: banda, valor_inteira: ingresso_inteira, valor_meia: ingresso_meia, idevento: idevento, datahora: datahora })
    setDate(new Date(datahora))
  }, [])
  const Salvar = (navigation) => {
    setEvento(prevPreferences => { return { ...prevPreferences, datahora: date }})
    console.log(JSON.stringify(Evento))
    axios.put('/evento/', Evento)
      .then(Response => {
        if (Response.data == true) {
          Alert.alert(
            "Atualização efetuada com sucesso",
            "Clique para prosseguir",
            [{
              text: "Página inicial", onPress: () => navigation.navigate('Home'), style: "default"
            }]
          )
        }
        else {
          Alert.alert("Falha ao Atualizar o cadastro", "Revise os dados antes de prosseguir", [{
            text: "Página inicial", style: "cancel"
          }])
        }
      })
      .catch(Error => console.log(Error))
  }
  return (
    <View style={styles.container}>
      <Campo editable ={false} label='ID' editable ={false} defaultValue = {String(Evento.idevento)}></Campo>
      <Campo editable ={false} defaultValue={Evento.banda} label="Nome do evento: " onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, banda: String(Text).trim() } }) }} />
      <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>Dia</Text></View>
        <TouchableOpacity onPress={showDatepicker} style={estilo.button}><Text>{date.toLocaleDateString('pt-br')}</Text></TouchableOpacity>
      </View>
      <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>Hora</Text></View>
        <TouchableOpacity  style={estilo.button}><Text>{date.toTimeString().substring(0, 5)}</Text></TouchableOpacity>
      </View>
      <Campo editable ={false} defaultValue={Evento.valor_inteira} keyboardType="number-pad" label='Valor Inteira' onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, valor_inteira: Text } }) }}></Campo>
      <Campo editable ={false} defaultValue={Evento.valor_meia} keyboardType="number-pad" label='Valor Meia' onChangeText={Text => { setEvento(prevPreferences => { return { ...prevPreferences, valor_meia: Text } }) }}></Campo>
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