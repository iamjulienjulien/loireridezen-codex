import "./FauneIdentificationCard.css";
import { FauneIdentification } from "@/types/faune";

interface Props {
    identification: FauneIdentification;
}

const LABELS: Record<string, { label: string; icon: string }> = {
    longueur: {
        label: "Longueur",
        icon: "📏",
    },
    hauteur: {
        label: "Hauteur",
        icon: "📐",
    },
    envergure: {
        label: "Envergure",
        icon: "🪽",
    },
    poids: {
        label: "Poids",
        icon: "⚖️",
    },
};

export function FauneIdentificationCard({ identification }: Props) {
    const fields = Object.entries(LABELS).filter(
        ([key]) => identification[key as keyof FauneIdentification],
    );

    return (
        <div className="faune-identification">
            {fields.map(([key, config]) => (
                <div key={key} className="faune-identification-item">
                    <div className="faune-identification-title">
                        <span className="faune-identification-icon">
                            {config.icon}
                        </span>

                        <span>{config.label}</span>
                    </div>

                    <div className="faune-identification-value">
                        {identification[key as keyof FauneIdentification]}
                    </div>
                </div>
            ))}
        </div>
    );
}
