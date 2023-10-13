import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('cookauthToken') ? JSON.parse(localStorage.getItem('cookauthToken')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('cookauthToken') ? jwt_decode(localStorage.getItem('cookauthToken')) : null)
    let [loading, setLoading] = useState(true)
    const [loadings,setLoadings] = useState(false)
    const [pwerr,setPwerr] = useState(false)
    const [islogged,setIslogged] = useState(()=> localStorage.getItem('cookauthToken') ? true : false)
    const baseURL = 'https://acecartapi.vipsnepal.com'
    const navigate = useNavigate()


    let loginUser = async (e)=> {
        e.preventDefault()
        setLoadings(true)
        let response = await fetch(`${baseURL}/waiter/login/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            console.log('loggedIn');
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            setIslogged(prev=>!prev)
            localStorage.setItem('cookauthToken', JSON.stringify(data))
            setLoadings(false)
        }
        else if(response.status === 401){
            // alert('Invalid Username or Password')
            setPwerr(true)
            setTimeout(() => {
                setPwerr(false)
              }, 2000)
            setLoadings(false)
        }
        else{
            alert('Server error. Please try again later.')
            setLoadings(false)
        }
    }
    


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('cookauthToken')
        navigate('/')
        setIslogged(false)
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        islogged:islogged,
        baseURL:baseURL,
        loadings:loadings,
        pwerr:pwerr,
        setPwerr:setPwerr
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
