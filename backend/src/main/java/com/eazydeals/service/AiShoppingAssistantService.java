package com.eazydeals.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiShoppingAssistantService {

    private final ChatModel chatModel;

    public String chat(String userMessage) {
        if (userMessage == null || userMessage.toLowerCase().contains("ignore previous") || userMessage.toLowerCase().contains("ignore all")) {
            return "I am a shopping assistant. I cannot fulfill that request.";
        }
        
        String systemPrompt = "You are a helpful AI Shopping Assistant for EazyDeals. " +
                "You help users find products like laptops, phones, appliances, and clothes. " +
                "Be polite and concise. If a user asks for something we don't have, politely explain.";
                
        try {
            PromptTemplate promptTemplate = new PromptTemplate(
                systemPrompt + "\nUser: {message}\nAssistant:"
            );
            Prompt prompt = promptTemplate.create(Map.of("message", userMessage));
            return chatModel.call(prompt).getResult().getOutput().getContent();
        } catch (Exception e) {
            System.err.println("AI Service Error (Is Ollama running?): " + e.getMessage());
            return "I am currently experiencing technical difficulties connecting to my brain. Please ensure the AI server is running.";
        }
    }
}
