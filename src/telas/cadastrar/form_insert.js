import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from './../../axios';
import firebase from '../../Connection';
import { Campo } from '../../campos'


export default function App({ navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [Pessoa, SetPessoa] = useState({ nome: '', sobrenome: '', telefone: '', email: '' })
    const [infoCep, setCep] = useState({ cep: '', logradouro: '', numero: '', bairro: '', localidade: '', complemento: '', uf: '' });
    const [pesquisar, setPesquisar] = useState('');
    const validarCampo = () => {
        if (Pessoa.nome.trim() && Pessoa.sobrenome.trim() && Pessoa.telefone.trim() && Pessoa.email.trim() && infoCep.cep.trim() && infoCep.numero.trim() && infoCep.logradouro.trim() && infoCep.bairro.trim() && infoCep.localidade.trim() && infoCep.uf.trim() !== '') {
            SetProximo(true)
            return true
        }
        else
            SetProximo(false)
        return false
    }
    const requisicao = async () => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${pesquisar.cep}/json/`);
        delete data.siafi;
        delete data.gia;
        delete data.ibge;
        delete data.ddd;
        data.numero = ''
        setCep(data)
    }
    const Salvar = (navigation) => {
        Pessoa.endereco = infoCep
        console.log(JSON.stringify(Pessoa))
        //await firebase.database().ref('usuarios').child(id).set(DadosPessoais);
        axios.post('/dados/', Pessoa)
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
    useEffect(() => {
        validarCampo()
    }, [Pessoa, infoCep])
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Campo label="Nome: " onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, nome: String(Text).trim() } }); }} />
                    <Campo label="Sobrenome: " onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, sobrenome: String(Text).trim() } }); }} />
                    <Campo label="Telefone: " keyboardType="phone-pad" style={estilo.input} onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, telefone: String(Text).trim() } }); }} />
                    <Campo label="Email: " keyboardType="email-address" style={estilo.input} onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, email: String(Text).trim() } }); }} />
                    <Campo label="CEP " placeholder="Informe o seu CEP" keyboardType="number-pad" onChangeText={text => setPesquisar({ cep: text })} onBlur={requisicao} />
                    <Campo label='Logradouro: ' defaultValue={infoCep.logradouro} onChangeText={Text => { setCep(prevPreferences => { return { ...prevPreferences, logradouro: String(Text).trim() } }); }} />
                    <Campo label="Nº: " defaultValue={infoCep.numero} onChangeText={Text => { setCep(prevPreferences => { return { ...prevPreferences, numero: String(Text).trim() } }); }} />
                    <Campo label='Complemento: ' defaultValue={infoCep.complemento} />
                    <Campo label='Bairro: ' value={infoCep.bairro} />
                    <Campo label='Cidade: ' value={infoCep.localidade} />
                    <Campo label='UF: ' value={infoCep.uf} />
                    <View style={estilo.btn_salvar}><Button onPress={() => Salvar(navigation)} title="Salvar" disabled={!Proximo}></Button></View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});