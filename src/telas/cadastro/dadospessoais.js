import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import estilo from '../../estilo';

export default function App({ navigation }) {
    const [id, SetID] = useState('')
    const [nome, SetNome] = useState('')
    const [sobrenome, SetSobrenome] = useState('')
    const [telefone, SetTelefone] = useState('')
    const [email, SetEmail] = useState('')
    const [Proximo, SetProximo] = useState(false)

    const validarCampo = () => {
        if (id.trim() && nome.trim() && sobrenome.trim() && telefone.trim() && email.trim() !== '') {
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
    return (
        <View>
            <View style={estilo.t}>
                <Text>ID: </Text>
                <TextInput
                    style={estilo.input}
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
                    onChangeText={Text => { validarCampo(); SetNome(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Sobrenome: </Text><TextInput
                    style={estilo.input}
                    onChangeText={Text => { validarCampo(); SetSobrenome(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Telefone: </Text><TextInput
                    keyboardType="phone-pad"
                    style={estilo.input}
                    onChangeText={Text => { validarCampo(); SetTelefone(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <View style={estilo.t}>
                <Text>Email: </Text><TextInput
                    keyboardType="email-address"
                    style={estilo.input}
                    onChangeText={Text => { SetEmail(String(Text).trim()); validarCampo(); }}
                    onBlur={Text => {
                        validarCampo();
                    }}></TextInput>
            </View>
            <Button
                title="Próximo"
                onPress={() => { navigation.navigate('endereco', { DadosPessoais, id }) }
                }
                disabled={!Proximo}
            />
        </View>
    );
}