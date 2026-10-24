import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingSection = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-900">Our Pricing</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits your needs. Simple pricing, clear value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Basic', price: '$199', period: 'Per year' },
            { title: 'Pro', price: '$399', period: 'Per year' },
            { title: 'Enterprise', price: '$699', period: 'Per year' },
          ].map((plan) => (
            <Card
              key={plan.title}
              className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200 flex flex-col"
            >
              <CardHeader className="text-center pb-4">
                <div className="inline-block px-4 py-1 border-2 border-primary rounded-full mb-4">
                  <h5 className="text-sm font-semibold text-gray-900">{plan.title}</h5>
                </div>
                <div className="space-y-1">
                  <span className="text-5xl font-bold text-gray-900 block">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2 flex-1 flex flex-col">
                <ul className="space-y-3 mb-6">
                  {[
                    'Carefully crafted components',
                    'Amazing page examples',
                    'Super friendly support team',
                    'Awesome Support',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <Link to="/contact">GET STARTED</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
