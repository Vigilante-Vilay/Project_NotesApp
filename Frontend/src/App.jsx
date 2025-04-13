import React from "react";
import { BrowserRouter,Route,Routes,useNavigate } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import {Login} from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { AddNote } from "./Pages/AddNote";
import { EditNote } from "./Pages/EditNote";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addnote" element={<AddNote/>}/>
        <Route path="/editnote/:id" element={<EditNote/>}/>
      </Routes>
    </BrowserRouter>
  )
}

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl mb-8">Note-ify</div>
      <div className="flex gap-6">
        <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer"
          onClick={() => navigate("/signup")}>Signup
        </button>
        <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer"
          onClick={() => navigate("/login")}>Login
        </button>
      </div>
    </div>
  );
}

export default App
