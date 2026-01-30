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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <div className="space-y-2">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
}
