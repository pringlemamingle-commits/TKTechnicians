import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock } from "lucide-react";
import heroImage from "@/assets/hero-appliance-repair.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-maroon/50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional
            <span className="block text-yellow">Appliance Repair</span>
            Services
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Fast, reliable repair services for all your home appliances. 
            Expert technicians with years of experience getting your appliances back to perfect working condition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToBooking}
              className="text-lg px-8 py-6"
            >
              Book Service Now
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToContact}
              className="border-white text-white hover:bg-white hover:text-maroon bg-transparent text-lg px-8 py-6"
            >
              <Phone className="mr-2" />
              Call Now
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow flex-shrink-0" />
              <div>
                <div className="font-semibold">Fast Service</div>
                <div className="text-sm text-white/80">Available 7 days a week</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="text-yellow flex-shrink-0" />
              <div>
                <div className="font-semibold">Free Estimates</div>
                <div className="text-sm text-white/80">No hidden fees</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="text-yellow flex-shrink-0" />
              <div>
                <div className="font-semibold">Licensed & Insured</div>
                <div className="text-sm text-white/80">Professional service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;