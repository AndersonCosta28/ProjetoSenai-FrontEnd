import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import {Campo} from '../../campos'
import estilo from '../../estilo';

export default function App({ route, navigation }) {
    const [endereco, setendereco] = useState()
    const [Pessoa, SetPessoa] = useState({ idpessoa: '', nome: '', sobrenome: '', telefone: '', email: '' })
    const [infoCep, setCep] = useState({ cep: '', logradouro: '', numero: '', bairro: '', localidade: '', complemento: '', uf: '' });
    const [pesquisar, setPesquisar] = useState('');
    const [idEndereco, SetIdEndereco] = useState();
    
    
    useEffect(() => {
        const { cep, logradouro, numero, bairro, localidade, complemento, uf, idendereco } = route.params
        const { idpessoa, nome, sobrenome, email, telefone } = route.params
        SetPessoa({
            idpessoa: idpessoa, nome: nome, sobrenome: sobrenome, email: email, telefone: telefone
        })
        setPesquisar({ cep: cep })
        setCep({
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            localidade: localidade,
            complemento: complemento,
            uf: uf,
        })
        SetIdEndereco(idendereco)
    }, [])
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Campo label="ID: " defaultValue={String(Pessoa.idpessoa)} />
                    <Campo label="Nome: " defaultValue={Pessoa.nome} />
                    <Campo label="Sobrenome: " defaultValue={Pessoa.sobrenome} />
                    <Campo label="Telefone: " keyboardType="phone-pad" defaultValue={Pessoa.telefone} />
                    <Campo label="Email: " keyboardType="email-address" defaultValue={Pessoa.email} />
                    <Campo label="CEP" placeholder="Informe o seu CEP" defaultValue={infoCep.cep} keyboardType="number-pad" />
                    <Campo label="Logradouro: " defaultValue={infoCep.logradouro} />
                    <Campo label="Nº: " defaultValue={infoCep.numero} />
                    <Campo label="Complemento: " defaultValue={infoCep.complemento} />
                    <Campo label="Bairro: " defaultValue={infoCep.bairro} />
                    <Campo label="Cidade: " defaultValue={infoCep.localidade} />
                    <Campo label=" UF:" defaultValue={infoCep.uf} />
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