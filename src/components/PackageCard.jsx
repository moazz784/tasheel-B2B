import { ArrowLeft, CalendarDays, Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/packages";
import WhatsAppLink from "./WhatsAppLink";

export default function PackageCard({ item, index = 0 }) {
	return (
		<article className="package-card" style={{ "--card-index": index }}>
			<Link className="package-image-wrap" to={`/packages/${item.slug}`} aria-label={`تفاصيل ${item.name}`}>
				<img src={item.image} alt={item.name} className="package-image" loading="lazy" />
				<span className="package-badge">{item.badge}</span>
				<span className="package-image-label">{item.label}</span>
			</Link>
			<div className="package-content">
				<div className="package-title-row">
					<h3><Link to={`/packages/${item.slug}`}>{item.name}</Link></h3>
					<span className="package-rating" aria-label="باقة مختارة بعناية">
						<Star size={14} fill="currentColor" />
						<span>{item.hotelCategory}</span>
					</span>
				</div>
				<p className="package-description">{item.description}</p>
				<div className="package-meta">
					<span><Clock3 size={15} />{item.duration}</span>
					<span><CalendarDays size={15} />{item.departure}</span>
				</div>
				<p className="package-hotel"><MapPin size={15} />{item.hotel}</p>
				<div className="package-bottom">
					<div className="package-price">
						<small>يبدأ من</small>
						<strong>{formatPrice(item.price)} <span>ر.س</span></strong>
					</div>
					<div className="package-actions">
						<Link className="package-link" to={`/packages/${item.slug}`}>
							تفاصيل الباقة <ArrowLeft size={16} />
						</Link>
						<WhatsAppLink item={item} className="package-book-link" />
					</div>
				</div>
			</div>
		</article>
	);
}
