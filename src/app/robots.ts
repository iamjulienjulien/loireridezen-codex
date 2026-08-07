import type { MetadataRoute } from "next";

import { getCanonicalUrl } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/chateau/"],
            disallow: ["/api/v1/", "/atelier/"],
        },
        sitemap: getCanonicalUrl("/sitemap.xml").toString(),
    };
}
