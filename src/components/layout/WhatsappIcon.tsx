"use client";
import { CircleX, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const WhatsappIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChatBox = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating WhatsApp Icon */}
      <div
        className={`fixed bg-white rounded-md left-4 bottom-4 cursor-pointer z-50 ${
          isOpen ? "shadow-none" : "shadow-lg"
        }`}
        onClick={toggleChatBox}
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={50}
          height={50}
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "scale-90" : "scale-125"
          }`}
        />
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed left-4 bottom-16 bg-white shadow-md border border-gray-300 rounded-3xl w-96 z-50">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center justify-between bg-green-500 rounded-t-3xl p-5">
              <h2 className="font-semibold text-lg">Welcom To LTF</h2>
              <div className="cursor-pointer" onClick={toggleChatBox}>
                <CircleX className="w-7 h-7" />
              </div>
            </div>
            <div className="joinchat__message">
              <h2 className="font-semibold text-lg text-pehla">Hello</h2>
              <p>Can we help you?</p>
            </div>

            <div className="m-2">
              <Link
                href={"https://wa.me/923157473743"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="flex items-center gap-x-2 bg-green-500 text-white rounded-3xl p-6"
                  variant={"outline"}
                >
                  <SendHorizontal className="animate-pulse" />
                  <p>Open Chat</p>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappIcon;
