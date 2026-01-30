import { Container } from "@/components/Container";
import { H1, H2, H3 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <H1 className="mb-6">Get in touch</H1>
                            <Text size="lg" className="mb-8 text-slate-600">
                                We'd love to hear from you. Whether you have a question about hosting, parking, or just want to say hi, our team is ready to answer all your questions.
                            </Text>

                            <div className="space-y-8 mt-12">
                                <div>
                                    <H3 className="text-xl mb-2">Support</H3>
                                    <Text>
                                        Our support team is available 24/7 to help you with any issues.<br />
                                        <a href="mailto:support@parkingoath.com" className="text-blue-600 hover:text-blue-500 font-semibold">support@parkingoath.com</a>
                                    </Text>
                                </div>
                                <div>
                                    <H3 className="text-xl mb-2">Sales</H3>
                                    <Text>
                                        Interested in a partnership or enterprise solution?<br />
                                        <a href="mailto:sales@parkingoath.com" className="text-blue-600 hover:text-blue-500 font-semibold">sales@parkingoath.com</a>
                                    </Text>
                                </div>
                                <div>
                                    <H3 className="text-xl mb-2">Office</H3>
                                    <Text>
                                        123 Parking Way<br />
                                        San Francisco, CA 94105<br />
                                        United States
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5">
                            <H2 className="mb-6">Send us a message</H2>
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
