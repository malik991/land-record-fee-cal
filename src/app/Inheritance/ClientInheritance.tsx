"use client";

import { ComboboxForm } from "@/components/layout/relativeSelect";
import HeaderSectionPage from "../compo/headerSection";

export default function ClientInheritancePage() {
  return (
    <section className="md:my-8 my:9">
      <div className="md:mt-8 mt-11 flex flex-col max-w-xl mx-auto p-6 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground space-y-6">
        <HeaderSectionPage
          header="Select Legal Heirs"
          subHeader="ایک ایک کر کے وارثان منتخب کریں"
          isVisible={true}
        />

        {/* How to use */}
        <div className="w-full rounded-md p-4 text-sm text-muted-foreground space-y-2">
          <p>
            📝 <strong>How to use:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select each heir one by one</li>
            <li>Only choose heirs alive at the time of death</li>
            <li>If there is a son, do not choose brothers/sisters</li>
            <li>
              If no son but father is alive, do not choose brothers/sisters
            </li>
            <li>Then click تعداد وارثان و رقبہ</li>
          </ol>
        </div>

        {/* Combobox */}
        <ComboboxForm />

        {/* Urdu Notes */}
        <div
          className="w-full bg-amber-50 border border-amber-200 rounded-md p-4 space-y-2 text-amber-800 md:text-[16px] text-sm font-semibold text-nafees"
          dir="rtl"
        >
          <p>نوٹ - متوفی کی وفات کے وقت جو زندہ تھا صرف اس وارث کو چنیں۔</p>
          <p>نوٹ - اگر متوفی کا بیٹا ہے تو متوفی کے بھائی یا بہن مت چنیں۔</p>
          <p>
            نوٹ - اگر متوفی کا بیٹا نہ ہے مگر والد متوفی کے بعد زندہ تھا یا ہے
            تب بھی بھائی یا بہن مت چنیں۔
          </p>
        </div>

        {/* Calculate Button */}
        {/* <Button className="w-full" variant="default">
          Calculate Inheritance Shares
        </Button> */}
      </div>
    </section>
  );
}
