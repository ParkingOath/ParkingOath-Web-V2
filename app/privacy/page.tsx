import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Privacy Policy</H1>
                        <Text size="lg" className="text-slate-600">
                            ParkingOath Pty Ltd, trading as ParkingOath Pty Ltd ("we" or "us"), takes the
                            privacy of your information seriously. This policy explains how and for what
                            purposes we use information collected via the ParkingOath Pty Ltd website (the
                            "Website") and the ParkingOath Pty Ltd mobile app (the "App"). By using the
                            Website, the App, and any services we offer, you agree to be bound by this
                            policy.
                        </Text>

                        <div className="mt-12 space-y-10">
                            <section className="space-y-3">
                                <H2>1. Introduction</H2>
                                <Text>
                                    If you have any queries about this policy, please get in touch and we will
                                    do our best to answer your questions.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>2. Personal Information Collected</H2>
                                <Text>We may collect personal information about you, including but not limited to:</Text>
                                <Text>1. Information required to register, including first and last name, address, date of birth, mobile number, and basic security information.</Text>
                                <Text>2. Your email address and password.</Text>
                                <Text>3. Details of any parking spaces you list through the Website and the App.</Text>
                                <Text>4. Details of any bookings you make through the Website and the App.</Text>
                                <Text>5. Bank account details such as BSB, account number, and account name.</Text>
                                <Text>6. Payment details such as card type, card number, expiry date, and CVV.</Text>
                                <Text>7. Vehicle details such as model type and registration number.</Text>
                                <Text>8. Location details when you access the Website and the App.</Text>
                                <Text>9. Any correspondence between you and us, including messages.</Text>
                                <Text>10. Other information you voluntarily supply to us.</Text>
                                <Text>
                                    Although it is not compulsory to give us this information, if you do not,
                                    you cannot register as a member, list a parking space for rent, or make a
                                    booking.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>3. Use of This Information</H2>
                                <Text>We will use this information to:</Text>
                                <Text>1. Process and manage your booking as a parking space seller or buyer.</Text>
                                <Text>2. Collect payment of parking space fees from you on behalf of our sellers.</Text>
                                <Text>3. Make improvements to the Website, the App, and the services we offer.</Text>
                                <Text>4. Analyse how customers use the Website and the App.</Text>
                                <Text>5. Present testimonials or reviews you post to the Website and the App.</Text>
                                <Text>6. Aggregate your usage habits and provide directions or commuting suggestions.</Text>
                                <Text>7. Perform internal administrative duties, investigate complaints, and provide customer support.</Text>
                                <Text>8. Notify you of certain offers and new products, subject to opt-out rights.</Text>
                                <Text>
                                    9. Market and advertise relevant products and services, including by email,
                                    SMS, push notifications, postal mail, or direct telephone contact, subject
                                    to your preferences and opt-out rights.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>4. Sharing This Information</H2>
                                <Text>1. Credit or debit card payments will be collected by our payment processor.</Text>
                                <Text>2. We do not store credit card numbers or CVV/CVV2 security numbers on our servers.</Text>
                                <Text>3. We may re-charge a payment source for recurring bookings, cancellation fees, and other payments.</Text>
                                <Text>4. You may need to provide details to our payment processing agent(s), disclosed at collection time.</Text>
                                <Text>5. We may transfer personal information as part of a business sale or restructuring.</Text>
                                <Text>6. We may share personally identifiable information with third parties to provide services, bound by this policy.</Text>
                                <Text>7. We may share non-personally identifiable information to help understand usage patterns.</Text>
                                <Text>
                                    8. We may allow third party ad servers or ad networks to advertise on the
                                    Website and the App, who may use cookies and receive your IP address.
                                </Text>
                                <Text>
                                    9. We will not share your opt-in to an SMS campaign with any third party for
                                    unrelated purposes. We may share personal data with third parties who help
                                    deliver messaging services.
                                </Text>
                                <Text>
                                    10. Other than as set out above, we will not disclose personal information
                                    without your permission unless required by law.
                                </Text>
                                <Text>
                                    11. Information automatically collected: we log IP addresses and may gather
                                    non-personal information such as browser type to improve service.
                                </Text>
                                <Text>
                                    12. Cookies: We may store cookies on your device to provide a customized
                                    service. Cookies are used to store login details, preferences, viewed
                                    listings, session continuity, and incomplete booking reminders. You can
                                    block or erase cookies, but some parts of the Website and App may not work
                                    properly without them.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>5. Other Websites</H2>
                                <Text>
                                    We are not responsible for the privacy policies and practices of other
                                    websites. If you access other websites through links, you should check the
                                    policy of each website and contact its owner if you have concerns.
                                </Text>
                                <Text>
                                    If you linked to the Website or App from a third-party website, we are not
                                    responsible for that third party's privacy practices.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>6. Security</H2>
                                <Text>
                                    We store personal information securely with restricted access to prevent
                                    loss, unauthorised access, modification, or disclosure.
                                </Text>
                                <Text>
                                    We use SSL technology to encrypt sensitive data transfer, and recommend you
                                    maintain a strong and confidential password.
                                </Text>
                                <Text>
                                    We may store personal information with hosting providers outside our direct
                                    control. We cannot ensure or warrant the security of information you
                                    transmit to us and you do so at your own risk.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>7. Legal Basis of Disclosure of Your Information</H2>
                                <Text>
                                    We may disclose your information to courts, law enforcement, governmental
                                    or public authorities, tax authorities, or authorised third parties if
                                    required or permitted by law, including to comply with legal obligations,
                                    respond to valid legal requests, investigate illegal activity, enforce our
                                    terms, or protect rights and safety.
                                </Text>
                                <Text>
                                    Where legally required or permissible, we may disclose members' information
                                    to relevant tax authorities. From 1 July 2024, ParkingOath Pty Ltd must
                                    comply with the Sharing Economy Reporting Regime (SERR) mandated by the
                                    Australian Taxation Office (ATO) as a supplier of services using an
                                    electronic distribution platform.
                                </Text>
                                <Text>
                                    Information reported to the ATO may include: seller legal name, gross and
                                    net payments, date of birth, address, GST, bank account details, fees and
                                    commissions, ABNs or foreign tax IDs, phone details, property address,
                                    email details, and booking periods. The ATO may collect tax-related
                                    information about transactions conducted through our platform.
                                </Text>
                                <Text>
                                    Where appropriate and legally required, we may notify members about legal
                                    requests unless prohibited or where notice would be ineffective or create
                                    risk of harm or fraud.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>8. Changes to This Policy</H2>
                                <Text>
                                    If we change any terms set out in this Privacy Policy, we will post those
                                    changes on the Website and the App or Service. Changes are effective when
                                    posted, regardless of whether you have actual notice.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>9. Further Questions</H2>
                                <Text>
                                    If you would like to contact us about this policy or your personal
                                    information, you can do so at team@parkingoath.com. If you are not happy
                                    with the response from our Privacy Officer, you may make a complaint to the
                                    Privacy Commissioner via the Office of the Australian Information
                                    Commissioner website.
                                </Text>
                            </section>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
