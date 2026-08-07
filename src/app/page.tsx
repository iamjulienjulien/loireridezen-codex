import HomeShell from "@/components/layout/HomeShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { HOME_PAGE } from "@/registry/pages";
import HomeContent from "./HomeContent";

export const metadata = buildPageMetadata(HOME_PAGE);

export default function Home() {
    const currentEnv = process.env.CURRENT_ENV;
    const indexes = getIndexesForEnv(currentEnv);

    return (
        <HomeShell page={HOME_PAGE}>
            <HomeContent indexes={indexes} />
        </HomeShell>
    );
}
