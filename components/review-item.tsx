import { cn } from "@/lib/utils";
import { Review } from "@/types";
import { StarIcon } from "lucide-react";



export const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className={cn(
          "w-12 h-12 bg-gradient-to-r rounded-full flex items-center justify-center text-white text-xl font-bold",
          review.rating % 2 === 0 ? "from-purple-500 to-pink-500" : "from-blue-500 to-cyan-500"
        )}>
          {review.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="font-semibold">{review.name}</h3>
          <div className="flex gap-1.5 text-yellow-400">
            {Array.from({ length: review.rating }, (_, index) => (
              <StarIcon key={index} className="w-5 h-5 hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer" fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.review}</p>
    </div>
  )
}