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
            body: {'name': JSON.stringify(name)},
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            navigate('/user-profile')
        }
    }
    
    const handleEmail = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: {'email': JSON.stringify(email)},
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            navigate('/user-profile')
        }
    };
    
    const handlePassword = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: {'passwrd': JSON.stringify(password)},
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            navigate('/user-profile')
        }
    };

    const handleDesc = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'POST',
            body: {'description': JSON.stringify(desc)},
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            navigate('/user-profile')
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