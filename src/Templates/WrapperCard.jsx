export default function WrapperCard({ children, heading, icon, color, options }) {
  const Icon = icon;
  if (!color) {
    color = "";
  }
  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className={options ? "flex justify-between items-center mb-6" : ""}>
          <h2 className={`${options ? "text-xl" : "text-2xl"} font-semibold mb-6 ${color} flex items-center`}>
            {icon && <Icon className="h-8 w-8 mr-2" />}
            {heading}
          </h2>
          {options}
        </div>
        {children}
      </div>
    </>
  );
}
