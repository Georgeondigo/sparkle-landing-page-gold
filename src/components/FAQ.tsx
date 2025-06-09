
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Where can I buy Tiffany Sparkles microfiber cloths?",
      answer: "Our products are available at select retail stores across major cities. Use our store locator map or contact us via WhatsApp to find the nearest retailer. We also offer direct ordering through our customer service."
    },
    {
      question: "Are the cloths machine washable?",
      answer: "Yes! Our microfiber cloths are completely machine washable. We recommend washing in warm water without fabric softener for best results. They can be tumble dried on low heat or air dried."
    },
    {
      question: "What makes Tiffany Sparkles cloths different from regular cloths?",
      answer: "Our premium microfiber is specially engineered with ultra-fine fibers that trap dirt and dust effectively without scratching surfaces. They're lint-free, highly absorbent, and designed to last longer than conventional cleaning cloths."
    },
    {
      question: "Can I use these cloths on electronic screens and delicate surfaces?",
      answer: "Absolutely! Our cloths are safe for use on smartphones, tablets, laptops, TVs, and other electronic screens. The soft microfiber won't scratch or damage delicate surfaces."
    },
    {
      question: "Do you offer bulk pricing for businesses?",
      answer: "Yes, we offer special pricing for bulk orders and business customers. Contact us directly via WhatsApp or email to discuss your requirements and get a custom quote."
    },
    {
      question: "What is your quality guarantee?",
      answer: "We stand behind our products with a satisfaction guarantee. If you're not completely satisfied with your purchase, contact us within 30 days and we'll make it right."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about our products.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-primary hover:text-secondary font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
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

export default FAQ;
