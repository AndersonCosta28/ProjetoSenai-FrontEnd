import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from 'axios';

export default function App({ route, navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [endereco, setendereco] = useState()
    const [Pessoa, SetPessoa] = useState({ nome: '', sobrenome: '', telefone: '', email: '' })
    const [infoCep, setCep] = useState({});
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
        //console.log(Pessoa)
        if (Pessoa.nome.trim() && Pessoa.sobrenome.trim() && Pessoa.telefone.trim() && Pessoa.email.trim() !== '') {
            SetProximo(true)
            return true
        }
        else
            SetProximo(false)
        return false
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
        console.log(idEndereco)
        //setCep(prevPreferences => { return { ...prevPreferences, idendereco: idEndereco} })
        Pessoa.endereco = infoCep
        console.log(JSON.stringify(Pessoa))
        //await firebase.database().ref('usuarios').child(id).set(DadosPessoais);
        axios.put('http://localhost:3000/dados', Pessoa)
            .then(Response => {
                if (Response.data == true) {
                    alerta("Cadastro efetuado com sucesso", "Clique para prosseguir", "Página inicial", navigation.navigate('Home'))
                }
                else {
                    alerta("Falha ao efetuar o cadastro", "Revise os dados antes de prosseguir", "Cancel")
                }
            })
            .catch(Error => console.log(Error)
            )
    }
    useEffect(() => {
        const { cep, logradouro, numero, bairro, localidade, complemento, uf, idendereco } = route.params
        console.log(route.params)
        const { idpessoa, nome, sobrenome, email, telefone } = route.params
        SetPessoa({
            idpessoa: idpessoa, nome: nome, sobrenome: sobrenome, email: email, telefone: telefone
        })
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
                    <View style={estilo.t}>
                        <Text>ID: </Text>
                        <TextInput style={estilo.input}
                            editable={false}
                            defaultValue={Pessoa.idpessoa}
                            keyboardType="numeric"
                            onChangeText={Text => { validarCampo(); SetID(Text); validarCampo(); }}
                            onBlur={Text => {
                                validarCampo();

                            }}></TextInput>
                    </View>
                    <View style={estilo.t}>
                        <Text>Nome: </Text>
                        <TextInput
                            style={estilo.input}
                            defaultValue={Pessoa.nome}
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
                            defaultValue={Pessoa.sobrenome}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, sobrenome:
                                            String(Text).trim()
                                    }
                                });
                                validarCampo();
                            }} onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View style={estilo.t}>
                        <Text>Telefone: </Text><TextInput
                            keyboardType="phone-pad"
                            style={estilo.input}
                            defaultValue={Pessoa.telefone}
                            onChangeText={Text => {
                                validarCampo();
                                SetPessoa(prevPreferences => {
                                    return { ...prevPreferences, telefone: String(Text).trim() }
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
                            defaultValue={Pessoa.email}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return { ...prevPreferences, email: String(Text).trim() }
                                });
                                validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View>
                    <View>
                        <View style={estilo.t}>
                            <Text>Informe seu CEP</Text>
                            <TextInput
                                label="cep"
                                style={estilo.input}
                                defaultValue={infoCep.cep}
                                keyboardType="number-pad"
                                onChangeText={text => setPesquisar({ cep: text.replace('-', '') })}
                                onBlur={requisicao} />
                        </View>
                    </View>
                    <View style={estilo.t}>
                        <Text>Logradouro: </Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.logradouro} />
                    </View>
                    <View style={estilo.t}>
                        <Text>Complemento: </Text>
                        <TextInput style={estilo.input} defaultValue={infoCep.complemento} />
                    </View>
                    <View style={estilo.t}>
                        <Text>Bairro: </Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.bairro} />
                    </View>
                    <View style={estilo.t}>
                        <Text>Cidade: </Text><TextInput style={estilo.input} value={infoCep.localidade} />
                    </View>
                    <View style={estilo.t}>
                        <Text>UF:</Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.uf} />
                    </View>
                    <View style={estilo.t}>
                        <Text>Nº:</Text>
                        <TextInput
                            style={estilo.input}
                            defaultValue={infoCep.numero}
                            onChangeText={Text => setCep(prevPreferences => { return { ...prevPreferences, numero: Text, idendereco: idEndereco} })} />
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