import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { listLabel } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const result = await listLabel();
  const labels = result.success ? result.data!.rows : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Labels</h1>
        <p className="text-muted-foreground">
          View and manage your candle labels
        </p>
      </div>

      {labels.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No labels yet</CardTitle>
            <CardDescription>
              Create your first label to get started
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {labels.map((label) => {
            return (
              <Card
                key={label.$id}
                className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1 max-w-full"
              >
                <Card className="p-2 bg-background">
                  <FieldGroup className="gap-1">
                    <FieldLabel className="text-sm font-semibold">
                      Company
                    </FieldLabel>
                    <p className="text-base">{label.company}</p>
                  </FieldGroup>
                  <FieldGroup className="gap-1">
                    <FieldLabel className="text-sm font-semibold">
                      Type
                    </FieldLabel>
                    <p className="text-base">{label.type}</p>
                  </FieldGroup>
                  <FieldGroup className="gap-1">
                    <FieldLabel className="text-sm font-semibold">
                      Scent
                    </FieldLabel>
                    <p className="text-base">{label.scent}</p>
                  </FieldGroup>
                  <FieldGroup className="gap-1">
                    <FieldLabel className="text-sm font-semibold">
                      Notes Of
                    </FieldLabel>
                    <p className="text-base">{label.notesOf}</p>
                  </FieldGroup>
                  <FieldGroup className="gap-1">
                    <FieldLabel className="text-sm font-semibold">
                      Location
                    </FieldLabel>
                    <p className="text-base">{label.location}</p>
                  </FieldGroup>
                </Card>
                <CardContent className="p-0 flex flex-row justify-end gap-2">
                  <Button
                    render={<Link href={`/app/${label.$id}`}>Edit</Link>}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
