import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import AtelierHomePage from "./AtelierPage";

export const metadata = getAtelierPageMetadata("/atelier");

export default function AtelierPage() {
    return <AtelierHomePage />;
}
