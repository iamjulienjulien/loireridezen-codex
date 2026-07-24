import { z } from "zod";

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const customEmojiSchema = (indexPath: string) =>
    z.string().startsWith(`/emoji/${indexPath}/`);

export const coordinatesSchema = z
    .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
    })
    .strict();

const isRealIsoDate = (value: string) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return false;
    const [, year, month, day] = match.map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
};

export const isoDateSchema = z.string().refine(isRealIsoDate, {
    message: "Expected a real calendar date in YYYY-MM-DD format",
});

export const baseMetaShape = {
    titre: z.string().min(1),
    source: z.string().min(1),
    corridor: z.string().min(1),
    maj: isoDateSchema,
    note: z.string().min(1).optional(),
};

export const stringArraySchema = z.array(z.string());
