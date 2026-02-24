import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { products } from "../../data/products";
import { priceRanges } from "../../data/teams";
import "./Shop.css";

const SORT_OPTIONS = [
    { value: "featured", label: "Destaques" },
    { value: "price-asc", label: "Menor Preço" },
    { value: "price-desc", label: "Maior Preço" },
    { value: "rating", label: "Melhor Avaliação" },
    { value: "new", label: "Novidades" },
];

const defaultFilters = { teams: [], sizes: [], types: [], priceRange: null };

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState(defaultFilters);
    const [sort, setSort] = useState("featured");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Apply URL param filters
    useEffect(() => {
        const teamParam = searchParams.get("team");
        const filterParam = searchParams.get("filter");
        const leagueParam = searchParams.get("league");
        const countryParam = searchParams.get("country");
        setFilters({
            ...defaultFilters,
            teams: teamParam ? [teamParam] : [],
        });
        if (filterParam === "new") setSort("new");
        if (filterParam === "sale") setFilters((f) => ({ ...f, priceRange: null }));
        if (countryParam) setSearch(countryParam);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let result = [...products];

        // Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.team.toLowerCase().includes(q) ||
                    p.league.toLowerCase().includes(q) ||
                    p.country.toLowerCase().includes(q)
            );
        }

        // Team filter
        if (filters.teams?.length) {
            result = result.filter((p) => filters.teams.includes(p.team));
        }

        // Size filter
        if (filters.sizes?.length) {
            result = result.filter((p) => filters.sizes.some((s) => p.sizes.includes(s)));
        }

        // Type filter
        if (filters.types?.length) {
            result = result.filter((p) => filters.types.includes(p.type));
        }

        // Price filter
        if (filters.priceRange) {
            const range = priceRanges.find((r) => r.id === filters.priceRange);
            if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
        }

        // Sort
        switch (sort) {
            case "price-asc": result.sort((a, b) => a.price - b.price); break;
            case "price-desc": result.sort((a, b) => b.price - a.price); break;
            case "rating": result.sort((a, b) => b.rating - a.rating); break;
            case "new": result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew)); break;
            default: result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        }

        return result;
    }, [search, filters, sort]);

    const clearFilters = () => { setFilters(defaultFilters); setSearch(""); };

    return (
        <main className="shop page-wrapper">
            <div className="container">
                {/* Header */}
                <div className="shop__header">
                    <div>
                        <h1 className="section-title">Loja</h1>
                        <p className="section-subtitle">{filtered.length} produtos encontrados</p>
                    </div>
                    <div className="shop__controls">
                        <div className="shop__search-wrap">
                            <span className="shop__search-icon">🔍</span>
                            <input
                                id="shop-search"
                                type="text"
                                placeholder="Buscar time, liga..."
                                className="shop__search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button className="shop__search-clear" onClick={() => setSearch("")}>✕</button>
                            )}
                        </div>
                        <select
                            id="shop-sort"
                            className="shop__sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <button
                            className="btn btn-ghost shop__filter-toggle"
                            id="shop-filter-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ⚙ Filtros
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="shop__body">
                    {/* Sidebar desktop */}
                    <div className="shop__sidebar">
                        <FilterSidebar filters={filters} onFilterChange={setFilters} onClear={clearFilters} />
                    </div>

                    {/* Mobile sidebar */}
                    {sidebarOpen && (
                        <div className="shop__sidebar-overlay" onClick={() => setSidebarOpen(false)}>
                            <div className="shop__sidebar-drawer" onClick={(e) => e.stopPropagation()}>
                                <div className="shop__sidebar-drawer-header">
                                    <h3>Filtros</h3>
                                    <button onClick={() => setSidebarOpen(false)}>✕</button>
                                </div>
                                <FilterSidebar filters={filters} onFilterChange={setFilters} onClear={clearFilters} />
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="shop__grid">
                        {filtered.length === 0 ? (
                            <div className="empty-state">
                                <div className="icon">😕</div>
                                <h3>Nenhuma camisa encontrada</h3>
                                <p>Tente ajustar os filtros ou buscar por outro time</p>
                                <button className="btn btn-primary" onClick={clearFilters}>Limpar Filtros</button>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {filtered.map((p, i) => (
                                    <div key={p.id} className="fade-in-up" style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}>
                                        <ProductCard product={p} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Shop;
