import { Link } from "react-router-dom";

export function FooterAuth({ text1, text2, route }) {
	return (
		<p className="footer-auth">{text1} <Link className="navigate-btn" to={route}>{text2}</Link></p>
	);
}