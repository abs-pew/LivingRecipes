package de.neuefische.backend.dto;

import de.neuefische.backend.model.Ingredient;
import de.neuefische.backend.model.Recipe;

import java.time.LocalDateTime;
import java.util.List;

public record RecipeDto(
        String title,
        int cookingTime,
        List<Ingredient> ingredients,
        String recipeText,
        String image
)
{

    public Recipe createNewRecipe(String id, LocalDateTime createdAt, String category){
        return( new Recipe(id, title, cookingTime, ingredients, recipeText, image, createdAt, category) );
    }
}


