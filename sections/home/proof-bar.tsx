import { Container, Text } from "@/components";

const ProofBar = () => {
    return (
        <section className="border-y border-slate-200 bg-slate-50">
            <Container className="py-6">
                <Text size="sm" tone="muted" className="text-center font-medium">
                    Australian-built · ABN 62 666 831 394 · Identity verified by Didit
                </Text>
            </Container>
        </section>
    );
};

export default ProofBar;
