import { FauneCouleur } from "@/types/faune";
import "./FauneColors.css";

interface Props {
    colors: string[];
}

export const FAUNE_COULEURS: Record<FauneCouleur, string> = {
    argent: "var(--lrz-faune-argent)",
    beige: "var(--lrz-faune-beige)",
    blanc: "var(--lrz-faune-blanc)",
    "blanc gris": "var(--lrz-faune-blanc-gris)",

    bleu: "var(--lrz-faune-bleu)",
    "bleu gris": "var(--lrz-faune-bleu-gris)",
    "bleu métallique": "var(--lrz-faune-bleu-metallise)",
    "bleu turquoise": "var(--lrz-faune-bleu-turquoise)",

    brun: "var(--lrz-faune-brun)",
    "brun foncé": "var(--lrz-faune-brun-fonce)",
    "brun roux": "var(--lrz-faune-brun-roux)",

    crème: "var(--lrz-faune-creme)",
    fauve: "var(--lrz-faune-fauve)",

    gris: "var(--lrz-faune-gris)",
    "gris ardoise": "var(--lrz-faune-gris-ardoise)",
    "gris brun": "var(--lrz-faune-gris-brun)",

    jaune: "var(--lrz-faune-jaune)",

    noir: "var(--lrz-faune-noir)",

    ocre: "var(--lrz-faune-ocre)",

    orange: "var(--lrz-faune-orange)",
    "orange cuivré": "var(--lrz-faune-orange-cuivre)",

    rouge: "var(--lrz-faune-rouge)",
    roux: "var(--lrz-faune-roux)",

    vert: "var(--lrz-faune-vert)",
    "vert métallisé": "var(--lrz-faune-vert-metallise)",
    "vert olive": "var(--lrz-faune-vert-olive)",
    "vert vif": "var(--lrz-faune-vert-vif)",
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
