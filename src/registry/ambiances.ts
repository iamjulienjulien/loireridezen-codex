export const AMBIANCES = [
    { id: "aube", label: "Aube", emoji: "🌅" },
    { id: "jour", label: "Jour", emoji: "☀️" },
    { id: "soir", label: "Soir", emoji: "🌇" },
    { id: "nuit", label: "Nuit", emoji: "🌙" },
] as const;

export type Ambiance = (typeof AMBIANCES)[number]["id"];
