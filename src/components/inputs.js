export function Inputs({ value, type, placeholder, onClick, onChange, className, id }) {
	return (
		<input id={id} type={type} className={className} placeholder={placeholder} value={value} 
		onClick={onClick} onChange={onChange} />
	);
}