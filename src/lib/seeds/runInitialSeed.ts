import type { Firestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { checklistTemplateSeeds } from "./checklistTemplates";
import { counterSeeds } from "./counters";
import { inventoryTemplateSeeds } from "./inventoryTemplates";
import { serviceSeeds } from "./services";

type SeedResult = {
  collection: string;
  written: number;
  skipped: number;
};

async function upsertSeedDocs(
  db: Firestore,
  collectionName: string,
  seeds: Array<Record<string, unknown> & { id: string }>,
): Promise<SeedResult> {
  const existingSnapshots = await Promise.all(
    seeds.map((seed) => db.collection(collectionName).doc(seed.id).get()),
  );

  const batch = db.batch();

  seeds.forEach((seed, index) => {
    const ref = db.collection(collectionName).doc(seed.id);
    const exists = existingSnapshots[index].exists;

    batch.set(
      ref,
      {
        ...seed,
        ...(exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  await batch.commit();

  return {
    collection: collectionName,
    written: seeds.length,
    skipped: 0,
  };
}

async function seedCounters(db: Firestore): Promise<SeedResult> {
  const refs = counterSeeds.map((seed) => db.collection("counters").doc(seed.id));
  const snapshots = await Promise.all(refs.map((ref) => ref.get()));
  const batch = db.batch();
  let written = 0;
  let skipped = 0;

  counterSeeds.forEach((seed, index) => {
    const exists = snapshots[index].exists;

    if (exists) {
      skipped += 1;
      return;
    }

    written += 1;
    batch.set(refs[index], {
      ...seed,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  if (written > 0) {
    await batch.commit();
  }

  return {
    collection: "counters",
    written,
    skipped,
  };
}

export async function runInitialSeed(db: Firestore) {
  const results = await Promise.all([
    upsertSeedDocs(db, "services", [...serviceSeeds]),
    upsertSeedDocs(db, "checklistTemplates", checklistTemplateSeeds),
    upsertSeedDocs(db, "inventoryTemplates", inventoryTemplateSeeds),
    seedCounters(db),
  ]);

  return {
    ok: true,
    results,
  };
}
