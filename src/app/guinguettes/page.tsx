import { GuinguettesRoute, guinguettesMetadata } from "./GuinguettesRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("guinguettes");
    return guinguettesMetadata;
}

export default function GuinguettesPage() {
    requireIndexForEnv("guinguettes");
    return <GuinguettesRoute />;
}
