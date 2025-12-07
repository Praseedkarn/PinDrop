// src/components/Tools/ConverterForm.tsx
import { useState } from 'react';
import './ConverterForm.css';

interface ConverterFormProps {
  onSearch: (query: string) => void;
  loading: boolean;
  initialQuery: string;
  onChange: (query: string) => void;
}

export default function ConverterForm({ onSearch, loading, initialQuery, onChange }: ConverterFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onChange(value);
  };

  const exampleSearches = [
    'Eiffel Tower, Paris',
    'Times Square, New York',
    'Great Wall of China',
    'Sydney Opera House',
    'Taj Mahal, India'
  ];

  return (
    <div className="converter-form">
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search any location... (e.g., 'Statue of Liberty, New York')"
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="loading-spinner">🔍</span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      <div className="example-searches">
        <p className="examples-label">Try these examples:</p>
        <div className="example-tags">
          {exampleSearches.map((example, index) => (
            <button
              key={index}
              className="example-tag"
              onClick={() => {
                setQuery(example);
                onChange(example);
                onSearch(example);
              }}
              type="button"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}