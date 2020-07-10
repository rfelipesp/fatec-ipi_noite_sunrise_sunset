import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Cartao from './Cartao';


const PrevisaoItem = (props) => {
    return (
        <Cartao estilos={estilos.cartao}>
            <View style={estilos.tela}>
                <Image
                    style={estilos.imagem}
                    source={{ uri: 'https://openweathermap.org/img/wn/' + props.previsao.weather[0].icon + '.png' }}
                />
                <View>
                    <View style={estilos.primeiraLinha}>
                        <Text>
                            {new Date(props.previsao.dt * 1000).toLocaleTimeString()} - {props.previsao.weather[0].description}
                        </Text>
                    </View>
                    <View style={estilos.segundaLinha}>
                    <Text style={estilos.valor}>
                            Nascer-do-Sol: {new Date(props.previsao.sunrise * 1000).toLocaleTimeString()}
                        </Text>
                    </View>
                    <View>
                    <Text style={estilos.valor}>
                            Pôr-do-Sol   : {new Date(props.previsao.sunset * 1000).toLocaleTimeString()}
                        </Text>
                    </View>
                    <View>
                        <Text style={estilos.sensacao}>Sensação Térmica</Text>
                        <Text style={estilos.valor}>
                            Madrugada: {props.previsao.feels_like.night} °C
                        </Text>
                        <Text style={estilos.valor}>
                            Manhã    : {props.previsao.feels_like.morn} °C
                        </Text>
                        <Text style={estilos.valor}>
                            Tarde    : {props.previsao.feels_like.day} °C
                        </Text>
                        <Text style={estilos.valor}>
                            Noite    : {props.previsao.feels_like.eve} °C
                        </Text>
                    </View>
                </View>
            </View>
        </Cartao>
    )
}

const estilos = StyleSheet.create({
    cartao: {
        marginBottom: 5
    },
    tela: {
        flexDirection: 'row'
    },
    imagem: {
        width: 50,
        height: 50
    },
    primeiraLinha: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    segundaLinha: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: '#DDD'
    },
    valor: {
        marginHorizontal: 2
    }
});

export default PrevisaoItem;