package com.eazydeals.controller;

import com.eazydeals.dto.ChatRequestDto;
import com.eazydeals.dto.GiftRequestDto;
import com.eazydeals.service.AiGiftFinderService;
import com.eazydeals.service.AiShoppingAssistantService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AiController {

    private final AiShoppingAssistantService chatService;
    private final AiGiftFinderService giftFinderService;

    @PostMapping("/chat")
    @Operation(summary = "Chat with AI Shopping Assistant")
    public String chat(@RequestBody ChatRequestDto request) {
        return chatService.chat(request.getMessage());
    }

    @PostMapping("/gift-finder")
    @Operation(summary = "Get AI Gift Recommendations")
    public String findGifts(@RequestBody GiftRequestDto request) {
        return giftFinderService.findGifts(request);
    }
}
