import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function EditNote() {
    const { id } = useParams(); // Passed in the URL
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`http://localhost:100/notes/notes/${id}`, { // Getting the existing note first
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setTitle(res.data.note.title);
            setContent(res.data.note.content);
        })
        .catch(err => {
            console.log("Error in Fetching the note: ", err);
        });
    }, [id]);

    const handleUpdate = () => {
        axios.put(`http://localhost:100/notes/notes/${id}`, {
            title,
            content
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            alert("Note updated successfully");
            navigate("/dashboard");
        })
        .catch(err => {
            alert("Error in updating the note");
            // Idk if navigate is necessary here
        });
    };

    return (
        <div className="bg-emerald-50 h-screen">
            <div className="max-w-xl mx-auto pt-10 px-4">
                <div className="text-lg font-bold flex justify-center mb-3 underline">Edit your Note</div>
                
                <div className="text-md font-semibold text-gray-700">Title - </div>
                <input
                    type="text"
                    value={title} // Set the value to the title state
                    onChange={(e) => setTitle(e.target.value)} // Update title on change
                    className="bg-purple-50 outline-none border-b-2 border-gray-200 text-base pt-3 px-2 mb-5 shadow-sm focus:border-purple-500 transition-all w-full"
                />
                
                <div className="text-md font-semibold text-gray-700">Content - </div>
                <textarea
                    value={content} // Set the value to the content state
                    onChange={(e) => setContent(e.target.value)} // Update content on change
                    className="bg-purple-50 outline-none border-b-2 border-gray-200 text-base pt-3 px-2 mb-5 shadow-sm focus:border-purple-500 transition-all w-full h-40"
                />
                
                <button
                    onClick={handleUpdate}
                    className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-black flex justify-center font-semibold py-2 px-4 rounded-xl shadow-md transition-all mx-auto"
                >
                    Update Note
                </button>
            </div>
        </div>
    );
}
