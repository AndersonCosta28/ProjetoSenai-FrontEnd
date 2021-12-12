import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import estilo from './src/estilo';
import axios from './src/axios';


/*export default App*/const App = ({navigation}) => {

  const [Evento, setEvento] = useState({banda: '', datahora: ''})
  const Salvar = (navigation) => {
    console.log(JSON.stringify(Evento))
  axios.post('/dados/', Evento)
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
                      alerta("Falha ao efetuar o cadastro", "Revise os dados antes de prosseguir", [{
                          text: "Página inicial", style: "cancel"
                      }])
                  }
              })
              .catch(Error => console.log(Error))
      }
  return (
    <View style={styles.container}>

      <Campo label="Nome do evento: " onChangeText={Text => {setEvento(prevPreferences => {return {...prevPreferences, banda: String(Text).trim()}})}} />
      
      <Campo label="Data: " onChangeText={Text => {setEvento(prevPreferences => {return {...prevPreferences, datahora: String(Text).trim()}})}} />
      <Campo label="Hora: " onChangeText={Text => {setEvento(prevPreferences => {return {...prevPreferences, datahora: String(Text).trim()}})}} />
      <View style = {estilo.btn_salvar}><Button onPress={() => Salvar(navigation)} title="Salvar"></Button></View>
    </View>
  );
  
}

// const Ola = ({ ...props }) => {
//     <DatePicker style={{ width: 200 }} date={new Date()} mode="date" placeholder="select date" format="YYYY-MM-DD" minDate="2016-05-01" maxDate="2016-06-01" confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
//       dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 } }} />
    
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

const Campo = ({ label, ...props }) => (
  <View style={estilo.t}>
    <View style={estilo.t_view_text}><Text style={estilo.t_text}>{label}</Text></View>
    <View><TextInput style={estilo.input} {...props} ></TextInput></View>
  </View>
)
export default App