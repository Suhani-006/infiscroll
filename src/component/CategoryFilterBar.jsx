import React from 'react';

const categories = [
  { label: 'All', icon: '🗂️' },
  { label: 'Health', icon: '🧘‍♀️' },
  { label: 'Sports', icon: '⚽' },
  { label: 'Food', icon: '🍔' },
  { label: 'Travel', icon: '✈️' },
  { label: 'Art', icon: '🎨' },
  { label: 'Fashion', icon: '👗' },
  { label: 'Tech', icon: '💻' },
  { label: 'Animals', icon: '🐾' },
];

export default function CategoryFilterBar({ active, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat.label}
          className={`category-chip${active === cat.label ? ' active' : ''}`}
          onClick={() => onSelect(cat.label)}
        >
          <span className="cat-icon">{cat.icon}</span> {cat.label}
        </button>
      ))}
    </div>
  );
}
