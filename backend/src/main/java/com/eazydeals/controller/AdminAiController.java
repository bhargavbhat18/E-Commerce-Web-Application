package com.eazydeals.controller;

import com.eazydeals.service.AiAdminService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/ai")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin("*")
public class AdminAiController {

    private final AiAdminService adminService;

    @PostMapping("/product-description")
    @Operation(summary = "Generate Product Description (Admin)")
    public String generateDescription(@RequestBody Map<String, String> request) {
        return adminService.generateProductDescription(
            request.get("name"),
            request.get("category"),
            request.get("features")
        );
    }
}
