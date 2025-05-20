export default function PrescriptionItem({ medication, dosage, status, refills }) {
  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{medication}</h4>
          <p className="text-sm text-gray-600">{dosage}</p>
        </div>
        <div className="text-right">
          <span className={`bg-green-100 text-green-600 px-2 py-1 rounded text-sm`}>{status}</span>
          <p className="text-sm text-gray-600 mt-1">{refills}</p>
        </div>
      </div>
    </>
  );
}
