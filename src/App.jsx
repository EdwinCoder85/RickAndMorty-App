import { useEffect, useState } from "react";
import "./App.css";
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormLocation from "./utils/FormLocation";
import Pagination from "./components/Pagination";
import AutoComplete from "./components/AutoComplete";
import useFetch from "./hooks/useFetch";
import Loader from "./components/Loader";

function App() {

  const [idLocation, setIdLocation] = useState(getRandomNumber(126));
  const [currentPage, setCurrentPage] = useState(1);
  // const [residentsPerPage, setResidentsPerPage] = useState(8);
  const [residentsPerPage] = useState(8);

  const urlByIdLocation = `https://rickandmortyapi.com/api/location/${idLocation}`;
  const [ location, getSingleLocation, hasError, isLoading ] = useFetch(urlByIdLocation)
  
  useEffect(() => {
    getSingleLocation()
  }, [idLocation]);

  const lastPostIndex  = currentPage * residentsPerPage;
  const firstPostIndex  = lastPostIndex - residentsPerPage;

  return (
    <div>
      <nav></nav>
      <div className="resident__container-top">
        <AutoComplete setIdLocation={setIdLocation}/>
        {/* <FormLocation setIdLocation={setIdLocation} /> */}
      </div>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <h1>❌ Hey! you must provide an id from 1 to 126 😥</h1>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className="resident__container-bottom">
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
