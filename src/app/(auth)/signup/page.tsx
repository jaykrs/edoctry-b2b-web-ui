import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { appName } from "@/utils/config";

export const metadata: Metadata = {
  title: ` SignUp Page | ${appName}`,
  description: `${appName} SignUp Page TailAdmin Dashboard Template",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
