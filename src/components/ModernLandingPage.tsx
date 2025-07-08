import React from 'react';

const ModernLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Modern Landing Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
          <div className="flex space-x-2 mb-4">
            {['JD', 'SM', 'RT', 'AL'].map((initials, i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-semibold border-2 border-white">
                {initials}
              </div>
            ))}
          </div>
          
          <div className="contact-info">
            <div className="text-lg font-medium">
              +971 55 799 4258
            </div>
            <span className="text-sm text-gray-600">500+ UK investors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLandingPage;