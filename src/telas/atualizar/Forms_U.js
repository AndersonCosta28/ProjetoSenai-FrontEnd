import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import estilo from '../../estilo';
import axios from 'axios';

export default function App({ route, navigation }) {
    const [Proximo, SetProximo] = useState(false)
    const [endereco, setendereco] = useState()
    const [Pessoa, SetPessoa] = useState({ nome: '', sobrenome: '', telefone: '', email: '' })
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
        if (Pessoa.nome.trim() && Pessoa.sobrenome.trim() && Pessoa.telefone.trim() && Pessoa.email.trim() !== '') {
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
    const Salvar = () => {
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
        const { idpessoa, nome, sobrenome, email, telefone } = route.params
        SetPessoa({
            idpessoa: idpessoa, nome: nome, sobrenome: sobrenome, email: email, telefone: telefone
        })
        setPesquisar({cep: cep})
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
                    <Campo label="ID: " editable={false}
                        defaultValue={Pessoa.idpessoa}
                        keyboardType="numeric"
                        onChangeText={Text => { validarCampo(); SetID(Text); validarCampo(); }}
                        onBlur={() => {
                            validarCampo();
                        }} />

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
                        onBlur={() => {
                            validarCampo();
                        }} />
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
                    <Campo label="Logradouro: " value={infoCep.logradouro} onBlur={() => { validarCampo(); }} />
                    <Campo label="Complemento: " defaultValue={infoCep.complemento} onBlur={() => { validarCampo(); }} />
                    <Campo label="Bairro: " value={infoCep.bairro} onBlur={() => { validarCampo(); }} />
                    <Campo label="Cidade: " value={infoCep.localidade} onBlur={() => { validarCampo(); }} />
                    <Campo label=" UF:" value={infoCep.uf} onBlur={() => { validarCampo(); }} />
                    <Campo label="Nº: " defaultValue={infoCep.numero}
                    onChangeText={Text => {                        
                        validarCampo(); setCep(prevPreferences => {
                            return { ...prevPreferences, numero: String(Text).trim(), idendereco: idEndereco }
                        });
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