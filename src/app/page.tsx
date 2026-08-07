import type { Metadata } from "next";

import { getCanonicalUrl } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
    alternates: {
        canonical: getCanonicalUrl("/"),
    },
};

export default function Home() {
    const currentEnv = process.env.CURRENT_ENV;
    const indexes = getIndexesForEnv(currentEnv);

    return <HomeContent indexes={indexes} />;
}
