import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      const data = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(data);
    } catch (err) {
      console.log(err);
    }
  }, [search, countries]);

  return (
    <div>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="App">
        {search === ""
          ? countries.map((country, index) => (
              <div className="countryCard" key={index}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  key={index}
                ></img>
                <h2>{country.name.common}</h2>
              </div>
            ))
          : filtered.map((country, index) => (
              <div className="countryCard" key={index}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  key={index}
                ></img>
                <h2>{country.name.common}</h2>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
