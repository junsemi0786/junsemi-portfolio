import { readContent, writeContent } from "./content-store";
import defaultData from "../../data/main-page.json";
export interface MainPageData {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  stats: {
    yearsExp: string;
    yearsLabel: string;
    successRate: string;
    successLabel: string;
    support: string;
    supportLabel: string;
  };
  cta: {
    title: string;
    description: string;
  };
}

export async function getMainPageData(): Promise<MainPageData> {
  return readContent("main_page_data_v2", "main-page.json", defaultData);
}
export async function updateMainPageData(data: MainPageData) {
  await writeContent("main_page_data_v2", data);
}
