import EditForm from "../EditForm";

interface Props {
  params: { id: string };
}

export default async function EditRecipePage({ params }: Props) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!recipe) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <EditForm recipe={recipe} />
    </div>
  );
}
