import { Container, Text } from "@/components";

const PressStrip = () => {
    return (
        <section className="border-t border-slate-200 bg-white">
            <Container className="py-10 text-center">
                <Text className="text-[#64748b]">
                    Writing about parking, the cost of living, or local innovation?
                    Everything you need is in our newsroom.
                </Text>
                <Text className="mt-2 font-semibold text-black">
                    Visit the newsroom · Download the media kit
                </Text>
            </Container>
        </section>
    );
};

export default PressStrip;
