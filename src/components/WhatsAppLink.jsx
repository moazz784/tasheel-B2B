import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPackageInquiryMessage, createWhatsAppUrl } from "../config/whatsapp";

export default function WhatsAppLink({ item, className = "" }) {
	const message = createPackageInquiryMessage(item);
	const href = createWhatsAppUrl(message);

	if (!href) {
		return (
			<Link
				className={`whatsapp-disabled ${className}`.trim()}
				to={`/packages/${item.slug}#inquiry`}
				title="واتساب غير مفعّل؛ يمكنكم تعبئة نموذج الاستفسار ونسخ الرسالة"
			>
				<MessageCircle size={16} />
				أكمل الاستفسار
			</Link>
		);
	}

	return (
		<a className={`whatsapp-link ${className}`.trim()} href={href} target="_blank" rel="noreferrer">
			<MessageCircle size={16} />
			احجز عبر واتساب
		</a>
	);
}
