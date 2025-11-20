"use client";

import { useState } from "react";
import { MENTORS } from "@/lib/data";
import { MentorCard } from "@/components/shared/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Life Direction", "Career Clarity", "Entrepreneurship", "Retired Professionals"];

export default function MentorsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMentors = MENTORS.filter((mentor) => {
        const matchesCategory = selectedCategory === "All" ||
            (selectedCategory === "Retired Professionals" ? mentor.tags.includes("Retirement") : mentor.category === selectedCategory);

        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Find Your Mentor</h1>
                    <p className="text-muted-foreground mt-2">Connect with experienced professionals who can guide you.</p>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name, role, or skill..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Mobile Filter Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>Narrow down your search.</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                                <h3 className="text-sm font-medium">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <Badge
                                            key={cat}
                                            variant={selectedCategory === cat ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {CATEGORIES.map((cat) => (
                                <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMentors.map((mentor) => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}

                    {filteredMentors.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-muted-foreground">No mentors found matching your criteria.</p>
                            <Button variant="link" onClick={() => { setSelectedCategory("All"); setSearchQuery("") }}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
