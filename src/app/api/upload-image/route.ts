import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { Client } from "basic-ftp";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file: any = formData.get("image");
        const ftpUser = formData.get("ftpUser") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        if (!ftpUser) {
            return NextResponse.json(
                { error: "Missing FTP user" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const metadata = await sharp(buffer).metadata();
        const format = metadata.format || "jpeg";

        let compressedBuffer = buffer;
        let quality = 60;

        while (quality >= 20) {
            if (format === "png") {
                compressedBuffer = await sharp(buffer)
                    .png({ quality, compressionLevel: 9 })
                    .toBuffer();
            } else {
                compressedBuffer = await sharp(buffer)
                    .jpeg({ quality })
                    .toBuffer();
            }

            if (compressedBuffer.length <= 100 * 1024) break;

            quality -= 5;
        }


        const fileName = file.name;

        const client = new Client();

        await client.access({
            host: process.env.FTP_HOST!,
            user: ftpUser,
            password: process.env.FTP_PASS!,
            secure: false,
        });

        await client.cd("httpdocs");
        await client.ensureDir("images");
        await client.cd("..");

        await client.uploadFrom(
            Readable.from(compressedBuffer),
            `images/${fileName}`
        );

        client.close();

        return NextResponse.json({
            success: true,
            imageUrl: `/images/${fileName}`,
            sizeInKB: Math.round(compressedBuffer.length / 1024),
        });

    } catch (error: any) {
        console.error("Upload Error:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
