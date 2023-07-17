import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch"
import "./styles/AutoComplete.css";

const AutoComplete = ({ setIdLocation }) => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const urlAllLocations = 'https://rickandmortyapi.com/api/location';
  const [ allLocations, getAllLocations ] = useFetch(urlAllLocations)
  
  useEffect(() => {
    getAllLocations()
  }, []);


  const onSuggestHandler = (text, id) => {
    setText(text);
    setIdLocation(id);
    setSuggestions([]);
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text !== "") {
      matches = allLocations?.results.filter((option) => {
        return option.name.toLowerCase().includes(text.toLowerCase())
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  return (
    <div className="resident__autocomplete">
      <input
        className="resident__autocomplete-input"
        type="text"
        value={text}
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="Search"
      />
      {suggestions && (
        <ul className="resident__suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              className="resident__suggestions-li"
              onClick={() => onSuggestHandler(suggestion.name, suggestion.id)}
              key={index}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
