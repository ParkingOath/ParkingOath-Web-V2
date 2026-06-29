import { permanentRedirect } from "next/navigation";

export default function HostPage() {
  permanentRedirect("/hosts");
}
