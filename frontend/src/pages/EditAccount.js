import React, { useState } from 'react';
import { useAuthContext } from "../hooks/AuthContextHook"
import { useNavigate } from 'react-router-dom'

const EditAccount = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [desc, setDesc] = useState('')
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const navigate = useNavigate()

    // propagate account changes to local storage
    const updateState = async (updatedUser) => {
        // Retrieve the existing user data from local storage
        const userDataString = localStorage.getItem('user');
        if (!userDataString) {
            console.log('No user data found in local storage.');
            return;
        }
        const userData = JSON.parse(userDataString);

        // Update the name and email fields
        userData.name = updatedUser.name;
        userData.email = updatedUser.email;

        const updatedUserDataString = JSON.stringify(userData);

        // Save the updated JSON string
        localStorage.setItem('user', updatedUserDataString);
    };

    const handleName = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            updateState(json)
            navigate('/user-profile')
        }
    }
    
    const handleEmail = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                email: email
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            updateState(json)
            navigate('/user-profile')
        }
    };
    
    const handlePassword = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                passwrd: password
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            updateState(json)
            navigate('/user-profile')
        }
    };

    const handleDesc = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                description: desc
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            updateState(json)
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
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                ></input>
                <buttonContainer><button>Edit email</button></buttonContainer>
            </form>

            <form onSubmit={handlePassword}>
                <label>Password</label>
                <input
                    type="text" 
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