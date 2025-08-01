import { CircleAlert, CircleCheckIcon } from "lucide-react";
import { toast } from "sonner";

export default function useToast() {
  function onSuccess(message: string) {
    toast(message, {
      icon: <CircleCheckIcon className="fill-green-500 text-white size-5" />,
      position: "top-center",
    });
  }
  function onError(message: string = "Something went wrong.") {
    toast(message, {
      icon: <CircleAlert className="fill-red-500 text-white size-5" />,
      position: "top-center",
    });
  }

  return { onError, onSuccess };
}
