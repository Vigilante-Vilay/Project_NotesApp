import React, { useState } from "react";
import {Heading} from "../Components/Heading";
import {InputBox} from "../Components/InputBox";
import {Button} from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    
    
    return <div className="bg-slate-200 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <Heading label={"Signup"} />
            <InputBox label={"Username"} placeholder={"Enter username"} type={"text"} onchange={(e)=>{
                setUsername(e.target.value)
            }} />
            <InputBox label={"Password"} placeholder={"Enter password"} type={"password"} onchange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <InputBox label={"Firstname"} placeholder={"Enter firstname"} type={"text"} onchange={(e)=>{
                setFirstName(e.target.value) 
            }}/>
            <InputBox label={"Lastname"} placeholder={"Enter lastname"} type={"text"} onchange={(e)=>{
                setLastName(e.target.value) 
            }}/>
            <Button label={"Signup"} onclick={async ()=>{
                const response = await axios.post("http://localhost:100/user/signup",{
                    username,
                    password,
                    firstName,
                    lastName
                })
                localStorage.setItem("token",response.data.token);
                navigate("/dashboard");
                //Might wanna add a console.log to test run
            }}/>
            <BottomWarning label={"Already have an account? "} buttonText={"Login"} to={"/login"}/>
        </div>
    </div>
}
