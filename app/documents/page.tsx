'use client'

import React from "react"

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function DocumentsPage() {
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUploadedDoc(file)
  }

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-300 dark:border-amber-700">
              <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold">📄 Document Verification</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Verify Certificates, IDs & Documents
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Detect forged documents, validate signatures, and verify authenticity with blockchain
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 p-12 text-center mb-12 hover:border-amber-500 transition-colors cursor-pointer group">
            <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-6xl">📑</div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Upload Document
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Upload ID, certificate, passport, or any official document (PDF, JPG, PNG)
            </p>
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.png,.jpeg"
              className="hidden"
              id="doc-input"
            />
            <label htmlFor="doc-input" className="block">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto">
                <Upload size={20} />
                Choose File
              </button>
            </label>
            {uploadedDoc && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-4">
                📁 {uploadedDoc.name} selected
              </p>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-8 border border-amber-200 dark:border-amber-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Verification Checks</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>OCR & Layout:</strong> Extract & analyze document structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Signature Valid:</strong> Verify handwritten & digital signatures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Seal & Stamp:</strong> Validate official seals & stamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Font Anomaly:</strong> Detect typography inconsistencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Issuer Verify:</strong> Check issuing authority authenticity</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 border border-orange-200 dark:border-orange-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Sample Report</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Document Type</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">University Certificate</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Authenticity</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Issuer Authority</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Valid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Signature Status</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Authentic</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Blockchain Hash</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">0x4f3e...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 mb-16">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Enterprise Solutions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <div className="text-3xl mb-3">🏫</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Education</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Universities verify degrees and certifications instantly</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <div className="text-3xl mb-3">🏢</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">HR Departments</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Prevent document fraud during hiring processes</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <div className="text-3xl mb-3">🏦</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Finance</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">KYC compliance and identity document verification</p>
              </div>
            </div>
          </div>

          {/* Blockchain Integration */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">🔗 Blockchain Certification</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Every verified document is timestamped on blockchain for immutable proof of verification. Institutions can issue verifiable credentials with cryptographic signatures.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Learn About Blockchain Integration
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
