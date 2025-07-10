import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // API endpoint to fetch countries data
  const api =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries?";

  // Fetch countries data from the API when the component mounts
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setAllCountries(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (!searchTerm || searchTerm === "") {
      setCountries(allCountries);
      return;
    }
    const timeout = setTimeout(() => {
      handelSearch(searchTerm);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handelSearch = (searchTerm) => {
    const filteredCountries = allCountries.filter((country) =>
      country.common.toLowerCase().includes(searchTerm)
    );
    setCountries(filteredCountries);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          justifyItems: "center",
          margin: "20px auto",
          width: "80%",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <header
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            style={{
              width: "50%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder="Search for a country..."
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </header>
        {countries.length &&
          countries.map((country, idx) => (
            <div
              key={country.common + idx}
              className="countryCard"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
                width: "120px",
                marginBottom: "auto",
              }}
            >
              <img
                src={country.png}
                alt={"Flag of " + country.common}
                style={{ width: "100px", height: "60px" }}
              />
              <p>{country.common}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
