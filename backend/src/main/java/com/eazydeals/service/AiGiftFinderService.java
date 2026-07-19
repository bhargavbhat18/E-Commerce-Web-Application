package com.eazydeals.service;

import com.eazydeals.dto.GiftRequestDto;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiGiftFinderService {

    private final ChatModel chatModel;

    public String findGifts(GiftRequestDto request) {
        String template = "Suggest top 5 gift ideas for a {age} year old {gender}. " +
                "Occasion: {occasion}. Budget: {budget}. Interests: {interests}. " +
                "Provide a brief explanation for each recommendation.";
                
        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of(
            "age", request.getRecipientAge(),
            "gender", request.getGender() != null ? request.getGender() : "person",
            "occasion", request.getOccasion(),
            "budget", request.getBudget(),
            "interests", String.join(", ", request.getInterests())
        ));
        
        return chatModel.call(prompt).getResult().getOutput().getContent();
    }
}
