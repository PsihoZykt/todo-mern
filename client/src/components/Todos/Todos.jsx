import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import s from './todos.module.css'
import Loader from "../loader/Loader";
const Todos = () => {
    // const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const {jwtToken} = useContext(AuthContext)


    const [todos, setTodos] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            const data = await request(`/api/todo/`, "GET", null, {
                Authorization: `Bearer ${jwtToken}`
            })
            setTodos(data)
        }
        fetchData()

    }, [jwtToken, request])




    return (
        <>

        <div className={`${s.container}`}>
            <div className={s.loader}> {loading ? <Loader /> : null} </div>
            <AddTask todos={todos}     setTodos={setTodos}  request={request} />
            <Tasks todos={todos}   loading={loading} setTodos={setTodos} request={request}/>
        </div>
        </>

    );
};
const Tasks = ({ todos,  setTodos, request , loading }) => {
    const message = useMessage()
    const {jwtToken} = useContext(AuthContext)

    const deleteTaskHandler = async (id) => {
        const data = await request(`/api/todo/delete/${id}`, "DELETE", null, {
            Authorization: `Bearer ${jwtToken}`
        })
        setTodos(data.todos)
        message(data.message)
    }
    const completeTaskHandler = async (id, isCompleted) => {
        const data = await request(`/api/todo/update/${id}`, "PUT", {
            isCompleted:  !isCompleted
        }, {
            Authorization: `Bearer ${jwtToken}`
        })
        setTodos( data.todos)
        message(data.message)
    }
    console.log(loading)
    return (
        <div className={`${s.row}` }>
            { todos.length? todos.map((todo) => {
                return (
                    <div className={`teal lighten-2 ${s.row } ${s.todoItem}` } key={todo._id}>
                        <label className={s.checkboxLabel}>
                            <input disabled={loading} className={s.completedCheckbox} type="checkbox"  checked={todo.isCompleted} onChange={() => completeTaskHandler(todo._id, todo.isCompleted)}/>
                            <span></span>
                        </label>

                        <span className={`${todo.isCompleted ? s.completed : ""} ${s.todoText}`}> {todo.text }</span>
                        <button disabled={loading} className={`right ${s.deleteButton}`} onClick={() => deleteTaskHandler(todo._id)}> X</button>
                    </div>)
            }) : <div> You have no tasks yet</div>
            }
        </div>
    )
}
const AddTask = ({todos,  setTodos, request}) => {
    const message = useMessage()
    const {jwtToken} = useContext(AuthContext)
    const [text, setText] = useState('')


    const addTaskHandler = async () => {
        try {
            const storage = localStorage.getItem("userData")
            const userId = JSON.parse(storage).userId
            const data = await request('/api/todo/create', "POST", {text, owner: userId}, {
                Authorization: `Bearer ${jwtToken}`
            })
            console.log(data.message)

            message(data.message)
            setTodos([...todos, data.todo])
            setText('')
        } catch (e) {
            message(e)
        }
    }
    return (
        <div className={`input-field  ${s.addTask}`}>
            <input   id="addTask" type="text" className={`validate`} value={text} onChange={e => setText(e.target.value)}/>
            {/*<label htmlFor="addTask">Добавить таск</label>*/}
            <button disabled={!text} className="waves-effect waves-light btn" onClick={addTaskHandler}>Add task</button>
        </div>
    )
}
export default Todos;