// UnitsList.ts
export enum UnitsList {
    GRAM = "GRAM",
    KILOGRAM = "KILOGRAM",
    LITER = "LITER",
    MILLILITER = "MILLILITER",
    PIECE = "PIECE"
}

export const UnitsLabels: Record<UnitsList, string> = {
    [UnitsList.GRAM]: "gm(s)",
    [UnitsList.KILOGRAM]: "kg(s)",
    [UnitsList.LITER]: "l(s)",
    [UnitsList.MILLILITER]: "ml(s)",
    [UnitsList.PIECE]: "pc(s)",
};