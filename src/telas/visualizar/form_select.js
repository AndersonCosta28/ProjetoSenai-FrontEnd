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
                    <Campo label="ID: " defaultValue={String(Pessoa.idpessoa)} editable ={false} />
                    <Campo label="Nome: " Value={Pessoa.nome} editable ={false}/>
                    <Campo label="Sobrenome: " defaultValue={Pessoa.sobrenome} editable ={false}/>
                    <Campo label="Telefone: " keyboardType="phone-pad" defaultValue={Pessoa.telefone} editable ={false} />
                    <Campo label="Email: " keyboardType="email-address" defaultValue={Pessoa.email}editable ={false} />
                    <Campo label="CEP" placeholder="Informe o seu CEP" defaultValue={infoCep.cep} keyboardType="number-pad"editable ={false} />
                    <Campo label="Logradouro: " Value={infoCep.logradouro} editable ={false}/>
                    <Campo label="Nº: " defaultValue={infoCep.numero}editable ={false}/>
                    <Campo label="Complemento: " defaultValue={infoCep.complemento} editable ={false}/>
                    <Campo label="Bairro: " defaultValue={infoCep.bairro} editable ={false}/>
                    <Campo label="Cidade: " defaultValue={infoCep.localidade} editable ={false}/>
                    <Campo label=" UF:" defaultValue={infoCep.uf}editable ={false} />
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