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
                                    <H3 className="text-xl mb-2">Visit us</H3>
                                    <Text>
                                        520 Collins St<br />
                                        Melbourne, Victoria 3000
                                    </Text>
                                </div>
                                <div>
                                    <H3 className="text-xl mb-2">Email</H3>
                                    <Text>
                                        <a href="mailto:hello@parkingoath.com" className="text-blue-600 hover:text-blue-500 font-semibold">hello@parkingoath.com</a>
                                    </Text>
                                </div>
                                <div>
                                    <H3 className="text-xl mb-2">Phone</H3>
                                    <Text>
                                        <a href="tel:+61494026396" className="text-blue-600 hover:text-blue-500 font-semibold">+61494026396</a>
                                    </Text>
                                </div>
                            </div>
                        </div>

                        {/* <H2 className="mb-6">Send us a message</H2> */}
                        <ContactForm />
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
