package de.neuefische.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
@Document("LivingRecipes")
public record Recipe(
        String id,
        String title,
        int cookingTime,
        List<Ingredient> ingredients,
        String recipeText,
        String image,
        LocalDateTime createdAt,
        String category
)
{
    public Recipe(String title, int cookingTime, List<Ingredient> ingredients, String recipeText, String image)
    {
        this(null, title, cookingTime, ingredients, recipeText, image, null, "Regular");
    }
}


