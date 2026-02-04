import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <footer
      className="bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 text-white"
      ref={ref}
    >
      <div className="grid gap-8 px-6 py-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:place-content-center backdrop-blur-xl bg-white/5 border-t border-white/10">
        <div className="space-y-2 lg:ml-20">
          <h1 className="font-bold text-xl text-sky-300">Support</h1>
          <p className="text-white/80 hover:text-white transition cursor-pointer">
            Help Center
          </p>
          <p className="text-white/80 hover:text-white transition cursor-pointer">
            FAQs
          </p>
          <p className="text-white/80 hover:text-white transition cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-white/80 hover:text-white transition cursor-pointer">
            Terms & Conditions
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-xl text-sky-300">Contact Us</h1>
          <p className="text-white/80 hover:text-white transition">
            support@notify.com
          </p>
          <p className="text-white/80 hover:text-white transition">
            +92 300 1234567
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-xl text-sky-300">Follow Us</h1>
          {inView && (
            <div className="ml-2 pb-2 flex gap-6 max-sm:gap-4">
              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:scale-110 transition text-white/80 hover:text-sky-300"
              >
                <Facebook />
              </a>
              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:scale-110 transition text-white/80 hover:text-sky-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:scale-110 transition text-white/80 hover:text-sky-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-white/60 py-4 border-t border-white/10">
        © {new Date().getFullYear()} Notify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
