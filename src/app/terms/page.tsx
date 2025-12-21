"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, UserX, Shield, Gavel, Mail } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
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
              <FileText className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Welcome to College Reclaim. By accessing or using our platform, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from 
              using or accessing this site.
            </p>
          </section>

          {/* Use License */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Use License
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Permission is granted to temporarily use College Reclaim for personal, non-commercial purposes. This license includes:
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">You May:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account and use our services</li>
                  <li>Report lost and found items</li>
                  <li>Search for items and communicate with other users</li>
                  <li>Use the books marketplace and events features</li>
                  <li>Share content in accordance with our guidelines</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">You May Not:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                  <li>Use automated systems to access the platform</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              User Accounts
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your contact information is up to date</li>
                <li>Keeping your password secure and not sharing it with others</li>
              </ul>

              <p className="leading-relaxed">
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </div>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              User-Generated Content
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                By posting content on College Reclaim (including item descriptions, photos, reviews, or comments), you grant us:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content</li>
                <li>The right to moderate, edit, or remove content that violates our policies</li>
                <li>The ability to use aggregated, anonymized data for analytics and improvements</li>
              </ul>

              <p className="leading-relaxed mt-4">
                You represent and warrant that:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You own or have the necessary rights to post the content</li>
                <li>Your content does not violate any third-party rights</li>
                <li>Your content is accurate and not misleading</li>
                <li>Your content does not contain harmful, offensive, or illegal material</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Prohibited Activities
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              You agree not to engage in any of the following activities:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>Posting false, misleading, or fraudulent information</li>
              <li>Impersonating another person or entity</li>
              <li>Harassing, threatening, or abusing other users</li>
              <li>Attempting to gain unauthorized access to accounts or systems</li>
              <li>Distributing viruses, malware, or harmful code</li>
              <li>Scraping or harvesting user data without permission</li>
              <li>Using the platform for illegal activities</li>
              <li>Spamming or sending unsolicited communications</li>
              <li>Attempting to manipulate or game the system</li>
              <li>Interfering with the proper functioning of the platform</li>
            </ul>
          </section>

          {/* Lost and Found Guidelines */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Lost and Found Item Guidelines
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  For Lost Items
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and detailed descriptions</li>
                  <li>Include identifying features or characteristics</li>
                  <li>Specify the approximate location and time of loss</li>
                  <li>Update your listing if the item is found</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  For Found Items
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Do not post sensitive information visible on the item (e.g., ID numbers)</li>
                  <li>Store items safely and securely</li>
                  <li>Verify ownership before returning items</li>
                  <li>Report the item to campus security if valuable</li>
                  <li>Remove listings once items are returned to their owners</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> College Reclaim is a platform to facilitate connections. We are not responsible 
                  for the actual return of items or disputes between users. Always meet in public, safe locations when 
                  exchanging items.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Gavel className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Disclaimer
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                The materials on College Reclaim are provided on an 'as is' basis. We make no warranties, expressed or implied, 
                and hereby disclaim all other warranties including, without limitation:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                <li>That the service will be uninterrupted, timely, secure, or error-free</li>
                <li>That the results obtained from using the service will be accurate or reliable</li>
                <li>The accuracy or completeness of user-generated content</li>
                <li>That any defects will be corrected</li>
              </ul>

              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  College Reclaim does not guarantee the recovery of lost items or verify the authenticity of listings. 
                  Users are solely responsible for their interactions with other users.
                </p>
              </div>
            </div>
          </section>

          {/* Limitations of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Limitations of Liability
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In no event shall College Reclaim or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
              use the materials on College Reclaim, even if we have been notified orally or in writing of the possibility 
              of such damage.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Indemnification
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You agree to indemnify, defend, and hold harmless College Reclaim, its officers, directors, employees, and 
              agents from any claims, liabilities, damages, losses, and expenses arising from:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 mt-4">
              <li>Your use of the platform</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any rights of another party</li>
              <li>Your user-generated content</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <UserX className="text-violet-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Termination
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, 
                for any reason, including but not limited to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Breach of these Terms of Service</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Request by law enforcement or government agencies</li>
                <li>Extended periods of inactivity</li>
                <li>Technical or security issues</li>
              </ul>

              <p className="leading-relaxed">
                Upon termination, your right to use the service will immediately cease. All provisions of these Terms which by 
                their nature should survive termination shall survive.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Governing Law
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict 
              of law provisions. Any disputes arising from these terms shall be resolved in the courts of competent jurisdiction.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Changes to Terms
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice 
              of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued 
              use of the platform after any changes constitutes acceptance of the new Terms.
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
              If you have any questions about these Terms of Service, please contact us:
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

          {/* Acknowledgment */}
          <section className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Acknowledgment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By using College Reclaim, you acknowledge that you have read these Terms of Service and agree to be bound by them. 
              These Terms constitute the entire agreement between you and College Reclaim regarding your use of the service.
            </p>
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
