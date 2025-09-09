package de.neuefische.backend.model;

public enum UnitsList {
    GRAM("gm(s)"),
    LITER("l(s)"),
    KILOGRAM("kg(s)"),
    MILLILITRE("ml(s)"),
    PIECE("pc(s)");

    private final String valueString;
    UnitsList(String valueString) {
        this.valueString = valueString;
    }

    public String getValueString() {
        return valueString;
    }
}

