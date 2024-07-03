"use client";

import { ComboboxForm } from "@/components/layout/relativeSelect";
import HeaderSectionPage from "../compo/headerSection";

export default function InheritancePage() {
  return (
    <section className="md:my-8 my:9">
      <div className="md:mt-8 mt-11 flex flex-col max-w-xl mx-auto p-6 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground">
        <div className="flex flex-col items-center w-full gap-y-8">
          <div className="w-full">
            <HeaderSectionPage
              header="Select Legal Heirs"
              subHeader="ایک ایک کر کے وارثان منتخب کریں"
              isVisible={true}
            />
          </div>
          <div className="w-full">
            <ComboboxForm />
          </div>
          <div className="w-full flex flex-col items-end pr-3 gap-y-1">
            <p className="text-nafees md:text-lg text-pehla font-semibold">
              نوٹ - متوفی کی وفات کے وقت جو زندہ تھا صرف اس وارث کو چنیں۔
            </p>
            <p className="text-nafees text-lg text-pehla font-semibold whitespace-nowrap">
              نوٹ - اگر متوفی کا بیٹا ہے تو بھائی یا بہن مت چنیں۔
            </p>
            <p className="text-nafees md:text-lg text-pehla font-semibold">
              نوٹ - اگر متوفی کا بیٹا نہ ہے مگر والد متوفی کے بعد زندہ تھا یہ ہے
              تب بھی بھائی یا بہن مت چنیں۔
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
