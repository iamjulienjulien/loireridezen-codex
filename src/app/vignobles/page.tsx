import { VignoblesRoute, vignoblesMetadata } from "./VignoblesRoute";
import { requireIndexForEnv } from "@/lib/publication-guards";

export function generateMetadata() {
    requireIndexForEnv("vignobles");
    return vignoblesMetadata;
}

export default function VignoblesPage() {
    requireIndexForEnv("vignobles");
    return <VignoblesRoute />;
}
