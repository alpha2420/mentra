import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Link from "next/link";

interface MentorProps {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    tags: string[];
    rating: number;
    reviews: number;
}

export function MentorCard({ mentor }: { mentor: MentorProps }) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/20 group">
            <CardHeader className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    {/* In a real app, use Next.js Image with fill */}
                    <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg leading-none">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{mentor.role} at {mentor.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span>{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviews})</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {mentor.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <Button asChild className="w-full">
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
