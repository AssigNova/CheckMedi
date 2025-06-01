export default function Jobs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Careers at CheckMedi</h2>
        <p className="mb-6 text-gray-700 text-center">
          Join our mission to revolutionize healthcare! We are always looking for passionate individuals to join our team.
        </p>
        <ul className="mb-6 space-y-4">
          <li>
            <span className="font-semibold">Registered Nurse (RN)</span> - Provide patient care and support in hospital settings
          </li>
          <li>
            <span className="font-semibold">Pharmacist</span> - Dispense medications and counsel patients
          </li>
          <li>
            <span className="font-semibold">Medical Laboratory Technician</span> - Perform diagnostic tests and lab work
          </li>
          <li>
            <span className="font-semibold">Radiologic Technologist</span> - Operate imaging equipment for patient diagnosis
          </li>
          <li>
            <span className="font-semibold">Medical Receptionist</span> - Manage front desk and patient appointments
          </li>
          <li>
            <span className="font-semibold">Clinical Research Coordinator</span> - Oversee clinical trials and research studies
          </li>
          <li>
            <span className="font-semibold">Physician Assistant</span> - Support doctors in patient care and procedures
          </li>
        </ul>
        <p className="mb-4 text-gray-700 text-center">
          Interested? Send your resume to{" "}
          <a href="mailto:careers@checkmedi.com" className="text-blue-600 underline">
            careers@checkmedi.com
          </a>
        </p>
        {/* <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">View Openings</button>
        </div> */}
      </div>
    </div>
  );
}
