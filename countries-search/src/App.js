import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error in", error));
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  };

  const countryCard = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "200px",
  };

  const flagStyle = {
    width: "100px",
    height: "100px",
  };

  const inputStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
  };

  const handleSearch = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchString)
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <div style={inputStyle}>
        <input
          type="text"
          style={{ width: "50%", padding: "10px", borderRadius: "5px" }}
          placeholder="Search for countries"
          onChange={handleSearch}
        />
      </div>
      <div style={containerStyle}>
        {filteredCountries.map((country) => (
          <div key={country.cca3} style={countryCard}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.flags.alt}`}
              style={flagStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
