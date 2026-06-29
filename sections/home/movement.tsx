import { Container, H2, Text } from "@/components";

const Movement = () => {
    return (
        <section className="bg-slate-50">
            <Container className="py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <H2>A community solving its own parking, one suburb at a time.</H2>
                    <Text size="lg" tone="muted" className="mt-6">
                        ParkingOath is more than an app. It is a network of neighbours
                        choosing to trust each other, and a platform shaped by the people who
                        build it on the ground. We are starting suburb by suburb, and your
                        street could be next.
                    </Text>
                </div>
            </Container>
        </section>
    );
};

export default Movement;
