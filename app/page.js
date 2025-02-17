'use client';
import { useState } from 'react';
import Select from 'react-select';
import { FaSearch, FaSpinner } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    if (!inputValue) return;
    const res = await fetch(`/api/suggestions?query=${inputValue}`);
    const data = await res.json();
    if (!data.error) {
      setOptions(data);
    }
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
  onInputChange={(inputValue) => {
    fetchSuggestions(inputValue);
  }}
  placeholder="Start typing..."
  isClearable
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
    fontSize: '65px',
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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100vw',
  },
  button: {
    backgroundColor: '#38b6ff',
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
    marginLeft: '1vw'
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
