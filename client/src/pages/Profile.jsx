import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading profile...</p>;

  return (
  <div className="w-full min-h-screen bg-gray-50">
    <div className="w-full h-52 sm:h-64 lg:h-72 bg-gradient-to-r from-green-200 via-lime-200 to-emerald-200 relative">
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
          <img
            src="https://i.pravatar.cc/400"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-900">
                {user?.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
            </div>

            <div className="flex justify-center sm:justify-start gap-4 text-gray-600">
              <a className="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h3v20h-3M9 10v12M6 10h6M6 22h6M6 2h6v6H6z"/></svg>
              </a>
              <a className="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 4c-.8.4-1.6.6-2.5.8a4.1 4.1 0 0 0 1.8-2.3 8.2 8.2 0 0 1-2.6 1A4.1 4.1 0 0 0 12 6.1c0 .3 0 .6.1.9A11.7 11.7 0 0 1 3 3.2a4.1 4.1 0 0 0 1.3 5.5A4 4 0 0 1 2.8 8v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 17.5 11.7 11.7 0 0 0 8.3 19c7.6 0 11.8-6.3 11.8-11.8v-.5A8.3 8.3 0 0 0 22 4z"/></svg>
              </a>
              <a className="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-green-500 text-green-600 font-medium hover:bg-green-50 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">User</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">Country</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">India</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Snippets</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                {user?.snippets.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
