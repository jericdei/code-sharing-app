import CodeSharing from "@/components/code-sharing";
import { prisma } from "@/lib/utils";
import { permanentRedirect } from "next/navigation";

export default async function Page({ params }: { params: { codeId: string } }) {
  const code = await prisma.code.findUnique({
    where: {
      id: params.codeId,
    },
  });

  if (!code) {
    permanentRedirect("/");
  }

  return <CodeSharing code={code} />;
}
