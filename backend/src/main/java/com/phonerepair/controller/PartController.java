package com.phonerepair.controller;

import com.phonerepair.dto.PartRequest;
import com.phonerepair.dto.PartResponse;
import com.phonerepair.service.PartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
@Tag(name = "Part", description = "Part management APIs")
public class PartController {

    private final PartService partService;

    @PostMapping
    @Operation(summary = "Create a new part")
    public ResponseEntity<PartResponse> createPart(@Valid @RequestBody PartRequest request) {
        PartResponse response = partService.createPart(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get all parts")
    public ResponseEntity<List<PartResponse>> getAllParts() {
        List<PartResponse> parts = partService.getAllParts();
        return ResponseEntity.ok(parts);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get part by ID")
    public ResponseEntity<PartResponse> getPartById(@PathVariable Long id) {
        PartResponse part = partService.getPartById(id);
        return ResponseEntity.ok(part);
    }

    @GetMapping("/available")
    @Operation(summary = "Get available parts")
    public ResponseEntity<List<PartResponse>> getAvailableParts() {
        List<PartResponse> parts = partService.getAvailableParts();
        return ResponseEntity.ok(parts);
    }

    @GetMapping("/search")
    @Operation(summary = "Search parts by name")
    public ResponseEntity<List<PartResponse>> searchParts(@RequestParam String q) {
        List<PartResponse> parts = partService.searchParts(q);
        return ResponseEntity.ok(parts);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update part")
    public ResponseEntity<PartResponse> updatePart(
            @PathVariable Long id,
            @Valid @RequestBody PartRequest request) {
        PartResponse part = partService.updatePart(id, request);
        return ResponseEntity.ok(part);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete part")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }
}
