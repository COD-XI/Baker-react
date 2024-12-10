"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import ImageKit from "imagekit";

import { recipeSchema } from "../create-recipe/page";

import { getCurrentUser } from "@/lib/session";

export async function createRecipe({
  category,
  description,
  ingredients,
  instructions,
  title,
  image,
}: z.infer<typeof recipeSchema>): Promise<{ message: string; status: number }> {
  const currentUser = await getCurrentUser();
  try {
    let imageURL;
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
    });
    imagekit.upload(
      {
        file: image as string, // can be a URL, local file path, or base64 string
        fileName: `${new Date().getTime()}.png`,
      },
      (error, result) => {
        if (error) console.error(error);
        imageURL = result?.url as string;
      }
    );
    await prisma.recipe.create({
      data: {
        category,
        description,
        ingredients,
        instructions,
        title,
        image: imageURL,
        authorId: currentUser.id,
      },
    });

    return { message: "Recipe created successfully", status: 201 };
  } catch (error) {
    return { message: `Internal server error ${error}`, status: 500 };
  }
}
