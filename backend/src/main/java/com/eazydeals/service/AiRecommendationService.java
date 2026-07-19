package com.eazydeals.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiRecommendationService {

    private final ChatModel chatModel;

    public String generateRecommendations(Integer userId) {
        // In a real app, we'd fetch the user's history and pass it to the prompt.
        String prompt = "Generate 5 personalized product recommendations for a user who recently bought a laptop and a mouse. Return as JSON array.";
        return chatModel.call(new Prompt(prompt)).getResult().getOutput().getContent();
    }
}
