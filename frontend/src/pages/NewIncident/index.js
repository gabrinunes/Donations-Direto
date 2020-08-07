import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../Services/api'


import './styles.css'
export default function NewIncident(){
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[picture,setPicture]=useState('')

    const history = useHistory();

    const ongId = localStorage.getItem('ongID')

    async function handleNewIncident(e){
        e.preventDefault();

        const formdData = new FormData();

        formdData.append('title', title)
        formdData.append('description', description)
        formdData.append('picture',picture)

        console.log(picture)


        try{
          await api.post('donations',formdData,{
              headers:{
                  Authorization: ongId,
              }
          })
          history.push('/profile')
        }catch (err){
            alert('Erro ao cadastrar caso,tente novamente, por favor preencha todos os campos')
        }
    }

    return(
        <div className="new-incident-container">
         <div className="content">
             <section>

              <h1>Cadastrar nova doação</h1>
              <p>Descreva o item que você deseja doar,para que possa chegar a realmente quem precise</p>
              <Link className="back-link" to="/profile">
                  <FiArrowLeft size={16} color="#E02041"/>
                  Voltar para Home
              </Link>
             </section>
             <form onSubmit={handleNewIncident}>
              <input 
              placeholder="Titulo do caso"
              value={title}
              onChange={e=> setTitle(e.target.value)}
              />
              <textarea 
              placeholder="Descrição"
              value={description}
              onChange={e=> setDescription(e.target.value)}
              />
              
              <input type="file" accept="image/*"
               onChange={e=>setPicture(e.target.files[0])}
              />
              <button className="button" type="submit">Cadastrar</button>
             </form>
         </div>
     </div>
    )
}