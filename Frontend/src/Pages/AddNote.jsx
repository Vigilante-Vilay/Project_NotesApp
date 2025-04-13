import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddNote() {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");

    const handleAddNote = async () => {
        const title = titleRef.current.innerText.trim();

        if (!title || !content.trim()) {
            alert("Please enter both title and content");
            return;
        }
        try {
            await axios.post("http://localhost:100/notes", {
                title,
                content: content.trim()
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            alert("Note Added");
            titleRef.current.innerText = "";
            setContent("");
            navigate("/dashboard")
        } catch (err) {
            alert("Error in adding the note");
        }
    };

    return (
        <div className="bg-emerald-50 h-screen">
            <div className="max-w-xl mx-auto pt-10 px-4">
                <div className="text-lg font-bold flex justify-center mb-3 underline">Add your Note</div>
                <div className="text-md font-semibold text-gray-700">Title - </div>
                <div ref={titleRef} contentEditable className="bg-purple-50 outline-none border-b-2 border-gray-200 text-base pt-3 px-2 mb-5 shadow-sm focus:border-purple-500 transition-all"suppressContentEditableWarning></div>
                <div className="text-md font-semibold text-gray-700">Content - </div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full resize-none h-40 bg-purple-50 outline-none border-b-2 border-gray-200 text-base pt-3 px-2 mb-5 shadow-sm focus:border-purple-500 transition-all"></textarea>
                <button onClick={handleAddNote} className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-black flex justify-center font-semibold py-2 px-4 rounded-xl shadow-md transition-all mx-auto">
                    Add Note
                </button>
            </div>
        </div>
    );
}
