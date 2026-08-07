export const SITE_URL = "https://codex.loireridezen.bike";

export const SITE_TITLE =
    "Loire Ride Zen — Le Codex vivant des trésors du Val de Loire";

export const SITE_DESCRIPTION =
    "Parcourez le Val de Loire dans un codex vivant consacré à ses châteaux, sa faune, sa flore, ses vignobles et aux récits du fleuve.";

export const getCanonicalUrl = (pathname: string): URL =>
    new URL(pathname, SITE_URL);
