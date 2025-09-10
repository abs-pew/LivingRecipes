package de.neuefische.backend.controller;

import de.neuefische.backend.dto.RecipeDto;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody RecipeDto recipeDto) {
        return recipeService.addRecipe(recipeDto);
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipeById(@PathVariable String id, @RequestBody RecipeDto updatedRecipeDto) {
        Recipe updatedRecipe = recipeService.updateRecipeById(id, updatedRecipeDto);
        return updatedRecipe;
    }
}
