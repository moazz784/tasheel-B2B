import { formatPrice } from "../data/packages";

const configuredNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");

export const whatsappNumber = /^\d{8,15}$/.test(configuredNumber) ? configuredNumber : "";
export const isWhatsAppConfigured = Boolean(whatsappNumber);

export function createWhatsAppUrl(message) {
	if (!isWhatsAppConfigured) return null;
	return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createPackageInquiryMessage(item, customer = {}) {
	const packageUrl = new URL(`/packages/${item.slug}`, window.location.origin).toString();
	const customerDetails = [
		customer.name && `اسم العميل: ${customer.name}`,
		customer.phone && `رقم التواصل: ${customer.phone}`,
		customer.travelers && `عدد المسافرين: ${customer.travelers}`,
		customer.preferredDepartureDate && `تاريخ السفر المفضل: ${customer.preferredDepartureDate}`,
		customer.notes && `ملاحظات إضافية: ${customer.notes}`,
	].filter(Boolean);

	return [
		"السلام عليكم ورحمة الله وبركاته،",
		"",
		"أرغب في الاستفسار عن حجز الرحلة التالية:",
		"",
		`اسم الباقة: ${item.name}`,
		`نوع الرحلة: ${item.label}`,
		`السعر: ${formatPrice(item.price)} ريال`,
		`تاريخ السفر: ${item.departure}`,
		`مدة الرحلة: ${item.duration}`,
		`رابط الباقة: ${packageUrl}`,
		...(customerDetails.length ? ["", ...customerDetails] : []),
		"",
		"برجاء التواصل معي لمعرفة التفاصيل وإجراءات الحجز.",
	].join("\n");
}
