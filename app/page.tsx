"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MentorCard } from "@/components/shared/MentorCard";
import { ArrowRight, CheckCircle2, Sparkles, Users, BrainCircuit, Star, Quote, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock Data
const FEATURED_MENTORS = [
  {
    id: "1",
    name: "Robert Fox",
    role: "Former VP of Engineering",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    tags: ["Leadership", "Tech", "Retirement"],
    rating: 4.9,
    reviews: 120
  },
  {
    id: "2",
    name: "Eleanor Pena",
    role: "Founder",
    company: "EcoStartups",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    tags: ["Entrepreneurship", "Sustainability"],
    rating: 5.0,
    reviews: 85
  },
  {
    id: "3",
    name: "Cody Fisher",
    role: "Retired Architect",
    company: "Freelance",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    tags: ["Creative", "Life Balance"],
    rating: 4.8,
    reviews: 200
  },
  {
    id: "4",
    name: "Esther Howard",
    role: "Ex-CMO",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    tags: ["Marketing", "Career Growth"],
    rating: 4.9,
    reviews: 150
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "My mentor helped me navigate a career pivot from finance to tech. Best decision I ever made.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
  },
  {
    name: "Michael Torres",
    role: "Entrepreneur",
    content: "The AI matching was spot-on. Found a mentor who had built exactly the type of business I'm starting.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Emily Johnson",
    role: "Product Designer",
    content: "Having someone who's been through it all makes such a difference. No more second-guessing myself.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-secondary/50 backdrop-blur-sm mb-8">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>AI-Powered Wisdom Matching</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
              Real Mentors. <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Real Wisdom.
              </span>
              <br />
              Real Growth.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Get guidance from people who've lived life — retired leaders, founders, and seasoned professionals.
              <span className="font-semibold text-foreground"> Not academic tutoring</span>, but real-world direction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/mentors">Find Your Mentor <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full" asChild>
                <Link href="/about">How It Works</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Expert Mentors</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10k+</div>
                <div className="text-sm text-muted-foreground">Sessions Booked</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Mentra?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience meets technology to give you the guidance you actually need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Experience Over Theory</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with mentors aged 40+ who have navigated the exact paths you're exploring. Real wisdom from real experience.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                <BrainCircuit className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI analyzes your goals and personality to find the perfect mentor match. No more guesswork.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Holistic Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                From career clarity to life decisions, get advice on the things that matter most to your future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Mentors Slider */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Meet Our Mentors</h2>
              <p className="text-muted-foreground text-lg">Seasoned professionals ready to guide you.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:inline-flex group">
              <Link href="/mentors">
                View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {FEATURED_MENTORS.map((mentor) => (
                <CarouselItem key={mentor.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <MentorCard mentor={mentor} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/mentors">View All Mentors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
            <p className="text-muted-foreground text-lg">Real stories from real people.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border shadow-sm"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">How Mentra Works</h2>
          <div className="grid md:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -z-10"></div>

            {[
              { step: "01", title: "Take the Quiz", desc: "Answer questions about your goals and challenges.", icon: "📝" },
              { step: "02", title: "Get Matched", desc: "AI suggests your top 3 ideal mentors.", icon: "🤖" },
              { step: "03", title: "Book a Session", desc: "Schedule a 1:1 video call easily.", icon: "📅" },
              { step: "04", title: "Grow & Evolve", desc: "Get actionable advice and follow-up.", icon: "🚀" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-3xl border shadow-sm relative"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your direction?</h2>
              <p className="text-primary-foreground/90 mb-10 text-lg md:text-xl leading-relaxed">
                Join thousands of young professionals and students who found clarity with Mentra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="h-14 px-10 text-base rounded-full font-semibold shadow-lg" asChild>
                  <Link href="/auth/register">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-base rounded-full border-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/mentors">Browse Mentors</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
