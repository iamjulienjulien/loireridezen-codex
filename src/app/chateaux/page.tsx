import { ChateauxRoute, chateauxMetadata } from "./ChateauxRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("chateaux");
    return chateauxMetadata;
}

export default function ChateauxPage() {
    requireIndexForEnv("chateaux");
    return <ChateauxRoute />;
}
