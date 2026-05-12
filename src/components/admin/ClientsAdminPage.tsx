"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ClientDocument, ClientType, CreateClientInput } from "@/lib/domain/clients";
import { clientTypeOptions } from "@/lib/domain/clients";
import { clientsRepository } from "@/lib/firestore/clients";

type ClientFormState = {
  id: string;
  name: string;
  clientType: ClientType;
  phone: string;
  email: string;
  notes: string;
};

const emptyForm: ClientFormState = {
  id: "",
  name: "",
  clientType: "residential",
  phone: "",
  email: "",
  notes: "",
};

function normalizeOptionalText(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue ? trimmedValue : null;
}

function createClientId() {
  return `CLI-${Date.now().toString().slice(-8)}`;
}

function formatDate(value: ClientDocument["createdAt"]) {
  if (!value?.toDate) {
    return "Just now";
  }

  return value.toDate().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ClientsAdminPage() {
  const [clients, setClients] = useState<ClientDocument[]>([]);
  const [form, setForm] = useState<ClientFormState>(emptyForm);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const activeClients = useMemo(
    () => clients.filter((client) => client.active),
    [clients],
  );
  const inactiveClients = useMemo(
    () => clients.filter((client) => !client.active),
    [clients],
  );

  async function loadClients() {
    setLoading(true);
    setError("");

    try {
      const nextClients = await clientsRepository.list(100);
      setClients(nextClients);
    } catch (caught) {
      console.error("Could not load clients.", caught);
      setError("Could not load clients. Check Firestore permissions and indexes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadClients();
  }, []);

  function updateForm<K extends keyof ClientFormState>(field: K, value: ClientFormState[K]) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingClientId(null);
  }

  function startEditing(client: ClientDocument) {
    setEditingClientId(client.id);
    setForm({
      id: client.id,
      name: client.name,
      clientType: client.clientType,
      phone: client.phone ?? "",
      email: client.email ?? "",
      notes: client.notes ?? "",
    });
    setNotice("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const id = editingClientId ?? createClientId();
    const payload: CreateClientInput = {
      id,
      name: form.name.trim(),
      clientType: form.clientType,
      phone: normalizeOptionalText(form.phone),
      email: normalizeOptionalText(form.email),
      notes: normalizeOptionalText(form.notes),
      active: true,
    };

    try {
      if (editingClientId) {
        await clientsRepository.update(editingClientId, {
          name: payload.name,
          clientType: payload.clientType,
          phone: payload.phone,
          email: payload.email,
          notes: payload.notes,
          active: true,
        });
        setNotice("Client updated.");
      } else {
        await clientsRepository.create(payload);
        setNotice("Client created.");
      }

      resetForm();
      await loadClients();
    } catch (caught) {
      console.error("Could not save client.", caught);
      setError(caught instanceof Error ? caught.message : "Could not save client.");
    } finally {
      setSaving(false);
    }
  }

  async function deactivateClient(client: ClientDocument) {
    setError("");
    setNotice("");

    try {
      await clientsRepository.deactivate(client.id);
      setNotice(`${client.name} was deactivated.`);
      await loadClients();
    } catch (caught) {
      console.error("Could not deactivate client.", caught);
      setError("Could not deactivate client.");
    }
  }

  return (
    <section className="clients-admin">
      <div className="admin-section-heading">
        <p className="admin-kicker">Clients</p>
        <h2>Client records</h2>
        <p>Manage client profiles used later by properties, jobs, invoices, and schedules.</p>
      </div>

      <div className="clients-grid">
        <form className="admin-form-panel" onSubmit={handleSubmit}>
          <div>
            <p className="admin-kicker">{editingClientId ? "Edit client" : "New client"}</p>
            <h3>{editingClientId ? form.name : "Create client"}</h3>
          </div>

          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              required
            />
          </label>

          <label>
            Type
            <select
              value={form.clientType}
              onChange={(event) => updateForm("clientType", event.target.value as ClientType)}
            >
              {clientTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Phone
            <input
              value={form.phone}
              onChange={(event) => updateForm("phone", event.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
            />
          </label>

          <label>
            Notes
            <textarea
              value={form.notes}
              onChange={(event) => updateForm("notes", event.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}
          {notice && <p className="success-text">{notice}</p>}

          <div className="admin-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingClientId ? "Save changes" : "Create client"}
            </button>
            {editingClientId && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-list-panel">
          <div className="admin-list-heading">
            <h3>Active clients</h3>
            <span>{activeClients.length}</span>
          </div>

          {loading ? (
            <p className="muted-text">Loading clients...</p>
          ) : activeClients.length === 0 ? (
            <p className="muted-text">No active clients yet.</p>
          ) : (
            <div className="client-list">
              {activeClients.map((client) => (
                <article className="client-row" key={client.id}>
                  <div>
                    <h4>{client.name}</h4>
                    <p>
                      {clientTypeOptions.find((option) => option.value === client.clientType)
                        ?.label ?? client.clientType}
                    </p>
                    <small>
                      {client.email ?? "No email"} · {client.phone ?? "No phone"} · Created{" "}
                      {formatDate(client.createdAt)}
                    </small>
                  </div>

                  <div className="client-row-actions">
                    <button type="button" className="secondary-button" onClick={() => startEditing(client)}>
                      Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => deactivateClient(client)}>
                      Deactivate
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {inactiveClients.length > 0 && (
            <div className="inactive-clients">
              <h3>Inactive clients</h3>
              {inactiveClients.map((client) => (
                <p key={client.id}>
                  {client.name} <span>{client.id}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
