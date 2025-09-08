import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, MapPin, MessageSquare, Tag, Package, Building, Upload } from "lucide-react";

const BookingForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Book Your Service</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you promptly with a free estimate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="bg-gradient-to-r from-maroon to-maroon-light text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Request Service</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* ✅ Netlify form setup */}
              <form
                name="booking"
                method="POST"
                // @ts-ignore: Netlify attribute
                data-netlify="true"
                encType="multipart/form-data"
                className="space-y-6"
              >
                {/* Required hidden input for Netlify */}
                <input type="hidden" name="form-name" value="booking" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-primary font-medium">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input id="name" name="name" required placeholder="Enter your full name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-primary font-medium">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-primary font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2 text-primary font-medium">
                    <MapPin className="w-4 h-4" />
                    Service Address *
                  </Label>
                  <Input id="address" name="address" required placeholder="123 Main St, City, State ZIP" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-2 text-primary font-medium">
                    <Tag className="w-4 h-4" />
                    Service Needed *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="e.g., Refrigerator not cooling, Washer leaking"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="applianceBrand" className="flex items-center gap-2 text-primary font-medium">
                      <Building className="w-4 h-4" />
                      Appliance Brand
                    </Label>
                    <Input id="applianceBrand" name="applianceBrand" placeholder="e.g., Whirlpool, Samsung" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applianceModel" className="flex items-center gap-2 text-primary font-medium">
                      <Package className="w-4 h-4" />
                      Appliance Model
                    </Label>
                    <Input id="applianceModel" name="applianceModel" placeholder="Model number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-primary font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Additional Details
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please describe the issue in detail."
                    className="min-h-32 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-primary font-medium">
                    <Upload className="w-4 h-4" />
                    Attach Images (Optional)
                  </Label>
                  <Input ref={fileInputRef} type="file" name="attachment" accept="image/*" multiple />
                  <p className="text-xs text-muted-foreground">
                    Upload photos of your appliance or the issue to help us better understand the problem.
                  </p>
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full text-lg py-6">
                  Send Service Request
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Required fields. We'll respond within 2 hours during business hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
