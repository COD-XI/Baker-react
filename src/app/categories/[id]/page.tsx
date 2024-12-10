import RecipeCard from "@/components/recipe-card/RecipeCard";
import React from "react";

interface Props {
  params: { id: string };
}

const CategoryPage = async ({ params }: Props) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      category: params.id,
    },
  });

  if (!recipes) {
    return (
      <div className="text-center mt-8">No recipes found in {params.id}.</div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 flex-1 items-center justify-center">
      <h2 className="text-3xl font-semibold mb-6 text-center">{params.id}</h2>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
};

export default CategoryPage;
