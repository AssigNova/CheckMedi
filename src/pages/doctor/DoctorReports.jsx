import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../api";
import SideBar from "../../UI/SideBar";

import { IoDownload, IoDocumentText } from "react-icons/io5";
import { FaCircleExclamation, FaCircleUser, FaBuilding, FaClock, FaCircleCheck, FaArrowRightLong } from "react-icons/fa6";

const DoctorReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [downloadError, setDownloadError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const res = await axios.get(apiUrl(`/api/reports?doctor_id=${doctorId}`), {
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
  }, []);

  const handleDownload = async (reportId, filename) => {
    try {
      setDownloading(reportId);
      setDownloadError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl(`/api/reports/download/${reportId}`), {
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
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-indigo-900">My Requested Lab Reports</h1>
                <p className="text-gray-600 mt-2">View and manage all lab reports you've requested for your patients</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <IoDocumentText className="h-8 w-8 text-indigo-600" />
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                {reports.length > 0 ? `${reports.length} report${reports.length !== 1 ? "s" : ""} found` : "No reports yet"}
              </div>
              <button onClick={fetchReports} className="flex items-center text-indigo-600 hover:text-indigo-800">
                <FaArrowRightLong className="h-5 w-5 mr-1" />
                Refresh
              </button>
            </div>

            {downloadError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded flex items-center">
                <FaCircleExclamation className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">{downloadError}</span>
              </div>
            )}

            {error ? (
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <FaCircleExclamation className="h-12 w-12 text-red-500 mx-auto" />
                <p className="text-red-700 mt-3">{error}</p>
                <button
                  onClick={fetchReports}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Try Again
                </button>
              </div>
            ) : loading ? (
              <div>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <ReportSkeleton key={idx} />
                ))}
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-indigo-50 rounded-xl p-8 text-center">
                <IoDocumentText className="h-16 w-16 text-indigo-400 mx-auto" />
                <h3 className="text-xl font-medium text-gray-900 mt-4">No Reports Found</h3>
                <p className="text-gray-600 mt-2">
                  You haven't requested any lab reports yet. All your requested reports will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                          <IoDocumentText className="h-5 w-5 text-indigo-500 mr-2" />
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
                        <FaCircleExclamation className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-500">Patient</div>
                          <div className="font-medium">{report.patient_id?.name || "Unknown Patient"}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaBuilding className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-500">Laboratory</div>
                          <div className="font-medium">{report.lab_id?.name || "Unknown Lab"}</div>
                        </div>
                      </div>
                    </div>

                    {report.report_details && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Details</div>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{report.report_details}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="h-4 w-4 mr-1" />
                        Last updated: {formatDate(report.updated_at)}
                      </div>

                      <div>
                        {report.status === "completed" && report.pdf_url ? (
                          <button
                            onClick={() => handleDownload(report._id, `${report.report_type}.pdf`)}
                            disabled={downloading === report._id}
                            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70">
                            {downloading === report._id ? (
                              <FaArrowRightLong className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <IoDownload className="h-4 w-4 mr-2" />
                            )}
                            {downloading === report._id ? "Downloading..." : "Download Report"}
                          </button>
                        ) : (
                          <div className="flex items-center text-gray-500">
                            <FaClock className="h-4 w-4 mr-1" />
                            <span>
                              {report.status === "pending"
                                ? "Awaiting lab confirmation"
                                : report.status === "in_progress"
                                ? "Lab is processing your request"
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About Lab Reports</h2>
            <div className="prose prose-indigo">
              <p>All lab reports requested by you will appear on this page. You can track the status of each report:</p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    Pending
                  </span>
                  <span>Lab has received your request but hasn't started processing yet</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                    In Progress
                  </span>
                  <span>Lab is currently processing your request</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                    Completed
                  </span>
                  <span>Report is ready for download</span>
                </li>
              </ul>
              <p className="mt-4">
                Completed reports will be available for download as PDF files. If you encounter any issues, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorReports;
