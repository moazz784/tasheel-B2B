import { useState } from "react";
import {
	ArrowLeft,
	ArrowUpLeft,
	BadgeCheck,
	Check,
	ChevronDown,
	Compass,
	Headphones,
	Landmark,
	MapPin,
	MessageCircle,
	Plane,
	ShieldCheck,
	Sparkles,
	UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import ContactLink from "../components/ContactLink";
import PackageCard from "../components/PackageCard";
import { isWhatsAppConfigured } from "../config/whatsapp";
import { packagesByType } from "../data/packages";

const faqs = [
	{
		question: "كيف يمكنني الاستفسار عن إحدى الباقات؟",
		answer: "اختر الباقة المناسبة وتواصل مع فريقنا للاستفسار. سنشرح لك التفاصيل والمتطلبات والخطوات بكل وضوح.",
	},
	{
		question: "هل الأسعار تشمل تذاكر الطيران؟",
		answer: "تختلف تفاصيل كل باقة. نوضح ما يشمله السعر وما لا يشمله قبل إتمام أي حجز، ويمكنك التواصل معنا للحصول على التفاصيل المحدثة.",
	},
	{
		question: "هل أستطيع طلب برنامج يناسب احتياجاتي؟",
		answer: "بالتأكيد. تواصل مع مستشارينا وسنساعدك في اختيار المواعيد ومستوى الإقامة والخدمات الأنسب لك.",
	},
	{
		question: "هل يتم تأكيد الحجز من خلال الموقع؟",
		answer: "لا. الموقع للتعريف بالبرامج واستقبال الاستفسارات فقط. يتم تأكيد التوفر والحجز مباشرة مع فريقنا بعد مراجعة التفاصيل.",
	},
];

function SectionTitle({ eyebrow, title, description, light = false }) {
	return (
		<div className={`section-title${light ? " section-title-light" : ""}`}>
			<span className="eyebrow">{eyebrow}</span>
			<h2>{title}</h2>
			{description && <p>{description}</p>}
		</div>
	);
}

function PackageSection({ id, eyebrow, title, description, items, linkText, path, dark = false }) {
	return (
		<section className={`package-section${dark ? " package-section-dark" : ""}`} id={id}>
			<div className="container">
				<div className="section-heading-row">
					<SectionTitle eyebrow={eyebrow} title={title} description={description} light={dark} />
					<Link className={`text-link${dark ? " text-link-light" : ""}`} to={path}>
						{linkText}<ArrowLeft size={17} />
					</Link>
				</div>
				<div className="package-grid">
					{items.map((item, index) => <PackageCard key={item.slug} item={item} index={index} />)}
				</div>
				<p className="sample-note package-sample-note">الأسعار والمواعيد المعروضة بيانات تجريبية للواجهة، وتخضع للتأكيد عند التواصل مع فريقنا.</p>
			</div>
		</section>
	);
}

export default function HomePage() {
	const [activeFaq, setActiveFaq] = useState(0);

	return (
		<main>
			<section className="hero" id="home">
				<div className="hero-overlay" />
				<div className="container hero-content">
					<div className="hero-copy">
						<div className="hero-kicker"><span /> نرافقكم إلى أجمل الوجهات</div>
						<h1>رحلتك إلى بيت الله<br /><em>تبدأ من هنا</em></h1>
						<p>
							لأنها رحلة العمر، نهتم بكل تفاصيلها. برامج عمرة وحج متكاملة،
							وخدمات سفر تمنحكم راحة البال من أول خطوة.
						</p>
						<div className="hero-actions">
							<a className="button button-gold" href="#umrah">اكتشف رحلات العمرة <ArrowLeft size={18} /></a>
							<a className="button button-outline" href="#hajj">اكتشف رحلات الحج <ArrowUpLeft size={17} /></a>
						</div>
						<div className="hero-trust">
							<div className="trust-avatars" aria-hidden="true">
								<span>م</span><span>ع</span><span>س</span><span><UsersRound size={15} /></span>
							</div>
							<div><strong>رفقاء رحلتكم</strong><small>عناية واهتمام في كل خطوة</small></div>
							<span className="trust-separator" />
							<div className="trust-stars"><span>★★★★★</span><small>تجربة تستحق الثقة</small></div>
						</div>
					</div>
				</div>
				<a className="hero-scroll" href="#umrah"><span /> اكتشف رحلتك</a>
				<div className="hero-side-note"><span>رحلات بقلب مطمئن</span><i /></div>
			</section>

			<div className="experience-strip">
				<div className="container experience-grid">
					<div className="experience-item"><span className="experience-icon"><ShieldCheck size={23} /></span><div><strong>ثقة وشفافية</strong><small>تفاصيل واضحة من البداية</small></div></div>
					<div className="experience-item"><span className="experience-icon"><Headphones size={23} /></span><div><strong>معكم على مدار الرحلة</strong><small>فريق يهتم براحتكم</small></div></div>
					<div className="experience-item"><span className="experience-icon"><BadgeCheck size={23} /></span><div><strong>خبرة في تنظيم الرحلات</strong><small>عناية بالتفاصيل الصغيرة</small></div></div>
					<div className="experience-item"><span className="experience-icon"><Compass size={23} /></span><div><strong>وجهات مختارة بعناية</strong><small>تجارب تناسب تطلعاتكم</small></div></div>
				</div>
			</div>

			<PackageSection
				id="umrah"
				eyebrow="رحلات العمرة"
				title="إلى رحاب الحرم.. بكل سكينة"
				description="اخترنا لكم برامج عمرة بعناية، تجمع بين الراحة والقرب من الحرم والاهتمام بكل تفاصيل رحلتكم."
				items={packagesByType.umrah}
				linkText="جميع رحلات العمرة"
				path="/packages/umrah"
			/>

			<section className="quote-band">
				<div className="quote-pattern" />
				<div className="container quote-inner">
					<div className="quote-icon"><Sparkles size={21} /></div>
					<p>ليست مجرد رحلة، إنها لحظات تبقى في القلب <span>مدى الحياة.</span></p>
					<a href="#about">قصتنا ورؤيتنا <ArrowLeft size={16} /></a>
				</div>
			</section>

			<PackageSection
				id="hajj"
				eyebrow="برامج الحج"
				title="رحلة إيمانية.. بعناية تليق بها"
				description="برامج حج مدروسة وخدمات متكاملة، لنكون إلى جانبكم في هذه الرحلة المباركة."
				items={packagesByType.hajj}
				linkText="تعرّف على برامج الحج"
				path="/packages/hajj"
				dark
			/>

			<section className="destinations-section" id="destinations">
				<div className="container">
					<div className="section-heading-row">
						<SectionTitle eyebrow="اكتشف العالم" title="وجهات تصنع ذكرياتكم" description="من المدن النابضة بالحياة إلى الشواطئ الهادئة، اختاروا وجهتكم القادمة." />
						<Link className="text-link" to="/packages/travel">اكتشف عروضنا <ArrowLeft size={17} /></Link>
					</div>
					<div className="destination-grid">
						{packagesByType.travel.map((destination, index) => (
							<Link className="destination-card" to={`/packages/${destination.slug}`} key={destination.slug} style={{ "--card-index": index }}>
								<img src={destination.image} alt={`رحلات سياحية إلى ${destination.country}`} loading="lazy" />
								<span className="destination-shade" />
								<span className="destination-info"><small>{destination.country}</small><strong>{destination.name}</strong></span>
								<span className="destination-arrow"><ArrowUpLeft size={18} /></span>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="about-section" id="about">
				<div className="container about-grid">
					<div className="about-visual">
						<div className="about-image-main"><img src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1100&q=85" alt="المسجد الحرام في مكة المكرمة" loading="lazy" /></div>
						<div className="about-image-small"><img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=500&q=85" alt="تفاصيل معمارية إسلامية" loading="lazy" /></div>
						<div className="about-stamp"><Landmark size={25} /><span>رحلتكم<br />أمانة</span></div>
					</div>
					<div className="about-copy">
						<SectionTitle eyebrow="من نحن" title={<>في مدى.. <span>رحلتكم أمانة</span></>} description="نؤمن أن أجمل الرحلات تبدأ بالاهتمام. لذلك نضع خبرتنا وشغفنا في خدمتكم، لنصنع تجربة سفر مطمئنة، واضحة، وتليق بتطلعاتكم." />
						<div className="about-points">
							<div><Check size={17} /><span>برامج وخيارات تناسب احتياجاتكم</span></div>
							<div><Check size={17} /><span>تواصل واضح ومتابعة شخصية</span></div>
							<div><Check size={17} /><span>اهتمام بالتفاصيل قبل الرحلة وأثناءها</span></div>
						</div>
						<a className="button button-navy" href="#contact">تعرّفوا علينا أكثر <ArrowLeft size={17} /></a>
					</div>
				</div>
			</section>

			<section className="booking-section" id="booking">
				<div className="container">
					<SectionTitle eyebrow="خطوات بسيطة" title="من اختيار الرحلة.. إلى لحظات الوصول" description="نحن معكم خطوة بخطوة، بكل وضوح واهتمام." />
					<div className="steps-grid">
						<div className="step-card"><span className="step-number">01</span><span className="step-icon"><Compass size={25} /></span><h3>اختاروا رحلتكم</h3><p>تصفحوا البرامج والوجهات واختاروا ما يناسبكم.</p></div>
						<div className="step-connector" />
						<div className="step-card"><span className="step-number">02</span><span className="step-icon"><MapPin size={25} /></span><h3>تعرّفوا على التفاصيل</h3><p>اطلعوا على الخدمات والمواعيد وتفاصيل الإقامة.</p></div>
						<div className="step-connector" />
						<div className="step-card"><span className="step-number">03</span><span className="step-icon"><MessageCircle size={25} /></span><h3>تواصلوا معنا</h3><p>فريقنا يجيب عن استفساراتكم ويساعدكم في الاختيار.</p></div>
						<div className="step-connector" />
						<div className="step-card"><span className="step-number">04</span><span className="step-icon"><Plane size={25} /></span><h3>أكملوا الحجز مع فريقنا</h3><p>نراجع التوفر والخطوات معكم قبل تأكيد الحجز.</p></div>
					</div>
					<p className="booking-note"><ShieldCheck size={16} /> الاستفسار لا يعني تأكيد الحجز، ويتم التأكيد مباشرة مع فريقنا.</p>
				</div>
			</section>

			<section className="testimonials-section">
				<div className="container">
					<SectionTitle eyebrow="كلمات من رحّالينا" title="تجارب نعتز بها" description="نسعد بأن نكون جزءاً من رحلاتكم وذكرياتكم الجميلة." />
					<div className="testimonials-grid">
						<article className="testimonial-card"><div className="testimonial-stars" aria-label="5 من 5 نجوم">★★★★★</div><p>“كانت رحلة العمرة مريحة ومنظمة من البداية. الفريق متعاون جداً وكل التفاصيل كانت واضحة.”</p><div className="testimonial-person"><span>أ</span><div><strong>أمينة العتيبي</strong><small>رحلة عمرة</small></div></div></article>
						<article className="testimonial-card testimonial-featured"><div className="testimonial-stars" aria-label="5 من 5 نجوم">★★★★★</div><p>“اهتمام راقٍ وتواصل مستمر. شعرنا بالاطمئنان طوال الرحلة، وسنكرر التجربة بإذن الله.”</p><div className="testimonial-person"><span>م</span><div><strong>محمد السالم</strong><small>رحلة عائلية</small></div></div></article>
						<article className="testimonial-card"><div className="testimonial-stars" aria-label="5 من 5 نجوم">★★★★★</div><p>“شكراً لكم على حسن التنظيم وسعة الصدر في الإجابة عن كل استفساراتنا قبل السفر.”</p><div className="testimonial-person"><span>ن</span><div><strong>نورة الحربي</strong><small>رحلة سياحية</small></div></div></article>
					</div>
					<p className="sample-note">آراء تجريبية للتصميم، تُستبدل بتقييمات العملاء الفعلية عند توفرها.</p>
				</div>
			</section>

			<section className="faq-section" id="faq">
				<div className="container faq-layout">
					<div className="faq-intro">
						<SectionTitle eyebrow="أسئلة متكررة" title={<>كل ما تحتاجون معرفته، <span>بكل وضوح</span></>} description="لم تجدوا إجابة سؤالك؟ فريقنا يسعد بمساعدتكم." />
						<ContactLink className="faq-contact" message="السلام عليكم، لدي استفسار عن رحلاتكم."><MessageCircle size={18} /> تواصل مع فريقنا</ContactLink>
					</div>
					<div className="faq-list">
						{faqs.map((faq, index) => (
							<div className={`faq-item${activeFaq === index ? " faq-item-open" : ""}`} key={faq.question}>
								<button className="faq-question" type="button" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
									<span>{faq.question}</span><ChevronDown size={19} />
								</button>
								<div className="faq-answer"><p>{faq.answer}</p></div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="contact-banner" id="contact">
				<div className="container contact-banner-inner">
					<div className="contact-banner-icon"><MessageCircle size={27} /></div>
					<div>
						<span>نحن هنا لأجلكم</span>
						<h2>لديكم سؤال؟ يسعدنا أن نسمع منكم</h2>
						<p>تواصلوا معنا، ومستشارونا يجيبون عن استفساراتكم بكل اهتمام.</p>
						{!isWhatsAppConfigured && <p className="contact-setup-note">لتفعيل الحجز عبر واتساب، أضف رقم الشركة في إعداد VITE_WHATSAPP_NUMBER.</p>}
					</div>
					<ContactLink className="button button-gold" message="السلام عليكم، أرغب في الاستفسار عن رحلات مدى.">تواصل معنا <ArrowLeft size={18} /></ContactLink>
				</div>
			</section>
		</main>
	);
}
