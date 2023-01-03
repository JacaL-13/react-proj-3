import { useNavigate } from 'react-router-dom'

import rabokki from '../../assets/Rabokki.jpg'

import './RecipeCard.css'

function RecipeCard(props) {
	const { recipe } = props

	const navigate = useNavigate()
	
	function hdlClick(eve) {
		navigate(`/recipe/${recipe.recipe_id}`)
	}

	return (
		<div className="recipe-card">
			<img src={props.recipe.image_url} alt={props.recipe.recipe_name} />
			<h3>{recipe.recipe_name}</h3>
			<button onClick={hdlClick} >See More</button>
		</div>
	)
}

export default RecipeCard
