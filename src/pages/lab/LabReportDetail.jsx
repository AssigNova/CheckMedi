// src/components/LabReportDetail.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api";
import AuthContext from "../../context/AuthContext";

const LabReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get(apiUrl(`/api/reports/${reportId}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // LabReportDetail.js - Add this function
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl(`/api/reports/download/${reportId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to download PDF");

      // Create direct download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      console.log(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = response.headers.get("Content-Disposition")?.split("filename=")[1].replace(/"/g, "") || "report.pdf";

      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up
      setTimeout(() => window.URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error("Download error:", err);
      setDownloadError("Failed to download report");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axios.put(apiUrl(`/api/reports/${reportId}/upload`), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess(true);
      setReport(response.data); // Update report with new data
    } catch (err) {
      setUploadError(err.response?.data?.error || "Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        apiUrl(`/api/reports/${reportId}`),
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error updating status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
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
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Go Back
        </button>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Reports
      </button>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Report Header */}
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{report.report_type}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Requested by Dr. {report.doctor_id?.name || "Unknown Doctor"} • {formatDate(report.created_at)}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityBadge(report.priority)}`}>
              {report.priority === "stat" ? "STAT" : report.priority?.charAt(0).toUpperCase() + report.priority?.slice(1)}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(report.status)}`}>
              {report.status === "in_progress" ? "In Progress" : report.status?.charAt(0).toUpperCase() + report.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Report Details */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Patient Information</h3>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">{report.patient_id?.name?.charAt(0) || "P"}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{report.patient_id?.name || "Unknown Patient"}</h4>
                  <div className="mt-1 text-sm text-gray-500">
                    {report.patient_id?.email || "No email"} • {report.patient_id?.phone || "No phone"}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{report.patient_id?.address || "No address"}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Doctor Information</h3>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">{report.doctor_id?.name?.charAt(0) || "D"}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Dr. {report.doctor_id?.name || "Unknown Doctor"}</h4>
                  <div className="mt-1 text-sm text-gray-500">
                    {report.doctor_id?.specialization || "General Practice"} • {report.doctor_id?.hospital || "No hospital"}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {report.doctor_id?.email || "No email"} • {report.doctor_id?.phone || "No phone"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Test Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-900">Required Tests:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {report.required_tests?.map((test, index) => (
                      <span key={index} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Preferred Test Date:</span>
                  <p className="mt-1 text-gray-900">{report.test_date ? formatDate(report.test_date) : "Not specified"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Special Instructions:</span>
                  <p className="mt-1 text-gray-900">{report.instructions || "None provided"}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Clinical Notes</h3>
              <div className="prose max-w-none text-gray-700">
                {report.report_details || "No additional details provided by the doctor."}
              </div>
            </div>
          </div>

          {/* Report Upload Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Lab Report</h3>

            {report.status === "completed" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Report Completed</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        This report was completed on {formatDate(report.updated_at)}. // In the completed report section
                        {report.pdf_url && (
                          <button
                            onClick={handleDownload}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                            <svg
                              className="-ml-1 mr-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download PDF Report
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF file only (MAX. 10MB)</p>
                      {file && <p className="mt-3 text-sm font-medium text-gray-900">Selected: {file.name}</p>}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                  </label>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    {report.status === "pending" && (
                      <button
                        onClick={() => updateStatus("in_progress")}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Mark as In Progress
                      </button>
                    )}
                  </div>

                  <div className="space-x-3">
                    <button
                      onClick={() => updateStatus("cancelled")}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Cancel Report
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading || !file}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75">
                      {uploading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        "Upload and Complete Report"
                      )}
                    </button>
                  </div>
                </div>

                {downloadError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {downloadError}
                  </div>
                )}
                {uploadError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {uploadError}
                  </div>
                )}
                {uploadSuccess && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Report uploaded successfully! The doctor and patient have been notified.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReportDetail;
