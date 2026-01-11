import { DeleteLabel } from "@/components/label/delete-label";
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
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Labels</h1>
          <p className="text-muted-foreground mb-2">
            View and manage your candle labels
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/app/labels/create">Create Label</Link>}
          />
        </div>
      </div>
      {labels.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No labels yet</CardTitle>
            <CardDescription>
              Create your first label to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              nativeButton={false}
              render={<Link href="/app/labels/create">Create Label</Link>}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labels.map((label) => {
            return (
              <Card
                key={label.$id}
                className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1 max-w-full"
              >
                <Card className="bg-background">
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
                <CardContent className="p-0 flex flex-row justify-end gap-2">
                  <DeleteLabel label={label} />
                  <Button
                    nativeButton={false}
                    render={<Link href={`/app/labels/${label.$id}`}>Edit</Link>}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
