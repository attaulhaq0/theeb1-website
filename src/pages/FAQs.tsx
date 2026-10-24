import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'EB1A General',
    questions: [
      {
        q: 'What is the EB1A visa?',
        a: 'The EB-1A is a first-preference employment-based immigrant visa for individuals with extraordinary ability in sciences, arts, education, business, or athletics. It allows you to self-petition for a Green Card without employer sponsorship.'
      },
      {
        q: 'Do I need a job offer for EB1A?',
        a: 'No, the EB1A does not require a job offer or employer sponsorship. You can self-petition and demonstrate that you will continue to work in your area of extraordinary ability.'
      },
      {
        q: 'How long does the EB1A process take?',
        a: 'Processing times vary but typically range from 6-12 months for regular processing. Premium processing (15 calendar days) is available for an additional fee of $2,500.'
      },
      {
        q: 'What are the 10 USCIS criteria for EB1A?',
        a: 'The criteria include: major awards, membership in exclusive associations, published material about you, judging others\' work, original contributions, scholarly articles, exhibitions/showcases, leading roles, high salary, and commercial successes in performing arts.'
      }
    ]
  },
  {
    category: 'Eligibility',
    questions: [
      {
        q: 'How many criteria do I need to meet?',
        a: 'You must meet at least 3 of the 10 USCIS criteria. However, we recommend building a case that addresses 6-7 criteria for a stronger petition and higher approval chances.'
      },
      {
        q: 'Can I qualify without a PhD or publications?',
        a: 'Yes! Many tech professionals qualify based on their professional achievements, open-source contributions, leadership roles, high compensation, and industry recognition without traditional academic credentials.'
      },
      {
        q: 'Do I need patents or citations?',
        a: 'No, patents and citations are not mandatory. Many successful EB1A petitions are based on professional experience, contributions to projects, leadership roles, and industry recognition.'
      },
      {
        q: 'Can software engineers qualify for EB1A?',
        a: 'Absolutely! Software engineers can qualify through open-source contributions, technical leadership, conference presentations, technical blogs, judging roles, and high compensation.'
      }
    ]
  },
  {
    category: 'Process & Timeline',
    questions: [
      {
        q: 'What is premium processing?',
        a: 'Premium processing guarantees a response from USCIS within 15 calendar days for an additional fee of $2,500. It\'s available for EB1A petitions and can significantly expedite the process.'
      },
      {
        q: 'What happens after I file my EB1A petition?',
        a: 'After filing, USCIS will review your petition. You may receive a Request for Evidence (RFE) if they need additional information, or you\'ll receive an approval notice. Once approved, you can apply for adjustment of status or consular processing.'
      },
      {
        q: 'Can I travel while my EB1A is pending?',
        a: 'Yes, if you\'re on a valid visa status. If you\'ve filed for adjustment of status, you should obtain Advance Parole before traveling internationally.'
      },
      {
        q: 'What is the success rate for EB1A?',
        a: 'Our success rate is 80-85% for EB1A petitions. National approval rates vary, which is why working with experienced immigration professionals is crucial for maximizing your chances.'
      }
    ]
  },
  {
    category: 'O1A Visa',
    questions: [
      {
        q: 'What is the difference between O1A and EB1A?',
        a: 'O1A is a temporary work visa requiring employer sponsorship, while EB1A is a permanent residency (Green Card) self-petition. O1A has faster processing but requires renewal, whereas EB1A leads to permanent residency.'
      },
      {
        q: 'Can I apply for both O1A and EB1A?',
        a: 'Yes, many professionals start with O1A for faster entry to the US while simultaneously preparing their EB1A petition for permanent residency.'
      },
      {
        q: 'How long is the O1A visa valid?',
        a: 'O1A visas are initially granted for up to 3 years and can be extended in 1-year increments with no maximum limit.'
      }
    ]
  },
  {
    category: 'EB2-NIW',
    questions: [
      {
        q: 'What is EB2-NIW?',
        a: 'EB2-NIW is a second-preference employment-based visa that waives the job offer requirement if your work is in the national interest of the United States.'
      },
      {
        q: 'Should I apply for EB1A or EB2-NIW?',
        a: 'EB1A is first-preference with potentially faster processing but higher burden of proof. EB2-NIW is second-preference with more flexible requirements. We can help you determine which is better for your profile.'
      },
      {
        q: 'Can I apply for both EB1A and EB2-NIW?',
        a: 'Yes, you can file concurrent petitions to maximize your chances of approval, though this involves additional costs.'
      }
    ]
  },
  {
    category: 'Costs & Services',
    questions: [
      {
        q: 'How much does EB1A cost?',
        a: 'USCIS filing fees are $700 for Form I-140. Premium processing is an additional $2,500. Professional services fees vary based on the complexity of your case. Contact us for a personalized quote.'
      },
      {
        q: 'What services do you provide?',
        a: 'We provide comprehensive EB1A services including profile evaluation, strategy development, evidence compilation, petition preparation, document review, and RFE responses.'
      },
      {
        q: 'Do you offer consultations?',
        a: 'Yes, we offer initial consultations to evaluate your profile and discuss your immigration options. Contact us to schedule a consultation.'
      },
      {
        q: 'What is Turing AI?',
        a: 'Turing AI is our proprietary AI-powered platform that analyzes your profile against USCIS criteria, identifies strengths and gaps, and provides tailored recommendations to optimize your EB1A petition.'
      }
    ]
  }
];

export default function FAQs() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl">
              Everything you need to know about EB1A, O1A, and EB2-NIW visas
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-3xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`} className="border rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of experts is here to help. Schedule a consultation to discuss your specific situation.
            </p>
            <Button asChild size="lg" className="primary-gradient text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
