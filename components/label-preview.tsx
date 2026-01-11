import type { LabelFormData } from "@/lib/label/schemas";
import { Card, CardContent } from "./ui/card";

type LabelSize = "2x4" | "1.25x3.75";

interface LabelPreviewProps {
  data: LabelFormData;
  size?: LabelSize;
}

const LABEL_CONFIGS = {
  "2x4": {
    // 4" x 2" label at 150 DPI = 600px x 300px
    width: 600,
    height: 300,
    layout: "horizontal" as const,
    averyTemplate: 5163,
  },
  "1.25x3.75": {
    // 3.75" x 1.25" label at 150 DPI = 562.5px x 187.5px
    width: 563,
    height: 188,
    layout: "vertical" as const,
    averyTemplate: 94228,
  },
};

const LabelWrapper = ({
  size,
  children,
}: {
  size: LabelSize;
  children: React.ReactNode;
}) => {
  return (
    <Card className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1">
      <Card className="p-0">{children}</Card>
      <CardContent className="p-0 flex flex-row justify-end gap-2">
        <p className="text-sm">
          <b>Avery Template:</b> {LABEL_CONFIGS[size].averyTemplate}
        </p>
        <p className="text-sm">
          <b>Size:</b> {size}
        </p>
      </CardContent>
    </Card>
  );
};

export function LabelPreview({ data, size = "2x4" }: LabelPreviewProps) {
  const config = LABEL_CONFIGS[size];

  if (config.layout === "vertical") {
    // Vertical layout for 1.25x3.75
    return (
      <LabelWrapper size={size}>
        <div
          className="bg-label-accent overflow-hidden flex"
          style={{ width: `${config.width}px`, height: `${config.height}px` }}
        >
          <div className="flex flex-col p-1 w-32 flex-none gap-1">
            <div className="flex-1 flex items-center justify-center text-base font-label-accent text-label-background font-bold bg-label-accent rounded-[3px]">
              <p className="px-2 py-1 text-2xl">{data.company}</p>
            </div>
            <div className="px-2 py-1 text-sm font-label bg-label-background rounded-[3px]">
              <p>{data.type}</p>
            </div>
            <div className="bg-label-background rounded-[3px] py-1.5 px-2 flex-none font-label-accent">
              <p className="font-semibold text-xs pb-0.5">Handmade In</p>
              <p className="text-xs leading-tight">{data.location}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-1 pl-0 gap-1">
            <div className="flex-1">
              <p className="text-4xl font-label font-bold text-label-accent grid place-items-center bg-label-background h-full w-full rounded-[3px]">
                {data.scent}
              </p>
            </div>
            <div className="flex flex-row flex-none gap-1 font-label-accent">
              <div className="flex-1 bg-label-background rounded-[3px] py-1.5 px-2">
                <p className="font-semibold text-xs pb-0.5">With Notes Of</p>
                <p className="text-xs leading-tight">{data.notesOf}</p>
              </div>
            </div>
          </div>
        </div>
      </LabelWrapper>
    );
  }

  return (
    <LabelWrapper size={size}>
      <div
        className="bg-label-accent overflow-hidden shadow-2xl border-label-accent flex flex-col"
        style={{ width: `${config.width}px`, height: `${config.height}px` }}
      >
        <div className="flex flex-row p-1 h-14 flex-none gap-1">
          <p className="flex-1 flex items-center justify-center text-2xl font-label-accent text-label-background font-bold bg-label-accent rounded-[3px] h-full">
            {data.company}
          </p>
          <p className="flex-1 flex items-center justify-center text-2xl font-label bg-label-background rounded-[3px] h-full">
            {data.type}
          </p>
        </div>
        <div className="flex-1 px-1">
          <p className="text-4xl font-label font-bold text-label-accent grid place-items-center bg-label-background h-full w-full rounded-[3px]">
            {data.scent}
          </p>
        </div>
        <div className="flex flex-row p-1 flex-none gap-1 font-label-accent">
          <div className="flex-1 bg-label-background rounded-[3px] h-full py-1.5 px-4">
            <p className="font-semibold">With Notes Of</p>
            <p className="text-base">{data.notesOf}</p>
          </div>
          <div className="bg-label-background rounded-[3px] h-full py-1.5 px-4">
            <p className="font-semibold">Handmade In</p>
            <p className="text-base">{data.location}</p>
          </div>
        </div>
      </div>
    </LabelWrapper>
  );
}
