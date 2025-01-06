import { ColorType } from "@/types";


interface CustomCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: ColorType;
}

export const CustomCard = ({ icon: Icon, title, description, color }: CustomCardProps) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center mb-4`}>
        {Icon && <Icon className={`w-6 h-6 text-${color}-500`} />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}