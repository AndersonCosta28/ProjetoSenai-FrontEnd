// import React, {useState, useEffect} from 'react';
// import {View, Button, Platform} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {Campo, CampoData, CampoHora} from './src/campos'

// export default function App(){
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   useEffect(() =>{    
//     console.log(date.toTimeString() + "   -   " + date.toLocaleDateString())
//   },[date, mode, show])

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Show date picker!" />
//       </View>
//       <View>
//         <Button onPress={showTimepicker} title="Show time picker!" />
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}   
//     </View>
//   );
// };
import React from 'react';
import { Platform, StyleSheet, Text, ScrollView } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>OS</Text>
      <Text style={styles.value}>{Platform.OS}</Text>
      <Text>OS Version</Text>
      <Text style={styles.value}>{Platform.Version}</Text>
      
      <Text>Constants</Text>
      <Text style={styles.value}>
        {JSON.stringify(Platform.constants, null, 2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8
  }
});

export default App;