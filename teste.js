import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, Text } from "react-native";
import axios from './src/axios'

export default function App() {
    const [selectedEvent, setSelectedEvent] = useState("Show 1");
    const [selectedPerson, setSelectedPerson] = useState("Pessoa 1");
    const [lista, setlista] = useState([]);
    useEffect(() => {
        axios.get('/dados/', { responseType: "json" })
          .then(Response => {
            setlista(Response.data)
          })
          .catch(Error => console.log(Error))
      }, [])

    const lista2 = ["Home","Savings","Car","GirlFriend"];//[{ id: 1, nome: "Anderson" }, { id: 2, nome: "Ana" }, { id: 3, nome: "Ryan" }]
    return (
        <View style={styles.container}>
            <Text>Selecionar Evento:</Text>
            <View>
                <Picker selectedValue={selectedPerson} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}>
                    {lista.map((item,index)=>{
                        return (<Picker.Item label={item.nome} value={index} key={index}/>) 
                    })}
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
});