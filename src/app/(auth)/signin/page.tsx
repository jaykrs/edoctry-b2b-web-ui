import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";
import { appName } from "@/utils/config";

export const metadata: Metadata = {
  title: ` SignIn Page | ${appName}`,
  description: `${appName} Signin `,
};

export default function SignIn() {
  return <SignInForm />;
}
