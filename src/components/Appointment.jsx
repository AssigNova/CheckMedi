export default function Appointment({ values }) {
  return (
    <>
      <tr className="border-b hover:bg-gray-50 px-6">
        {values.map((value) => (
          <td className="py-4">
            <span
              className={
                value.color
                  ? `bg-${value.color}-100 text-${value.color}-600 px-2 py-1 rounded`
                  : `bg-${value.color}-100 text-${value.color}-600 px-2 py-1 rounded`
              }
            >
              {value.text}
            </span>
          </td>
        ))}
        <td>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Join Now</button>
        </td>
      </tr>
      {/* More appointment rows */}
    </>
  );
}
