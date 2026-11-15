import { useState } from "react";
import {
	ArrowLeft,
	Landmark,
	Menu,
	MessageCircle,
	Sparkles,
	X,
} from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import ContactLink from "./components/ContactLink";
import { isWhatsAppConfigured } from "./config/whatsapp";
import HomePage from "./pages/HomePage";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import PackagesPage from "./pages/PackagesPage";

const socialLinks = [
	{ label: "إنستغرام", shortName: "ig", href: import.meta.env.VITE_INSTAGRAM_URL },
	{ label: "إكس", shortName: "𝕏", href: import.meta.env.VITE_X_URL },
	{ label: "سناب شات", shortName: "sc", href: import.meta.env.VITE_SNAPCHAT_URL },
].filter((link) => link.href);

function NotFoundPage() {
	return (
		<main className="listing-state package-not-found">
			<h1>الصفحة غير موجودة</h1>
			<p>تحققوا من الرابط أو عودوا إلى الصفحة الرئيسية.</p>
			<Link className="button button-navy" to="/">العودة للرئيسية <ArrowLeft size={17} /></Link>
		</main>
	);
}

function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="container footer-main">
				<div className="footer-brand-column">
					<Link className="brand brand-footer" to="/#home">
						<span className="brand-mark"><Landmark size={26} strokeWidth={1.6} /></span>
						<span className="brand-copy"><strong>مَدى</strong><small>للسفر والسياحة</small></span>
					</Link>
					<p>نرافقكم في رحلاتكم الإيمانية والسياحية، بعناية تبدأ من أول استفسار وتستمر حتى عودتكم بالسلامة.</p>
					<ContactLink className="footer-whatsapp" message="السلام عليكم، أرغب في التواصل مع مدى للسفر والسياحة.">
						<MessageCircle size={17} /> {isWhatsAppConfigured ? "تواصل عبر واتساب" : "تواصل معنا"}
					</ContactLink>
				</div>
				<div className="footer-links">
					<h3>روابط سريعة</h3>
					<Link to="/">الرئيسية</Link>
					<Link to="/packages/umrah">رحلات العمرة</Link>
					<Link to="/packages/hajj">رحلات الحج</Link>
					<Link to="/packages/travel">الرحلات السياحية</Link>
				</div>
				<div className="footer-links">
					<h3>يسعدنا تواصلكم</h3>
					<Link to="/#contact">استفسارات الرحلات والحجوزات</Link>
					<Link to="/#faq">الأسئلة المتكررة</Link>
					<Link to="/#about">عن مدى للسفر والسياحة</Link>
				</div>
				<div className="footer-newsletter">
					<h3>رحلتكم القادمة أقرب</h3>
					<p>تابعونا لاكتشاف برامجنا ووجهاتنا الجديدة.</p>
					<div className="social-links" aria-label="روابط التواصل الاجتماعي">
						{socialLinks.length > 0
							? socialLinks.map((link) => (
								<a href={link.href} aria-label={link.label} key={link.label} target="_blank" rel="noreferrer">
									{link.shortName}
								</a>
							))
							: <small className="social-note">تُضاف روابط الحسابات عند إعدادها.</small>}
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container footer-bottom-inner">
					<span>© 2026 مدى للسفر والسياحة. جميع الحقوق محفوظة.</span>
					<span>صُممت رحلتكم بعناية <span className="footer-heart">♥</span></span>
				</div>
			</div>
		</footer>
	);
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);

	return (
		<div dir="rtl" className="site-shell">
			<div className="topbar">
				<div className="container topbar-inner">
					<span><Sparkles size={14} /> رحلتك المباركة تبدأ بخطوة</span>
					<div className="topbar-contact">
						<span>فريقنا هنا لمساعدتكم</span>
						<span className="topbar-divider" />
						<Link to="/#contact">تواصلوا معنا</Link>
					</div>
				</div>
			</div>

			<header className="site-header">
				<div className="container nav-container">
					<Link className="brand" to="/#home" aria-label="مدى للسفر والسياحة - الرئيسية" onClick={closeMenu}>
						<span className="brand-mark"><Landmark size={26} strokeWidth={1.6} /></span>
						<span className="brand-copy"><strong>مَدى</strong><small>للسفر والسياحة</small></span>
					</Link>

					<button
						className="menu-toggle"
						type="button"
						aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen(!menuOpen)}
					>
						{menuOpen ? <X size={23} /> : <Menu size={23} />}
					</button>

					<nav className={`main-nav${menuOpen ? " main-nav-open" : ""}`} aria-label="التنقل الرئيسي">
						<Link to="/" onClick={closeMenu}>الرئيسية</Link>
						<Link to="/packages/umrah" onClick={closeMenu}>رحلات العمرة</Link>
						<Link to="/packages/hajj" onClick={closeMenu}>رحلات الحج</Link>
						<Link to="/packages/travel" onClick={closeMenu}>الرحلات السياحية</Link>
						<Link to="/#about" onClick={closeMenu}>من نحن</Link>
						<Link to="/#contact" onClick={closeMenu}>تواصل معنا</Link>
					</nav>

					<ContactLink className="nav-cta" message="السلام عليكم، أرغب في التواصل مع فريق مدى للسفر والسياحة.">
						<MessageCircle size={17} />
						{isWhatsAppConfigured ? "تواصل عبر واتساب" : "تواصل معنا"}
					</ContactLink>
				</div>
			</header>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/packages/umrah" element={<PackagesPage type="umrah" />} />
				<Route path="/packages/hajj" element={<PackagesPage type="hajj" />} />
				<Route path="/packages/travel" element={<PackagesPage type="travel" />} />
				<Route path="/packages/:slug" element={<PackageDetailsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<SiteFooter />
			<ContactLink
				className={`floating-contact${isWhatsAppConfigured ? " floating-whatsapp" : ""}`}
				message="السلام عليكم، أرغب في الاستفسار عن رحلات مدى."
			>
				<MessageCircle size={23} />
			</ContactLink>
		</div>
	);
}

export default App;
