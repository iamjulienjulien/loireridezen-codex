import AtelierCategoryLayout from "../AtelierCategoryLayout";
import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import MetierShowcase from "./MetierShowcase";

export default function AtelierMetierPage() {
    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Domaine"
            title="Composants Métier"
            description="Les cartes qui traduisent les données du Codex en fiches éditoriales : espèces, flore et patrimoine castral."
        >
            <MetierShowcase />
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
