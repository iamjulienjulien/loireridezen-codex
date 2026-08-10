import { FloreRoute, floreMetadata } from "./FloreRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("flore");
    return floreMetadata;
}

export default function FlorePage() {
    requireIndexForEnv("flore");
    return <FloreRoute />;
}
