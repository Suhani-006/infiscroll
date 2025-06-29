import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'technology',
  'sports',
  'lifestyle',
  'education',
  'business',
  'health_and_fitness',
  'fashion',
  'gaming'
];

function SelectCategories() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert('Please select at least one category.');
      return;
    }
    localStorage.setItem('selectedCategories', JSON.stringify(selected));
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f6fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      padding: 24,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px #a259ff18',
        padding: '36px 32px',
        minWidth: 320,
        maxWidth: 420,
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: 18, fontWeight: 800, fontSize: 26 }}>Select Your Interests</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          marginBottom: 28
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: 20,
                border: selected.includes(cat) ? '2px solid #a259ff' : '1.5px solid #ececec',
                background: selected.includes(cat)
                  ? 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)'
                  : '#f5f6fa',
                color: selected.includes(cat) ? '#fff' : '#222',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.15s',
                outline: 'none',
                minWidth: 90,
                textTransform: 'capitalize'
              }}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
        <button
          onClick={handleContinue}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 10,
            background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #a259ff22',
            marginTop: 8,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SelectCategories;
