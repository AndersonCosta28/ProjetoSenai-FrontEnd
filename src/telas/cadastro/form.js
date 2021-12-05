import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from 'axios';
import firebase from '../../Connection';

export default function App({ navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [Pessoa, SetPessoa] = useState({ nome: '', sobrenome: '', telefone: '', email: '' })
    const [infoCep, setCep] = useState({ cep: '', logradouro: '', numero: '', bairro: '', localidade: '', complemento: '', uf: '' });
    const [pesquisar, setPesquisar] = useState('');

    const validarCampo = () => {
        if (Pessoa.nome.trim() && Pessoa.sobrenome.trim() && Pessoa.telefone.trim() && Pessoa.email.trim() && infoCep.cep.trim() && infoCep.numero.trim()  && infoCep.logradouro.trim() && infoCep.bairro.trim() && infoCep.localidade.trim() && infoCep.uf.trim() !== '') {
            SetProximo(true)
            return true
        }
        else
            SetProximo(false)
        return false
    }
    const alerta = (titulo, mensagem, tituloBotao, rota) => {
        Alert.alert(
            titulo,
            mensagem,
            [{
                text: tituloBotao, onPress: rota, style: "cancel"
            }]
        )
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
    const Salvar = () => {        
        Pessoa.endereco = infoCep
        console.log(JSON.stringify(Pessoa))
        //await firebase.database().ref('usuarios').child(id).set(DadosPessoais);
        axios.post('http://localhost:3000/dados', Pessoa)
            .then(Response => {
                if (Response.data == true) {
                    alerta("Cadastro efetuado com sucesso", "Clique para prosseguir", "Página inicial", navigation.navigate('Home'))
                }
                else {
                    alerta("Falha ao efetuar o cadastro", "Revise os dados antes de prosseguir", "Cancel")
                }
            })
            .catch(Error => console.log(Error))
    }
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Campo label="Nome: " onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, nome: String(Text).trim() } }); validarCampo(); }} onBlur={Text => { validarCampo(); }} />
                    <Campo label="Sobrenome: " onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, sobrenome: String(Text).trim() } }); validarCampo(); }} onBlur={validarCampo} />
                    <Campo label="Telefone: " keyboardType="phone-pad" style={estilo.input} onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, telefone: String(Text).trim() } }); validarCampo(); }} onBlur={() => { validarCampo(); }} />
                    <Campo label="Email: " keyboardType="email-address" style={estilo.input} onChangeText={Text => { SetPessoa(prevPreferences => { return { ...prevPreferences, email: String(Text).trim() } }); validarCampo(); }} onBlur={() => { validarCampo(); }} />
                    <Campo label="CEP " placeholder="Informe o seu CEP" keyboardType="number-pad" onChangeText={text => setPesquisar({ cep: text })} onBlur={requisicao} />
                    <Campo label='Logradouro: ' value={infoCep.logradouro} onBlur={() => { validarCampo(); }} />
                    <Campo label='Complemento: ' defaultValue={infoCep.complemento} onBlur={() => { validarCampo(); }} />
                    <Campo label='Bairro: ' value={infoCep.bairro} onBlur={() => { validarCampo(); }} />
                    <Campo label='Cidade: ' value={infoCep.localidade} onBlur={() => { validarCampo(); }} />
                    <Campo label='UF: ' value={infoCep.uf} onBlur={() => { validarCampo(); }} />
                    <Campo label="Nº: " defaultValue={infoCep.numero}                    
                    onChangeText={Text => {                        
                        validarCampo(); 
                        setCep(prevPreferences => {return { ...prevPreferences, numero: Text}});
                        validarCampo();
                    }}
                         />
                    <Button onPress={Salvar} title="Salvar" disabled={!Proximo}></Button>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
const Campo = ({ label, ...props }) => (
    <View style={estilo.t}>
        <Text>{label}</Text>
        <TextInput style={estilo.input}
            {...props}
        ></TextInput>
    </View>
)
const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});