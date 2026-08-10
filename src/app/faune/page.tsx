import { FauneRoute, fauneMetadata } from "./FauneRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("faune");
    return fauneMetadata;
}

export default function FaunePage() {
    requireIndexForEnv("faune");
    return <FauneRoute />;
}
