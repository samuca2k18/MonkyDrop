import "./FilterSidebar.css";
import { sizes, jerseyTypes, priceRanges } from "../../data/teams";
import { teams } from "../../data/teams";

const FilterSidebar = ({ filters, onFilterChange, onClear }) => {
    const handleTeamToggle = (teamName) => {
        const current = filters.teams || [];
        const updated = current.includes(teamName)
            ? current.filter((t) => t !== teamName)
            : [...current, teamName];
        onFilterChange({ ...filters, teams: updated });
    };

    const handleSizeToggle = (size) => {
        const current = filters.sizes || [];
        const updated = current.includes(size)
            ? current.filter((s) => s !== size)
            : [...current, size];
        onFilterChange({ ...filters, sizes: updated });
    };

    const handleTypeToggle = (type) => {
        const current = filters.types || [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        onFilterChange({ ...filters, types: updated });
    };

    const handlePriceToggle = (rangeId) => {
        onFilterChange({
            ...filters,
            priceRange: filters.priceRange === rangeId ? null : rangeId,
        });
    };

    const hasFilters =
        (filters.teams?.length || 0) +
        (filters.sizes?.length || 0) +
        (filters.types?.length || 0) +
        (filters.priceRange ? 1 : 0) > 0;

    return (
        <aside className="filter-sidebar">
            <div className="filter-sidebar__header">
                <h3>Filtros</h3>
                {hasFilters && (
                    <button className="filter-sidebar__clear" onClick={onClear} id="clear-filters-btn">
                        Limpar tudo
                    </button>
                )}
            </div>

            {/* Price */}
            <div className="filter-group">
                <h4 className="filter-group__title">Preço</h4>
                <div className="filter-group__items">
                    {priceRanges.map((r) => (
                        <button
                            key={r.id}
                            className={`filter-chip ${filters.priceRange === r.id ? "active" : ""}`}
                            onClick={() => handlePriceToggle(r.id)}
                        >
                            {r.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size */}
            <div className="filter-group">
                <h4 className="filter-group__title">Tamanho</h4>
                <div className="filter-group__items filter-group__items--compact">
                    {sizes.map((s) => (
                        <button
                            key={s}
                            className={`filter-chip filter-chip--size ${filters.sizes?.includes(s) ? "active" : ""}`}
                            onClick={() => handleSizeToggle(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Type */}
            <div className="filter-group">
                <h4 className="filter-group__title">Tipo</h4>
                <div className="filter-group__items">
                    {jerseyTypes.map((t) => (
                        <button
                            key={t.id}
                            className={`filter-chip ${filters.types?.includes(t.id) ? "active" : ""}`}
                            onClick={() => handleTypeToggle(t.id)}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Teams */}
            <div className="filter-group">
                <h4 className="filter-group__title">Time</h4>
                <div className="filter-group__teams">
                    {teams.map((t) => (
                        <label key={t.id} className="filter-team">
                            <input
                                type="checkbox"
                                checked={filters.teams?.includes(t.name) || false}
                                onChange={() => handleTeamToggle(t.name)}
                            />
                            <span className="filter-team__check" />
                            <span className="filter-team__emoji">{t.emoji}</span>
                            <span className="filter-team__name">{t.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
