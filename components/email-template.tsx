import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
  email,
}) => (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-2">
        Quebec Driving Test Practice
      </h1>
      <p className="text-gray-600">
        New Message from Contact Form
      </p>
    </div>

    {/* Contact Details */}
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Contact Details
      </h2>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Name:</span> {name}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Email:</span> {email}
      </p>
    </div>

    {/* Message */}
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Message
      </h2>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {message}
      </p>
    </div>

    {/* Footer */}
    <div className="mt-8 pt-6 text-center border-t border-gray-200">
      <p className="text-sm text-gray-500">
        This email was sent from the contact form at{' '}
        <a
          href="https://saaq-exam-hub.vercel.app"
          className="text-purple-600 hover:text-purple-700 no-underline"
        >
          Quebec Driving Test Practice
        </a>
      </p>
    </div>
  </div>
);
