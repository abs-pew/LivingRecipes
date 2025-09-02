import type {Ingredient} from "./Ingredient.ts";

export type Recipe = {
    id: string,
    title: string,
    cookingTime: number,
    ingredients: Ingredient[],
    recipeText: string,
    image: string,
    createdAt: string,
    category: string
}