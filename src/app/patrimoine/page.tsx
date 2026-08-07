import patrimoine from "@data/patrimoine.json";
import type { Patrimoine } from "@/types/patrimoine";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import PatrimoineIndex from "./PatrimoineIndex";

export const metadata = buildPageMetadata(
    getIndexPageDefinition("/patrimoine"),
);

export default function PatrimoinePage() {
    const items = patrimoine.patrimoine as Patrimoine[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <PatrimoineIndex items={items} indexes={indexes} />;
}
