import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type Firestore,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Validator } from "@/lib/validation/schema";

type IdentifiedDocument = {
  id: string;
};

type RepositoryOptions<TCreate> = {
  collectionName: string;
  validateCreate: Validator<TCreate>;
  firestore?: Firestore;
};

function mapSnapshot<TDocument>(snapshot: QueryDocumentSnapshot<DocumentData>): TDocument {
  return snapshot.data() as TDocument;
}

export function createRepository<
  TDocument extends IdentifiedDocument,
  TCreate extends IdentifiedDocument,
  TUpdate extends Record<string, unknown>,
>({ collectionName, validateCreate, firestore = db }: RepositoryOptions<TCreate>) {
  async function create(input: TCreate) {
    const validation = validateCreate(input);

    if (!validation.ok) {
      throw new Error(validation.errors.join(" "));
    }

    const ref = doc(firestore, collectionName, input.id);
    const payload = {
      ...validation.data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, payload, { merge: false });

    return input.id;
  }

  async function upsert(input: TCreate) {
    const validation = validateCreate(input);

    if (!validation.ok) {
      throw new Error(validation.errors.join(" "));
    }

    const ref = doc(firestore, collectionName, input.id);
    const existingSnapshot = await getDoc(ref);
    const payload = {
      ...validation.data,
      ...(existingSnapshot.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, payload, { merge: true });

    return input.id;
  }

  async function getById(id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as TDocument;
  }

  async function list(maxResults = 50) {
    const collectionQuery = query(
      collection(firestore, collectionName),
      orderBy("createdAt", "desc"),
      limit(maxResults),
    );
    const snapshot = await getDocs(collectionQuery);

    return snapshot.docs.map((documentSnapshot) => mapSnapshot<TDocument>(documentSnapshot));
  }

  async function update(id: string, input: TUpdate) {
    const ref = doc(firestore, collectionName, id);

    await updateDoc(ref, {
      ...input,
      updatedAt: serverTimestamp(),
    });

    return id;
  }

  async function deactivate(id: string) {
    await update(id, { active: false } as unknown as TUpdate);

    return id;
  }

  return {
    create,
    upsert,
    getById,
    list,
    update,
    deactivate,
  };
}
