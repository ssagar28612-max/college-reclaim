"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, HelpCircle, Instagram, CheckCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import { Footer } from "@/components/footer";
import { CoffeeModal } from "@/components/coffee-modal";
import { toast } from "sonner";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Help Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            We're here to help! Reach out to us with any questions, concerns, or feedback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Send us a Message
            </h2>
            
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Buy Me a Coffee Card - Prominently displayed */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white cursor-pointer"
              onClick={() => setShowCoffeeModal(true)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Coffee className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl">Support Our Work</h3>
                    <p className="text-sm text-amber-100">Buy me a coffee ☕</p>
                  </div>
                </div>
              </div>
              <p className="text-white/90 text-sm sm:text-base mb-4">
                Enjoying College Reclaim? Support the development and help us keep the platform free for everyone!
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-amber-600 hover:bg-amber-50 font-semibold shadow-md"
                onClick={() => setShowCoffeeModal(true)}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Donate Now
              </Button>
            </motion.div>

            {/* Contact Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-violet-600 dark:text-violet-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:collegereclaimjc@gmail.com"
                      className="text-violet-600 dark:text-violet-400 hover:underline"
                    >
                      collegereclaimjc@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-pink-600 dark:text-pink-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Follow Us
                    </h3>
                    <a
                      href="https://instagram.com/college_reclaim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:underline"
                    >
                      @college_reclaim
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Stay updated with our latest news
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Quick FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">How do I report a lost item?</h4>
                  <p className="text-sm text-violet-100">
                    Navigate to "Report Lost Item" and fill out the form with details about your item.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How do I report a found item?</h4>
                  <p className="text-sm text-violet-100">
                    Go to "Report Found Item" and provide as much information as possible to help the owner identify it.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Need more help?</h4>
                  <p className="text-sm text-violet-100">
                    Check our <Link href="/privacy" className="underline">Privacy Policy</Link> or <Link href="/terms" className="underline">Terms of Service</Link> for more information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Coffee Modal */}
      <CoffeeModal isOpen={showCoffeeModal} onClose={() => setShowCoffeeModal(false)} />
      
      <Footer />
    </div>
  );
}
