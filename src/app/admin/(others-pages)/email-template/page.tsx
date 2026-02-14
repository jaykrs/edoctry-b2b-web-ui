import EmailTemplateClient from "@/components/EmailTemplateClient/EmailTemplateClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pid?: string }>;
}) {
  const params = await searchParams;

  return <EmailTemplateClient pid={params?.pid} />;
}
