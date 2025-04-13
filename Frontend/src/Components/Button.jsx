export function Button({label,onclick}){
    return <div className="flex justify-center">
        <button onClick={onclick} className="cursor-pointer mt-4 mb-4 py-2 px-4 rounded bg-indigo-300 hover:bg-indigo-400">{label}</button>
    </div>
}