import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import estilo from '../../estilo';

export default function App({route, navigation }) {
    //console.log(route.params)
    const [id, SetID] = useState('')
    const [nome, SetNome] = useState('')
    const [sobrenome, SetSobrenome] = useState('')
    const [telefone, SetTelefone] = useState('')
    const [email, SetEmail] = useState('')
    const [Proximo, SetProximo] = useState(false)
    const [endereco, setendereco] = useState()

    const validarCampo = () => {
        if (nome.trim() && sobrenome.trim() && telefone.trim() && email.trim() !== '') {
            SetProximo(true)
            return true
        }
        else
            SetProximo(false)
        return false
    }
    const DadosPessoais = {
        nome, sobrenome, telefone, email
    }
    useEffect(() => {
        const {cep, logradouro, numero, bairro, localidade, complemento,uf } = route.params        
        SetID(route.params.idpessoa)
        SetNome(route.params.nome)
        SetSobrenome(route.params.sobrenome)
        SetTelefone(route.params.telefone)
        SetEmail(route.params.email)   
        setendereco({cep, logradouro, numero, bairro, localidade, complemento,uf})   
        validarCampo()
    }, [])
    return (
        <View>
            <View style={estilo.t}>
                <Text>ID: </Text>
                <TextInput style={estilo.input}
                    editable={false}
                    defaultValue={id}
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
                    defaultValue={nome}
                    onChangeText={Text => { validarCampo(); SetNome(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Sobrenome: </Text><TextInput
                    style={estilo.input}
                    defaultValue={sobrenome}
                    onChangeText={Text => { validarCampo(); SetSobrenome(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Telefone: </Text><TextInput
                    keyboardType="phone-pad"
                    style={estilo.input}
                    defaultValue={telefone}
                    onChangeText={Text => { validarCampo(); SetTelefone(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Email: </Text><TextInput
                    keyboardType="email-address"
                    style={estilo.input}
                    defaultValue={email}
                    onChangeText={Text => { SetEmail(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <Button
                title="Próximo"
                onPress={() => {navigation.navigate('endereco_U', { DadosPessoais, endereco })}
                }
                disabled={!Proximo}
            />
        </View>
    );
}