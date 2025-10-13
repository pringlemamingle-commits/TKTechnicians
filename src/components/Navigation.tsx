import { Button } from "@/components/ui/button";

const Navigation = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
           <img
              src="/tktechnicianlogo.png"
              alt="TK Technician Logo"
              className="w-8 h-8 object-contain"
           />
           <span>TK Technician</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={scrollToServices}
              className="text-primary hover:text-primary/80"
            >
              Services
            </Button>
            <Button 
              variant="ghost" 
              onClick={scrollToContact}
              className="text-primary hover:text-primary/80"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={scrollToBooking}
              className="text-primary hover:text-primary/80"
            >
              Appointments
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;