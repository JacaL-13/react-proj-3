import { useState, useEffect } from 'react'
import AdBanner from './AdBanner'
import RecipeCard from './RecipeCard'
import axios from 'axios'
import { ImSearch } from 'react-icons/im'

import './HomeScreen.css'

const HomeScreen = () => {
	const [search, setSearch] = useState('')
	const [recipes, setRecipes] = useState([])

	function getRecipes() {
		axios
			.get('https://recipes.devmountain.com/recipes')
			.then((res) => {
				setRecipes(res.data)
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getRecipes()
	}, [])

	const recipeDisplay = recipes
		.filter((recipe, idx) => {
			let title = recipe.recipe_name.toLowerCase()
			let searchParams = search.toLowerCase()
			return title.includes(searchParams)
		})
		.map((recipe, idx) => {
			return <RecipeCard key={idx} recipe={recipe} />
		})

	return (
		<div className="home-screen">
			<AdBanner />
			<div className="search-bar">
				<ImSearch size="1em" color="#DA7635" />
				<input
					type="text"
					value={search}
					onChange={(eve) => setSearch(eve.target.value)}
					placeholder="Search for a Recipe"
				/>
			</div>
			<div className="recipes">{recipeDisplay}</div>
		</div>
		// </div>
	)
}

export default HomeScreen
