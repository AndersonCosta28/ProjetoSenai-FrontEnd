import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import estilo from '../../estilo';
import axios from 'axios';
import firebase from '../../Connection';

export default function App({ route, navigation }) {
    const { DadosPessoais, id } = route.params;
    const [infoCep, setCep] = useState({});
    const [pesquisar, setPesquisar] = useState('');

    const requisicao = async () => {
        console.log(pesquisar)
        const { data } = await axios.get(`https://viacep.com.br/ws/${pesquisar.cep}/json/`);
        setCep(data)
    }
    const Salvar = async () => {
        delete infoCep.siafi;
        delete infoCep.gia;
        delete infoCep.ibge;
        delete infoCep.ddd;
        DadosPessoais.endereco = infoCep
        console.log(JSON.stringify(DadosPessoais))
        await firebase.database().ref('usuarios').child(id).set(DadosPessoais);
        //navigation.navigate('Home')

        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.post('http://localhost:3000/dados', DadosPessoais)
            .then(Response => console.log(Response.data))
            .catch(Error => console.log(Error))
    }
    return (
        <View>
            <View>
                <View style={estilo.t}>
                    <Text>Informe seu CEP</Text><TextInput label="cep" style={estilo.input} keyboardType="number-pad" onChangeText={text => setPesquisar({ cep: text })} onBlur={requisicao} />
                </View>
            </View>
            <View style={estilo.t}>
                <Text>Logradouro: </Text><TextInput style={estilo.input} value={infoCep.logradouro} />
            </View>
            <View style={estilo.t}>
                <Text>Complemento: </Text><TextInput style={estilo.input} defaultValue={infoCep.complemento}/>
            </View>
            <View style={estilo.t}>
                <Text>Bairro: </Text><TextInput style={estilo.input} value={infoCep.bairro} />
            </View>
            <View style={estilo.t}>
                <Text>Cidade: </Text><TextInput style={estilo.input} value={infoCep.localidade} />
            </View>
            <View style={estilo.t}>
                <Text>UF:</Text><TextInput style={estilo.input} value={infoCep.uf} />
            </View>
            <View style={estilo.t}>
                <Text>Nº:</Text><TextInput style={estilo.input} onChangeText={Text => setCep(prevPreferences => { return { ...prevPreferences, numero: Text } })} />
            </View>
            <Button onPress={Salvar} title="Salvar"></Button>
        </View >
    );
}
