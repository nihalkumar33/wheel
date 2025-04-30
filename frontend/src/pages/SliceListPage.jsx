import { Link } from 'react-router-dom';
import SliceList from '../components/SliceList';

export default function SliceListPage() {
  return (
    <div className="h-screen w-screen overflow-auto bg-gradient-to-r from-white via-blue-100 to-blue-300">
      <div className="flex flex-col min-h-full py-10 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">All Slices</h2>
          <Link
            to="/add-slice"
            className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            Add Slice
          </Link>
        </div>
        <SliceList />
      </div>
    </div>
  );
}
