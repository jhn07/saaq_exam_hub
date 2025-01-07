import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DownloadIcon } from "lucide-react"

export const DownloadButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="default"
      className={cn(
        "font-medium rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 group",
        className
      )}
    >
      Download App
      <DownloadIcon className="w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:translate-y-1" />
    </Button>
  )
}