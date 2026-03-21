// import { NextResponse } from "next/server";
// import { Client } from "basic-ftp";
// import { Readable } from "stream";

// const cleanFileName = (name: string) => {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9\-]/g, "-")
//     .replace(/-+/g, "-")
//     .replace(/^-|-$/g, "");
// };

// export async function POST(req: Request) {
//   let client: Client | null = null;

//   try {
//     const { htmlContent, pageName, ftpUser, path } = await req.json();

//     if (!htmlContent || !pageName) {
//       return NextResponse.json(
//         { success: false, message: "Missing html or page name" },
//         { status: 400 }
//       );
//     }

//     const fileName = cleanFileName(pageName) + ".html";

//     client = new Client();
//     client.ftp.verbose = true;

//     await client.access({
//       host: process.env.FTP_HOST!,
//       user: ftpUser !,
//       password: process.env.FTP_PASS!,
//       secure: false
//     });

//     await client.cd("httpdocs");

//     const buffer = Buffer.from(htmlContent, "utf-8");
//     const stream = Readable.from(buffer);

//     await client.uploadFrom(stream, fileName);
//     client.close();

//     return NextResponse.json({
//       success: true,
//       message: "Page published successfully",
//       file: fileName
//     });

//   } catch (error: any) {
//     console.error("FTP Publish Error FULL:", error);
//     if (client) client.close();

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "FTP upload failed"
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { Client } from "basic-ftp";
import { Readable } from "stream";

const cleanFileName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export async function POST(req: Request) {
  let client: Client | null = null;

  try {
    const { htmlContent, pageName, ftpUser, path } = await req.json();

    if (!htmlContent || !pageName) {
      return NextResponse.json(
        { success: false, message: "Missing html or page name" },
        { status: 400 }
      );
    }

    const fileName = cleanFileName(pageName) + ".html";

    client = new Client();
    client.ftp.verbose = true;

    await client.access({
      host: process.env.FTP_HOST!,
      user: ftpUser!,
      password: process.env.FTP_PASS!,
      secure: false
    });

    // 🔥 go to root folder
    await client.cd("httpdocs");

    const pathString = path || "";
    const folders = pathString.split("/").filter(Boolean);

    // 🔥 create buffer once
    const buffer = Buffer.from(htmlContent, "utf-8");
    const stream = Readable.from(buffer);

    // 🔥 CASE 1: NO PATH → direct upload
    if (folders.length === 0) {
      await client.uploadFrom(stream, fileName);
    }

    // 🔥 CASE 2: PATH EXISTS → auto create + navigate
    else {
      const fullPath = folders.join("/");

      // 🔥 ye automatically folder create + navigate karega
      await client.ensureDir(fullPath);

      await client.uploadFrom(stream, fileName);
    }

    client.close();

    return NextResponse.json({
      success: true,
      message: "Page published successfully",
      file: fileName,
      path: pathString || "root"
    });

  } catch (error: any) {
    console.error("FTP Publish Error FULL:", error);

    if (client) client.close();

    return NextResponse.json(
      {
        success: false,
        message: error.message || "FTP upload failed"
      },
      { status: 500 }
    );
  }
}