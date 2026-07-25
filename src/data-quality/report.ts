import type {
    DataQualityIssue,
    DataQualityReport,
    DataQualitySummary,
} from "./types";

const issueLocation = (issue: DataQualityIssue) =>
    [
        issue.index ? `index=${issue.index}` : undefined,
        issue.file ? `file=${issue.file}` : undefined,
        issue.path ? `path=${issue.path}` : undefined,
    ]
        .filter(Boolean)
        .join(" ");

const issueSample = (issue: DataQualityIssue) =>
    issue.path ?? issue.file ?? issue.message;

const formatValue = (value: unknown) => {
    if (value === undefined) return "";
    const serialized = JSON.stringify(value);
    return serialized === undefined ? String(value) : serialized;
};

const formatError = (issue: DataQualityIssue) => {
    const location = issueLocation(issue);
    const value = formatValue(issue.value);
    return [
        `[ERROR ${issue.code}]`,
        location || undefined,
        value ? `${issue.message} value=${value}` : issue.message,
    ]
        .filter(Boolean)
        .join("\n");
};

const formatWarningGroups = (
    warnings: DataQualityIssue[],
    sampleLimit: number,
) => {
    const groups = new Map<string, DataQualityIssue[]>();
    for (const warning of warnings) {
        const key = `${warning.code}\0${warning.index ?? ""}`;
        const group = groups.get(key) ?? [];
        group.push(warning);
        groups.set(key, group);
    }

    return [...groups.values()].map((group) => {
        const first = group[0];
        const samples = group.slice(0, sampleLimit).map(issueSample);
        const remaining = group.length - samples.length;
        return [
            `[WARNING ${first.code}]`,
            [
                first.index ? `index=${first.index}` : undefined,
                `count=${group.length}`,
            ]
                .filter(Boolean)
                .join(" "),
            `samples=${samples.join(", ")}${remaining > 0 ? `, … (+${remaining})` : ""}`,
        ].join("\n");
    });
};

const formatSummary = (summary: DataQualitySummary) =>
    `Data quality: ${summary.indexes} indexes, ${summary.entries} entries, ` +
    `${summary.referencedMedia} referenced media, ${summary.mediaFiles} media files, ` +
    `${summary.errors} errors, ${summary.warnings} warnings.`;

export const formatDataQualityReport = (
    report: DataQualityReport,
    options: { warningSampleLimit?: number } = {},
) => {
    const sampleLimit = Math.max(1, options.warningSampleLimit ?? 3);
    const errors = report.issues
        .filter(({ severity }) => severity === "error")
        .map(formatError);
    const warnings = formatWarningGroups(
        report.issues.filter(({ severity }) => severity === "warning"),
        sampleLimit,
    );
    return [...errors, ...warnings, formatSummary(report.summary)].join("\n\n");
};
