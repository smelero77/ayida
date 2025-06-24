
"use client";

const Footer = () => {
  const footerSections = [
    {
      title: "Pages",
      links: [
        { name: "Home", href: "#" },
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Socials",
      links: [
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "LinkedIn", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" }
      ]
    },
    {
      title: "Register",
      links: [
        { name: "Sign Up", href: "#" },
        { name: "Login", href: "#" },
        { name: "Book a demo", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Logo and Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-semibold text-xl">Ayida</span>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-center">
            © copyright Ayida {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
