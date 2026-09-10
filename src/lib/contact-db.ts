import { readContent, writeContent } from "./content-store";
export interface ContactInfo {
  email: string;
  address: string;
  transport?: string;
  mapMessage?: string;
}
function clean(data: ContactInfo): ContactInfo {
  return {
    email: data.email || "hello@junsemi.co.kr",
    address: data.address || "",
    transport: data.transport,
    mapMessage: data.mapMessage,
  };
}
export async function getContactInfo() {
  return clean(
    await readContent<ContactInfo>("contact_info", "contact.json", {
      email: "hello@junsemi.co.kr",
      address: "",
    }),
  );
}
export async function updateContactInfo(data: ContactInfo) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    throw new Error("이메일 주소를 확인해 주세요.");
  await writeContent("contact_info", clean(data));
}
