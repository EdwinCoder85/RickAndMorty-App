import getRandomNumber from "../utils/getRandomNumber";

const FormLocation = ({ setIdLocation }) => {

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.inputId.value.trim()
    if (inputValue === '' || inputValue === '0') {
      setIdLocation(getRandomNumber(126))
    } else {
      setIdLocation(inputValue)
    }
    e.target.inputId.value = ''
  };

  return (
    <form onSubmit={handleSubmit} className="resident__search">
      <input className="resident__search-input" id="inputId" type="text" />
      <button className="resident__search-button">Search</button>
    </form>
  );
};

export default FormLocation;
