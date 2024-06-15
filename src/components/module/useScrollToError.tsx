import { useEffect } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

const useScrollToError = (errors: any) => {
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      //console.log("error", errors);

      // Get the first error field name
      const firstErrorFieldName = Object.keys(errors)[0];
      //console.log("First Error Field Name:", firstErrorFieldName);

      const errorField = document.querySelector(
        `[name="${Object.keys(errors)[0]}"]`
      );
      //console.log("Error Field Element:", errorField);

      if (errorField) {
        scrollIntoView(errorField, {
          scrollMode: "if-needed",
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [errors]);
};

export default useScrollToError;
