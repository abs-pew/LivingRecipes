import type {Ingredient} from "./Ingredient.ts";

export type RecipeDto = {
    title: string,
    cookingTime: number,
    ingredients: Ingredient[],
    recipeText: string,
    image: string,
}