export function FooterAuth({ text1, text2, href }) {
	return (
		<p className="footer-auth">{text1} <a href={href}>{text2}</a></p>
	);
}