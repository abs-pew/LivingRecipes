package de.neuefische.backend.controller;

import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    RecipeRepository mockRecipeRepo;

    @Test
    @DirtiesContext
    void getAllRecipes() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes"))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().json("""
                        []
                        """));
    }

    @Test
    void addRecipe() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                
                                {
                                    "title": "Daal Chawal",
                                    "cookingTime": 60,
                                    "ingredients": [
                                      {
                                        "name": "rice",
                                        "quantity": 600,
                                        "unit": "GRAM"
                                      },
                                      {
                                        "name": "butter",
                                        "quantity": 100,
                                        "unit": "GRAM"
                                      },
                                      {
                                        "name": "salt",
                                        "quantity": 10,
                                        "unit": "GRAM"
                                      }
                                    ],
                                    "recipeText": "put all ingredients together in a pot and bake them well",
                                    "image": "/images/lentil_soup.jpg"
                                  }
                                """)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "title": "Daal Chawal",
                            "cookingTime": 60,
                            "ingredients": [
                              {
                                "name": "rice",
                                "quantity": 600,
                                "unit": "GRAM"
                              },
                              {
                                "name": "butter",
                                "quantity": 100,
                                "unit": "GRAM"
                              },
                              {
                                "name": "salt",
                                "quantity": 10,
                                "unit": "GRAM"
                              }
                            ],
                            "recipeText": "put all ingredients together in a pot and bake them well",
                            "image": "/images/lentil_soup.jpg"
                          }
                        """))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.createdAt").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.category").isNotEmpty())
        ;

    }
}