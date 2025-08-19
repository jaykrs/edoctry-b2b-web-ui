'use client';
import React, { useState } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';

function PreviewAndPublish({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selectedHeader, setSelectedHeader] = useState('');
    const [selectedFooter, setSelectedFooter] = useState('');

    const headers = ['Header 1', 'Header 2', 'Header 3'];
    const footers = ['Footer A', 'Footer B', 'Footer C'];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
                <TextHeading title="🚀 Preview & Publish" />
            </div>

            {/* Dropdowns */}
            <div className="p-6 space-y-4 bg-white shadow mt-6 rounded-xl border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Header</label>
                        <select
                            value={selectedHeader}
                            onChange={(e) => setSelectedHeader(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Choose a header --</option>
                            {headers.map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Footer</label>
                        <select
                            value={selectedFooter}
                            onChange={(e) => setSelectedFooter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">-- Choose a footer --</option>
                            {footers.map((footer) => (
                                <option key={footer} value={footer}>
                                    {footer}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Preview</h3>
                    <p className="text-gray-600">I am working on the preview.</p>
                </div>
            </div>


                {/* Preview Box */}
                <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">You're ready to go!</h2>
                    <p className="text-gray-600">Click the button below to publish your page or go back to make changes.</p>

                    <div className="flex justify-center gap-4 pt-4">
                        <button
                            onClick={onBack}
                            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={onNext}
                            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow"
                        >
                            Publish 🚀
                        </button>
                    </div>
                </div>
            </div>
            );
}

            export default PreviewAndPublish;
