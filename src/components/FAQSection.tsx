import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the EB1A visa and who qualifies?',
    answer: 'The EB1A visa is for individuals with extraordinary ability in sciences, arts, education, business, or athletics. You must demonstrate sustained national or international acclaim and meet at least 3 out of 10 USCIS criteria. No job offer or employer sponsorship is required.',
  },
  {
    question: 'How long does the EB1A process typically take?',
    answer: 'The EB1A processing time varies, but typically takes 6-12 months for premium processing or 12-18 months for regular processing. With our strategic approach and comprehensive documentation, many of our clients experience faster approval times.',
  },
  {
    question: 'Can I include my family in my EB1A application?',
    answer: 'Yes! Your spouse and unmarried children under 21 can be included as derivative beneficiaries. They will receive green cards along with you and can live, work, and study in the United States.',
  },
  {
    question: 'What makes theEb1 different from other immigration services?',
    answer: 'We combine expert immigration knowledge with tech industry expertise, AI-powered tools, and personalized strategies. Our comprehensive approach helps applicants meet 6-7 USCIS criteria (far exceeding the minimum of 3), leading to stronger cases and higher approval rates.',
  },
  {
    question: 'Do you provide legal representation before USCIS?',
    answer: 'We are not a law firm and do not provide legal representation. However, we offer expert consultation, case strategy, documentation support, and can connect you with top US-licensed attorneys at discounted rates (up to $3,500 off) through our VIP plans.',
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 hover:border-primary transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
