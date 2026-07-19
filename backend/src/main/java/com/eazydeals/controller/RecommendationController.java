package com.eazydeals.controller;

import com.eazydeals.service.AiRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecommendationController {

    private final AiRecommendationService recommendationService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get AI personalized recommendations for user")
    public String getRecommendations(@PathVariable Integer userId) {
        return recommendationService.generateRecommendations(userId);
    }
}
