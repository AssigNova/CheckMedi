export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">CheckMedi</h4>
          <p className="text-gray-400">
            Bridging the healthcare gap through technology
          </p>
        </div>
        <div></div>
        <div></div>
        <div>
          <p style={{ color: "#101828" }} className="text-gray-400">
            Developed by <a href="https://assignova.com/">Assignova</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
