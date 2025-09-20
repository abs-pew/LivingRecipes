package de.neuefische.backend.model;

import lombok.With;

import java.util.Collections;
import java.util.List;

//current free version in my use: gpt-5 or gpt-5-32k
//"model": "gpt-4.1",
//    "messages": [
//      {
//        "role": "developer",
//        "content": "You are a helpful assistant."
//      },
//      {
//        "role": "user",
//        "content": "Hello!"
//      }
//    ]

@With
public record OpenAIRequest(
        String model,
        List<RequestMessage> messages ) {

    public OpenAIRequest(String requestMessage){
        this("gpt-4.1",
                Collections.singletonList(
                        new RequestMessage("user", requestMessage)));
    }
}
