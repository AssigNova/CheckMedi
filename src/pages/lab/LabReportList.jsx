// src/components/LabReportList.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../../api";
import AuthContext from "../../context/AuthContext";

const LabReportList = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'completed'
  const [searchQuery, setSearchQuery] = useState("");

  const labId = user.id;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get(apiUrl(`/api/reports?lab_id=${labId}`), {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        // Filter reports by status
        const pending = response.data.filter((r) => r.status === "pending" || r.status === "in_progress");
        const completed = response.data.filter((r) => r.status === "completed");

        setReports(pending);
        setCompletedReports(completed);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching reports");
      } finally {
        setLoading(false);
      }
    };

    if (labId) fetchReports();
  }, [labId]);

  // Filter reports based on search and filter
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.patient_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.report_type?.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "pending") return matchesSearch && report.status === "pending";
    if (filter === "in_progress") return matchesSearch && report.status === "in_progress";
    return matchesSearch;
  });

  const filteredCompletedReports = completedReports.filter((report) => {
    return (
      report.patient_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.report_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "stat":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-indigo-100 text-indigo-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  console.log(filteredReports);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Reports</h1>
          <p className="mt-2 text-gray-600">Manage all reports requested by doctors</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search reports..."
              className="py-2 pl-4 pr-10 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 pl-3 pr-10 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Active Reports Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Active Reports ({filteredReports.length})</h2>
              <p className="text-gray-600 mt-1">Reports that require your attention</p>
            </div>

            {filteredReports.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No active reports</h3>
                <p className="mt-1 text-gray-500">All caught up! No pending reports at the moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Requested
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">{report.patient_id?.name?.charAt(0) || "P"}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{report.patient_id?.name || "Unknown Patient"}</div>
                              <div className="text-sm text-gray-500">{report.patient_id?.email || "No email"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.doctor_id?.name || "Unknown Doctor"}</div>
                          <div className="text-sm text-gray-500">{report.doctor_id?.specialization || "General"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.report_type}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {report.required_tests?.join(", ") || "No tests specified"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(
                              report.priority
                            )}`}>
                            {report.priority === "stat" ? "STAT" : report.priority?.charAt(0).toUpperCase() + report.priority?.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                            {report.status === "in_progress"
                              ? "In Progress"
                              : report.status?.charAt(0).toUpperCase() + report.status?.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(report.created_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/lab/reports/${report._id}`} className="text-indigo-600 hover:text-indigo-900">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Completed Reports Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Completed Reports ({filteredCompletedReports.length})</h2>
              <p className="text-gray-600 mt-1">Reports that have been processed</p>
            </div>

            {filteredCompletedReports.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No completed reports</h3>
                <p className="mt-1 text-gray-500">Reports will appear here once completed.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Completed
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCompletedReports.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-800 font-medium">{report.patient_id?.name?.charAt(0) || "P"}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{report.patient_id?.name || "Unknown Patient"}</div>
                              <div className="text-sm text-gray-500">{report.patient_id?.email || "No email"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.doctor_id?.name || "Unknown Doctor"}</div>
                          <div className="text-sm text-gray-500">{report.doctor_id?.specialization || "General"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.report_type}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {report.required_tests?.join(", ") || "No tests specified"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(report.updated_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/lab/reports/${report._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                            View Details
                          </Link>
                          {report.pdf_url && (
                            <a
                              href={report.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900">
                              Download
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LabReportList;
