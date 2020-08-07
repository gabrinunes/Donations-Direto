import React, {useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2,FiPenTool} from 'react-icons/fi';


import api from '../../Services/api';
import './styles.css'
export default function Profile(){
    const [incidents,SetIncidents] = useState([])
    
    const ongId = localStorage.getItem('ongCnpj');
    const user_id = localStorage.getItem('ongID')
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(()=>{
     api.get('profile',{
         headers:{
             Authorization: ongId,
         }
     }).then(response =>{
        SetIncidents(response.data)
     })
    },[ongId])



   async function handleDeleteIncident(id){
       try{
         await api.delete(`donations/${id}`,{
             headers:{
                Authorization: user_id, 
             }
         });

         SetIncidents(incidents.filter(incident => incident.id !== id))
       }catch(err){
          alert('Erro ao deletar caso, tente novamente') 
       }
    }

    async function handleUpdateIncident(id){
        localStorage.setItem('updateID',id)
        history.push('/incidents/update')
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/')
    }
    
    return(
        <div className="profile-container">
         <header>
    <span>Bem vindo(a), {ongName}</span>
           <Link className="button" to="/incidents/new">Cadastrar nova doação</Link>  
           <button onClick={handleLogout} type="button">
               <FiPower size={18} color="#E02041"/>
           </button>

         </header>
         

         <h1>Doações cadastradas</h1>

         <ul>
             {incidents.map(incident => (
                 
             <li key={incident.id}>
             <strong>DOAÇÃO:</strong>
             <p>{incident.title}</p>

             <strong>DESCRIÇÃO:</strong>
             <p>{incident.description}</p>

             <strong>FOTO:</strong>
             <img src={incident.picture} alt=""/>
              

             <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={50} color="#a8a8b3"/>
             </button>

             <button onClick={() => handleUpdateIncident(incident.id)} type="button">
              <FiPenTool size={50} color="#a8a8b3"/>
             </button>
         </li>
             ))}
         </ul>
        </div>
    )
}