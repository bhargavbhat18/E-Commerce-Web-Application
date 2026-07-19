package com.eazydeals.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiAdminService {

    private final ChatModel chatModel;

    public String generateProductDescription(String name, String category, String features) {
        String template = "Write a professional, SEO-friendly product description for a product named {name} in the {category} category. " +
                "It has the following features: {features}. Include key highlights and marketing copy.";
        
        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of("name", name, "category", category, "features", features));
        
        return chatModel.call(prompt).getResult().getOutput().getContent();
    }
}
