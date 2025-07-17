"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

type FAQ = {
  id: number;
  category: string;
  question_en: string;
  answer_en: string;
  question_ur: string;
  answer_ur: string;
};

const ITEMS_PER_PAGE = 5;

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState<"en" | "ur">("ur");
  const [selectedCategory, setSelectedCategory] = useState<"All" | string>(
    "All"
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/data/faqs.json")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setFilteredFaqs(data);
      });
  }, []);

  useEffect(() => {
    let results = [...faqs];

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((faq) => faq.category === selectedCategory);
    }

    // Search with fuse.js
    if (searchTerm.trim() !== "") {
      const fuse = new Fuse(results, {
        keys:
          language === "en"
            ? ["question_en", "answer_en"]
            : ["question_ur", "answer_ur"],
        threshold: 0.3,
      });
      results = fuse.search(searchTerm).map((r) => r.item);
    }

    setFilteredFaqs(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, language, faqs]);

  const paginatedFaqs = filteredFaqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE);

  //const uniqueCategories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];
  return (
    <div className="space-y-6 mt-2">
      <div>
        <h2 className="text-3xl font-bold text-center w-full">
          <span className="text-nafees md:text-xl text-lg leading-relaxed font-semibold">
            عمومی سوالات
          </span>{" "}
          / FAQs
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder={
            language === "en" ? "Search FAQs..." : "سوال تلاش کریں..."
          }
          className="w-full px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {language === "en" ? cat : translateCategory(cat)}
            </option>
          ))}
        </select>

        <Button
          onClick={() => setLanguage(language === "en" ? "ur" : "en")}
          className="px-4 py-2 rounded-md"
        >
          {language === "en" ? "اردو" : "English"}
        </Button>
      </div>

      <div className="space-y-4">
        {paginatedFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-800 dark:text-gray-100"
            >
              {language === "en" ? (
                faq.question_en
              ) : (
                <span className="text-nafees md:text-xl text-base font-semibold leading-relaxed">
                  {faq.question_ur}
                </span>
              )}
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 text-base">
                {language === "en" ? (
                  faq.answer_en
                ) : (
                  <span className="text-nafees md:text-xl text-base leading-relaxed">
                    {faq.answer_ur}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500">
            {language === "en" ? (
              "No FAQs found."
            ) : (
              <span className="text-nafees md:text-xl text-base font-semibold">
                کوئی سوال نہیں ملا۔
              </span>
            )}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-primary text-pehla dark:text-pehla-900"
                  : "bg-gray-200 dark:bg-gray-500"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Utility for Urdu categories
function translateCategory(category: string) {
  const translations: Record<string, string> = {
    Taxes: "ٹیکس",
    Inheritance: "وراثت",
    Transfer: "منتقلی",
    General: "عمومی",
    Fees: "فیس",
    All: "تمام",
  };
  return translations[category] || category;
}
