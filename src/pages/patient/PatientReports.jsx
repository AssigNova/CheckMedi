import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api";
import AuthContext from "../../context/AuthContext";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarIcon,
  DocumentDownloadIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const PatientReports = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [downloadError, setDownloadError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const patientId = user.id;

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.get(apiUrl(`/api/reports?patient_id=${patientId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [patientId]);

  const handleDownload = async (reportId, filename) => {
    try {
      setDownloading(reportId);
      setDownloadError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl(`/api/reports/${reportId}/download`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      // Get filename from content disposition
      const contentDisposition = response.headers.get("content-disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const finalFilename = filenameMatch ? filenameMatch[1] : filename || "report.pdf";

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = finalFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      setDownloadError(err.message);
    } finally {
      setDownloading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredReports = reports.filter((report) => {
    if (filter === "all") return true;
    return report.status === filter;
  });

  const ReportSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl shadow-sm p-5 mb-5">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <ChartBarIcon className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Lab Reports</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and manage all your lab reports in one place. Track the status of pending reports and download completed ones.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              {reports.length > 0 ? `${filteredReports.length} report${filteredReports.length !== 1 ? "s" : ""} found` : "No reports yet"}
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={fetchReports} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
                <ClockIcon className="h-4 w-4 mr-1" />
                Refresh Reports
              </button>

              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">Filter:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="all">All Reports</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {downloadError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{downloadError}</span>
            </div>
          )}

          {error ? (
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
              <p className="text-red-700 mt-3">{error}</p>
              <button onClick={fetchReports} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div>
              {Array.from({ length: 3 }).map((_, idx) => (
                <ReportSkeleton key={idx} />
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-indigo-50 rounded-xl p-8 text-center">
              <DocumentTextIcon className="h-16 w-16 text-indigo-400 mx-auto" />
              <h3 className="text-xl font-medium text-gray-900 mt-4">No Reports Found</h3>
              <p className="text-gray-600 mt-2">
                {filter === "all"
                  ? "You don't have any lab reports yet. All your reports will appear here."
                  : `No ${filter} reports found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
                        {report.report_type}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">Requested on: {formatDate(report.created_at)}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status === "in_progress" ? "In Progress" : report.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start">
                      <UserGroupIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-gray-500">Doctor</div>
                        <div className="font-medium">Dr. {report.doctor_id?.name || "Unknown Doctor"}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <ShieldCheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-gray-500">Laboratory</div>
                        <div className="font-medium">{report.lab_id?.name || "Unknown Lab"}</div>
                      </div>
                    </div>
                  </div>

                  {report.report_details && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Test Details</div>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{report.report_details}</p>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-0">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Last updated: {formatDate(report.updated_at)}
                    </div>

                    <div>
                      {report.status === "completed" && report.pdf_url ? (
                        <button
                          onClick={() => handleDownload(report._id, `${report.report_type}.pdf`)}
                          disabled={downloading === report._id}
                          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70">
                          {downloading === report._id ? (
                            <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <DocumentDownloadIcon className="h-4 w-4 mr-2" />
                          )}
                          {downloading === report._id ? "Downloading..." : "Download Report"}
                        </button>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>
                            {report.status === "pending"
                              ? "Awaiting lab confirmation"
                              : report.status === "in_progress"
                              ? "Lab is processing your report"
                              : "Report not available"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Understanding Your Lab Reports</h2>
          <div className="prose prose-indigo">
            <p>Lab reports contain important information about your health. Here's what you need to know:</p>
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                  Pending
                </span>
                <span>Your report request has been received but not yet processed</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  In Progress
                </span>
                <span>The lab is currently processing your tests</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                  Completed
                </span>
                <span>Your report is ready for download</span>
              </li>
            </ul>
            <p className="mt-4">
              If you have questions about your results, please contact your doctor. For technical issues with downloading reports, contact
              our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReports;
