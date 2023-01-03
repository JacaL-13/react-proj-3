import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import axios from 'axios'

import './NewRecipeScreen.css'

const NewRecipeScreen = () => {
	const [ingredients, setIngredients] = useState([])
	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')

	function addIngredient() {
		if (name && quantity) {
			setIngredients((prev) => {
				return [...prev, { name: name, quantity: quantity }]
			})
			setName('')
			setQuantity('')
		}
	}

	const dispIngredients = ingredients.map((ingrd, idx) => {
		return <li>{`${ingrd.quantity} ${ingrd.name}`}</li>
	})

	useEffect(() => {}, [ingredients])

	const initialValues = {
		type: '',
		recipeName: '',
		imageURL: '',
		prepTime: '',
		cookTime: '',
		serves: '',
		ingredients: [],
		instructions: ''
	}

	function onSubmit(values) {
		values.ingredients = ingredients
		axios.post(`https://recipes.devmountain.com/recipes`, values)
	}

	return (
		<section>
			<h1>Tell us about your Recipe!</h1>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({ values, handleChange, handleSubmit }) => (
					<Form>
						<div className="row">
							<div className="input-con">
								<input
									placeholder="Name"
									value={values.recipeName}
									onChange={handleChange}
									name="recipeName"
								/>
							</div>
							<div className="input-con">
								<input
									placeholder="Image URL"
									value={values.imageURL}
									onChange={handleChange}
									name="imageURL"
								/>
							</div>
						</div>
						<div className="row type">
							<label htmlFor="cook">
								<input
									type="radio"
									name="type"
									value="Cook"
									onChange={handleChange}
								/>
								Cook
							</label>
							<label htmlFor="bake">
								<input
									type="radio"
									name="type"
									value="Bake"
									onChange={handleChange}
								/>
								Bake
							</label>
							<label htmlFor="drink">
								<input
									type="radio"
									name="type"
									value="Drink"
									onChange={handleChange}
								/>
								Drink
							</label>
						</div>
						<div className="row">
							<div className="input-con">
								<input
									placeholder="Prep Time"
									value={values.prepTime}
									onChange={handleChange}
									name="prepTime"
								/>
							</div>
							<div className="input-con">
								<input
									placeholder="Cook Time"
									value={values.cookTime}
									onChange={handleChange}
									name="cookTime"
								/>
							</div>
							<div className="input-con">
								<input
									placeholder="Serves"
									value={values.serves}
									onChange={handleChange}
									name="serves"
								/>
							</div>
						</div>
						<div className={'row cols'}>
							<div className="col">
								<input
									placeholder="Ingredient"
									value={name}
									onChange={(eve) =>
										setName(eve.target.value)
									}
								/>
								<input
									placeholder="Quantity"
									value={quantity}
									onChange={(eve) => {
										setQuantity(eve.target.value)
									}}
								/>
								<button
									type="button"
									className="orange-btn"
									onClick={addIngredient}
								>
									Add Ingredient
								</button>
							</div>
							<ul className="col" id="ingred-list">
								{dispIngredients}
							</ul>
						</div>
						<textarea
							name="instructions"
							id="instructions"
							placeholder="What are the instructions?"
						></textarea>
						<button type="submit">Save</button>
					</Form>
				)}
			</Formik>
		</section>
	)
}

export default NewRecipeScreen
