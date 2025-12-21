"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Cookie, UserCheck, Mail, AlertCircle } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Shield className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 21, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Welcome to College Reclaim. We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Database className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Information We Collect
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>College/University information</li>
                  <li>Department and year of study</li>
                  <li>Contact information (phone number, if provided)</li>
                  <li>Profile information you choose to provide</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Lost and Found Item Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Item descriptions and categories</li>
                  <li>Location information</li>
                  <li>Date and time of loss/finding</li>
                  <li>Photos and images of items</li>
                  <li>Contact preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Usage Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address</li>
                  <li>Pages visited and features used</li>
                  <li>Time and date of visits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                How We Use Your Information
              </h2>
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>To provide and maintain our service</li>
              <li>To facilitate lost and found item matching</li>
              <li>To send notifications about potential matches</li>
              <li>To communicate with you about your account</li>
              <li>To improve our platform and user experience</li>
              <li>To process your requests and inquiries</li>
              <li>To send administrative information and updates</li>
              <li>To monitor and analyze usage patterns</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Information Sharing
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>With Other Users:</strong> Item descriptions and contact information (as you specify) are visible to help match lost and found items</li>
              <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (email services, hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Data Security
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to 
              use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Cookies and Tracking Technologies
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            </p>
            
            <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Types of cookies we use:</strong> Session cookies (temporary), Persistent cookies (remain after closing browser), 
                Authentication cookies, Analytics cookies
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Your Privacy Rights
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              You have the right to:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <div className="mt-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:collegereclaimjc@gmail.com" className="text-violet-600 dark:text-violet-400 hover:underline">
                  collegereclaimjc@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Data Retention
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required by law. Lost and found item listings may be automatically archived or deleted 
              after a certain period of inactivity.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Children's Privacy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our service is intended for college and university students. We do not knowingly collect personal information from 
              children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Third-Party Links
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites. 
              We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Changes to This Privacy Policy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
              on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-6">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Contact Us
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg p-6 text-white">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:collegereclaimjc@gmail.com" className="underline hover:text-violet-200">
                  collegereclaimjc@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Instagram:</strong>{" "}
                <a href="https://instagram.com/college_reclaim" target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-200">
                  @college_reclaim
                </a>
              </p>
              <p className="mt-4">
                <Link href="/support" className="underline hover:text-violet-200">
                  Visit our Help Center
                </Link>
              </p>
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
