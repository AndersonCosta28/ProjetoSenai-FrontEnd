import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';
import estilo from '../estilo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        color: 'black',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const App = ({ navigation }) => {
    useEffect(() => {
        axios.get('/dados/', { responseType: "json" })
            .then(Response => {
                setlista(Response.data)
            })
            .catch(Error => console.log(Error))

    }, [])
    const [lista, setlista] = useState([])
    return (
        <View style={styles.container}>
            <FlatList
                data={lista}
                renderItem={({ item }) =>
                    <View style={estilo.t}>
                        <Text
                            style={styles.item}>{item.idpessoa} - {item.nome}
                        </Text>
                        <Button title="Alterar"
                            onPress={() => {
                                axios.get('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
                                    .then(Response => {
                                        navigation.navigate('Pessoa_U', Response.data[0])
                                    })
                                    .catch(Error => console.log(Error))
                            }} />
                        <Button title="Deletar" onPress={() => {
                            Alert.alert("Deletar", `Deseja deletar o usuário ${item.idpessoa}?`,
                                [
                                    {
                                        text: "Cancelar", style: "cancel"
                                    },
                                    {
                                        text: "Deletar", style: "default", onPress: () => {
                                            axios.delete('/dados/', { responseType: "json", params: { idpessoa: item.idpessoa } })
                                                .then(Response => {
                                                    if (Response.data) {
                                                        navigation.navigate('Home')
                                                    }
                                                    else {
                                                        Alert.alert('Falha ao deletar a pessoa', '', [{ text: "Cancelar", style: "cancel" }])
                                                    }
                                                })
                                                .catch(Error => Error)
                                        }
                                    }

                                ])
                        }

                        } />
                    </View>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
export default App;