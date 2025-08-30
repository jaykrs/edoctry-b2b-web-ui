import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { htmlContent , pageName} = body;

    // ✅ templates folder ka path
    const templatesDir = path.join(process.cwd(), "templates");

    // ✅ agar folder exist nahi karta to create kar do
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }

    // ✅ file ka path set karo
    const safeName = pageName;
    const filePath = path.join(templatesDir, `${safeName}.html`);

    // ✅ file save karo
    fs.writeFileSync(filePath, htmlContent, "utf8");

    return NextResponse.json({ message: `File saved as ${safeName}.html` });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Error saving file" }, { status: 500 });
  }
}
