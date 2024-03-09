import React,{useEffect,useState} from 'react';
import MenuItem from './MenuItem';
import './DynamicNavbar.css'
import axios from 'axios';

const Navbar = () => {
    const [data, setData] = useState({
        info: []
      });
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/');
          setData({ info: response.data.result2 });
          
        } catch (error) {
          console.log(error);
        }
      };

      
    const [menuData, setMenuData] = useState([]); 

    
    useEffect(() => {
        const processedMenuData = processData(data.info);
        setMenuData(processedMenuData);
      }, [data]);
      
    const processData = (rawData) => {
        const processedData = [];
        rawData.forEach((item) => {
          const { category, subcategory, brand } = item;
    
          const existingCategory = processedData.find((group) => group.category === category);
          if (!existingCategory) {
            processedData.push({ category: category, subcategories: [{ subcategory: subcategory, brands: [brand] }] });
          } else {
            const existingSubcategory = existingCategory.subcategories.find(
              (sub) => sub.subcategory === subcategory
            );
            if (!existingSubcategory) {
              existingCategory.subcategories.push({ subcategory: subcategory, brands: [brand] });
            } else {
                const existingBrand = existingSubcategory.brands.includes(brand);
                
                if (!existingBrand ) {
                  existingSubcategory.brands.push(brand);
                
            }
            }
          }
          
        });
        
        return processedData;
      };
      localStorage.setItem('MenuData',JSON.stringify(menuData));
      
  return (
    <nav className="navbar">
      <ul className="main-menu">
        {menuData.map((item, index) => (
          <MenuItem key={index} category={item.category} subcategories={item.subcategories}  />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
