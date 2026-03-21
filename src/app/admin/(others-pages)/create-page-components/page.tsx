import CreateComponent from "@/components/create-page-components/Create-component";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pid?: string }>;
}) {
  const params = await searchParams;

  return <CreateComponent pid={params?.pid} />;
}
