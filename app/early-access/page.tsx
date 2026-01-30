import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";

export default function EarlyAccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center py-20 sm:py-32 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl opacity-50" />

                <Container size="default" className="relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 mb-6">
                            Coming Soon
                        </div>
                        <H1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Get Early Access to ParkingOath
                        </H1>
                        <Text size="lg" className="mb-10 text-slate-600">
                            Join the waitlist to be among the first to experience the future of hassle-free parking management.
                            We're building something special for you.
                        </Text>

                        <form className="max-w-md mx-auto space-y-4 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="sr-only">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                        className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                        className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="sr-only">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="sr-only">Location / Suburb</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Location / Suburb"
                                    required
                                    className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="frequency" className="sr-only">How often would you use the service?</label>
                                <select
                                    id="frequency"
                                    name="frequency"
                                    required
                                    defaultValue=""
                                    className="w-full rounded-xl border-0 bg-white/5 px-3.5 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.875rem center', backgroundSize: '1.25rem' }}
                                >
                                    <option value="" disabled>How often would you use the service?</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="occasionally">Occasionally</option>
                                </select>
                            </div>

                            <Button type="submit" className="w-full justify-center mt-2">
                                Join Waitlist
                            </Button>
                        </form>

                        <Text size="sm" className="mt-6 text-slate-500">
                            We care about your data in our <a href="#" className="underline hover:text-slate-700">privacy policy</a>.
                        </Text>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
