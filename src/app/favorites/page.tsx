import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Favorite Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Image
              src={`/placeholder.svg?height=200&width=300`}
              alt={`Favorite Recipe ${i}`}
              width={300}
              height={200}
              className="w-full object-cover h-48"
            />
            <CardHeader>
              <CardTitle>Favorite Recipe {i}</CardTitle>
              <CardDescription>A recipe you love</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This delicious recipe is one of your favorites...</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href={`/recipe/${i}`}>View Recipe</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
