import { MENTORS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star, Briefcase } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// In Next.js 15, params is a Promise
export default function MentorProfile({ params }: { params: { id: string } }) {
    const { id } = params;
    const mentor = MENTORS.find((m) => m.id === id);

    if (!mentor) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-[1fr_350px] gap-12">
                {/* Main Content */}
                <div>
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden relative bg-muted shrink-0">
                            <img
                                src={mentor.image}
                                alt={mentor.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                            <p className="text-xl text-muted-foreground mb-4">{mentor.role} at {mentor.company}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {mentor.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                    <span className="font-medium text-foreground">{mentor.rating}</span>
                                    <span>({mentor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Remote / Zoom</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold mb-4">About</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {mentor.bio}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4">Experience</h2>
                            <div className="space-y-6">
                                {mentor.experience.map((exp, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                            <Briefcase className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{exp.role}</h3>
                                            <p className="text-muted-foreground">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground/60 mt-1">{exp.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sidebar Booking */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl border bg-card shadow-sm sticky top-24">
                        <h3 className="font-semibold text-lg mb-4">Book a Session</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center p-3 rounded-lg border border-primary bg-primary/5">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="font-medium">Session</span>
                                </div>
                                <span className="font-bold">₹1</span>
                            </div>
                        </div>
                        <Button size="lg" className="w-full text-base h-12" asChild>
                            <Link href={`/messages/${mentor.id}`}>Start Session</Link>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Free cancellation up to 24h before.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
