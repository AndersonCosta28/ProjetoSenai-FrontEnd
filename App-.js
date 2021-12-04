import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dadospessoais from './src/telas/cadastro/dadospessoais';
import endereco from './src/telas/cadastro/endereco';
import Login from './src/telas/Login';
import lista from './src/telas/lista'
import estilo from './src/estilo';
import firebase from './src/telas/FireBase';
import listaMySQL from './src/telas/listaMySQL';
import dadospessoais_U from './src/telas/atualizar/dadospessoais_U';
import endereco_U from './src/telas/atualizar/endereco_U';

function HomeScreen({ navigation }) {

  return (
    <View style={estilo.container}>
      <View style={estilo.countContainer}>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Details', { nome: "Ana Carolina", sobrenome: "Silva Costa" })}><Text style={estilo.texto}>Detalhes</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('dadospessoais')}><Text style={estilo.texto}>Cadastrar</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('lista')}><Text style={estilo.texto}>lista</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('firebase')}><Text style={estilo.texto}>FireBase</Text></TouchableOpacity>
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="dadospessoais" component={dadospessoais} options={{ title: "Dados pessoais" }} />
        <Stack.Screen name="endereco" component={endereco} />
        <Stack.Screen name="firebase" component={firebase} />
        <Stack.Screen name="dadospessoais_U" component={dadospessoais_U} options={{ title: "Dados pessoais" }} />
        <Stack.Screen name="lista" component={listaMySQL} />
        <Stack.Screen name="endereco_U" component={endereco_U} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;