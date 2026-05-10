import { NextResponse, type NextRequest } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { runInitialSeed } from "@/lib/seeds/runInitialSeed";

export const runtime = "nodejs";

function getBearerToken(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length);
}

export async function POST(request: NextRequest) {
  const token = getBearerToken(request);

  if (!token) {
    return NextResponse.json({ error: "Missing authorization token." }, { status: 401 });
  }

  try {
    const auth = getAdminAuth();
    const db = getAdminDb();
    const decodedToken = await auth.verifyIdToken(token);
    const userSnapshot = await db.collection("users").doc(decodedToken.uid).get();
    const role = userSnapshot.data()?.role;

    if (role !== "admin") {
      return NextResponse.json({ error: "Admin role is required." }, { status: 403 });
    }

    const result = await runInitialSeed(db);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Seed failed.", error);

    return NextResponse.json({ error: "Seed failed." }, { status: 500 });
  }
}
