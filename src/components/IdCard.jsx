import "./IdCard.css";

export default function IdCard({ photo = null }) {
  return (
    <div className="id-card">
      <div className="id-card__lanyard">
        <div className="id-card__clip" />
        <div className="id-card__strap" />
      </div>

      <div className="id-card__body">
        <span className="id-card__eyebrow">profficial</span>
        <h3 className="id-card__title">Developer.</h3>

        <div className="id-card__content">
          <div className="id-card__badges">
            <span className="id-card__badge id-card__badge--ps">Ps</span>
            <span className="id-card__badge id-card__badge--ai">Ai</span>
            <span className="id-card__badge id-card__badge--t">T</span>
            <span className="id-card__badge id-card__badge--code">&lt;/&gt;</span>
          </div>

          <div className="id-card__photo-area">
            {photo ? (
              <img src={photo} alt="Profile" className="id-card__photo" />
            ) : (
              <div className="id-card__photo-placeholder" />
            )}
          </div>
        </div>

        <div className="id-card__name-section">
          <h4 className="id-card__name">Deepanshu</h4>
          <span className="id-card__role">Developer</span>
        </div>

        <div className="id-card__footer">
          <div className="id-card__barcode">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="id-card__barcode-line"
                style={{ width: Math.random() > 0.5 ? "2px" : "1px" }}
              />
            ))}
          </div>
          <div className="id-card__quote">
            <p>Design is</p>
            <p>Intelligence</p>
            <p>made visible.</p>
            <span className="id-card__star">&#9733;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
