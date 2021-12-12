import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import estilo from './estilo'
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Campo = ({ label, ...props }) => (
    <View style={estilo.t}>
        <View style={estilo.t_view_text}><Text style={estilo.t_text}>{label}</Text></View>
        <View><TextInput style={estilo.input} {...props} ></TextInput></View>
    </View>
);



const CampoData = ({ }) => {
    function formatarData(data) {
        let novaData = String(data.toLocaleDateString()).split('/')
        novaData = [novaData[1], novaData[0], novaData[2]].join('/')
        return novaData
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = () => {
        setShow(true);
        setMode('date');
    };
    return (
        <View>
            <TouchableOpacity onPress={showMode} style={estilo.button}><Text>{formatarData(date)}</Text></TouchableOpacity>
            {/* <Button onPress={showMode} title="Selecione a data" /> */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const CampoHora = ({ }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = () => {
        setShow(true);
        setMode('time');
    };
    return (
        <View>
            <TouchableOpacity onPress={showMode} style={estilo.button}><Text>{date.toTimeString().substring(0,5)}</Text></TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export { Campo, CampoData, CampoHora }