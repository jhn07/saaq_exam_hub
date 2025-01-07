"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-[200px]" disabled={pending}>
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
    </Button>
  )
}