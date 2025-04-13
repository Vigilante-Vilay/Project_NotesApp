import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import penIcon from "../assets/penIcon.svg";
import trashCan from "../assets/trashCan.svg";

export function Notes() {
    const navigate = useNavigate();
    const [note, setNote] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:100/notes/notes", {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.notes) {
                console.log("Notes response:", response.data.notes);
                setNote(response.data.notes);
            } else {
                setNote([]);
            }
        }).catch(err => {
            console.error("Error fetching notes:", err);
        });
    }, []);
    
    const handleDelete = (noteId)=>{
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:100/notes/notes/${noteId}`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then(res=>{
            setNote(prevNotes => prevNotes.filter(note => note._id !== noteId));
            alert("Note deleted");
        }).catch(err=>{
            alert("Error in deleting the note");
        })
    } 

    return (
        <div>
            <div className="font-bold text-lg p-6">
                Your Notes - 
            </div>
            <div>
                {note.map((notes) => (
                    <div key={notes._id} className="flex justify-between items-center border-b-2 border-slate-200 py-2 px-4">
                        <div className="flex-grow">
                            <div className="font-bold text-purple-700">{notes.title}</div>
                            <div className="font-semibold text-sm text-gray-600">{notes.content}</div>
                        </div>
                        <div className="flex space-x-2 ml-auto">
                            <button onClick={() => navigate(`/editnote/${notes._id}`)} // Navigate directly in the onClick
                                className="bg-gray-800 hover:bg-gray-900 text-white py-1 px-4 rounded-md ml-auto">
                                    <img src={penIcon} alt="Edit" className="w-4 h-4" />
                            </button>
                            <button onClick={()=>{handleDelete(notes._id)}} // Navigate directly in the onClick
                                className="bg-gray-800 hover:bg-gray-900 text-white py-1 px-4 rounded-md ml-auto">
                                    <img src={trashCan} alt="Delete" className="w-4 h-4" />
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
