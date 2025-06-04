import { BatteryCharging } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BatteryCharging className="h-8 w-8 text-green-400" />
            <span className="ml-2 text-xl font-bold">EV Charge</span>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a></li>
              </ul>
            </div>

            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} EV Charge Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
