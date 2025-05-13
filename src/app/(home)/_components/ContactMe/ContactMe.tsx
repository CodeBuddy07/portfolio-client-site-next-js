/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Title from "@/components/Shared/Title";
import { Mail, Phone, MessageSquare, Send, User, AtSign } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCreateEmail } from "@/Tanstack/Emails/useCreateEmail";




// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  

  const data = {
    email: "ruhulamin.dev07@gmail.com",
    phone: "+8801737073172",
    whatsApp: "+8801705684699",
  };

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  interface FormValues {
    name: string;
    email: string;
    message: string;
  }

  const { mutate: createEmail, isPending: isSubmitting } = useCreateEmail();

  const onSubmit = async (values: FormValues): Promise<void> => {

    createEmail(values, {
      onSuccess: () => {
        toast.success("Message sent successfully!");
        form.reset();
      },
      onError: (error) => {
        toast.error((error as any).response.data.error || "Failed to send message. Please try again.");
      },
    });
  };

  return (
    <div
      id="contact"
      className="bg-[url('/5.jpg')] bg-cover bg-center bg-no-repeat w-full py-20 lg:px-32 xl:px-80 px-5"
    >
      <Title title="CONTACT" />

      <div className="container mx-auto mt-12 flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-gray-800 flex-1">
          <h3 className="text-red-500 text-xl font-medium mb-5">Send Message</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Input */}
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative ">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Your Name"
                            className="pl-9 bg-gray-800/50 border-gray-700 focus-visible:ring-red-500 text-gray-200"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Your Email"
                            className="pl-9 bg-gray-800/50 border-gray-700 focus-visible:ring-red-500 text-gray-200"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message Textarea */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Textarea
                          placeholder="Your Message"
                          rows={4}
                          className="pl-9 bg-gray-800/50 border-gray-700 focus-visible:ring-red-500 text-gray-200 resize-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-medium text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Info Card */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-gray-800 md:w-80">
          <h3 className="text-red-500 text-xl font-medium mb-5">Get In Touch</h3>

          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-full">
                <Mail className="text-red-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="text-white text-sm">{data.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-full">
                <Phone className="text-red-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="text-white text-sm">{data.phone}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-full">
                <MessageSquare className="text-red-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">WhatsApp</p>
                <p className="text-white text-sm">{data.whatsApp}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-300 text-xs italic">
              Looking forward to hearing from you soon!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mt-10 flex justify-center">
        <div className="w-16 h-1 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Contact;