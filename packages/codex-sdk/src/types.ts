import type { components } from "./generated/openapi.js";

export type ApiVersion = components["schemas"]["ApiVersion"];
export type PublishedIndexSlug = components["schemas"]["PublishedIndexSlug"];
export type EntrySlug = components["schemas"]["EntrySlug"];

export type PublicMedia = components["schemas"]["PublicMedia"];
export type ContentLicense = components["schemas"]["ContentLicense"];
export type MediaLicense = components["schemas"]["MediaLicense"];
export type PublicLicenses = components["schemas"]["PublicLicenses"];
export type PublicIndex = components["schemas"]["PublicIndex"];

export type FauneAttributes = components["schemas"]["FauneAttributes"];
export type FloreAttributes = components["schemas"]["FloreAttributes"];
export type ChateauIllustrations =
    components["schemas"]["ChateauIllustrations"];
export type ChateauAttributes = components["schemas"]["ChateauAttributes"];
export type GuinguetteAttributes =
    components["schemas"]["GuinguetteAttributes"];
export type TerritoireAttributes =
    components["schemas"]["TerritoireAttributes"];
export type PersonnageAttributes =
    components["schemas"]["PersonnageAttributes"];
export type VignobleAttributes = components["schemas"]["VignobleAttributes"];
export type FauneEntry = components["schemas"]["FauneEntry"];
export type FloreEntry = components["schemas"]["FloreEntry"];
export type ChateauEntry = components["schemas"]["ChateauEntry"];
export type GuinguetteEntry = components["schemas"]["GuinguetteEntry"];
export type TerritoireEntry = components["schemas"]["TerritoireEntry"];
export type PersonnageEntry = components["schemas"]["PersonnageEntry"];
export type VignobleEntry = components["schemas"]["VignobleEntry"];
export type PublicEntry = components["schemas"]["PublicEntry"];

export type ApiRootResponse = components["schemas"]["ApiRootResponse"];
export type IndexCollectionResponse =
    components["schemas"]["IndexCollectionResponse"];
export type IndexDetailResponse = components["schemas"]["IndexDetailResponse"];
export type EntryCollectionResponse =
    components["schemas"]["EntryCollectionResponse"];
export type EntryDetailResponse = components["schemas"]["EntryDetailResponse"];
export type Problem = components["schemas"]["Problem"];
