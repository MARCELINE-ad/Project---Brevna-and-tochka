import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const DropdownFilter = ({ buttonText, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText} {isOpen ? '⇅' : '⇵'}
      </button>
      
      {isOpen && (
        <div className="dropdown-content">
          {items.map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;