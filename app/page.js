'use client'
import { useState } from 'react';
import Select from 'react-select';
import { FaSearch, FaSpinner, FaDice } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchSuggestions = async (inputValue) => {
    if (!inputValue) return;
    const res = await fetch(`/api/suggestions?query=${inputValue}`);
    const data = await res.json();
    if (!data.error) {
      setOptions(data);
    }
  };

  const fetchRandomInvention = async () => {
    setLoading(true);
    const res = await fetch('/api/random');
    const data = await res.json();
    
    if (data.name) {
      const newOption = { label: data.name, value: data.name };

      setOptions((prevOptions) => {
        if (!prevOptions.some(option => option.value === newOption.value)) {
          return [...prevOptions, newOption];
        }
        return prevOptions;
      });

      setSearchQuery(newOption);
      setInputValue(newOption.label); // Inputu doğrudan güncelle
    }
    
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    const res = await fetch(`/api/inventor?name=${searchQuery.value}`);
    const data = await res.json();
    if (!data.error) {
      setResult({
        inventor: data.inventor,
        wiki: data.wiki
      });
    } else {
      setResult(null);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.hone}>
        who<span style={styles.blueText}>made?</span>
      </h1>
      <p style={styles.pragr}>You can write in the box below to find out who invented a product.</p>

      <div style={styles.inputContainer}>
        <Select
          options={options}
          onChange={setSearchQuery}
          inputValue={inputValue} // Input value'yi state ile bağla
          onInputChange={(value) => {
            setInputValue(value); // inputValue'yi güncelle
            fetchSuggestions(value); // Suggestionları güncelle
          }}
          placeholder="Start typing..."
          styles={customStyles}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSearch}
          style={styles.button}
          disabled={loading || !searchQuery}
        >
          {loading ? <FaSpinner style={styles.loadingIcon} /> : <FaSearch style={styles.searchIcon} />}
        </button>
        <button 
          onClick={fetchRandomInvention}
          style={styles.diceButton}
        >
          <FaDice style={styles.diceIcon} />
        </button>
      </div>

      {result && (
        <div style={styles.result}>
          <p>Inventor: {result.inventor}</p>
          <a style={styles.info} href={result.wiki} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
      )}
    </div>
  );
}

const styles = {
  hone: {
    fontFamily: "'Fascinate', sans-serif",
    fontSize: '60px',
    marginTop: '-100px',
  },
  info: {
    color: '#38b6ff'
  },
  pragr: {
    marginTop: '-10px',
    color: 'gray',
    fontSize: '0.9rem'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    textAlign: 'center',
    fontFamily: "'Capriola', sans-serif",
    color: 'black',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  blueText: {
    color: '#38b6ff',
  },
  inputContainer: {
    display: 'flex',
    marginTop: '50px',
    justifyContent: 'center', // Ortalamayı koruyor
    alignItems: 'center', // Butonları dikeyde ortalar
    marginLeft: '100px',
    width: '100%', // Tam genişlik
  },
  buttonContainer: {
    display: 'flex', // Butonları sağa hizalamak için
    marginLeft: '10px', // Butonlar arasında biraz boşluk bırak
  },
  button: {
    backgroundColor: '#38b6ff',
    color: 'white',
    fontSize: '18px',
    padding: '10px',
    border: 'none',
    marginLeft: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: '24px',
  },
  loadingIcon: {
    fontSize: '24px',
    animation: 'spin 1s linear infinite',
  },
  result: {
    fontSize: '20px',
    marginTop: '20px',
  },
  diceButton: {
    backgroundColor: '#ffcc00',
    color: 'white',
    fontSize: '18px',
    padding: '10px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10px', // Butonlar arasında boşluk
  },
  diceIcon: {
    fontSize: '24px'
  }
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '50vw',
    fontSize: '18px',
    borderRadius: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    textAlign: 'left'
  })
}; 