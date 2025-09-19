package de.neuefische.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
@With
@Document("LivingRecipes")
public record Recipe(
        @Id
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
        this(null, title, cookingTime, ingredients, recipeText, image, null, null);
    }
}


