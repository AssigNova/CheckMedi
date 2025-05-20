export default function QuickActions({ link, icon, text, color }) {
  const Icon = icon;
  return (
    <>
      <a
        href={link}
        className={`bg-${color}-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-${color}-700 transition-colors`}
      >
        <span className="text-lg font-semibold">{text}</span>
        <Icon className="h-8 w-8" />
      </a>
    </>
  );
}
