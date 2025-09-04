import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Expert Technicians",
      description: "Certified professionals with years of experience"
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind"
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Fast response times and flexible scheduling"
    },
    {
      icon: Award,
      title: "Satisfaction Guarantee",
      description: "100% satisfaction guarantee on all repairs"
    }
  ];

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-maroon/5 to-yellow/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">
              Why Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 15 years of experience in appliance repair, we've built our reputation 
              on quality workmanship, honest pricing, and exceptional customer service. 
              We understand how important your appliances are to your daily life, and we're 
              committed to getting them back to perfect working condition quickly and efficiently.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon className="w-6 h-6 text-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="cta" 
              size="lg"
              onClick={scrollToBooking}
              className="text-lg px-8 py-6"
            >
              Get Free Estimate
            </Button>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)]">
            <h3 className="text-2xl font-bold text-primary mb-6">What Our Customers Say</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-yellow pl-6">
                <p className="text-muted-foreground italic mb-3">
                  "Excellent service! My refrigerator was fixed the same day I called. 
                  The technician was professional, knowledgeable, and the price was fair."
                </p>
                <div className="font-semibold text-primary">- Sarah M.</div>
              </div>
              
              <div className="border-l-4 border-yellow pl-6">
                <p className="text-muted-foreground italic mb-3">
                  "I've used their services twice now for my washer and dryer. 
                  Both times they were prompt, efficient, and got the job done right."
                </p>
                <div className="font-semibold text-primary">- Mike R.</div>
              </div>
              
              <div className="border-l-4 border-yellow pl-6">
                <p className="text-muted-foreground italic mb-3">
                  "Professional, reliable, and reasonably priced. 
                  I highly recommend them for any appliance repair needs."
                </p>
                <div className="font-semibold text-primary">- Jennifer L.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;