import React from 'react';
import {Feather} from '@expo/vector-icons'
import {View,Image,TouchableOpacity,Text,Linking,FlatList} from 'react-native';
import { useNavigation, useRoute } from'@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler';
export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contanto pois gostaria de receber a doação "${incident.title}"`
    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Caro Doador`,
            recipients: [incident.email],
            body:message,
        })
    }


    function sendWhatsApp(){
       Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`);
    }
    return(
        <View style={styles.container}>
                <View>
              <TouchableOpacity onPress={navigateBack}>
                  <Feather name="arrow-left" size={28} color="#E82041"/>
              </TouchableOpacity>
          </View>
             <ScrollView>
             <View style={styles.incident}>
            
            <Text style={[styles.incidentProperty, {marginTop: 0}]}>Doador</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
     
                      
              <Text style={styles.incidentProperty}>Descrição</Text>
              <Text style={styles.incidentValue}>{incident.description}</Text>

              <View style={{width:200,height:260}}>
              <Text style={styles.incidentProperty}>Foto</Text>    
              <Image style={{width:200,height:190}} source={{uri:incident.picture}}/>
              </View>

              
  
            </View>
  
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Caso precise dessa doação!</Text>
                
                <Text style={styles.heroDescription}>Entre em contato!</Text>
  
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                      <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
  
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                      <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
 
             </ScrollView>
        </View>          
    )
}