import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import LoadingSpinner from '../ui/LoadingSpinner';

const Layout = ({ isLoading = false, isPageLoading = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Breadcrumbs isLoading={isLoading} />
      
      {isPageLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <main className="flex-grow">
          <Outlet />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Layout;