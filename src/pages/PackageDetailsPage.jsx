import { useState } from "react";
import { ArrowLeft, CalendarDays, Check, ChevronLeft, Clock3, MapPin, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import PackageInquiryForm from "../components/PackageInquiryForm";
import WhatsAppLink from "../components/WhatsAppLink";
import { allPackages, formatPrice, getPackageBySlug, packageTypes, packagesByType } from "../data/packages";

export default function PackageDetailsPage() {
	const { slug } = useParams();
	const item = getPackageBySlug(slug);
	const [selectedImage, setSelectedImage] = useState({ slug, index: 0 });
	const activeImage = selectedImage.slug === slug ? selectedImage.index : 0;

	if (!item) {
		return (
			<main className="listing-state package-not-found">
				<h1>عذراً، لم نجد هذه الباقة</h1>
				<p>قد تكون الباقة قد أُزيلت أو أن الرابط غير صحيح.</p>
				<Link className="button button-navy" to="/packages/umrah">تصفح الباقات <ArrowLeft size={17} /></Link>
			</main>
		);
	}

	const typeInfo = packageTypes[item.type];
	const relatedPackages = (packagesByType[item.type] || allPackages)
		.filter((related) => related.slug !== item.slug)
		.slice(0, 3);

	return (
		<main className="package-details-page">
			<div className="container">
				<div className="listing-breadcrumb detail-breadcrumb">
					<Link to="/">الرئيسية</Link><span>/</span>
					<Link to={`/packages/${item.type}`}>{typeInfo.label}</Link><span>/</span>
					<span>{item.name}</span>
				</div>

				<div className="detail-heading">
					<div>
						<span className="eyebrow">{typeInfo.label} · {item.country || item.hotelCategory}</span>
						<h1>{item.name}</h1>
						<p>{item.description}</p>
					</div>
					<div className="detail-price">
						<small>السعر للشخص يبدأ من</small>
						<strong>{formatPrice(item.price)} <span>ر.س</span></strong>
					</div>
				</div>

				<div className="detail-layout">
					<div className="detail-main">
						<section className="detail-gallery" aria-label="معرض صور الباقة">
							<div className="detail-main-image">
								<img src={item.gallery[activeImage]} alt={`${item.name} - صورة ${activeImage + 1}`} />
								<span className="package-badge">{item.badge}</span>
							</div>
							<div className="detail-thumbnails">
								{item.gallery.map((image, index) => (
									<button
										className={activeImage === index ? "detail-thumbnail detail-thumbnail-active" : "detail-thumbnail"}
										type="button"
										key={`${image}-${index}`}
										aria-label={`عرض الصورة ${index + 1}`}
										aria-pressed={activeImage === index}
										onClick={() => setSelectedImage({ slug, index })}
									>
										<img src={image} alt="" />
									</button>
								))}
							</div>
						</section>

						<section className="detail-section">
							<span className="eyebrow">عن الرحلة</span>
							<h2>تجربة صُممت لراحتكم</h2>
							<p>{item.description}</p>
							<div className="detail-facts">
								<div><Clock3 size={18} /><span><small>المدة</small><strong>{item.duration}</strong></span></div>
								<div><CalendarDays size={18} /><span><small>تاريخ السفر</small><strong>{item.departure}</strong></span></div>
								<div><CalendarDays size={18} /><span><small>تاريخ العودة</small><strong>{item.return}</strong></span></div>
								<div><MapPin size={18} /><span><small>الإقامة</small><strong>{item.hotelCategory}</strong></span></div>
							</div>
						</section>

						<section className="detail-section detail-hotel">
							<span className="eyebrow">الإقامة</span>
							<h2>{item.hotelName}</h2>
							<p>{item.hotelCategory} · {item.hotelDistance}</p>
						</section>

						<div className="detail-inclusions">
							<section className="detail-list-card">
								<h2><Check size={18} /> يشمل البرنامج</h2>
								<ul>{item.included.map((service) => <li key={service}><Check size={15} />{service}</li>)}</ul>
							</section>
							<section className="detail-list-card detail-excluded">
								<h2><X size={18} /> لا يشمل البرنامج</h2>
								<ul>{item.excluded.map((service) => <li key={service}><X size={15} />{service}</li>)}</ul>
							</section>
						</div>

						<section className="detail-section detail-notes">
							<span className="eyebrow">ملاحظات مهمة</span>
							<ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul>
						</section>
					</div>

					<aside className="detail-booking">
						<span className="eyebrow">تفاصيل الباقة</span>
						<h2>{item.name}</h2>
						<div className="detail-booking-price">
							<strong>{formatPrice(item.price)} <span>ر.س</span></strong>
							<small>للشخص الواحد</small>
						</div>
						<dl>
							<div><dt><CalendarDays size={15} />تاريخ السفر</dt><dd>{item.departure}</dd></div>
							<div><dt><CalendarDays size={15} />تاريخ العودة</dt><dd>{item.return}</dd></div>
							<div><dt><Clock3 size={15} />المدة</dt><dd>{item.duration}</dd></div>
							<div><dt><MapPin size={15} />الفندق</dt><dd>{item.hotelCategory}</dd></div>
						</dl>
						<WhatsAppLink item={item} className="detail-whatsapp" />
						<p className="booking-disclaimer">هذا استفسار عن الباقة وليس تأكيداً للحجز. يؤكد فريقنا التوفر والتفاصيل معكم.</p>
						<Link className="detail-back-link" to={`/packages/${item.type}`}>
							<ChevronLeft size={16} /> العودة إلى {typeInfo.label}
						</Link>
					</aside>
				</div>

				<PackageInquiryForm item={item} key={item.slug} />

				{relatedPackages.length > 0 && (
					<section className="related-packages">
						<div className="section-heading-row">
							<div className="section-title">
								<span className="eyebrow">قد تعجبكم أيضاً</span>
								<h2>باقات ذات صلة</h2>
							</div>
							<Link className="text-link" to={`/packages/${item.type}`}>عرض الكل <ArrowLeft size={16} /></Link>
						</div>
						<div className="package-grid">
							{relatedPackages.map((related, index) => <PackageCard item={related} index={index} key={related.slug} />)}
						</div>
					</section>
				)}
			</div>
			<p className="sample-note package-sample-note">الأسعار والمواعيد المعروضة بيانات تجريبية للواجهة، وتخضع للتأكيد عند التواصل مع فريقنا.</p>
		</main>
	);
}
