import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';
import { Forbidden } from '../paginas/Forbidden';


export default function PrivateRouteWithRole({ children }) {
    const { auth } = useContext(AuthContext)
    console.log(auth.rol)
    if ("paciente" === auth.rol) {
        return <Forbidden/>
    } else {
        return children
    }
}