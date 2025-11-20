import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Heart, Lightbulb, Users, Zap, FileText, MessageSquare, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-5xl">
            {/* Hero */}
            <div className="text-center mb-20">
                <Badge variant="secondary" className="mb-4">Our Mission</Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Bridging the Gap Between <br />
                    <span className="text-gradient">Wisdom & Ambition</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We connect young people seeking direction with experienced professionals who have lived it.
                </p>
            </div>

            {/* The Problem Section */}
            <section className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">The Problem We Solve</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Youth Struggles */}
                    <Card className="bg-red-500/5 border-red-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-red-500">
                                <Users className="w-6 h-6" />
                                The Struggle for Youth
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Life direction confusion & career clarity issues.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Lack of real-world guidance from people who've "lived life".</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Too much theory, not enough practical wisdom.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Fear of choosing the wrong path.</p>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Untapped Wisdom */}
                    <Card className="bg-blue-500/5 border-blue-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-blue-500">
                                <Lightbulb className="w-6 h-6" />
                                The Untapped Wisdom
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Millions of retired professionals & founders aged 40+.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Decades of practical life lessons & industry experience.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <p className="text-muted-foreground">A strong desire to give back to the next generation.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <p className="text-muted-foreground">Often disconnected from the youth who need them most.</p>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* The Solution */}
            <section className="mb-24 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">How Mentra Solves This</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Mentra bridges two worlds that naturally complete each other. We provide a platform where people with decades of experience help youth avoid mistakes that textbooks never teach.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                        <div className="p-4 bg-secondary rounded-lg">Handling Failure</div>
                        <div className="p-4 bg-secondary rounded-lg">Building Discipline</div>
                        <div className="p-4 bg-secondary rounded-lg">Starting a Business</div>
                        <div className="p-4 bg-secondary rounded-lg">Confident Decisions</div>
                    </div>
                </div>
            </section>

            {/* AI Features */}
            <section className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Smarter, Faster, Personalized</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <Zap className="w-10 h-10 text-yellow-500 mb-2" />
                            <CardTitle>AI Mentor Matching</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                No more random searching. Answer 6-10 questions, and our AI analyzes your personality and goals to recommend the perfect mentor instantly.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <FileText className="w-10 h-10 text-green-500 mb-2" />
                            <CardTitle>AI Session Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                After every session, AI generates a summary, lists action steps, and sets weekly goals so you actually progress.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <MessageSquare className="w-10 h-10 text-purple-500 mb-2" />
                            <CardTitle>24/7 AI Assistant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Need quick guidance between sessions? Mentra AI is always available for career doubts, clarity, and step-by-step support.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Structured Sessions & Purpose */}
            <div className="grid md:grid-cols-2 gap-12 mb-24">
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-primary" />
                        Structured Sessions
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        Mentors don’t do random conversations. Mentra provides:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">✓ AI-generated agendas</li>
                        <li className="flex items-center gap-2">✓ Session templates</li>
                        <li className="flex items-center gap-2">✓ Goal tracking & growth roadmaps</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-primary" />
                        Purpose for Professionals
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        We solve a global purpose problem for seniors. Mentors get to:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">✓ Feel valued again</li>
                        <li className="flex items-center gap-2">✓ Share life experience</li>
                        <li className="flex items-center gap-2">✓ Guide the next generation</li>
                    </ul>
                </section>
            </div>

            {/* CTA */}
            <div className="text-center py-12 bg-muted/30 rounded-3xl">
                <h2 className="text-3xl font-bold mb-6">Ready to find your direction?</h2>
                <div className="flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/mentors">Find a Mentor</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/become-mentor">Become a Mentor</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
