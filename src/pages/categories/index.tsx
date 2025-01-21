import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice"; 
import { AppDispatch } from "../../redux/store"; 

interface Category {
  id: number;
  name: string;
}

const Index = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  
  // Selecting data from the Redux store
  const { categories, loading, error } = useSelector((state: any) => state.categories);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Conditional rendering based on loading and error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log('categories111: ', categories)
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category: Category, index: number) => (
          <li key={index}>{category.name}</li> 
        ))}
      </ul>
     
    </div>
  );
};

export default Index;
