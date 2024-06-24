import Image from "next/image";
import twitter from "../../../public/twitter.svg";
import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <section className="mb-6">
      <div className="px-6 py-3">
        <footer className="border-t-2 mt-8 pt-8 ">
          <div
            className="flex md:flex-row flex-col md:justify-between
         justify-center items-center md:gap-y-0 gap-y-4"
          >
            <div>
              <span className="text-lg text-gray-500">
                Made with 💖 by{" "}
                <a
                  href="https://www.linkedin.com/in/mubashar-hassan-sci/"
                  target="_blank"
                  className="hover:underline text-primary"
                >
                  Al-Rehman
                </a>{" "}
                © {new Date().getFullYear()}
              </span>
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
              <Link href={"/"}>
                <Image src={twitter} alt="twitter" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
