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

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Bakery Recipes</h1>
        <p className="text-xl mb-8">
          Discover and share delicious bakery recipes
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/categories">Explore Recipes</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Featured Recipes
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Chocolate Cake",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Blueberry Muffins",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Cinnamon Rolls",
              image: "/placeholder.svg?height=200&width=300",
            },
          ].map((recipe, i) => (
            <Card key={i} className="overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={200}
                className="w-full object-cover h-48"
              />
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>A mouthwatering treat</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This recipe is perfect for any occasion...</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href={`/recipe/${i + 1}`}>View Recipe</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
