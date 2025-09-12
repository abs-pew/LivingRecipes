package de.neuefische.backend.model;

import lombok.With;

@With
public record Ingredient(
        String name,
        double quantity,
        UnitsList unit
) {
}
