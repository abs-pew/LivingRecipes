package de.neuefische.backend.model;

import java.util.List;

/**
 * "choices": [
 *     {
 *       "index": 0,
 *       "message": {
 *         "role": "assistant",
 *         "content": "Hello! How can I assist you today?",
 *       }
 *       ]
 */
public record OpenAIResponse(
        List<ResponseMessage> choices) {

    public String justText(){
        return choices.get(0).message().content();
    }
}
