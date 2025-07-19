export default function PrescriptionItem({ doctor, date, pharmacy, medicines, notes, status }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="font-semibold">Prescribed by Dr. {doctor}</h4>
          <p className="text-sm text-gray-600">Date: {date ? new Date(date).toLocaleDateString() : "-"}</p>
          <p className="text-sm text-gray-600">Pharmacy: {pharmacy}</p>
        </div>
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">{status}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Medicines:</span>
        <ul className="list-disc ml-6">
          {medicines &&
            medicines.map((m, i) => (
              <li key={i}>
                {m.name} - {m.dosage}, {m.frequency}, {m.duration}
              </li>
            ))}
        </ul>
      </div>
      {notes && <div className="text-sm text-gray-700">Notes: {notes}</div>}
    </div>
  );
}
