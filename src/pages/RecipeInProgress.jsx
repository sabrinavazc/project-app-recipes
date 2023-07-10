import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Recipe In Progress</h1>
    </div>
  );
}

export default RecipeInProgress;
