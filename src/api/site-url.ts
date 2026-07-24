import { z } from "zod";

const httpUrlSchema = z
    .url()
    .refine(
        (value) => value.startsWith("http://") || value.startsWith("https://"),
    );

export const getSiteUrl = (): string => {
    const result = httpUrlSchema.safeParse(process.env.SITE_URL);

    if (!result.success) {
        throw new Error(
            "SITE_URL must be configured as a valid HTTP or HTTPS URL.",
        );
    }

    return result.data.replace(/\/+$/, "");
};
