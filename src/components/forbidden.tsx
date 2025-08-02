"use client";
import { BanIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const { refresh } = useRouter();
  return (
    <div className="h-screen bg-background">
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col justify-center items-center gap-6">
          <BanIcon className="size-20" />
          <div className="text-center">
            <p className="text-lg font-medium">Oops! You Don’t Have Access</p>
            <p className="text-muted-foreground">
              If you think that is mistake contact with support
            </p>
          </div>
          <Button onClick={refresh}>Reload</Button>
        </div>
      </div>
    </div>
  );
}
