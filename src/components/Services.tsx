import { Card, CardContent } from "@/components/ui/card";
import { Refrigerator, WashingMachine, Microwave, Utensils, AirVent, Lightbulb, Zap, Wrench, Hammer } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Refrigerator,
      title: "Refrigerator Repair",
      description: "Complete refrigerator and freezer repair services including cooling issues, ice maker problems, and more."
    },
    {
      icon: WashingMachine,
      title: "Washer & Dryer",
      description: "Expert washing machine and dryer repair for all brands. We fix leaks, heating issues, and drum problems."
    },
    {
      icon: Utensils,
      title: "Dishwasher Repair",
      description: "Professional dishwasher repair services including drainage issues, cleaning problems, and door malfunctions."
    },
    {
      icon: Microwave,
      title: "Microwave Service",
      description: "Microwave and oven repair services. We handle heating issues, turntable problems, and control panel fixes."
    },
    {
      icon: AirVent,
      title: "HVAC Systems",
      description: "Air conditioning and heating system repairs to keep your home comfortable year-round."
    },
    {
      icon: Lightbulb,
      title: "Small Appliances",
      description: "Repair services for small kitchen appliances, coffee makers, blenders, and other household items."
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Professional electrical services including outlet repairs, lighting fixes, and electrical troubleshooting."
    },
    {
      icon: Wrench,
      title: "Plumbing",
      description: "Plumbing services for leaks, clogs, faucet repairs, and water line installations."
    },
    {
      icon: Hammer,
      title: "Handyman Work",
      description: "General home repairs, installations, maintenance work, and small renovation projects."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We repair all major home appliances with fast, professional service you can trust.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <service.icon className="w-12 h-12 text-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;