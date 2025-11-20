import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BecomeMentorPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Share Your Wisdom</h1>
                    <p className="text-muted-foreground">
                        Join our community of experienced leaders and help shape the next generation.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Mentor Application</CardTitle>
                        <CardDescription>Tell us a bit about your experience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="jane@example.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Short Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="I have 20 years of experience in..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                <Input id="expertise" placeholder="e.g. Engineering, Leadership, Public Speaking" />
                            </div>

                            <Button type="submit" className="w-full">Submit Application</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
