export default function SideBar({ values, heading, text, onClickTab, activeTab }) {
  return (
    <>
      <div className="w-64 bg-white h-screen shadow-lg fixed rounded-2xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">{heading}</h2>
          <p className="text-sm text-gray-500">{text}</p>
        </div>

        <nav className="mt-6 space-y-1">
          {values.map((item) =>
            item.link ? (
              <a
                key={item.id}
                href={item.link}
                className={`w-full flex items-center px-6 py-3 text-sm no-underline ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                onClick={() => onClickTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
    </>
  );
}
