// Navbar.jsx
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = () => {
    if (!user) {
      // If user is not authenticated, redirect to sign-in page
      router.push('/sign-in');
    }
  };

  const userSession = sessionStorage.getItem('user');

  if (!user && !userSession) {
    router.push('/sign-in');
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/sign-in');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-dark p-4 rounded-md shadow-lg flex items-center justify-between relative z-10">
        <div className="flex items-center text-white">
          {/* Hamburger menu icon */}
          <MenuIcon className="w-6 h-6 cursor-pointer mr-3" onClick={toggleSidebar} />
          {/* Flow-21 link */}
          <Link href="/" className="flex items-center">
            <svg className="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#FF6F61"></path>
                <path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#FFD700"></path>
                <path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#FF1493"></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="51" height="70" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span className="text-lg font-semibold whitespace-nowrap">Flow-21</span>
          </Link>
        </div>
        <div className="relative ml-3">
          {/* Search Input */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            id="email-adress-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 p-2"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <Link href="#" className="text-white hover:text-gray-300">
            Pricing
          </Link>
          <Link href="#" className="text-white hover:text-gray-300">
            About
          </Link>
          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white hover:text-gray-300 focus:outline-none">
              <AccountCircleIcon className="w-6 h-6" />
            </button>
            {showDropdown && (
              <div className="absolute top-8 right-0 bg-white border border-gray-200 py-2 px-4 rounded-md shadow-md">
                <p className="text-gray-700">{user?.email}</p>
                <Link href="#" className="block text-gray-700 hover:text-blue-700">
                  Account Settings
                </Link>
                <button onClick={handleLogout} className="block text-gray-700 hover:text-blue-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Navbar;
