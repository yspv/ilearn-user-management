import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <LoaderCircle className="animate-spin size-10" />
    </div>
  );
}
