package de.neuefische.backend.repository;

import de.neuefische.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> id(String id);
}
