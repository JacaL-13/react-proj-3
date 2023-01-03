import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import './DetailScreen.css'

const DetailScreen = () => {
  const [recipe, setRecipe] = useState({})
  
  const {id} = useParams()
  
  useEffect(() => {
    axios
			.get(`https://recipes.devmountain.com/recipes/${id}`)
			.then((res) => {
				setRecipe(res.data)
			})
			.catch((err) => console.log(err))
  }, [])

  const dispIngredients = recipe.ingredients && recipe.ingredients.map((item, idx) => {
    return <p>{item.quantity} {item.ingredient}</p>
  })

	return (
		<section className="detail-screen">
			<div
				className="recipe-title"
				style={{
					background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url('${recipe.image_url}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'        
				}}
			><h1>{recipe.recipe_name}</h1></div>
			<div className="recipe">
				<div className="info">
					<h3>Recipe</h3>
					<div className="info-detail">
						<p>Prep Time: {recipe.prep_time}</p>
						<p>Cook Time: {recipe.cook_time}</p>
						<p>Serves: {recipe.serves}</p>
					</div>
					<h3>Ingredients</h3>
					{dispIngredients}
				</div>
				<div className="instructions">
					<h3>Instructions</h3>
					<p>
            {recipe.instructions && JSON.parse(recipe.instructions)}
					</p>
				</div>
			</div>
		</section>
	)
}

export default DetailScreen
