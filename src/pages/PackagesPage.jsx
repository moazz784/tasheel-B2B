import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { packageTypes, packagesByType } from "../data/packages";

const initialFilters = { search: "", minPrice: "", maxPrice: "", duration: "", departure: "", category: "", sort: "recommended" };

function matchesSearch(item, query) {
	const searchText = [item.name, item.description, item.country, item.hotel, item.label]
		.filter(Boolean)
		.join(" ")
		.toLocaleLowerCase("ar");
	return searchText.includes(query.trim().toLocaleLowerCase("ar"));
}

export default function PackagesPage({ type }) {
	const [items, setItems] = useState([]);
	const [loadedType, setLoadedType] = useState(null);
	const [filters, setFilters] = useState(initialFilters);
	const definition = packageTypes[type];
	const loading = loadedType !== type;

	useEffect(() => {
		let active = true;
		Promise.resolve(packagesByType[type] || []).then((packages) => {
			if (active) {
				setItems(packages);
				setLoadedType(type);
			}
		});
		return () => {
			active = false;
		};
	}, [type]);

	const durations = useMemo(
		() => [...new Set(items.map((item) => item.durationDays))].sort((a, b) => a - b),
		[items],
	);
	const departures = useMemo(
		() => [...new Set(items.map((item) => item.departureDate))].sort(),
		[items],
	);
	const categories = useMemo(
		() => [...new Set(items.map((item) => item.hotelCategory))].sort(),
		[items],
	);
	const filteredItems = useMemo(() => {
		const result = items.filter((item) =>
			matchesSearch(item, filters.search)
			&& (filters.minPrice === "" || item.price >= Number(filters.minPrice))
			&& (filters.maxPrice === "" || item.price <= Number(filters.maxPrice))
			&& (!filters.duration || item.durationDays === Number(filters.duration))
			&& (!filters.departure || item.departureDate === filters.departure)
			&& (!filters.category || item.hotelCategory === filters.category),
		);

		if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
		if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
		if (filters.sort === "duration") result.sort((a, b) => a.durationDays - b.durationDays);
		if (filters.sort === "departure") result.sort((a, b) => a.departureDate.localeCompare(b.departureDate));
		return result;
	}, [filters, items]);

	const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
	const resetFilters = () => setFilters(initialFilters);

	if (!definition) return null;

	return (
		<main className="listing-page">
			<section className="listing-hero">
				<div className="container">
					<div className="listing-breadcrumb"><Link to="/">الرئيسية</Link><span>/</span><span>{definition.label}</span></div>
					<span className="eyebrow">{definition.label}</span>
					<h1>{definition.title}</h1>
					<p>{definition.description}</p>
				</div>
			</section>

			<section className="listing-content">
				<div className="container">
					<div className="listing-heading">
						<div>
							<span className="eyebrow"><SlidersHorizontal size={14} /> ابحثوا عن رحلتكم</span>
							<h2>اختاروا الباقة الأنسب لكم</h2>
						</div>
						{!loading && <span className="result-count">{filteredItems.length} باقات متاحة</span>}
					</div>

					<div className="package-browser">
						<aside className="filter-panel" aria-label="تصفية الباقات">
							<div className="filter-title-row">
								<h3><SlidersHorizontal size={17} /> تصفية النتائج</h3>
								<button className="filter-reset" type="button" onClick={resetFilters}>
									<RotateCcw size={14} /> إعادة ضبط
								</button>
							</div>
							<label className="filter-label" htmlFor="package-search">بحث</label>
							<div className="search-field">
								<Search size={17} />
								<input
									id="package-search"
									type="search"
									placeholder="اسم الباقة أو الفندق"
									value={filters.search}
									onChange={(event) => updateFilter("search", event.target.value)}
								/>
							</div>

							<fieldset className="filter-fieldset">
								<legend>السعر للشخص (ر.س)</legend>
								<div className="price-inputs">
									<label><span>من</span><input type="number" min="0" inputMode="numeric" placeholder="0" value={filters.minPrice} onChange={(event) => updateFilter("minPrice", event.target.value)} /></label>
									<label><span>إلى</span><input type="number" min="0" inputMode="numeric" placeholder="بدون حد" value={filters.maxPrice} onChange={(event) => updateFilter("maxPrice", event.target.value)} /></label>
								</div>
							</fieldset>

							<label className="filter-label" htmlFor="duration-filter"><Clock3 size={15} /> مدة الرحلة</label>
							<select id="duration-filter" value={filters.duration} onChange={(event) => updateFilter("duration", event.target.value)}>
								<option value="">جميع المدد</option>
								{durations.map((days) => <option value={days} key={days}>{days} أيام</option>)}
							</select>

							<label className="filter-label" htmlFor="departure-filter"><CalendarDays size={15} /> تاريخ السفر</label>
							<select id="departure-filter" value={filters.departure} onChange={(event) => updateFilter("departure", event.target.value)}>
								<option value="">جميع المواعيد</option>
								{departures.map((date) => {
									const item = items.find((packageItem) => packageItem.departureDate === date);
									return <option value={date} key={date}>{item.departure}</option>;
								})}
							</select>

							<label className="filter-label" htmlFor="category-filter">تصنيف الفندق</label>
							<select id="category-filter" value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
								<option value="">جميع التصنيفات</option>
								{categories.map((category) => <option value={category} key={category}>{category}</option>)}
							</select>

							<label className="filter-label" htmlFor="sort-filter">ترتيب حسب</label>
							<select id="sort-filter" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}>
								<option value="recommended">المقترحة</option>
								<option value="price-asc">السعر: الأقل أولاً</option>
								<option value="price-desc">السعر: الأعلى أولاً</option>
								<option value="duration">مدة الرحلة</option>
								<option value="departure">الأقرب موعداً</option>
							</select>
						</aside>

						<div className="browse-results" aria-live="polite">
							{loading ? (
								<div className="listing-state">
									<span className="loading-spinner" />
									<h3>جارٍ تجهيز الباقات</h3>
									<p>لحظات ونساعدكم في اختيار رحلتكم.</p>
								</div>
							) : filteredItems.length ? (
								<div className="package-grid package-grid-browse">
									{filteredItems.map((item, index) => <PackageCard item={item} index={index} key={item.slug} />)}
								</div>
							) : (
								<div className="listing-state">
									<span className="empty-search-icon"><Search size={23} /></span>
									<h3>لم نعثر على باقات مطابقة</h3>
									<p>جرّبوا تغيير كلمات البحث أو تعديل خيارات التصفية.</p>
									<button className="button button-navy" type="button" onClick={resetFilters}>عرض جميع الباقات</button>
								</div>
							)}
						</div>
					</div>
					<p className="sample-note package-sample-note">الأسعار والمواعيد المعروضة بيانات تجريبية للواجهة، وتخضع للتأكيد عند التواصل مع فريقنا.</p>
				</div>
			</section>
		</main>
	);
}
