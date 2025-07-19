import { useState, useEffect } from "react";
import { TruckIcon, DocumentTextIcon, ChartBarIcon, ArchiveIcon } from "@heroicons/react/outline";
import axios from "axios";

import { apiUrl } from "../../api";

import SideBar from "../../Templates/SideBar";
import StatCard from "../../components/common/StatCard";
import PrescriptionItem from "../../components/prescriptions/PrescriptionItem";

export default function PharmacyDashboard({ profile }) {
  const [activeTab, setActiveTab] = useState("orders");
  const [orderFilter, setOrderFilter] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [errorPrescriptions, setErrorPrescriptions] = useState("");

  useEffect(() => {
    async function fetchPrescriptions() {
      setLoadingPrescriptions(true);
      setErrorPrescriptions("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(apiUrl(`api/prescriptions/pharmacy/${profile._id}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(res.data);
      } catch (err) {
        setErrorPrescriptions(err.response?.data?.error || "Failed to load prescriptions");
      } finally {
        setLoadingPrescriptions(false);
      }
    }
    if (profile?._id) fetchPrescriptions();
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        <SideBar
          heading={"CheckMedi"}
          text={"Pharmacy Portal"}
          activeTab={activeTab}
          onClickTab={setActiveTab}
          values={[
            { id: "orders", icon: TruckIcon, label: "Order Management" },
            { id: "inventory", icon: ArchiveIcon, label: "Inventory" },
            { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions" },
            { id: "analytics", icon: ChartBarIcon, label: "Analytics" },
          ]}
        />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard - {profile.name}</h1>
            <p className="text-gray-600 mt-2">
              Email: {profile.email} | Role: {profile.role}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Today's Orders" value="23" trend="+14% from yesterday" color="blue" />
            <StatCard title="Fulfillment Rate" value="94%" trend="2% above target" color="green" />
            <StatCard title="Avg. Delivery Time" value="38min" trend="5min improvement" color="purple" />
            <StatCard title="Low Stock Items" value="7" trend="Needs attention" color="orange" />
          </div>

          {/* Order Management */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Orders</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setOrderFilter("pending")}
                  className={`px-4 py-2 rounded-lg ${
                    orderFilter === "pending" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}>
                  Pending (15)
                </button>
                <button
                  onClick={() => setOrderFilter("processing")}
                  className={`px-4 py-2 rounded-lg ${
                    orderFilter === "processing" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}>
                  Processing (8)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Medications</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Delivery Address</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4">#MC-2458</td>
                    <td>Rahul Sharma</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Metformin 500mg</span>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">Atorvastatin 20mg</span>
                      </div>
                    </td>
                    <td>
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending Verification</span>
                    </td>
                    <td>12/4 Main Street, 3km away</td>
                    <td>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => setSelectedOrder(true)}>
                        Process Order
                      </button>
                    </td>
                  </tr>
                  {/* More order rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Stock Levels */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">Inventory Status</h2>
              <div className="space-y-4">
                <InventoryItem medication="Metformin 500mg" stock={42} threshold={50} lastOrder="2 days ago" />
                <InventoryItem medication="Atorvastatin 20mg" stock={28} threshold={30} lastOrder="5 days ago" critical />
                {/* More inventory items */}
              </div>
            </div>

            {/* Prescription Verification */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-green-600">Prescription Validation</h2>
              <div className="space-y-4">
                {loadingPrescriptions ? (
                  <div>Loading prescriptions...</div>
                ) : errorPrescriptions ? (
                  <div className="text-red-500">{errorPrescriptions}</div>
                ) : prescriptions.length === 0 ? (
                  <div>No prescriptions found for this pharmacy.</div>
                ) : (
                  prescriptions.map((p, idx) => (
                    <PrescriptionItem
                      key={p._id || idx}
                      doctor={p.doctorId?.name || "-"}
                      date={p.date}
                      pharmacy={profile.name}
                      medicines={p.medicines}
                      notes={p.notes}
                      status={"Valid"}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Delivery Tracking */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Delivery Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DeliveryStatus title="Out for Delivery" count={8} color="yellow" estimatedTime="30-45 min" />
              <DeliveryStatus title="Recently Delivered" count={12} color="green" averageTime="38 min" />
              <DeliveryStatus title="Scheduled Deliveries" count={5} color="blue" nextSlot="3:00 PM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InventoryItem = ({ medication, stock, threshold, lastOrder, critical }) => (
  <div className={`p-4 rounded-lg border-l-4 ${critical ? "border-red-600 bg-red-50" : "border-blue-600 bg-gray-50"}`}>
    <div className="flex justify-between items-center">
      <h4 className="font-semibold">{medication}</h4>
      <span className={`text-sm ${critical ? "text-red-600" : "text-blue-600"}`}>
        {stock}/{threshold} units
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div
        className={`${critical ? "bg-red-600" : "bg-blue-600"} h-2 rounded-full`}
        style={{ width: `${(stock / threshold) * 100}%` }}></div>
    </div>
    <p className="text-sm text-gray-600 mt-2">Last ordered: {lastOrder}</p>
  </div>
);

const DeliveryStatus = ({ title, count, color, estimatedTime, averageTime, nextSlot }) => (
  <div className={`bg-${color}-50 p-6 rounded-xl border-l-4 border-${color}-600`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-4">{count}</div>
    {estimatedTime && <p className="text-sm text-gray-600">Est. delivery: {estimatedTime}</p>}
    {averageTime && <p className="text-sm text-gray-600">Avg. time: {averageTime}</p>}
    {nextSlot && <p className="text-sm text-gray-600">Next slot: {nextSlot}</p>}
  </div>
);
