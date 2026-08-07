import AtelierCategoryLayout from "../AtelierCategoryLayout";
import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import {
    getPersonnagesByLieu,
    getPersonnageWithRelations,
} from "@/lib/personnages";
import MetierShowcase from "./MetierShowcase";

export const metadata = getAtelierPageMetadata("/atelier/metier");

const PERSONNAGE_EXAMPLE_IDS = [
    "agnes-sorel",
    "anne-de-bretagne",
    "jeanne-d-arc",
] as const;

export default function AtelierMetierPage() {
    const personnageExamples = PERSONNAGE_EXAMPLE_IDS.flatMap((id) => {
        const example = getPersonnageWithRelations(id);
        return example ? [example] : [];
    });
    const personnagesByChateau = getPersonnagesByLieu();

    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Domaine"
            title="Composants Métier"
            description="Les cartes qui traduisent les données du Codex en fiches éditoriales : espèces, flore, patrimoine castral, guinguettes et personnages de la Loire."
        >
            <MetierShowcase
                personnageExamples={personnageExamples}
                personnagesByChateau={personnagesByChateau}
            />
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
