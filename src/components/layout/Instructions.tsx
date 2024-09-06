import HeaderSectionPage from "@/app/compo/headerSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function InstructionsPage() {
  return (
    <section className="lg:mt-6 mt-3">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-y-2">
        <div className="w-full">
          <HeaderSectionPage
            header="Instructions"
            subHeader="ہدایات برائے استعمال"
            isVisible={true}
          />
        </div>
        <div className="lg:w-1/2 w-full h-full rounded-md mt-2">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <iframe
              src="https://www.youtube.com/embed/AnAzmsmx9tE?si=50UcwPKGrefDBeq_"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md h-full w-full"
            ></iframe>
          </AspectRatio>
        </div>

        <div className="lg:w-1/2 w-full p-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>STEP - 1</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col items-end gap-y-1">
                  <p className="text-nafees md:pr-4 md:text-lg text-sm font-semibold">
                    ٹرانسفر ٹائپ سلیکٹ کریں انتقال یا رجسٹری -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm">
                    ٭ نوٹ انتقال کا عمل صرف زرعی رقبہ کی حد تک ہے
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm font-normal">
                    ٭ رجسٹری کا عمل شہری یا اندرون حدود کمیٹی یا ریٹنگ ایریا میں
                    ممکن ہے
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>STEP - 2</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col items-end gap-y-1">
                  <p className="text-nafees pr-4 md:text-lg text-sm font-semibold">
                    انتقال کی قسم سلیکٹ کریں بیع یا وراثت -
                  </p>
                  <p className="text-nafees pr-4 md:text-lg text-sm font-semibold">
                    زمین کی قسم سلیکٹ کریں زرعی یا رہائشی یا اندرون حدود کمیٹی -
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>STEP - 3</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col items-end gap-y-1">
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    اگر ٹرانسفر ٹائپ انتقال ہے تو صرف رقم کا اندراج کریں -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    کچھ انتقالات میں رقم کی ضرورت نہ ہے -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm font-semibold">
                    ٹرانسفر ٹائپ رجسٹری کی صورت میں مندرجہ ذیل کا دھیان رکھیں -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    دستیاب رقبہ صرف فٹ میں لکھیں۔ ورنہ نتائج درست نہ ہوں گے۔ -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    رقبہ کو فٹ میں تبدیل کرنے کے لیے الگ سے دیے گئے کیلکولیٹر کا
                    -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    بلڈنگ کی صورت اگر نقشہ تصدیق شدہ ہے تو منزل سیلیکٹ کرنالازمی
                    ہے۔
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-noraml">
                    اگر کوئی منزل نہ ہے تو 0 سلیکٹ کریں -
                  </p>
                  <p className="text-nafees md:pr-4 md:text-lg text-sm md:font-semibold font-normal">
                    اگر منازل ایک یا زائد ہیں تو سب کا تعمیری رقبہ فٹ میں ایک
                    دفعہ درج کریں -
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
