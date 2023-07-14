import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../helpers/fetchApi';

function RecipeDetails() {
  const [item, setItem] = useState({});
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    const recipeType = pathname.split('/')[1];
    const recipeId = pathname.split('/')[2];
    const recipeInfo = async () => {
      const data = await fetchRecipeById(recipeId, recipeType);
      setItem(data);
    };
    recipeInfo();
  }, [pathname]);
  console.log(item);
  return (
    <div>
      <p>{console.log(item)}</p>
    </div>
  );
}

export default RecipeDetails;
