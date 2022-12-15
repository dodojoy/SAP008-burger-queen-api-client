export function FooterAuth({ text1, text2, onClick }) {
	return (
		<p className="footer-auth">{text1} <button onClick={onClick}>{text2}</button></p>
	);
}