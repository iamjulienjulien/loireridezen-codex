import { TerritoiresRoute, territoiresMetadata } from "./TerritoiresRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("territoires");
    return territoiresMetadata;
}

export default function TerritoiresPage() {
    requireIndexForEnv("territoires");
    return <TerritoiresRoute />;
}
