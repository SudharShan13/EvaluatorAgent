// Sidebar.jsx
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose}>
      <div className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white overflow-y-auto transform translate-x-0 transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-orange-500 focus:outline-none">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500 block">
                Project-Setup 
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500 block">
                Lesson-Planner
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500 block">
                Quiz-Maker
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500 block">
                Student Evaluator
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500 block">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


