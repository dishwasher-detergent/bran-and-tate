import { EditLabelForm } from "./form";

export default async function EditLabelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditLabelForm labelId={id} />;
}
