import React, {useState} from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import firebase from '../Connection';

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

const FlatListBasics = () => {
    const [lista, setlista] = useState([])
    const ler = async function () {
        await firebase.database().ref('usuarios').on('value', (snapshot) => {   
            setlista(snapshot.val().filter(a => {if(a ===undefined){}else{ return a}}))
        });
    }
    return (
        <View style={styles.container}>
            <Button title="Ler" onPress={ler}></Button>
            <FlatList
                data={lista}
                renderItem={({ item }) => <Text style={styles.item}>{item.nome} - {item.email}</Text>}
            />
        </View>
    );
}

export default FlatListBasics;