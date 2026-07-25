import { describe, expect, it } from "vitest";
import { formatDataQualityReport } from "./report";
import type { DataQualityReport } from "./types";

describe("formatDataQualityReport", () => {
    it("details errors and groups warnings by code and index", () => {
        const report: DataQualityReport = {
            issues: [
                {
                    code: "MEDIA_FILE_MISSING",
                    severity: "error",
                    index: "faune",
                    file: "data/faune.json",
                    path: "especes[0].customEmoji",
                    message: "Le média est absent.",
                    value: "/emoji/faune/missing.png",
                },
                ...[0, 1, 2, 3].map((position) => ({
                    code: "MEDIA_MISSING_FOR_UNPUBLISHED_ENTRY" as const,
                    severity: "warning" as const,
                    index: "vignobles",
                    file: "data/vignoble.json",
                    path: `vignobles[${position}].customEmoji`,
                    message: "Illustration absente.",
                })),
            ],
            summary: {
                indexes: 2,
                entries: 5,
                referencedMedia: 0,
                mediaFiles: 0,
                errors: 1,
                warnings: 4,
            },
        };

        const output = formatDataQualityReport(report, {
            warningSampleLimit: 2,
        });

        expect(output).toContain("[ERROR MEDIA_FILE_MISSING]");
        expect(output).toContain(
            "index=faune file=data/faune.json path=especes[0].customEmoji",
        );
        expect(output.match(/\[WARNING MEDIA_MISSING/g)).toHaveLength(1);
        expect(output).toContain("index=vignobles count=4");
        expect(output).toContain("… (+2)");
        expect(output).toContain(
            "Data quality: 2 indexes, 5 entries, 0 referenced media, 0 media files, 1 errors, 4 warnings.",
        );
    });
});
