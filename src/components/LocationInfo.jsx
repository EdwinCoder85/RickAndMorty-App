const LocationInfo = ({ location }) => {

  return (
    <article className="resident__content">
      <h2 className="resident__content-name">{location.name}</h2>
      <ul className="resident__content-list">
        <li className="resident__content-item">
          <span className="resident__content-label">Type: </span>
          <span className="resident__content-item-value">{location?.type}</span>
        </li>
        <li className="resident__content-item">
          <span className="resident__content-label">Dimension: </span>
          <span className="resident__content-item-value">
            {location?.dimension}
          </span>
        </li>
        <li className="resident__content-item">
          <span className="resident__content-label">Population: </span>
          <span className="resident__content-item-value">
            {location?.residents.length}
          </span>
        </li>
      </ul>
    </article>
  );
};

export default LocationInfo;
