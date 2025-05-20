export default function BenefitItem({ icon, color, title, text }) {
  const Icon = icon;
  return (
    <>
      <div className="flex items-start">
        <div className={`bg-${color}-100 p-2 rounded-lg mr-4`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{text}</p>
        </div>
      </div>
    </>
  );
}
