import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormLocation from "./utils/FormLocation";
import Pagination from "./components/Pagination";

function App() {
  const [location, setLocation] = useState([]);
  const [idLocation, setIdLocation] = useState(getRandomNumber(126));
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [residentsPerPage, setResidentsPerPage] = useState(8);
  
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${idLocation}`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idLocation]);

  const lastPostIndex  = currentPage * residentsPerPage;
  const firstPostIndex  = lastPostIndex  - residentsPerPage;

  return (
    <div>
      <nav></nav>
      <FormLocation setIdLocation={setIdLocation} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : hasError ? (
        <h1>❌ Hey! you must provide an id from 1 to 126 😥</h1>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className="resident-container">
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} />
            )).slice(firstPostIndex, lastPostIndex)}
          </div>
          <Pagination
                totalResidents={location?.residents.length}
                residentsPerPage={residentsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
