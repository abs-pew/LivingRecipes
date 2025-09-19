package de.neuefische.backend.mapper;

import de.neuefische.backend.dto.RecipeDto;
import de.neuefische.backend.model.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    void updateRecipeFromDto(RecipeDto recipeDto, @MappingTarget Recipe recipe);
}
