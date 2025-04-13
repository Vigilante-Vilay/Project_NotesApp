export function InputBox({label,placeholder,type,onchange}){
    return <div>
        <div className="text-sm font-large font-semibold text-left p-2">{label}</div>
        <input type={type} placeholder={placeholder} onChange={onchange} className="px-2 py-1 border-2"></input>
    </div>
}