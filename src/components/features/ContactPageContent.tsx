import ContactForm from "@/components/home/ContactForm";
import type { ContactInfo } from "@/lib/contact-db";
export default function ContactPageContent({ info }: { info: ContactInfo }) {
  return <ContactForm email={info.email} />;
}
