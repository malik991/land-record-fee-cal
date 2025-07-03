"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("bannerDismissed");
    if (!dismissed) {
      setShowBanner(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("bannerDismissed", "true");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex justify-center items-center p-4"
        >
          <Card className="w-full max-w-md rounded-lg bg-red-100 border border-red-300 text-red-900 shadow-xl">
            <div className="relative p-4 space-y-2">
              {/* heading in center with close button floating on right */}
              <div className="relative">
                <h2 className="text-lg font-bold text-center w-full flex justify-center items-center gap-2">
                  🚨 Important Tax Update
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClose}
                  className="absolute top-0 right-0 text-red-900 hover:text-red-700"
                >
                  <X size={18} className="mb-3" />
                </Button>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-center">
                FBR has increased taxes <strong>(236-C & 236-K)</strong> from{" "}
                <strong>1.5%</strong>
                to <strong>11.5%</strong> for filers, late filers, and
                non-filers for 2025–2026.
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
