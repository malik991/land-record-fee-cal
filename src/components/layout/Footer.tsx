import Image from "next/image";
import twitter from "../../../public/twitter.svg";
import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import logo1 from "../../../public/logo1-compress.png";

export default function Footer() {
  return (
    <section className="mb-6">
      <div className="px-6 py-3">
        <footer className="border-t-2 mt-8 pt-8 ">
          <div
            className="flex md:flex-row flex-col md:justify-between
         justify-center items-center md:gap-y-0 gap-y-4"
          >
            <div className="flex items-center justify-center gap-x-1">
              <span className="text-lg text-gray-500">Made with 💖 by </span>
              <div className="flex items-center gap-x-1 mt-1">
                <Link href="/">
                  <Image
                    src={logo1}
                    alt="alrehman-ai logo"
                    width={30}
                    height={30}
                  />
                </Link>
                <a
                  href="https://alrehmanai.netlify.app/"
                  target="_blank"
                  className="hover:underline text-primary"
                >
                  Al-Rehman
                </a>{" "}
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <Link
                href={"https://www.linkedin.com/in/mubashar-hassan-sci/"}
                target="_blank"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href={"https://github.com/malik991"} target="_blank">
                {/* <Image src={github} alt="github" /> */}
                <Github className="w-6 h-6" />
              </Link>
              <Link href={"https://twitter.com/malik9914"}>
                <Image src={twitter} alt="twitter" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
