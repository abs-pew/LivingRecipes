package de.neuefische.backend.service;
import de.neuefische.backend.model.OpenAIRequest;
import de.neuefische.backend.model.OpenAIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class IngredientService {

    private final RestClient restClient;

    public IngredientService(RestClient.Builder restClientBuilder,
                             @Value("${OPENAI_KEY}") String apiKey)
    {
        this.restClient = restClientBuilder
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    } //constructor

    public String sendGptRequest(String requestMessage) {
        OpenAIResponse newAIResponse = restClient
                .post()
                .contentType(MediaType.APPLICATION_JSON)
                //       .body(new OpenAIRequest("Correct the spelling mistakes and return the corrected message: " + requestMessage))

                .body(
                        new OpenAIRequest(
                                "To determine food category of a recipe, I need exactly one word as Vegan, Vegetarian,  Regular, or Unknown. " +
                                "The given ingredients are: " + requestMessage))
                //          .body(new OpenAIRequest(requestMessage))
                .retrieve()
                .body(OpenAIResponse.class);
        System.out.println("To determine food category of a recipe, I need exactly one word as Vegan, Vegetarian,  Regular, or Unknown. " +
                           "The given ingredients are: " + requestMessage);
        return newAIResponse.justText();
    }
}  // Class
