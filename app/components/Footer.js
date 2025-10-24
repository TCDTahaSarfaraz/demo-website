

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Products</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Payments</a></li>
                            <li><a href="#" className="hover:text-white">Connect</a></li>
                            <li><a href="#" className="hover:text-white">Billing</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg mb-4">Developers</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Documentation</a></li>
                            <li><a href="#" className="hover:text-white">API Reference</a></li>
                            <li><a href="#" className="hover:text-white">API Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/about" className="hover:text-white">About</a></li>
                            <li><a href="/Services" className="hover:text-white">Servicess</a></li>
                            <li><a href="#" className="hover:text-white">News</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Connect</h3>
                        {/* Add social icons here */}
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} MyWebsite, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;