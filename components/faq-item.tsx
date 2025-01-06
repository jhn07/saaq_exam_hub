'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


interface FAQItemProps {
  question: string;
  answer: string;
  id: number;
  isIcon: boolean;
}

export const FAQItem = ({ question, answer, id, isIcon }: FAQItemProps) => {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`} className="border-0">
          <AccordionTrigger className="flex gap-2 rounded-2xl bg-blue-50 px-8 py-6 text-left hover:no-underline hover:bg-blue-100 text-lg font-medium group">
            <div className="flex items-center justify-between w-full">
              {question}
              {isIcon && (
                <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                  🚗
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 bg-blue-500 text-white p-6 rounded-2xl max-w-[80%] ml-auto">
              {answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

