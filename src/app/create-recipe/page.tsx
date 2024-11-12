"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  ingredients: z
    .string()
    .min(10, {
      message: "Ingredients must be at least 10 characters.",
    })
    .max(1000, {
      message: "Ingredients must not exceed 1000 characters.",
    }),
  instructions: z
    .string()
    .min(20, {
      message: "Instructions must be at least 20 characters.",
    })
    .max(2000, {
      message: "Instructions must not exceed 2000 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export default function CreateRecipePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Recipe created!",
        description: "Your new recipe has been successfully added.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast({
        title: "Error",
        description:
          "There was a problem creating your recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Create New Recipe</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter recipe title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your recipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your recipe" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a brief description of your recipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Textarea placeholder="List your ingredients" {...field} />
                </FormControl>
                <FormDescription>
                  List all ingredients, one per line.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your instructions" {...field} />
                </FormControl>
                <FormDescription>
                  Provide step-by-step instructions for your recipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cakes">Cakes</SelectItem>
                    <SelectItem value="cookies">Cookies</SelectItem>
                    <SelectItem value="breads">Breads</SelectItem>
                    <SelectItem value="pastries">Pastries</SelectItem>
                    <SelectItem value="pies">Pies</SelectItem>
                    <SelectItem value="muffins">Muffins</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits your recipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image of your recipe. (Max size: 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Recipe..." : "Create Recipe"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
