import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-maroon">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get in touch with us for all your appliance repair needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          
          {/* Email Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-maroon" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Email Us</h3>
            <p className="text-white/90 mb-4">
              Send us an email and we'll get back to you quickly
            </p>
            <a 
              href="mailto:tktechnician7887@gmail.com"
              className="text-yellow hover:text-yellow-dark transition-colors text-lg font-medium"
            >
              tktechnician7887@gmail.com
            </a>
          </div>
          
          {/* Phone Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-maroon" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Call Us</h3>
            <p className="text-white/90 mb-6">
              Give us a call for immediate assistance
            </p>

            <div className="space-y-3 text-lg font-medium">
              <div>
                <span className="text-white/90">Toll-Free:</span>{" "}
                <a
                  href="tel:18662821217"
                  className="text-yellow hover:text-yellow-dark transition-colors"
                >
                  866-282-1217
                </a>
              </div>

              <div>
                <span className="text-white/90">Direct Extension:</span>{" "}
                <a
                  href="tel:12895862726"
                  className="text-yellow hover:text-yellow-dark transition-colors"
                >
                  289-586-2726
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
