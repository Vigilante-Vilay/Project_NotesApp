import React, { useState } from "react";
import {Heading} from "../Components/Heading";
import {InputBox} from "../Components/InputBox";
import {Button} from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return <div className="bg-slate-200 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <Heading label={"Login"} />
            <InputBox label={"Username"} placeholder={"Enter username"} type={"text"} onchange={(e)=>{
                setUsername(e.target.value)
            }}/>
            <InputBox label={"Password"} placeholder={"Enter password"} type={"password"} onchange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <Button label={"Login"} onclick={async ()=>{
                const response = await axios.post("http://localhost:100/user/login",{
                    username,
                    password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")
            }}/>
            <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to={"/signup"}/>
        </div>
    </div>
}
