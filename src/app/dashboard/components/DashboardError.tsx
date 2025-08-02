"use client";
import { Button } from "@/components/ui/button";
import { CloudAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardError() {
  const { refresh } = useRouter();
  return (
    <div className="h-[calc(100vh-6rem)] bg-background overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col gap-5 justify-center items-center">
          <CloudAlert className="size-20" />
          <div className="text-center">
            <h1 className="text-2xl font-medium">Something went wrong.</h1>
            <p className="text-muted-foreground">
              If you see that again connect with support
            </p>
          </div>
          <Button onClick={refresh}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
