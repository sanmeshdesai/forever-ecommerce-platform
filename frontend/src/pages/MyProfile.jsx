import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const MyProfile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    cancelled: 0,
});

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/profile",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const fetchOrderStats = async () => {
    try {

        const response = await axios.post(
            backendUrl + "/api/order/stats",
            {},
            {
                headers: { token }
            }
        );

        if (response.data.success) {
            setStats(response.data.stats);
        }

    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      navigate("/login");
    }
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="min-h-[80vh] border-t py-10">
      <div className="mb-8">
        <Title text1={"MY"} text2={" PROFILE"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Card */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            {user.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>

          <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Edit Profile
          </button>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Information */}
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-5">
              Personal Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-500">
                  Full Name
                </label>

                <input
                  value={user.name}
                  readOnly
                  className="w-full mt-2 border rounded-lg px-4 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Email
                </label>

                <input
                  value={user.email}
                  readOnly
                  className="w-full mt-2 border rounded-lg px-4 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Phone
                </label>

                <input
                  value={user.phone || ""}
                  readOnly
                  placeholder="Not Added"
                  className="w-full mt-2 border rounded-lg px-4 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Member Since
                </label>

                <input
                  value={
                    user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                  readOnly
                  className="w-full mt-2 border rounded-lg px-4 py-2 bg-gray-50"
                />
              </div>

            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-5">
              Order Summary
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="border rounded-lg p-5 text-center">
                <h2 className="text-2xl font-bold">{stats.total}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Total Orders
                </p>
              </div>

              <div className="border rounded-lg p-5 text-center">
                <h2 className="text-2xl font-bold text-green-600">{stats.delivered}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Delivered
                </p>
              </div>

              <div className="border rounded-lg p-5 text-center">
                <h2 className="text-2xl font-bold text-yellow-500">{stats.pending}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Pending
                </p>
              </div>

              <div className="border rounded-lg p-5 text-center">
                <h2 className="text-2xl font-bold text-red-500">{stats.cancelled}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Cancelled
                </p>
              </div>

            </div>
          </div>

          {/* Quick Actions */}
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-5">
              Account Actions
            </h3>

            <div className="flex flex-wrap gap-4">

              <button className="border px-5 py-2 rounded-lg hover:bg-gray-100">
                Change Password
              </button>

              <button className="border px-5 py-2 rounded-lg hover:bg-gray-100">
                Manage Addresses
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="border px-5 py-2 rounded-lg hover:bg-gray-100"
              >
                View Orders
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;