import * as React from 'react';
import axios from './src/axios'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pessoa_I from './src/telas/cadastrar/form_insert';
import Login from './src/telas/Login';
import lista_pessoa from './src/telas/lista/pessoa'
import estilo from './src/estilo';
import Pessoa_U from './src/telas/atualizar/form_update';
import Pessoa_S from './src/telas/visualizar/form_select';
import evento_lista from './src/telas/lista/evento'
import venda_I from './src/telas/cadastrar/venda'
import venda_lista from './src/telas/lista/venda'
import evento_I from './src/telas/cadastrar/evento';
import evento_U from './src/telas/atualizar/evento'
import evento_S from './src/telas/visualizar/evento'

function HomeScreen({ navigation }) {
  return (
    <View style={estilo.container}>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Pessoas')}><Text style={estilo.texto}>Pessoas</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Evento')}><Text style={estilo.texto}>Evento</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('venda')}><Text style={estilo.texto}>Venda</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Login')}><Text style={estilo.texto}>Sair</Text></TouchableOpacity>
      </View>
    </View>
  );
}
function Pessoas({ navigation }) {
  return (
    <View style={estilo.container}>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('Pessoa_I')}><Text style={estilo.texto}>Cadastrar</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('lista_pessoa')}><Text style={estilo.texto}>Lista</Text></TouchableOpacity>
      </View>
    </View>
  )
}
function Evento({ navigation }) {
  return (
    <View style={estilo.container}>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('evento_I')}><Text style={estilo.texto}>Cadastrar</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('evento_lista')}><Text style={estilo.texto}>Lista</Text></TouchableOpacity>
      </View>
    </View>
  )
}
function Venda({ navigation }) {
  return (
    <View style={estilo.container}>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => {
          Promise.all([axios.get('/dados/', { responseType: "json" }), axios.get('/evento/', { responseType: "json" })]).then(res => {navigation.navigate('venda_I', {lista_pessoa : res[0].data, lista_evento: res[1].data}) })

        }}>
          <Text style={estilo.texto}>Cadastrar</Text></TouchableOpacity>
      </View>
      <View style={estilo.view}>
        <TouchableOpacity style={estilo.button} onPress={() => navigation.navigate('venda_lista')}><Text style={estilo.texto}>Listar</Text></TouchableOpacity>
      </View>
      
    </View>
  )
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
        <Stack.Screen name="Pessoas" component={Pessoas} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Pessoa_I" component={Pessoa_I} options={{ title: "Inserir cadastro" }} />
        <Stack.Screen name="Pessoa_U" component={Pessoa_U} options={{ title: "Alterar cadastro" }} />
        <Stack.Screen name="Pessoa_S" component={Pessoa_S} options={{ title: "Visualizar cadastro" }} />
        <Stack.Screen name="lista_pessoa" component={lista_pessoa} />
        <Stack.Screen name="Evento" component={Evento} />
        <Stack.Screen name="evento_I" component={evento_I} />
        <Stack.Screen name="evento_U" component={evento_U} />
        <Stack.Screen name="evento_lista" component={evento_lista} />
        <Stack.Screen name="evento_S" component={evento_S} />
        <Stack.Screen name="venda_I" component={venda_I} />
        <Stack.Screen name="venda_lista" component={venda_lista} />
        <Stack.Screen name="venda" component={Venda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;