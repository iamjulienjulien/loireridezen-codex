import { PersonnagesRoute, personnagesMetadata } from "./PersonnagesRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("personnages");
    return personnagesMetadata;
}

export default function PersonnagesPage() {
    requireIndexForEnv("personnages");
    return <PersonnagesRoute />;
}
