import React, { useState } from 'react';
import { useAuthContext } from "../hooks/AuthContextHook"

const EditAccount = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [desc, setDesc] = useState('')
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleName = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify(name),
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }
    
    const handleEmail = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: JSON.stringify(email),
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    };
    
    const handlePassword = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: JSON.stringify(password),
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    };

    const handleDesc = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: JSON.stringify(desc),
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    };


    return (
       <div className="editAccount">
            <h2>Edit Account</h2>

            <form onSubmit={handleName}>
                <label>Name</label>
                <input
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                ></input>
                <buttonContainer><button>Edit name</button></buttonContainer>
            </form>

            <form onSubmit={handleEmail}>
                <label>Email</label>
                <input
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                ></input>
                <buttonContainer><button>Edit email</button></buttonContainer>
            </form>

            <form onSubmit={handlePassword}>
                <label>Password</label>
                <input
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                ></input>
                <buttonContainer><button>Edit password</button></buttonContainer>
            </form>

            <form onSubmit={handleDesc}>
                <label>Description</label>
                <input
                    type="text" 
                    onChange={(e) => setDesc(e.target.value)} 
                    value={desc}
                ></input>
                <buttonContainer><button>Edit description</button></buttonContainer>
            </form>
       </div>
    )
 }
 
 export default EditAccount