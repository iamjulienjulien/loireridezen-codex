import AtelierCategoryLayout from "../AtelierCategoryLayout";
import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import { getPersonnageWithRelations } from "@/lib/personnages";
import MetierShowcase from "./MetierShowcase";

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

    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Domaine"
            title="Composants Métier"
            description="Les cartes qui traduisent les données du Codex en fiches éditoriales : espèces, flore, patrimoine castral et personnages de la Loire."
        >
            <MetierShowcase personnageExamples={personnageExamples} />
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
