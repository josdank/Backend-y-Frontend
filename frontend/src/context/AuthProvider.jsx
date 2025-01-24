import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Auth from "../layout/Auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const perfil = async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil/`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setAuth(respuesta.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    };

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`;
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, datos, options);
            perfil(token);
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false };
        }
    };

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`;
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, datos, options);
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false };
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            perfil(token);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            actualizarPerfil,
            actualizarPassword,
            setLoading,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export {
    AuthProvider
};
export default AuthContext;
