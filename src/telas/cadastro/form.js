import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from 'axios';
import firebase from '../../Connection';

export default function App({ navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [Pessoa, SetPessoa] = useState({ nome: '', sobrenome: '', telefone: '', email: ''})
    const [infoCep, setCep] = useState({cep: '', logradouro: '', numero: '', bairro: '', localidade: '', complemento: '', uf: ''});
    const [pesquisar, setPesquisar] = useState('');

    const validarCampo = () => {
        console.log(Pessoa)
        if (Pessoa.nome.trim() && Pessoa.sobrenome.trim() && Pessoa.telefone.trim() && Pessoa.email.trim() && infoCep.cep.trim() && infoCep.logradouro.trim() && infoCep.numero.trim() && infoCep.bairro.trim() && infoCep.localidade.trim() && infoCep.uf.trim() !== '') {
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
        console.log(pesquisar)
        const { data } = await axios.get(`https://viacep.com.br/ws/${pesquisar.cep}/json/`);
        setCep(data)
    }
    const Salvar = () => {
        delete infoCep.siafi;
        delete infoCep.gia;
        delete infoCep.ibge;
        delete infoCep.ddd;
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
                    {/* <View style={estilo.t}>
                <Text>ID: </Text>
                <TextInput
                    style={estilo.input}
                    keyboardType="numeric"
                    onChangeText={Text => { validarCampo(); SetID(Text); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();

                    }}></TextInput>
            </View> */}
                    <View style={estilo.t}>
                        <Text>Nome: </Text>
                        <TextInput
                            style={estilo.input}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, nome:
                                            String(Text).trim()
                                    }
                                }); validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View style={estilo.t}>
                        <Text>Sobrenome: </Text><TextInput
                            style={estilo.input}
                            onChangeText={Text => {
                                validarCampo();SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, sobrenome:
                                            String(Text).trim()
                                    }
                                });
                                validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View style={estilo.t}>
                        <Text>Telefone: </Text><TextInput
                            keyboardType="phone-pad"
                            style={estilo.input}
                            onChangeText={Text => {
                                validarCampo();
                                SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, telefone:
                                            String(Text).trim()
                                    }
                                });
                                validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View style={estilo.t}>
                        <Text>Email: </Text><TextInput
                            keyboardType="email-address"
                            style={estilo.input}
                            onChangeText={Text => {
                                validarCampo();
                                SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, email:
                                            String(Text).trim()
                                    }
                                });
                                validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View>
                        <View style={estilo.t}>
                            <Text>Informe seu CEP</Text><TextInput label="cep" style={estilo.input} keyboardType="number-pad" onChangeText={text => setPesquisar({ cep: text })} onBlur={requisicao} />
                        </View>
                    </View>
                    <View style={estilo.t}>
                        <Text>Logradouro: </Text><TextInput style={estilo.input} value={infoCep.logradouro} />
                    </View>
                    <View style={estilo.t}>
                        <Text>Complemento: </Text><TextInput style={estilo.input} defaultValue={infoCep.complemento} />
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
                    <Button onPress={Salvar} title="Salvar" disabled={!Proximo}></Button>
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
