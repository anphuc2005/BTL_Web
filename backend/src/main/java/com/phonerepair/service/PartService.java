package com.phonerepair.service;

import com.phonerepair.dto.PartRequest;
import com.phonerepair.dto.PartResponse;
import com.phonerepair.model.Part;
import com.phonerepair.model.Part.PartStatus;
import com.phonerepair.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartService {

    private final PartRepository partRepository;

    @Transactional
    public PartResponse createPart(PartRequest request) {
        Part part = new Part();
        part.setName(request.getName());
        part.setDescription(request.getDescription());
        part.setStock(request.getStock());
        part.setPrice(request.getPrice());
        part.setCategory(request.getCategory());
        part.setCompatibleDevices(request.getCompatibleDevices());

        Part savedPart = partRepository.save(part);
        return mapToResponse(savedPart);
    }

    public List<PartResponse> getAllParts() {
        return partRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PartResponse getPartById(Long id) {
        Part part = partRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found with id: " + id));
        return mapToResponse(part);
    }

    public List<PartResponse> getAvailableParts() {
        return partRepository.findByStatus(PartStatus.AVAILABLE).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PartResponse> searchParts(String query) {
        return partRepository.findByNameContainingIgnoreCase(query).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public PartResponse updatePart(Long id, PartRequest request) {
        Part part = partRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found with id: " + id));

        part.setName(request.getName());
        part.setDescription(request.getDescription());
        part.setStock(request.getStock());
        part.setPrice(request.getPrice());
        part.setCategory(request.getCategory());
        part.setCompatibleDevices(request.getCompatibleDevices());

        Part updatedPart = partRepository.save(part);
        return mapToResponse(updatedPart);
    }

    @Transactional
    public void deletePart(Long id) {
        if (!partRepository.existsById(id)) {
            throw new RuntimeException("Part not found with id: " + id);
        }
        partRepository.deleteById(id);
    }

    private PartResponse mapToResponse(Part part) {
        PartResponse response = new PartResponse();
        response.setId(part.getId());
        response.setName(part.getName());
        response.setDescription(part.getDescription());
        response.setStock(part.getStock());
        response.setPrice(part.getPrice());
        response.setStatus(part.getStatus());
        response.setCategory(part.getCategory());
        response.setCompatibleDevices(part.getCompatibleDevices());
        response.setCreatedAt(part.getCreatedAt());
        response.setUpdatedAt(part.getUpdatedAt());
        return response;
    }
}
