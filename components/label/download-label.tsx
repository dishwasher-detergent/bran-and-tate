"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LabelFormData } from "@/lib/db/schemas";
import { IconDownload, IconLoader2 } from "@tabler/icons-react";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { LabelPreview } from "../label-preview";

type LabelSize = "2x4" | "1.25x3.75";

interface DownloadLabelProps {
  data: LabelFormData;
}

const LABEL_CONFIGS = {
  "2x4": {
    width: 600,
    height: 300,
    name: '2" x 4" Label',
  },
  "1.25x3.75": {
    width: 563,
    height: 188,
    name: '1.25" x 3.75" Label',
  },
};

export function DownloadLabel({ data }: DownloadLabelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  const downloadLabel = async (size: LabelSize) => {
    if (!hiddenContainerRef.current) {
      toast.error("Failed to generate label");
      return;
    }

    setIsGenerating(true);
    try {
      // Create a temporary container with the label
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      document.body.appendChild(container);

      // Import React and ReactDOM for rendering
      const React = (await import("react")).default;
      const ReactDOM = (await import("react-dom/client")).default;

      // Create a root and render the label
      const root = ReactDOM.createRoot(container);
      await new Promise<void>((resolve) => {
        root.render(
          React.createElement(
            "div",
            {
              style: {
                display: "inline-block",
                background: "transparent",
              },
            },
            React.createElement(LabelPreview, {
              data,
              size,
              responsive: false,
            })
          )
        );
        // Wait for render to complete
        setTimeout(resolve, 500);
      });

      // Find the innermost label element (with bg-label-accent class)
      const labelElement = container.querySelector(
        ".bg-label-accent"
      ) as HTMLElement;

      if (!labelElement) {
        throw new Error("Label element not found");
      }

      // Generate PNG from the label element
      const dataUrl = await toPng(labelElement, {
        quality: 1,
        pixelRatio: 2, // Higher quality
        backgroundColor: "transparent",
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `${data.scent || "untitled"}-${size}.png`;
      link.href = dataUrl;
      link.click();

      // Cleanup
      root.unmount();
      document.body.removeChild(container);

      toast.success("Label downloaded successfully!");
    } catch (error) {
      console.error("Error generating label:", error);
      toast.error("Failed to generate label");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div ref={hiddenContainerRef} className="hidden" />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button disabled={isGenerating}>
              {isGenerating ? (
                <IconLoader2 className="size-4" />
              ) : (
                <IconDownload className="size-4" />
              )}
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Label Size</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => downloadLabel("2x4")}>
              {LABEL_CONFIGS["2x4"].name}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadLabel("1.25x3.75")}>
              {LABEL_CONFIGS["1.25x3.75"].name}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
