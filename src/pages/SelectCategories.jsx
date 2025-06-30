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
  'gaming',
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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(162,89,255,0.9), rgba(242,78,30,0.9))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        padding: 24,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 22,
          boxShadow: '0 8px 32px #a259ff18, 0 2px 8px #0001',
          padding: '36px 32px',
          width: '100%',
          maxWidth: 440,
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: 20, fontWeight: 800, fontSize: 26, color: '#222' }}>
          Select Your Interests
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: 20,
                border: selected.includes(cat) ? '2px solid #a259ff' : '1.5px solidrgb(7, 6, 6)',
                background: selected.includes(cat)
                  ? 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)'
                  : '#f5f6fa',
                color: selected.includes(cat) ? '#fff' : '#222',
                fontWeight: 550,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                outline: 'none',
                minWidth: 95,
                textTransform: 'capitalize',
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
            borderRadius: 12,
            background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #a259ff44',
            transition: 'opacity 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = 0.95)}
          onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SelectCategories;
