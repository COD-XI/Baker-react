"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Profile</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="liked">Liked Recipes</TabsTrigger>
          <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <p>Passionate baker and recipe creator</p>
            </CardContent>
            <CardFooter>
              <Button>Edit Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="liked">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Liked Recipe ${i}`}
                  width={300}
                  height={200}
                  className="w-full object-cover h-48"
                />
                <CardHeader>
                  <CardTitle>Liked Recipe {i}</CardTitle>
                  <CardDescription>A recipe you enjoyed</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/recipe/${i}`}>View Recipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-recipes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`My Recipe ${i}`}
                  width={300}
                  height={200}
                  className="w-full object-cover h-48"
                />
                <CardHeader>
                  <CardTitle>My Recipe {i}</CardTitle>
                  <CardDescription>Your own creation</CardDescription>
                </CardHeader>
                <CardFooter className="space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/recipe/${i}`}>View</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/edit-recipe/${i}`}>Edit</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
