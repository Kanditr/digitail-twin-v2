import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl">Digital Twin</p>
        <div className="flex mt-4">
          <Link href="/block-index">
            <a className="mr-6 text-pink-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">Sell Digital Asset</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-pink-500">My Digital Assets</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
