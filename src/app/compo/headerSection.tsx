"use client";
import { Separator } from "@/components/ui/separator";

interface HeaderSectionProps {
  header: string;
  subHeader: string;
  isVisible?: boolean;
}

export default function HeaderSectionPage({
  header,
  subHeader,
  isVisible = false,
}: HeaderSectionProps) {
  return (
    <section className="">
      <div className="w-full mx-auto  px-5 pb-2">
        <div className="w-full flex flex-col items-center gap-y-2">
          {isVisible && (
            <div className="">
              <h1 className="lg:text-4xl text-2xl text-pehla uppercase font-semibold tracking-tighter">
                {header}
              </h1>
            </div>
          )}
          {isVisible && <Separator className="mb-1 bg-slate-300 md:w-1/2" />}

          <div>
            <h2 className="text-nafees font-semibold lg:text-4xl text-2xl leading-3">
              {subHeader}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
