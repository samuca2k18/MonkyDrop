import { useState } from "react";
import { teams } from "../../data/teams";
import "./TeamModal.css";

const TeamModal = ({ onClose }) => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = teams.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.country.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (team) => {
        setSelected(team.name);
    };

    const handleConfirm = () => {
        if (selected) {
            localStorage.setItem("favoriteTeam", selected);
        }
        onClose(selected);
    };

    const handleSkip = () => {
        localStorage.setItem("favoriteTeam", "__skip__");
        onClose(null);
    };

    return (
        <div className="team-modal-overlay">
            <div className="team-modal">
                <div className="team-modal__header">
                    <img src="/monky.png" alt="MonkyDrop" className="team-modal__logo" />
                    <h2 className="team-modal__title">Qual time você torce?</h2>
                    <p className="team-modal__subtitle">
                        Vamos personalizar sua experiência e mostrar as camisas do seu time primeiro!
                    </p>
                </div>

                <div className="team-modal__search-wrap">
                    <span className="team-modal__search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar time..."
                        className="team-modal__search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="team-modal__list">
                    {filtered.map((t) => (
                        <button
                            key={t.id}
                            className={`team-modal__item ${selected === t.name ? "selected" : ""}`}
                            onClick={() => handleSelect(t)}
                        >
                            <span className="team-modal__item-emoji">{t.emoji}</span>
                            <div className="team-modal__item-info">
                                <span className="team-modal__item-name">{t.name}</span>
                                <span className="team-modal__item-country">{t.country}</span>
                            </div>
                            {selected === t.name && (
                                <span className="team-modal__item-check">✓</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="team-modal__footer">
                    <button
                        className="btn btn-primary team-modal__confirm"
                        onClick={handleConfirm}
                        disabled={!selected}
                        id="team-modal-confirm"
                    >
                        {selected ? `Torço para ${selected}! 🎉` : "Selecione um time"}
                    </button>
                    <button className="team-modal__skip" onClick={handleSkip} id="team-modal-skip">
                        Pular por agora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamModal;
