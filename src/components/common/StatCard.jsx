export default function StatCard({ title, value, trend, color }) {
  return (
    <>
      <div className={`bg-white p-4 rounded-xl border-l-4 border-${color}-600 shadow-sm`}>
        <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className={`text-sm text-${color}-600`}>{trend}</div>
      </div>
    </>
  );
}
