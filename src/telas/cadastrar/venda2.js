import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, Text, Button } from "react-native";
import { RadioButton } from 'react-native-paper';
import estilo from '../../estilo';
import axios from '../../axios'
export default function App({ route, navigation }) {
    const { lista_evento, lista_pessoa } = route.params;
    const valor_inteira = lista_evento.map(a => a.ingresso_inteira)
    const valor_meia = lista_evento.map(a => a.ingresso_meia)
    const [selectedPerson, setSelectedPerson] = useState(0);
    const [selectedPerson2, setSelectedPerson2] = useState(0);
    const [checked, setChecked] = useState("Inteira");
    const [Ingresso_inteira, SetIngresso_inteira] = useState(['0'])
    const [Ingresso_meia, SetIngresso_meia] = useState(['0'])
    useEffect(() => {
        SetIngresso_inteira(valor_inteira);
        SetIngresso_meia(valor_meia)
    }, [selectedPerson2, setSelectedPerson])

    const Salvar = (navigation) => {
        const venda = {
            pessoa_id: lista_pessoa[selectedPerson].idpessoa,
            evento_id: lista_evento[selectedPerson2].idevento,
            valor: checked.valor,
            sigla: checked.sigla
        }
        console.log(venda)
        axios.post('/venda/', venda)
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
    function onchange(itemValue = 0){
        setSelectedPerson2(itemValue)
    }
    return (
        <View style={styles.container}>
            <Text>Selecionar Pessoa:</Text>
            <View>
                <Picker style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}>
                    <Picker.Item label="" value="" />
                    {lista_pessoa.map((item, index) => {
                        return (<Picker.Item label={`${String(item.idpessoa)} - ${item.nome}`} value={index} key={index} />)
                    })}
                </Picker>
            </View>
            <Text>Selecionar Evento:</Text>
            <View>
                <Picker style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => {onchange(itemValue)}}>
                    <Picker.Item label="" value="" />
                    {lista_evento.map((item, index) => {
                        return (<Picker.Item label={`${item.banda} - ${new Date(item.datahora).toLocaleDateString()}`} value={index} key={index} />)
                    })}
                </Picker>
            </View>
            <View>
                <Text>Selecionar tipo ingresso:</Text>
                <View>
                    <Text>Inteira: R$ {String(Ingresso_inteira[selectedPerson2]).replace('undefined','0')}</Text>
                    <RadioButton
                        value={String(Ingresso_inteira[selectedPerson2])}
                        status={checked.Tipo === 'Inteira' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked({ Tipo: 'Inteira', sigla: 'I', valor: String(Ingresso_inteira[selectedPerson2]) })}
                    />
                </View>
                <View>
                    <Text>Meia: R$ {String(Ingresso_meia[selectedPerson2]).replace('undefined','0')}</Text>
                    <RadioButton
                        value={String(Ingresso_meia[selectedPerson2])}
                        status={checked.Tipo === 'Meia' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked({ Tipo: 'Meia', sigla: 'M', valor: String(Ingresso_meia[selectedPerson2]) })}
                    />
                </View>
            </View>
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