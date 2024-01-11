import {useState,useContext,createContext} from 'react'
const Authcontext = createContext()

const AuthProvider = ({children})=>{
    const [auth,setauth] = useState({
        user:null,
        token:""
    })
    return(
        <Authcontext.Provider value={[auth,setauth]}>
            {children}
        </Authcontext.Provider>
    )
}

const useAuth=()=>useContext(Authcontext)
export {useAuth,AuthProvider}