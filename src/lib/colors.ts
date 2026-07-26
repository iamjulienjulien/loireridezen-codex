export type HexColor = `#${string}`;

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};

export type HSLColor = {
    /** Teinte entre 0 et 360 degrés. */
    h: number;

    /** Saturation entre 0 et 100 %. */
    s: number;

    /** Luminosité entre 0 et 100 %. */
    l: number;
};

export type ColorShift = {
    /** Décalage de teinte en degrés. */
    hue?: number;

    /** Décalage de saturation en points. */
    saturation?: number;

    /** Décalage de luminosité en points. */
    lightness?: number;
};

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function normalizeHue(hue: number): number {
    return ((hue % 360) + 360) % 360;
}

function normalizeHex(hex: string): HexColor {
    const value = hex.trim();

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
        return value.toUpperCase() as HexColor;
    }

    if (/^#[0-9a-fA-F]{3}$/.test(value)) {
        const [r, g, b] = value.slice(1);

        return `#${r}${r}${g}${g}${b}${b}`.toUpperCase() as HexColor;
    }

    throw new Error(
        `Couleur hexadécimale invalide : "${hex}". Format attendu : #RGB ou #RRGGBB.`,
    );
}

/**
 * Convertit une couleur hexadécimale en RGB.
 *
 * @example
 * hexToRgb("#6F8757");
 * // { r: 111, g: 135, b: 87 }
 */
export function hexToRgb(hex: string): RGBColor {
    const normalized = normalizeHex(hex);

    return {
        r: Number.parseInt(normalized.slice(1, 3), 16),
        g: Number.parseInt(normalized.slice(3, 5), 16),
        b: Number.parseInt(normalized.slice(5, 7), 16),
    };
}

/**
 * Convertit une couleur RGB en hexadécimal.
 */
export function rgbToHex({ r, g, b }: RGBColor): HexColor {
    const toHex = (value: number): string =>
        Math.round(clamp(value, 0, 255))
            .toString(16)
            .padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase() as HexColor;
}

/**
 * Convertit une couleur RGB en HSL.
 */
export function rgbToHsl({ r, g, b }: RGBColor): HSLColor {
    const red = clamp(r, 0, 255) / 255;
    const green = clamp(g, 0, 255) / 255;
    const blue = clamp(b, 0, 255) / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    const lightness = (max + min) / 2;

    let hue = 0;
    let saturation = 0;

    if (delta !== 0) {
        saturation = delta / (1 - Math.abs(2 * lightness - 1));

        switch (max) {
            case red:
                hue = 60 * (((green - blue) / delta) % 6);
                break;

            case green:
                hue = 60 * ((blue - red) / delta + 2);
                break;

            case blue:
                hue = 60 * ((red - green) / delta + 4);
                break;
        }
    }

    return {
        h: normalizeHue(hue),
        s: saturation * 100,
        l: lightness * 100,
    };
}

/**
 * Convertit une couleur HSL en RGB.
 */
export function hslToRgb({ h, s, l }: HSLColor): RGBColor {
    const hue = normalizeHue(h);
    const saturation = clamp(s, 0, 100) / 100;
    const lightness = clamp(l, 0, 100) / 100;

    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

    const section = hue / 60;
    const x = chroma * (1 - Math.abs((section % 2) - 1));

    let red = 0;
    let green = 0;
    let blue = 0;

    if (section >= 0 && section < 1) {
        red = chroma;
        green = x;
    } else if (section < 2) {
        red = x;
        green = chroma;
    } else if (section < 3) {
        green = chroma;
        blue = x;
    } else if (section < 4) {
        green = x;
        blue = chroma;
    } else if (section < 5) {
        red = x;
        blue = chroma;
    } else {
        red = chroma;
        blue = x;
    }

    const match = lightness - chroma / 2;

    return {
        r: (red + match) * 255,
        g: (green + match) * 255,
        b: (blue + match) * 255,
    };
}

export function hexToHsl(hex: string): HSLColor {
    return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSLColor): HexColor {
    return rgbToHex(hslToRgb(hsl));
}

/**
 * Éclaircit une couleur en rapprochant sa luminosité de 100 %.
 *
 * `amount` est compris entre 0 et 1 :
 * - 0 : couleur inchangée
 * - 0.5 : moitié du chemin vers le blanc
 * - 1 : blanc
 *
 * La teinte et la saturation sont conservées.
 */
export function lighter(hex: string, amount: number): HexColor {
    const color = hexToHsl(hex);
    const ratio = clamp(amount, 0, 1);

    return hslToHex({
        ...color,
        l: color.l + (100 - color.l) * ratio,
    });
}

/**
 * Assombrit une couleur en rapprochant sa luminosité de 0 %.
 *
 * `amount` est compris entre 0 et 1 :
 * - 0 : couleur inchangée
 * - 0.5 : moitié du chemin vers le noir
 * - 1 : noir
 */
export function darker(hex: string, amount: number): HexColor {
    const color = hexToHsl(hex);
    const ratio = clamp(amount, 0, 1);

    return hslToHex({
        ...color,
        l: color.l * (1 - ratio),
    });
}

/**
 * Applique des décalages HSL exprimés en degrés ou en points.
 *
 * @example
 * shiftHexColor("#6F8757", {
 *     hue: 3,
 *     saturation: 4.0194,
 *     lightness: 41.1765,
 * });
 */
export function shiftHexColor(hex: string, shift: ColorShift): HexColor {
    const color = hexToHsl(hex);

    return hslToHex({
        h: color.h + (shift.hue ?? 0),
        s: color.s + (shift.saturation ?? 0),
        l: color.l + (shift.lightness ?? 0),
    });
}

/**
 * Calcule le ratio d’éclaircissement nécessaire pour atteindre
 * la luminosité HSL d’une autre couleur.
 *
 * Attention : ce ratio ne reproduit pas forcément exactement la couleur
 * cible si sa teinte ou sa saturation diffèrent.
 */
export function getLighteningRatio(
    sourceHex: string,
    targetHex: string,
): number {
    const source = hexToHsl(sourceHex);
    const target = hexToHsl(targetHex);

    if (target.l <= source.l) {
        return 0;
    }

    if (source.l >= 100) {
        return 0;
    }

    return clamp((target.l - source.l) / (100 - source.l), 0, 1);
}

/**
 * Mélange deux couleurs directement dans l’espace RGB.
 *
 * `amount` :
 * - 0 : couleur source
 * - 1 : couleur cible
 */
export function mixHexColors(
    sourceHex: string,
    targetHex: string,
    amount: number,
): HexColor {
    const source = hexToRgb(sourceHex);
    const target = hexToRgb(targetHex);
    const ratio = clamp(amount, 0, 1);

    return rgbToHex({
        r: source.r + (target.r - source.r) * ratio,
        g: source.g + (target.g - source.g) * ratio,
        b: source.b + (target.b - source.b) * ratio,
    });
}
