import { useState } from "react";
import { Clipboard, MessageCircle, Send } from "lucide-react";
import { createPackageInquiryMessage, createWhatsAppUrl } from "../config/whatsapp";

function initialValues(item) {
	return {
		name: "",
		phone: "",
		travelers: "1",
		preferredDepartureDate: item.departureDate,
		notes: "",
	};
}

export default function PackageInquiryForm({ item }) {
	const [form, setForm] = useState(() => initialValues(item));
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [copyStatus, setCopyStatus] = useState("");
	const whatsappUrl = message ? createWhatsAppUrl(message) : null;

	const updateField = (event) => {
		const { name, value } = event.target;
		setForm((current) => ({ ...current, [name]: value }));
		setError("");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const phoneDigits = form.phone.replace(/\D/g, "");
		const travelers = Number(form.travelers);

		if (form.name.trim().length < 2) {
			setError("يرجى إدخال الاسم (حرفان على الأقل).");
			return;
		}
		if (!/^\+?[0-9\s()-]{8,20}$/.test(form.phone.trim()) || phoneDigits.length < 8 || phoneDigits.length > 15) {
			setError("يرجى إدخال رقم هاتف صحيح مع رمز الدولة.");
			return;
		}
		if (!Number.isInteger(travelers) || travelers < 1 || travelers > 20) {
			setError("عدد المسافرين يجب أن يكون بين 1 و20.");
			return;
		}
		if (!form.preferredDepartureDate) {
			setError("يرجى اختيار تاريخ السفر المفضل.");
			return;
		}

		setMessage(createPackageInquiryMessage(item, {
			...form,
			name: form.name.trim(),
			phone: form.phone.trim(),
			travelers: String(travelers),
			notes: form.notes.trim(),
		}));
		setCopyStatus("");
		setError("");
	};

	const copyMessage = async () => {
		try {
			await navigator.clipboard.writeText(message);
			setCopyStatus("نُسخت الرسالة. يمكنكم لصقها في واتساب لإرسال الاستفسار.");
		} catch {
			setCopyStatus("تعذر النسخ تلقائياً؛ حدّدوا نص الرسالة الظاهر وانسخوه يدوياً.");
		}
	};

	return (
		<section className="detail-inquiry-form" id="inquiry">
			<div className="inquiry-form-heading">
				<span className="eyebrow">استفسار غير ملزم بالحجز</span>
				<h2>دعونا نتواصل معكم</h2>
				<p>املؤوا بيانات التواصل، وسنجهز رسالة واتساب تتضمن تفاصيل هذه الباقة.</p>
			</div>
			<form onSubmit={handleSubmit} noValidate>
				<div className="inquiry-fields">
					<label>
						اسم العميل
						<input name="name" type="text" autoComplete="name" maxLength="100" required value={form.name} onChange={updateField} />
					</label>
					<label>
						رقم الهاتف مع رمز الدولة
						<input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength="20" placeholder="+966..." required value={form.phone} onChange={updateField} />
					</label>
					<label>
						عدد المسافرين
						<input name="travelers" type="number" min="1" max="20" step="1" inputMode="numeric" required value={form.travelers} onChange={updateField} />
					</label>
					<label>
						تاريخ السفر المفضل
						<input name="preferredDepartureDate" type="date" required value={form.preferredDepartureDate} onChange={updateField} />
					</label>
					<label className="inquiry-notes-field">
						ملاحظات إضافية <span>(اختياري)</span>
						<textarea name="notes" rows="4" maxLength="500" value={form.notes} onChange={updateField} />
					</label>
				</div>
				{error && <p className="inquiry-error" role="alert">{error}</p>}
				<button className="button button-navy inquiry-submit" type="submit">
					جهّز رسالة الاستفسار <Send size={16} />
				</button>
			</form>

			{message && (
				<div className="inquiry-result" aria-live="polite">
					{whatsappUrl ? (
						<>
							<a className="button button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">
								<MessageCircle size={17} /> فتح واتساب لإرسال الاستفسار
							</a>
							<p>سيُفتح واتساب أو واتساب ويب برسالة جاهزة. أرسلوا الرسالة بعد مراجعتها؛ لا يُعد ذلك تأكيداً للحجز.</p>
						</>
					) : (
						<>
							<p className="inquiry-fallback-note">واتساب غير مفعّل حالياً. يمكنكم نسخ الرسالة وإرسالها يدوياً بعد إعداد رقم الشركة.</p>
							<button className="button button-navy" type="button" onClick={copyMessage}>
								<Clipboard size={16} /> نسخ رسالة واتساب
							</button>
							<label className="inquiry-message-label">
								نص الرسالة
								<textarea className="inquiry-message-preview" readOnly rows="9" value={message} />
							</label>
						</>
					)}
					{copyStatus && <p className="inquiry-copy-status" role="status">{copyStatus}</p>}
				</div>
			)}
		</section>
	);
}
