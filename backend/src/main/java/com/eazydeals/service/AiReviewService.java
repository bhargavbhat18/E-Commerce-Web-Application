package com.eazydeals.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiReviewService {

    private final ChatModel chatModel;

    public String summarizeReviews(Integer productId) {
        String prompt = "Summarize the following fake product reviews into a concise list of pros and cons:\n" +
                "1. Great product, I love the battery life.\n" +
                "2. The screen is amazing but it gets a bit warm.\n" +
                "3. Highly recommend it, though a bit expensive.";
        try {
            return chatModel.call(new Prompt(prompt)).getResult().getOutput().getContent();
        } catch (Exception e) {
            System.err.println("AI Service Error (Is Ollama running?): " + e.getMessage());
            return "Unable to fetch AI review summary at this time. Please try again later.";
        }
    }
}
