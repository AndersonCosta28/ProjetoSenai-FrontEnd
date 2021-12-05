import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pessoa_I from './src/telas/cadastro/form';
import Login from './src/telas/Login';
import lista from './src/telas/lista'
import estilo from './src/estilo';
import firebase from './src/telas/FireBase';
import listaMySQL from './src/telas/listaMySQL';
import Pessoa_U from './src/telas/atualizar/Forms_U';
import form from './src/telas/cadastro/form';
import evento from './src/telas/cadastro/evento'
import { useForm, Controller  } from 'react-hook-form'
import teste from './teste'

function HomeScreen({ navigation }) {

  return (
    <View style={estilo.container}>
      <View style={estilo.countContainer}>
      </View>
      {/* <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Details', { nome: "Ana Carolina", sobrenome: "Silva Costa" })}><Text style={estilo.texto}>Detalhes</Text></TouchableOpacity>
      </View> */}
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Pessoa_I')}><Text style={estilo.texto}>Cadastrar</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('lista')}><Text style={estilo.texto}>lista</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('evento')}><Text style={estilo.texto}>evento</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('teste')}><Text style={estilo.texto}>teste</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Login')}><Text style={estilo.texto}>Sair</Text></TouchableOpacity>
      </View>
    </View>

  );
}
function DetailsScreen({ route, navigation }) {
  const { nome } = route.params;
  const { sobrenome } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{JSON.stringify(nome)}</Text>
      <Text>{JSON.stringify(sobrenome)}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Pessoa_I" component={Pessoa_I} options={{ title: "Dados pessoais" }} />
        <Stack.Screen name="firebase" component={firebase} />
        <Stack.Screen name="lista" component={listaMySQL} /> 
        <Stack.Screen name="Pessoa_U" component={Pessoa_U} options={{ title: "Dados pessoais" }} />
        <Stack.Screen name="teste" component={teste} />
        <Stack.Screen name="form" component={form} />
        <Stack.Screen name="evento" component={evento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;