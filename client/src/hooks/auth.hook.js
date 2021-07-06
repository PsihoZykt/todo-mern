import {useEffect} from "react";

const {useCallback} = require("react");
const {useState} = require("react");
const useAuth = () => {
    const storageName = "userData"
    const [jwtToken, setJwtToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const login = useCallback((jwtToken, id) => {
        setJwtToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            jwtToken: jwtToken,userId: id
        }))
    }, [])
    const logout  = useCallback(() => {
        setJwtToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.jwtToken) {
            login(data.jwtToken, data.userId)
        }
    }, [login])
return { login, logout, jwtToken, userId}
}
export default useAuth