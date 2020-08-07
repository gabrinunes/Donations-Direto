import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import api from '../../Services/api';

export default function Logon(){
    const[cnpj,setCnpj] = useState('')
    const history = useHistory();

   async function handleLogin(e){
      e.preventDefault();

    try{
        const response = await api.post('sessions',{cnpj})

        console.log(response)

        localStorage.setItem('ongCnpj',cnpj)
        localStorage.setItem('ongID',response.data.id)
        localStorage.setItem('ongName',response.data.name)

        history.push('/profile');
    }catch(err){
       alert('falha no login,tente novamente')
    }
    }

    return (
     <div className="logon-container">
         <section className="form">

          <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>

              <input 
              placeholder="Seu CPF ou CNPJ"
              value={cnpj}
              onChange={e=> setCnpj(e.target.value)}
              />
              
              <button className="button" type="submit">Entrar</button>

              <Link className="back-link" to="/register">
                  <FiLogIn size={16} color="#E02041"/>
                  Não tenho cadastro
              </Link>
          </form>
         </section>
     </div>
    )
}