import Link from "next/link";
import { Button } from "@/components/ui/button";

import RecipeCard from "@/components/recipe-card/RecipeCard";

export default async function Home() {
  const recipes = (await prisma.recipe.findMany()).reverse();
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
          {recipes.slice(0, 3).map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
