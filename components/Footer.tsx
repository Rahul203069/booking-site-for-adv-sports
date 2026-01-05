import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Safety information</li>
              <li>Cancellation options</li>
              <li>Our COVID-19 Response</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Blog</li>
              <li>Disaster Relief</li>
              <li>Support refugees</li>
              <li>Combating discrimination</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Become a Host</li>
              <li>AirCover for Hosts</li>
              <li>Explore hosting resources</li>
              <li>Visit our community forum</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Wanderlust</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Newsroom</li>
              <li>Learn about new features</li>
              <li>Letter from our founders</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Wanderlust, Inc. · Privacy · Terms · Sitemap</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-medium">
             <span>English (US)</span>
             <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
