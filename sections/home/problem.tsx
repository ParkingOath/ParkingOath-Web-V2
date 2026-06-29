import { Container, H2, Text } from "@/components";

const Problem = () => {
    return (
        <section className="bg-white">
            <Container className="py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <H2>Parking got hard. Driveways sat empty. Locals are fixing both.</H2>
                    <Text size="lg" tone="muted" className="mt-6">
                        Spaces are vanishing while more cars arrive. Drivers circle for twenty
                        minutes or pay a fortune. Meanwhile, driveways and garages sit empty just
                        metres away. Locals are closing that gap on ParkingOath, one driveway at
                        a time, turning empty space into the spot you needed all along.
                    </Text>
                </div>
            </Container>
        </section>
    );
};

export default Problem;
