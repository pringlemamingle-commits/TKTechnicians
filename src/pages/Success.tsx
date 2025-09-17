import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Success = () => {
  return (
    <section className="py-20 bg-muted/30 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="bg-gradient-to-r from-maroon to-maroon-light text-white rounded-t-lg text-center">
              <CardTitle className="text-2xl">Thank You!</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Your service request has been submitted successfully.  
                We’ll contact you shortly.
              </p>
              <Button asChild variant="cta" size="lg">
                <a href="/">← Back to Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Success;
