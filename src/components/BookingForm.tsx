import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, User, MapPin, MessageSquare, Tag, Package, Building, Upload, X } from "lucide-react";

const BookingForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    subject: "",
    applianceModel: "",
    applianceBrand: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('service-attachments')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('service-attachments')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let attachmentUrls: string[] = [];

      // Upload files if any
      if (uploadedFiles.length > 0) {
        try {
          attachmentUrls = await uploadFiles(uploadedFiles);
          console.log('Files uploaded successfully:', attachmentUrls);
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          toast({
            title: "File Upload Error",
            description: "Failed to upload some files. Sending request without attachments.",
            variant: "destructive",
          });
        }
      }

      // Send email via edge function
      const response = await supabase.functions.invoke('send-service-request', {
        body: {
          ...formData,
          attachmentUrls
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Service Request Sent!",
        description: "Your service request has been sent successfully. We'll contact you within 2 hours during business hours.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        subject: "",
        applianceModel: "",
        applianceBrand: "",
        message: ""
      });
      setUploadedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error('Service request error:', error);
      toast({
        title: "Error",
        description: "Failed to send service request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-primary font-medium">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="border-2 focus:border-yellow"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-primary font-medium">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                      className="border-2 focus:border-yellow"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-primary font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="border-2 focus:border-yellow"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2 text-primary font-medium">
                    <MapPin className="w-4 h-4" />
                    Service Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Main St, City, State ZIP"
                    className="border-2 focus:border-yellow"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-2 text-primary font-medium">
                    <Tag className="w-4 h-4" />
                    Service Needed *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Refrigerator not cooling, Washer leaking"
                    className="border-2 focus:border-yellow"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="applianceBrand" className="flex items-center gap-2 text-primary font-medium">
                      <Building className="w-4 h-4" />
                      Appliance Brand
                    </Label>
                    <Input
                      id="applianceBrand"
                      name="applianceBrand"
                      value={formData.applianceBrand}
                      onChange={handleInputChange}
                      placeholder="e.g., Maytag, Whirlpool, Samsung"
                      className="border-2 focus:border-yellow"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="applianceModel" className="flex items-center gap-2 text-primary font-medium">
                      <Package className="w-4 h-4" />
                      Appliance Model
                    </Label>
                    <Input
                      id="applianceModel"
                      name="applianceModel"
                      value={formData.applianceModel}
                      onChange={handleInputChange}
                      placeholder="e.g., Model number or specific model"
                      className="border-2 focus:border-yellow"
                    />
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
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe the issue in detail, including any error messages, when the problem started, and any other relevant information."
                    className="min-h-32 border-2 focus:border-yellow resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-primary font-medium">
                    <Upload className="w-4 h-4" />
                    Attach Images (Optional)
                  </Label>
                  <div className="space-y-3">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="border-2 focus:border-yellow"
                    />
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Selected images ({uploadedFiles.length}):
                        </p>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/20 p-2 rounded">
                              <span className="text-sm truncate flex-1">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-destructive hover:text-destructive/80 h-6 w-6 p-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Upload photos of your appliance or the issue to help us better understand the problem.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  disabled={isLoading}
                  className="w-full text-lg py-6"
                >
                  {isLoading ? "Processing..." : "Send Service Request"}
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