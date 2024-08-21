import React, { useState } from 'react';

const Sidebar = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: ''
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const handleCheckboxChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[filterType].indexOf(value);
      if (index === -1) {
        updatedFilters[filterType].push(value);
      } else {
        updatedFilters[filterType].splice(index, 1);
      }
      return updatedFilters;
    });
  };

  const handlePriceChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: event.target.value
    }));
  };

  const handleApplyFilters = () => {
    if (applyFilters && typeof applyFilters === 'function') {
      applyFilters(filters);
    }
  };

  return (
    <div className={`col-md-3 sidebar ${showSidebar ? 'show' : ''}`}>
      <button className='btn toggle-btn d-md-none' onClick={() => setShowSidebar(!showSidebar)}>
        Toggle Sidebar
      </button>
      <div className="sidebar-content">
        <h2>Filter Products</h2>
        <div>
          <h3>Category</h3>
          <ul>
            <li>
              <input
                type="checkbox"
                checked={filters.category.includes('Electronics')}
                onChange={() => handleCheckboxChange('category', 'Electronics')}
              />
              <label>Electronics</label>
            </li>
            <li>
              <input
                type="checkbox"
                checked={filters.category.includes('Clothing')}
                onChange={() => handleCheckboxChange('category', 'Clothing')}
              />
              <label>Clothing</label>
            </li>
            {/* Add more category options */}
          </ul>
        </div>
        <div>
          <h3>Brand</h3>
          <ul>
            <li>
              <input
                type="checkbox"
                checked={filters.brand.includes('Samsung')}
                onChange={() => handleCheckboxChange('brand', 'Samsung')}
              />
              <label>Samsung</label>
            </li>
            <li>
              <input
                type="checkbox"
                checked={filters.brand.includes('Apple')}
                onChange={() => handleCheckboxChange('brand', 'Apple')}
              />
              <label>Apple</label>
            </li>
            {/* Add more brand options */}
          </ul>
        </div>
        <div>
          <h3>Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange}
            onChange={handlePriceChange}
          />
          <span>${filters.priceRange}</span> {/* Display selected price range */}
        </div>
        <button onClick={handleApplyFilters} className="btn btn-primary">Apply Filters</button>
      </div>
    </div>
  );
};

export default Sidebar;
