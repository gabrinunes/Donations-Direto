import React, {useEffect,useState} from 'react';
import {View,Image,Text,TouchableOpacity,FlatList,RefreshControl} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from'@react-navigation/native'
import logoImg from '../../assets/logo.png'

import styles from './styles'
import api from '../../services/api';
export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident})
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }
        
        setLoading(true);
        const response = await api.get('donations',{
            params: {page}
        });
        setIncidents([...incidents, ...response.data]);
        setPage(page +1);
        setLoading(false);
        setTotal(response.headers['x-total-count']);
    }   
           

        useEffect(()=>{
          loadIncidents();
        },[]);

    return(
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>
                  Total de <Text style={styles.headerTextBold}>{total} doações.</Text>
              </Text>
          </View>

          <Text style={styles.title}>Bem vindo</Text>
          <Text style={styles.description}>Doações Disponíveis para quem precisar!</Text>
          
          <FlatList
            style={styles.incidentList}
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item:incident})=> (    
                <View>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>Doador</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
  
                    
                    <Text style={styles.incidentProperty}>Doação</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>  

                    <TouchableOpacity
                      style={styles.detailsButton}
                      onPress={() => navigateToDetail(incident)}
                    >
                     <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                     <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
            </View>
            )}
          />
        </View>
    )
}