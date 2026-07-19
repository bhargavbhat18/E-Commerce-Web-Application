package com.eazydeals.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiSearchService {

    private final ChatModel chatModel;

    public String convertNaturalLanguageToFilters(String query) {
        if (query == null || query.toLowerCase().contains("ignore")) {
            return "{\"error\": \"Invalid query\"}";
        }
        
        String systemPrompt = "Extract search parameters from the user's natural language query. " +
                "Return ONLY a JSON object with keys: category, maxPrice, minPrice, keyword. " +
                "If a parameter is not mentioned, leave it out.";
                
        try {
            PromptTemplate promptTemplate = new PromptTemplate(
                systemPrompt + "\nQuery: {query}"
            );
            Prompt prompt = promptTemplate.create(Map.of("query", query));
            return chatModel.call(prompt).getResult().getOutput().getContent();
        } catch (Exception e) {
            System.err.println("AI Service Error (Is Ollama running?): " + e.getMessage());
            return "{\"error\": \"AI Service Offline\"}";
        }
    }
}
