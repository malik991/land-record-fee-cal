"use client";
import { Separator } from "@/components/ui/separator";

interface HeaderSectionProps {
  header: string;
  subHeader: string;
}

export default function HeaderSectionPage({
  header,
  subHeader,
}: HeaderSectionProps) {
  return (
    <section className="mt-1">
      <div className="w-full mx-auto  p-5">
        <div className="w-full flex flex-col items-center gap-y-2">
          <div className="">
            <h1 className="lg:text-8xl text-4xl text-pehla uppercase font-semibold tracking-tighter">
              {header}
            </h1>
          </div>
          <Separator className="mb-1 bg-slate-300" />
          <div>
            <h2 className=" text-dooja text-nafees font-semibold lg:text-6xl text-2xl leading-3">
              {subHeader}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
