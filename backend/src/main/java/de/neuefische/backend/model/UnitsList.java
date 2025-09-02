package de.neuefische.backend.model;

public enum UnitsList {
    GRAM("gm"),
    POUND("lb(s)"),
    LITER("l(s)"),
    KILOGRAM("kg(s)"),
    MILLILITRE("ml(s)");

    private final String valueString;
    UnitsList(String valueString) {
        this.valueString = valueString;
    }

    public String getValueString() {
        return valueString;
    }
}

