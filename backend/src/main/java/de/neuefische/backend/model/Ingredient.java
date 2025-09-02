package de.neuefische.backend.model;

public record Ingredient(
        String name,
        int quantity,
        UnitsList unit
) {
}
