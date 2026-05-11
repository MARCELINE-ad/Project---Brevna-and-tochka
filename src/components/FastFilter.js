import React from 'react';
import Dropdown from './Dropdown/Dropdown';
import DropdownFilter from './Dropdown/DropdownFilter';
import '../Pages/Catalog.css';

// Добавляем onChoose в пропсы, чтобы функция прилетала из App.js
const FastFilter = ({ onChoose }) => {
  const moreItems = [
    { label: 'Электрика', Link: '/electrica' },
    { label: 'Сантехника', Link: '/santechnika' },
    { label: 'Обои', Link: '/oboi' },
    { label: 'Краски', Link: '/kraski' },
    { label: 'Инструменты', Link: '/instrumenty' }
  ];

  // Массив категорий для удобного вывода (ключи должны совпадать с полем category в products.js)
  const categories = [
    { key: 'all', name: 'Все' },
    { key: 'home', name: 'Для дома' },
    { key: 'decor', name: 'Декор' },
    { key: 'roof', name: 'Кровля' },
    { key: 'tools', name: 'Инструменты' },
    { key: 'workmaterial', name: 'Стройматериалы' },
  ];

  return (
    <div className='topbars' style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px' 
    }}>
        <div className="categories" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {categories.map(el => (
                <span 
                    key={el.key} 
                    className='product' 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onChoose(el.key)} // Вызываем фильтрацию при клике
                >
                    {el.name}
                </span>
            ))}
            <Dropdown buttonText="Ещё" items={moreItems} />
        </div>

        <div className='sorting'>
            <DropdownFilter buttonText="Сортировка:" items={moreItems}/>
        </div>
    </div>
  );
}

export default FastFilter;
