import { AppBar } from "../Components/AppBar"
import {Notes} from "../Components/Notes"
import {useNavigate} from "react-router-dom"

export function Dashboard(){
    const navigate=useNavigate();
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login");
    }

    const navigation=()=>{
        navigate("/addnote");
    }
    return <div>
        <AppBar/>
        <div className="bg-teal-100 h-screen">
            <div className="m-8 mt-0">
                <Notes />
            </div>
            <div className="flex justify-center">
                <button className="bg-yellow-200 hover:bg-yellow-400 cursor-pointer rounded-md p-3 font-semibold mt-4" onClick={navigation}>Add another note</button>   
            </div> 
        </div>
    </div>
}