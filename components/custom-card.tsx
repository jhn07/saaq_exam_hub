import { cn } from "@/lib/utils";
import { ColorType } from "@/types";

const colorVariants = {
  purple: "bg-purple-100 hover:bg-purple-200",
  indigo: "bg-indigo-100 hover:bg-indigo-200",
  blue: "bg-blue-100 hover:bg-blue-200",
  green: "bg-green-100 hover:bg-green-200",
  yellow: "bg-yellow-100 hover:bg-yellow-200",
  red: "bg-red-100 hover:bg-red-200",
} as const

const textIconColorVariants = {
  purple: "text-purple-500 group-hover:text-purple-600",
  indigo: "text-indigo-500 group-hover:text-indigo-600",
  blue: "text-blue-500 group-hover:text-blue-600",
  green: "text-green-500 group-hover:text-green-600",
  yellow: "text-yellow-500 group-hover:text-yellow-600",
  red: "text-red-500 group-hover:text-red-600",
} as const

interface CustomCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: ColorType;
}

export const CustomCard = ({ icon: Icon, title, description, color }: CustomCardProps) => {
  return (
    <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-200",
        colorVariants[color]
      )}>
        {Icon && <Icon className={cn(
          "w-6 h-6 transition-colors duration-200",
          textIconColorVariants[color]
        )} />}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
        {description}
      </p>
    </div>
  )
}