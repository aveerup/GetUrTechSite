import React,{useState} from 'react';
import './Login.css';
import {Link,useNavigate} from 'react-router-dom';
import { useUser } from './UserCntxt';
import axios from 'axios';

export default function Login(props) {
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const {updateUser,updateRole,updateName}= useUser();
    const navigate = useNavigate();

    // const [loginStatus,setLoginStatus]=useState(false);
    let l;
    const [check,setCheck]= useState(false);
    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:5000/login',{email,password})
        .then(res=>{
            console.log(res.data);
            l=res.data.result.length;
            console.log(l);
            if(l) 
            {   
                props.setCartCount(res.data.result1);
                console.log(res.data.result1);
                props.setCart({info:res.data.reslt});
                props.setLoginStatus(true);
                const x=res.data.result[0].id;
                props.setUser(x);
                console.log(x);
                updateUser(res.data.result[0].id);
                updateRole(res.data.result[0].role);
                updateName(res.data.result[0].first_name+' '+res.data.result[0].last_name);
                console.log('In login '+res.data.result[0].first_name+' '+res.data.result[0].last_name);
                navigate('/');
            }
            else setCheck(true);
        })
        .catch(err=> console.log(err));
        
    }
    
    return (
        
    <div className='login py-5 bg-light'>
        <div className='container2'>
            <div className="row g-0" id='row1'>
                <div className='col-lg-5'>
                    <img src={require('./Login.jpg')} className='img-fluid' alt='LoginImage'/>
                </div>
                <div className='col-lg-5 text-center py-5'>
                    <h1>Login</h1>
                    {check && (
                        <div className="alert alert-danger" role="alert">
                            Incorrect Email or Password
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-row py-3 pt-5">
                            <div className='offset-1 col-lg-15'>
                            <input type="email" onChange={e=>setEmail(e.target.value)} className='inp px-3' autoComplete='off' placeholder='Email Address'/>
                            </div>
                            
                        </div>
                        <div className="form-row py-3">
                            <div className='offset-1 col-lg-15'>
                            <input type="password" onChange={e=>setPassword(e.target.value)} className='inp px-3' autoComplete='off' placeholder='Password'/>
                            </div>
                        </div>
                        <div className="form-row py-3">
                            <div className='offset-1 col-lg-10'>
                            <button className='btn1'>Login</button>
                            </div>
                        </div>
                    </form>
                    <p>
                        Don't have an account?<Link to='/register' style={{color:"green",fontWeight:"bold"}}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
    
    )
}
