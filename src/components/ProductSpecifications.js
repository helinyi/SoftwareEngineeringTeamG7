import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/ProductSpecifications.css';

const ProductSpecifications = ({ specifications }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedSpecs, setExpandedSpecs] = useState({});

  useEffect(() => {
    if (specifications && specifications.length > 0) {
      setActiveCategory(specifications[0].category);
      
      if (specifications[0].groups && specifications[0].groups.length > 0) {
        setExpandedSpecs(prev => ({
          ...prev,
          [specifications[0].groups[0].name]: true
        }));
      }
    }
  }, [specifications]);

  const toggleSpecGroup = (groupName) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const isSpecGroupExpanded = (groupName) => {
    return expandedSpecs[groupName] || false;
  };

  const renderCategories = () => {
    if (!specifications || !Array.isArray(specifications) || specifications.length === 0) {
      return <div className="no-specs">No specifications available</div>;
    }

    return (
      <div className="spec-categories">
        {specifications.map((specGroup) => (
          <button
            key={specGroup.category}
            className={`spec-category-tab ${activeCategory === specGroup.category ? 'active' : ''}`}
            onClick={() => setActiveCategory(specGroup.category)}
          >
            {specGroup.category}
          </button>
        ))}
      </div>
    );
  };

  const renderSpecifications = () => {
    if (!specifications || !Array.isArray(specifications) || specifications.length === 0 || !activeCategory) {
      return null;
    }

    const activeSpecs = specifications.find(spec => spec.category === activeCategory);
    
    if (!activeSpecs || !activeSpecs.groups || !Array.isArray(activeSpecs.groups)) {
      return <div className="no-specs">No specifications found for this category</div>;
    }

    return (
      <div className="spec-details">
        {activeSpecs.groups.map((group, groupIndex) => (
          <div key={`${group.name}-${groupIndex}`} className="spec-group">
            <div 
              className="spec-group-header"
              onClick={() => toggleSpecGroup(group.name)}
            >
              <h3>{group.name}</h3>
              {isSpecGroupExpanded(group.name) ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            
            {isSpecGroupExpanded(group.name) && (
              <div className="spec-group-content">
                <div className="modern-spec-table">
                  {group.items && Array.isArray(group.items) ? (
                    group.items.map((item, index) => (
                      <div key={`${item.name}-${index}`} className="modern-spec-row">
                        <div className="modern-spec-name">{item.name}</div>
                        <div className="modern-spec-value">{item.value}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-specs">No specifications available in this group</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderKeySpecs = () => {
    if (!specifications || !Array.isArray(specifications) || specifications.length === 0) {
      return null;
    }

    const keySpecs = [];
    
    specifications.forEach(specGroup => {
      if (specGroup.groups && Array.isArray(specGroup.groups)) {
        specGroup.groups.forEach(group => {
          if (group.items && Array.isArray(group.items)) {
            group.items.forEach(item => {
              if (item.isKey) {
                keySpecs.push({
                  name: item.name,
                  value: item.value,
                  category: specGroup.category
                });
              }
            });
          }
        });
      }
    });

    if (keySpecs.length === 0) {
      return null;
    }

    return (
      <div className="key-specs">
        <h3>Key Specifications</h3>
        <div className="key-specs-grid">
          {keySpecs.map((spec, index) => (
            <div key={`key-spec-${index}`} className="key-spec-item">
              <div className="key-spec-name">{spec.name}</div>
              <div className="key-spec-value">{spec.value}</div>
              <div className="key-spec-category">{spec.category}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!specifications || !Array.isArray(specifications) || specifications.length === 0) {
    return (
      <div className="product-specifications">
        <h2>Product Specifications</h2>
        <div className="no-specs-container">
          <p>Specifications for this product are not available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-specifications">
      <h2>Product Specifications</h2>
      
      {renderKeySpecs()}
      
      <div className="full-specifications">
        <h3>Full Specifications</h3>
        {renderCategories()}
        {renderSpecifications()}
      </div>
    </div>
  );
};

export default ProductSpecifications; 