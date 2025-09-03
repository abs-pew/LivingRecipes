package de.neuefische.backend.model;

public record Ingredient(
        String name,
        double quantity,
        UnitsList unit
) {
}
