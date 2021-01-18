import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { grpc } from '@improbable-eng/grpc-web';
import { ReactNativeTransport } from '@improbable-eng/grpc-web-react-native-transport';
import { Calculator } from './_proto/calculator_pb_service';
import { AddRequest, AddResponse } from './_proto/calculator_pb';
import { XhrTransport } from '@improbable-eng/grpc-web/dist/typings/transports/http/xhr';


export default function App() {

  const add = () => {

    const addRequest = new AddRequest();
    addRequest.setNum1(60929871);
    addRequest.setNum2(60929871);
    
    const host = "http://192.168.0.101:9090";

    grpc.unary(Calculator.Add, {
      request: addRequest,
      host: host,
      transport: ReactNativeTransport({withCredentials: false}),
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("add.onEnd.status", status, statusMessage);
        console.log("add.onEnd.headers", headers);
        console.log(status)
        console.log(message)
        if (status === grpc.Code.OK && message) {
          const result: any=  message.toObject()
          console.log("add.onEnd.message", message.toObject());
          console.log(result.result)
        }
        console.log("add.onEnd.trailers", trailers);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Hell" onPress={add}> </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
