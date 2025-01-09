import axios from "axios";
import { children, createContext, useEffect, useState } from "react";
import Auth from "../layout/Auth";

// Creación del grupo de Whatsapp
const AuthContext = createContext()
    const [auth, setAuth] = useState({})

    const perfil = async (token) =>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil/`
            
            const options = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            
            const respuesta = await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) { 
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token){
            perfil(token)
        }
    },[])
// Crear el mensaje (AuthProvider) // Integrantes(children)
const AuthProvider = ({children}) =>{
    return <AuthContext.Provider value={
        {
            //Contenido del mensaje
            auth,
            setAuth
        }
    }/>
}

export {
    AuthProvider
}
export default AuthContext


