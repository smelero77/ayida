"use client";

import { Button } from './ui/button';

const Testimonials = () => {
  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      alt: "John Doe"
    },
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      alt: "Robert Johnson"
    },
    {
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      alt: "Jane Smith"
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Emily Davis"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
      alt: "Tyler Durden"
    },
    {
      src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
      alt: "Dora"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Host your websites<br />
            with zero friction today.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Experience lightning-fast hosting with unparalleled reliability. Our cutting-edge 
            infrastructure ensures your website stays online 24/7, with 99.9% uptime guaranteed.
          </p>
        </div>

        {/* Avatar Grid */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex -space-x-4">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-gray-800"
              >
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Text */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-lg">
            Trusted by <span className="text-white font-semibold">27,000+</span> developers
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
