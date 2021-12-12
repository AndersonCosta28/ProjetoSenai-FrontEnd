import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from './../../axios';


export default function App({ route, navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [endereco, setendereco] = useState()
    const [Pessoa, SetPessoa] = useState({ idpessoa: '', nome: '', sobrenome: '', telefone: '', email: '' })
    const [infoCep, setCep] = useState({ cep: '', logradouro: '', numero: '', bairro: '', localidade: '', complemento: '', uf: '' });
    const [pesquisar, setPesquisar] = useState('');
    const [idEndereco, SetIdEndereco] = useState();

    const alerta = (titulo, mensagem, tituloBotao, rota) => {
        Alert.alert(
            titulo,
            mensagem,
            [{
                text: tituloBotao, onPress: rota, style: "cancel"
            }]
        )
    }

    const validarCampo = () => {
        setCep(prevPreferences => {
            return { ...prevPreferences, idendereco: idEndereco }
        });
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
        axios.put('/dados/', Pessoa)
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
        validarCampo()
    }, [])
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Campo label="ID: "
                        defaultValue={String(Pessoa.idpessoa)}
                        editable={false}
                    />

                    <Campo label="Nome: "
                        defaultValue={Pessoa.nome}
                        onChangeText={Text => {
                            validarCampo(); SetPessoa(prevPreferences => {
                                return {
                                    ...prevPreferences, nome:
                                        String(Text).trim()
                                }
                            }); validarCampo();
                        }}
                        onBlur={() => {
                            validarCampo();
                        }} />

                    <Campo label="Sobrenome: " defaultValue={Pessoa.sobrenome}
                        onChangeText={Text => {
                            validarCampo(); SetPessoa(prevPreferences => {
                                return {
                                    ...prevPreferences, sobrenome:
                                        String(Text).trim()
                                }
                            });
                            validarCampo();
                        }} onBlur={() => {
                            validarCampo();
                        }} />

                    <Campo label="Telefone: " keyboardType="phone-pad"
                        defaultValue={Pessoa.telefone}
                        onChangeText={Text => {
                            validarCampo();
                            SetPessoa(prevPreferences => {
                                return { ...prevPreferences, telefone: String(Text).trim() }
                            });
                            validarCampo();
                        }}
                        onBlur={() => { validarCampo(); }} />
                    <Campo label="Email: "
                        keyboardType="email-address"
                        defaultValue={Pessoa.email}
                        onChangeText={Text => {
                            validarCampo(); SetPessoa(prevPreferences => {
                                return { ...prevPreferences, email: String(Text).trim() }
                            });
                            validarCampo();
                        }}
                        onBlur={Text => {
                            validarCampo();
                        }} />
                    <Campo label="CEP" placeholder="Informe o seu CEP"
                        defaultValue={infoCep.cep}
                        keyboardType="number-pad"
                        onChangeText={text => setPesquisar({ cep: text.replace('-', '') })}
                        onBlur={requisicao}
                    />
                    <Campo label="Logradouro: " defaultValue={infoCep.logradouro} onChangeText={Text => { setCep(prevPreferences => { return { ...prevPreferences, logradouro: String(Text).trim() } }); }} onBlur={() => { validarCampo(); }} />
                    <Campo label="Nº: " defaultValue={infoCep.numero} onChangeText={Text => { setCep(prevPreferences => { return { ...prevPreferences, numero: String(Text).trim(), idendereco: idEndereco } }); validarCampo(); }} />
                    <Campo label="Complemento: " defaultValue={infoCep.complemento} onChangeText={Text => { setCep(prevPreferences => { return { ...prevPreferences, complemento: String(Text).trim() } }); validarCampo(); }} onBlur={() => { validarCampo(); }} />
                    <Campo label="Bairro: " value={infoCep.bairro} onBlur={() => { validarCampo(); }} />
                    <Campo label="Cidade: " value={infoCep.localidade} onBlur={() => { validarCampo(); }} />
                    <Campo label=" UF:" value={infoCep.uf} onBlur={() => { validarCampo(); }} />
                    <View style = {estilo.btn_salvar}><Button onPress={() => Salvar(navigation)} title="Salvar" disabled={!Proximo}></Button></View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
const Campo = ({ label, ...props }) => (
    <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>{label}</Text></View>
        <View><TextInput style={estilo.input} {...props} ></TextInput></View>
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