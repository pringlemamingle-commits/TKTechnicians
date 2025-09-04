import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ServiceRequestData {
  name: string;
  phone: string;
  email: string;
  address: string;
  subject: string;
  applianceModel: string;
  applianceBrand: string;
  message: string;
  attachmentUrls?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ServiceRequestData = await req.json();
    console.log("Received service request:", requestData);

    const {
      name,
      phone,
      email,
      address,
      subject,
      applianceModel,
      applianceBrand,
      message,
      attachmentUrls = []
    } = requestData;

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #800020, #a0002a); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; text-align: center;">TK Technician - Service Request</h1>
        </div>
        
        <div style="border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #800020; margin-top: 0;">New Service Request from ${name}</h2>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #800020;">${phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #800020;">${email}</a></p>
            <p><strong>Address:</strong> ${address}</p>
          </div>
          
          <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #333; margin-top: 0;">Service Details</h3>
            <p><strong>Service Needed:</strong> ${subject}</p>
            ${applianceBrand ? `<p><strong>Appliance Brand:</strong> ${applianceBrand}</p>` : ''}
            ${applianceModel ? `<p><strong>Appliance Model:</strong> ${applianceModel}</p>` : ''}
          </div>
          
          ${message ? `
            <div style="background: #fff9e6; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3 style="color: #333; margin-top: 0;">Additional Details</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}
          
          ${attachmentUrls.length > 0 ? `
            <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3 style="color: #333; margin-top: 0;">Attachments</h3>
              <p>The customer has uploaded ${attachmentUrls.length} image(s) with this request.</p>
              ${attachmentUrls.map((url, index) => 
                `<p><a href="${url}" style="color: #800020;">View Attachment ${index + 1}</a></p>`
              ).join('')}
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold; color: #2d5a2d;">
              📞 Please contact the customer promptly to schedule the service visit.
            </p>
          </div>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "TK Technician Service Requests <onboarding@resend.dev>",
      to: ["tktechnician7887@gmail.com"],
      replyTo: email,
      subject: `Service Request: ${subject} - ${name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Service request sent successfully",
      emailId: emailResponse.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-service-request function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send service request", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);