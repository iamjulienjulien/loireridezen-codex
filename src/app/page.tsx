import { getIndexesForEnv } from "@/registry/indexes";
import HomeContent from "./HomeContent";

export default function Home() {
    const currentEnv = process.env.CURRENT_ENV;
    const indexes = getIndexesForEnv(currentEnv);

    return (
        <HomeContent
            indexes={indexes}
            showDevelopmentTools={currentEnv === "development"}
        />
    );
}
