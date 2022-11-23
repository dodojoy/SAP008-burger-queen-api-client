export function Inputs({ value, type, placeholder, onClick, onChange }) {
	return (
		<input type={type} className="input-auth" placeholder={placeholder} value={value} 
		onClick={onClick} onChange={onChange} />
	);
}