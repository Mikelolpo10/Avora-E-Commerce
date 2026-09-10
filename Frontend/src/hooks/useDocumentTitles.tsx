import { useEffect } from "react";
import capitalize from "@/utils/capitalize";

export function useDocumentTitle(title: string, errorTitle: string) {
  useEffect(() => {
    if (!title) {
      document.title = errorTitle;
    } else {
      document.title = `${capitalize(title)}'s Collection | AVORA`;
    }
  }, [title, errorTitle]);
}