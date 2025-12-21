export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-20 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">About</h3>
          <p>
            Find premium properties across Dubai with trusted agents
            and verified listings.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Explore</h3>
          <ul className="space-y-1">
            <li>Buy property</li>
            <li>Rent property</li>
            <li>New projects</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Contact</h3>
          <p>Email: support@gmail.com</p>
          <p>Phone: +971 55 044 4545</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
