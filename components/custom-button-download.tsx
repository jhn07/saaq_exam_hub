import { Button } from "@/components/ui/button";

interface CustomButtonDownloadProps {
  text?: string;
  icon: React.ReactNode;
}

export const CustomButtonDownload = ({ text = "Download App", icon }: CustomButtonDownloadProps) => {
  return (
    <Button variant="outline" className="w-64 h-14 text-lg font-medium rounded-full hover:bg-purple-500 hover:text-white transition-all duration-500 ease-in-out group">
      {text}
      {icon}
    </Button>
  )
}