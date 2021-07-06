import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import Loader from "../loader/Loader";

const Auth = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    return (<>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            {loading ?  <Loader/> : null}
                            <PasswordInput  setForm={setForm} form={form} />
                            <EmailInput setForm={setForm} form={form}/>
                        </div>
                        <div className="card-action">
                            <RegisterButton  message={message} request={request} form={form}/>
                            <LoginButton  message={message} request={request} form={form} login={auth.login}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const PasswordInput = ({setForm, form}) => {
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    return (
        <>
            <span className="card-title">Register</span>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password"
                           type="password"
                           className="validate"
                           name="password"
                           onChange={changeHandler}
                    />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
        </>
    )
}
const EmailInput = ({setForm, form}) => {
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    return (
        <div className="row">
            <div className="input-field col s12">
                <input
                    id="email"
                    type="text"
                    className="validate"
                    name="email"
                    onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
            </div>
        </div>
    )
}
const RegisterButton = ({request, form, message}) => {
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }
    return (
        <button
            className="btn blue darken-4"
            onClick={registerHandler}
        >
            Register
        </button>
    )
}
const LoginButton = ({request, form, login, message}) => {

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            login(data.token, data.userId)
            message("Login is success")
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <button
            className="btn blue darken-4"
            onClick={loginHandler}
        >
            Login
        </button>
    );
};


export default Auth;