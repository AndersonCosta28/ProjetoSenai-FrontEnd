import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
    t: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    t_view_text: {
        width: 100
    }
    ,
    t_text: {
        textAlign: 'center'
    }
    ,
    btn_salvar:{marginBottom: 20},
    btn: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
        ,
    },
    view: {
        flex: 0.125,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2089dc",
        padding: 10
    },
    texto: {
        color: "#ffffff",
        fontSize: 22
    }
});

export default styles;