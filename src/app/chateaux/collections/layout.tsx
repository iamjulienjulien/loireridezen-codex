import PageFooter from "@/components/PageFooter";

export default function ChateauxCollectionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <PageFooter />
        </>
    );
}
