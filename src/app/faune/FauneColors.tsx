import { FauneCouleur } from "@/types/faune";
import "./FauneColors.css";

interface Props {
    colors: string[];
}

export const FAUNE_COULEURS: Record<FauneCouleur, string> = {
    argent: "var(--color-argent)",
    beige: "var(--color-beige)",
    blanc: "var(--color-blanc)",
    "blanc gris": "var(--color-blanc-gris)",

    bleu: "var(--color-bleu)",
    "bleu gris": "var(--color-bleu-gris)",
    "bleu métallique": "var(--color-bleu-metallise)",
    "bleu turquoise": "var(--color-bleu-turquoise)",

    brun: "var(--color-brun)",
    "brun foncé": "var(--color-brun-fonce)",
    "brun roux": "var(--color-brun-roux)",

    crème: "var(--color-creme)",
    fauve: "var(--color-fauve)",

    gris: "var(--color-gris)",
    "gris ardoise": "var(--color-gris-ardoise)",
    "gris brun": "var(--color-gris-brun)",

    jaune: "var(--color-jaune)",

    noir: "var(--color-noir)",

    ocre: "var(--color-ocre)",

    orange: "var(--color-orange)",
    "orange cuivré": "var(--color-orange-cuivre)",

    rouge: "var(--color-rouge)",
    roux: "var(--color-roux)",

    vert: "var(--color-vert)",
    "vert métallique": "var(--color-vert-metallise)",
    "vert olive": "var(--color-vert-olive)",
    "vert vif": "var(--color-vert-vif)",
};

export function FauneColors({ colors }: Props) {
    return (
        <div className="faune-colors">
            <div className="faune-colors-title">Couleurs</div>

            <div className="faune-colors-list">
                {colors.map((color) => (
                    <div key={color} className="faune-color">
                        <span
                            className="faune-color-dot"
                            style={{
                                backgroundColor:
                                    FAUNE_COULEURS[color as FauneCouleur],
                            }}
                        />

                        <span className="faune-color-name">{color}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
