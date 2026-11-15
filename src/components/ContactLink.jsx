import { Link } from "react-router-dom";
import { createWhatsAppUrl } from "../config/whatsapp";

export default function ContactLink({ children, className = "", message }) {
	const href = createWhatsAppUrl(message || "السلام عليكم، أرغب في الاستفسار عن رحلاتكم.");
	if (!href) {
		return <Link className={className} to="/#contact">{children}</Link>;
	}

	return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}
