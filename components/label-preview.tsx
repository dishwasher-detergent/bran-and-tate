"use client";

import type { LabelFormData } from "@/lib/db/schemas";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";

type LabelSize = "2x4" | "1.25x3.75";

interface LabelPreviewProps {
  data: LabelFormData;
  size: LabelSize;
  responsive?: boolean;
}

export const LABEL_CONFIGS = {
  "2x4": {
    // 4" x 2" label at 150 DPI = 600px x 300px
    width: 600,
    height: 300,
    layout: "horizontal" as const,
    averyTemplate: 5163,
    name: '2" x 4"',
  },
  "1.25x3.75": {
    // 3.75" x 1.25" label at 150 DPI = 562.5px x 187.5px
    width: 563,
    height: 188,
    layout: "vertical" as const,
    averyTemplate: 94228,
    name: '1.25" x 3.75"',
  },
};

const LabelWrapper = ({
  size,
  children,
  responsive = false,
}: {
  size: LabelSize;
  children: React.ReactNode;
  responsive?: boolean;
}) => {
  const config = LABEL_CONFIGS[size];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (!responsive) return;

    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedScale = Math.min(1, containerWidth / config.width);
        setScale(calculatedScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [responsive, config.width]);

  return (
    <Card className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1 max-w-full">
      <Card className="p-0">
        {responsive ? (
          <div
            ref={containerRef}
            className="w-full overflow-hidden"
            style={{
              height: scale > 0 ? `${config.height * scale}px` : undefined,
            }}
          >
            <div
              className="origin-top-left"
              style={{
                width: `${config.width}px`,
                height: `${config.height}px`,
                scale: scale.toString(),
              }}
            >
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </Card>
      <CardContent className="p-0 flex flex-row justify-end gap-2 px-2">
        <p className="text-sm">
          <b>Avery Template:</b> {LABEL_CONFIGS[size].averyTemplate}
        </p>
        <p className="text-sm">
          <b>Size:</b> {LABEL_CONFIGS[size].name}
        </p>
      </CardContent>
    </Card>
  );
};

export function LabelPreview({
  data,
  size = "2x4",
  responsive = false,
}: LabelPreviewProps) {
  const config = LABEL_CONFIGS[size];

  if (config.layout === "vertical") {
    // Vertical layout for 1.25x3.75
    return (
      <LabelWrapper size={size} responsive={responsive}>
        <div
          className="bg-label-accent overflow-hidden flex"
          style={{ width: `${config.width}px`, height: `${config.height}px` }}
        >
          <div className="flex flex-col p-1 w-32 flex-none gap-1">
            <div className="flex-1 flex items-center justify-center text-base font-label-accent text-label-background font-bold bg-label-accent rounded-[3px]">
              <p className="px-2 py-1 text-2xl">{data.company}</p>
            </div>
            <div className="px-2 py-1 text-sm font-label bg-label-background text-label-accent rounded-[3px]">
              <p>{data.type}</p>
            </div>
            <div className="bg-label-background rounded-[3px] py-1.5 px-2 flex-none font-label-accent text-label-accent">
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
              <div className="flex-1 bg-label-background rounded-[3px] py-1.5 px-2 text-label-accent">
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
    <LabelWrapper size={size} responsive={responsive}>
      <div
        className="bg-label-accent overflow-hidden border-label-accent flex flex-col"
        style={{ width: `${config.width}px`, height: `${config.height}px` }}
      >
        <div className="flex flex-row p-1 h-14 flex-none gap-1">
          <p className="flex-1 flex items-center justify-center text-2xl font-label-accent text-label-background font-bold bg-label-accent rounded-[3px] h-full">
            {data.company}
          </p>
          <p className="flex-1 flex items-center justify-center text-2xl font-label bg-label-background rounded-[3px] h-full text-label-accent">
            {data.type}
          </p>
        </div>
        <div className="flex-1 px-1">
          <p className="text-4xl font-label font-bold text-label-accent grid place-items-center bg-label-background h-full w-full rounded-[3px]">
            {data.scent}
          </p>
        </div>
        <div className="flex flex-row p-1 flex-none gap-1 font-label-accent">
          <div className="flex-1 bg-label-background rounded-[3px] h-full py-1.5 px-4 text-label-accent">
            <p className="font-semibold">With Notes Of</p>
            <p className="text-base">{data.notesOf}</p>
          </div>
          <div className="bg-label-background rounded-[3px] h-full py-1.5 px-4 text-label-accent">
            <p className="font-semibold">Handmade In</p>
            <p className="text-base">{data.location}</p>
          </div>
        </div>
      </div>
    </LabelWrapper>
  );
}
