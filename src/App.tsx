import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import legacyHtml from "./legacy.html?raw";
import { api } from "../convex/_generated/api";

type AdminApp = {
  _id: string;
  company: string;
  status: string;
  createdAt?: number;
  documents?: { label: string; url: string }[];
};

type AdminLog = {
  _id: string;
  action: string;
  targetType: string;
  targetId: string;
  status: string;
  reason?: string;
  createdAt: number;
};

function SellerDashboard({
  data,
  onCreate,
  onUpload,
  onUpdateInventory,
  approved,
}: {
  data: any;
  onCreate: (payload: {
    name: string;
    category: string;
    price: number;
    image: string;
    imageStorageId?: string;
    desc: string;
    uses: string;
  }) => void;
  onUpload: (file: File) => Promise<{ storageId: string }>;
  onUpdateInventory: (payload: {
    listingId: string;
    availableTons?: number;
    cutoffHour?: number;
    nextRestockAt?: number;
  }) => void;
  approved: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    desc: "",
    uses: "",
  });
  const [uploading, setUploading] = useState(false);
  const [imageStorageId, setImageStorageId] = useState<string | null>(null);
  const [inventoryDraft, setInventoryDraft] = useState<Record<string, any>>({});

  if (!approved) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <h1>Seller Dashboard</h1>
          <p>Your seller account is not approved yet.</p>
          <a className="admin-link" href="#home">
            Back to site
          </a>
        </div>
      </div>
    );
  }

  const listings = data?.listings ?? [];
  const orders = data?.orders ?? [];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Seller</div>
          <h1>Seller Dashboard</h1>
          <p>Manage your sand listings and incoming orders.</p>
        </div>
        <a className="admin-link" href="#home">
          Back to site
        </a>
      </header>

      <section className="admin-list">
        <div className="admin-list-header">
          <h2>Add New Sand Type</h2>
        </div>
        <div className="admin-form-grid">
          <input
            placeholder="Sand name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Category (construction/industrial)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            placeholder="Price per ton"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const res = await onUpload(file);
                setImageStorageId(res.storageId);
              } finally {
                setUploading(false);
              }
            }}
          />
          <input
            placeholder="Short description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <input
            placeholder="Uses (comma separated)"
            value={form.uses}
            onChange={(e) => setForm({ ...form, uses: e.target.value })}
          />
        </div>
        <button
          className="admin-primary"
          onClick={() => {
            if (!form.name || !form.category || !form.price || !imageStorageId) {
              return;
            }
            onCreate({
              name: form.name,
              category: form.category,
              price: Number(form.price),
              image: "",
              imageStorageId: imageStorageId || undefined,
              desc: form.desc,
              uses: form.uses,
            });
            setForm({
              name: "",
              category: "",
              price: "",
              image: "",
              desc: "",
              uses: "",
            });
            setImageStorageId(null);
          }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Sand Type"}
        </button>
      </section>

      <section className="admin-grid">
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Your Listings</h2>
            <span>{listings.length}</span>
          </div>
          {listings.length === 0 ? (
            <div className="admin-empty">No listings yet.</div>
          ) : (
            listings.map((l: any) => (
              <div className="admin-row" key={l._id}>
                <div>
                  <div className="admin-company">{l.sand?.name}</div>
                  <div className="admin-status">
                    ₹{Number(l.price).toLocaleString("en-IN")} / ton
                  </div>
                  <div className="admin-status" style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <input
                        type="number"
                        placeholder="Available tons"
                        value={
                          inventoryDraft[l._id]?.availableTons ??
                          l.availableTons ??
                          ""
                        }
                        onChange={(e) =>
                          setInventoryDraft((prev) => ({
                            ...prev,
                            [l._id]: {
                              ...prev[l._id],
                              availableTons: e.target.value,
                            },
                          }))
                        }
                        style={{ width: 120 }}
                      />
                      <input
                        type="number"
                        placeholder="Cutoff hour"
                        value={
                          inventoryDraft[l._id]?.cutoffHour ??
                          l.cutoffHour ??
                          ""
                        }
                        onChange={(e) =>
                          setInventoryDraft((prev) => ({
                            ...prev,
                            [l._id]: {
                              ...prev[l._id],
                              cutoffHour: e.target.value,
                            },
                          }))
                        }
                        style={{ width: 120 }}
                      />
                      <input
                        type="date"
                        value={
                          inventoryDraft[l._id]?.nextRestockAt ??
                          (l.nextRestockAt
                            ? new Date(l.nextRestockAt)
                                .toISOString()
                                .slice(0, 10)
                            : "")
                        }
                        onChange={(e) =>
                          setInventoryDraft((prev) => ({
                            ...prev,
                            [l._id]: {
                              ...prev[l._id],
                              nextRestockAt: e.target.value,
                            },
                          }))
                        }
                      />
                      <button
                        className="admin-primary"
                        onClick={() => {
                          const draft = inventoryDraft[l._id] ?? {};
                          const availableTons =
                            draft.availableTons === "" ||
                            draft.availableTons === undefined
                              ? undefined
                              : Number(draft.availableTons);
                          const cutoffHour =
                            draft.cutoffHour === "" ||
                            draft.cutoffHour === undefined
                              ? undefined
                              : Number(draft.cutoffHour);
                          const nextRestockAt = draft.nextRestockAt
                            ? new Date(draft.nextRestockAt).getTime()
                            : undefined;
                          onUpdateInventory({
                            listingId: l._id,
                            availableTons,
                            cutoffHour,
                            nextRestockAt,
                          });
                        }}
                      >
                        Save Inventory
                      </button>
                    </div>
                  </div>
                </div>
                <div className="admin-status">{l.sand?.category}</div>
              </div>
            ))
          )}
        </div>
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Orders</h2>
            <span>{orders.length}</span>
          </div>
          {orders.length === 0 ? (
            <div className="admin-empty">No orders yet.</div>
          ) : (
            orders.map((o: any) => (
              <div className="admin-row" key={o._id}>
                <div>
                  <div className="admin-company">{o.orderNumber}</div>
                  <div className="admin-status">
                    {o.sandName} • {o.status}
                  </div>
                </div>
                <div className="admin-status">₹{o.total}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function TransportDashboard({
  data,
  onAddVehicle,
  approved,
}: {
  data: any;
  onAddVehicle: (payload: {
    label: string;
    capacity: string;
    vehicleType: string;
  }) => void;
  approved: boolean;
}) {
  const [vehicle, setVehicle] = useState({
    label: "",
    capacity: "",
    vehicleType: "",
  });

  if (!approved) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <h1>Transport Dashboard</h1>
          <p>Your transport account is not approved yet.</p>
          <a className="admin-link" href="#home">
            Back to site
          </a>
        </div>
      </div>
    );
  }

  const vehicles = data?.vehicles ?? [];
  const orders = data?.orders ?? [];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Transport</div>
          <h1>Transport Dashboard</h1>
          <p>Manage your fleet and assigned deliveries.</p>
        </div>
        <a className="admin-link" href="#home">
          Back to site
        </a>
      </header>

      <section className="admin-list">
        <div className="admin-list-header">
          <h2>Add Vehicle</h2>
        </div>
        <div className="admin-form-grid">
          <input
            placeholder="Vehicle name"
            value={vehicle.label}
            onChange={(e) => setVehicle({ ...vehicle, label: e.target.value })}
          />
          <input
            placeholder="Capacity"
            value={vehicle.capacity}
            onChange={(e) =>
              setVehicle({ ...vehicle, capacity: e.target.value })
            }
          />
          <input
            placeholder="Type (Tipper/Trailer)"
            value={vehicle.vehicleType}
            onChange={(e) =>
              setVehicle({ ...vehicle, vehicleType: e.target.value })
            }
          />
        </div>
        <button
          className="admin-primary"
          onClick={() => {
            if (!vehicle.label || !vehicle.capacity || !vehicle.vehicleType) {
              return;
            }
            onAddVehicle(vehicle);
            setVehicle({ label: "", capacity: "", vehicleType: "" });
          }}
        >
          Add Vehicle
        </button>
      </section>

      <section className="admin-grid">
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Your Vehicles</h2>
            <span>{vehicles.length}</span>
          </div>
          {vehicles.length === 0 ? (
            <div className="admin-empty">No vehicles added.</div>
          ) : (
            vehicles.map((v: any) => (
              <div className="admin-row" key={v._id}>
                <div>
                  <div className="admin-company">{v.label}</div>
                  <div className="admin-status">
                    {v.vehicleType} • {v.capacity}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Assigned Orders</h2>
            <span>{orders.length}</span>
          </div>
          {orders.length === 0 ? (
            <div className="admin-empty">No assigned orders.</div>
          ) : (
            orders.map((o: any) => (
              <div className="admin-row" key={o._id}>
                <div>
                  <div className="admin-company">{o.orderNumber}</div>
                  <div className="admin-status">
                    Pickup: {o.pickupLocation || "TBD"}
                  </div>
                </div>
                <div className="admin-status">Deliver: {o.address}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function AdminPanel({
  isAdmin,
  adminSnapshot,
  onClearAudit,
  onApproveSeller,
  onRejectSeller,
  onApproveTransport,
  onRejectTransport,
  onRevokeSeller,
  onRevokeTransporter,
  onSignIn,
}: {
  isAdmin: boolean;
  adminSnapshot: any;
  onClearAudit: () => void;
  onApproveSeller: (id: string) => void;
  onRejectSeller: (id: string) => void;
  onApproveTransport: (id: string) => void;
  onRejectTransport: (id: string) => void;
  onRevokeSeller: (userId: string, reason: string) => void;
  onRevokeTransporter: (userId: string, reason: string) => void;
  onSignIn: () => void;
}) {
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [selectedKind, setSelectedKind] = useState<
    "seller" | "transport" | null
  >(null);
  const [revokeTarget, setRevokeTarget] = useState<{
    type: "seller" | "transporter";
    userId: string;
    name: string;
  } | null>(null);
  const [revokeReason, setRevokeReason] = useState("");
  const pendingSellers = (adminSnapshot?.latestSellers ??
    []) as AdminApp[];
  const pendingTransport = (adminSnapshot?.latestTransporters ??
    []) as AdminApp[];
  const totals = adminSnapshot?.totals ?? null;
  const auditLogs = (adminSnapshot?.auditLogs ?? []) as AdminLog[];
  const approvedSellers = (adminSnapshot?.approvedSellers ?? []) as any[];
  const approvedTransporters = (adminSnapshot?.approvedTransporters ?? []) as any[];

  if (!isAdmin) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <h1>Admin Access</h1>
          <p>Only approved Google accounts can access the admin panel.</p>
          <button className="admin-primary" onClick={onSignIn}>
            Sign in with Google
          </button>
          <a className="admin-link" href="#home">
            Back to site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Sandify</div>
          <h1>Admin Dashboard</h1>
          <p>Review and approve marketplace applications.</p>
        </div>
        <a className="admin-link" href="#home">
          Back to site
        </a>
      </header>

      {totals ? (
        <section className="admin-metrics">
          <div className="admin-metric">
            <div className="admin-metric-label">Users</div>
            <div className="admin-metric-value">{totals.users}</div>
          </div>
          <div className="admin-metric">
            <div className="admin-metric-label">Orders</div>
            <div className="admin-metric-value">{totals.orders}</div>
          </div>
          <div className="admin-metric">
            <div className="admin-metric-label">Seller Apps</div>
            <div className="admin-metric-value">{totals.sellers}</div>
          </div>
          <div className="admin-metric">
            <div className="admin-metric-label">Transport Apps</div>
            <div className="admin-metric-value">{totals.transporters}</div>
          </div>
          <div className="admin-metric">
            <div className="admin-metric-label">Quote Requests</div>
            <div className="admin-metric-value">{totals.quotes ?? 0}</div>
          </div>
        </section>
      ) : null}

      <section className="admin-grid">
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Pending Sellers</h2>
            <span>{pendingSellers.length}</span>
          </div>
          {pendingSellers.length === 0 ? (
            <div className="admin-empty">No pending seller applications.</div>
          ) : (
            pendingSellers.map((app) => (
              <div className="admin-row" key={app._id}>
                <div>
                  <div className="admin-company">{app.company}</div>
                <div className="admin-status">Status: {app.status}</div>
              </div>
              <div className="admin-actions">
                <button
                  className="admin-primary"
                  onClick={() => {
                    setSelectedApp(app);
                    setSelectedKind("seller");
                  }}
                >
                  View
                </button>
                <button
                  className="admin-approve"
                  onClick={() => onApproveSeller(app._id)}
                >
                  Approve
                  </button>
                  <button
                    className="admin-reject"
                    onClick={() => onRejectSeller(app._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Pending Transporters</h2>
            <span>{pendingTransport.length}</span>
          </div>
          {pendingTransport.length === 0 ? (
            <div className="admin-empty">
              No pending transport applications.
            </div>
          ) : (
            pendingTransport.map((app) => (
              <div className="admin-row" key={app._id}>
                <div>
                  <div className="admin-company">{app.company}</div>
                <div className="admin-status">Status: {app.status}</div>
              </div>
              <div className="admin-actions">
                <button
                  className="admin-primary"
                  onClick={() => {
                    setSelectedApp(app);
                    setSelectedKind("transport");
                  }}
                >
                  View
                </button>
                <button
                  className="admin-approve"
                  onClick={() => onApproveTransport(app._id)}
                >
                  Approve
                  </button>
                  <button
                    className="admin-reject"
                    onClick={() => onRejectTransport(app._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedApp ? (
        <div className="admin-modal">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h2>
                {selectedKind === "seller"
                  ? "Seller Application"
                  : "Transport Application"}
              </h2>
              <button
                className="admin-modal-close"
                onClick={() => {
                  setSelectedApp(null);
                  setSelectedKind(null);
                }}
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <div>
                <div className="admin-modal-label">Company</div>
                <div className="admin-modal-value">{selectedApp.company}</div>
              </div>
              <div>
                <div className="admin-modal-label">Contact</div>
                <div className="admin-modal-value">
                  {selectedApp.contactName}
                </div>
              </div>
              <div>
                <div className="admin-modal-label">Email</div>
                <div className="admin-modal-value">{selectedApp.email}</div>
              </div>
              <div>
                <div className="admin-modal-label">Phone</div>
                <div className="admin-modal-value">{selectedApp.phone}</div>
              </div>
              {selectedKind === "seller" ? (
                <>
                  <div>
                    <div className="admin-modal-label">Location</div>
                    <div className="admin-modal-value">
                      {selectedApp.location}
                    </div>
                  </div>
                  <div>
                    <div className="admin-modal-label">Details</div>
                    <div className="admin-modal-value">
                      {selectedApp.details}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="admin-modal-label">Base Location</div>
                    <div className="admin-modal-value">
                      {selectedApp.baseLocation}
                    </div>
                  </div>
                  <div>
                    <div className="admin-modal-label">Vehicle Type</div>
                    <div className="admin-modal-value">
                      {selectedApp.vehicleType}
                    </div>
                  </div>
                  <div>
                    <div className="admin-modal-label">Capacity</div>
                    <div className="admin-modal-value">
                      {selectedApp.capacity}
                    </div>
                  </div>
                </>
              )}
              <div>
                <div className="admin-modal-label">Documents</div>
                <div className="admin-modal-value">
                  {selectedApp.documents && selectedApp.documents.length > 0 ? (
                    <div className="admin-docs">
                      {selectedApp.documents.map((doc: any) => {
                        const isImage = (doc.url || "").match(
                          /\.(png|jpe?g|gif|webp)$/i,
                        );
                        return (
                          <div className="admin-doc" key={doc.url}>
                            <div className="admin-doc-title">{doc.label}</div>
                            {doc.url ? (
                              isImage ? (
                                <img src={doc.url} alt={doc.label} />
                              ) : (
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View document
                                </a>
                              )
                            ) : (
                              <span>Unavailable</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span>No documents uploaded.</span>
                  )}
                </div>
              </div>
            </div>
            <div className="admin-modal-actions">
              {selectedKind === "seller" ? (
                <>
                  <button
                    className="admin-approve"
                    onClick={() => {
                      onApproveSeller(selectedApp._id);
                      setSelectedApp(null);
                      setSelectedKind(null);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="admin-reject"
                    onClick={() => {
                      onRejectSeller(selectedApp._id);
                      setSelectedApp(null);
                      setSelectedKind(null);
                    }}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="admin-approve"
                    onClick={() => {
                      onApproveTransport(selectedApp._id);
                      setSelectedApp(null);
                      setSelectedKind(null);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="admin-reject"
                    onClick={() => {
                      onRejectTransport(selectedApp._id);
                      setSelectedApp(null);
                      setSelectedKind(null);
                    }}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <section className="admin-grid" style={{ marginTop: 24 }}>
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Approved Sellers</h2>
            <span>{approvedSellers.length}</span>
          </div>
          {approvedSellers.length === 0 ? (
            <div className="admin-empty">No approved sellers.</div>
          ) : (
            approvedSellers.map((s: any) => (
              <div className="admin-row" key={s._id}>
                <div>
                  <div className="admin-company">{s.company}</div>
                  <div className="admin-status">{s.email}</div>
                </div>
                <div className="admin-actions">
                  <button
                    className="admin-reject"
                    onClick={() => {
                      setRevokeTarget({
                        type: "seller",
                        userId: s.userId,
                        name: s.company,
                      });
                      setRevokeReason("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Approved Transporters</h2>
            <span>{approvedTransporters.length}</span>
          </div>
          {approvedTransporters.length === 0 ? (
            <div className="admin-empty">No approved transporters.</div>
          ) : (
            approvedTransporters.map((t: any) => (
              <div className="admin-row" key={t._id}>
                <div>
                  <div className="admin-company">{t.company}</div>
                  <div className="admin-status">{t.email}</div>
                </div>
                <div className="admin-actions">
                  <button
                    className="admin-reject"
                    onClick={() => {
                      setRevokeTarget({
                        type: "transporter",
                        userId: t.userId,
                        name: t.company,
                      });
                      setRevokeReason("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="admin-list">
          <div className="admin-list-header">
            <h2>Latest Quote Requests</h2>
            <span>{(adminSnapshot?.latestQuotes ?? []).length}</span>
          </div>
          {(adminSnapshot?.latestQuotes ?? []).length === 0 ? (
            <div className="admin-empty">No quote requests yet.</div>
          ) : (
            (adminSnapshot?.latestQuotes ?? []).map((q: any) => (
              <div className="admin-row" key={q._id}>
                <div>
                  <div className="admin-company">
                    {q.quantity} tons • {q.deliveryWindow}
                  </div>
                  <div className="admin-status">{q.address}</div>
                </div>
                <div className="admin-status">{q.status}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {revokeTarget ? (
        <div className="admin-modal">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h2>Remove {revokeTarget.name}</h2>
              <button
                className="admin-modal-close"
                onClick={() => setRevokeTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <div>
                <div className="admin-modal-label">Reason</div>
                <textarea
                  className="admin-modal-textarea"
                  rows={4}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="Explain the violation..."
                />
              </div>
            </div>
            <div className="admin-modal-actions">
              <button
                className="admin-reject"
                onClick={() => {
                  if (!revokeReason.trim()) {
                    return;
                  }
                  if (revokeTarget.type === "seller") {
                    onRevokeSeller(revokeTarget.userId, revokeReason.trim());
                  } else {
                    onRevokeTransporter(
                      revokeTarget.userId,
                      revokeReason.trim(),
                    );
                  }
                  setRevokeTarget(null);
                }}
              >
                Confirm Remove
              </button>
              <button
                className="admin-primary"
                onClick={() => setRevokeTarget(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="admin-list admin-audit">
        <div className="admin-list-header">
          <h2>Audit Log</h2>
          <span>{auditLogs.length}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="admin-primary"
            onClick={() => {
              if (confirm("Clear all audit logs?")) {
                onClearAudit();
              }
            }}
          >
            Clear Log
          </button>
        </div>
        {auditLogs.length === 0 ? (
          <div className="admin-empty">No admin actions yet.</div>
        ) : (
          auditLogs.map((log) => (
            <div className="admin-row" key={log._id}>
              <div>
                <div className="admin-company">
                  {log.targetType.replace("_", " ")}
                </div>
                <div className="admin-status">
                  {log.action} → {log.status}
                  {log.reason ? ` • ${log.reason}` : ""}
                </div>
              </div>
              <div className="admin-status">
                {new Date(log.createdAt).toLocaleString("en-IN")}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default function App() {
  const { signIn, signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const [bootstrapCache] = useState(() => {
    try {
      const raw = sessionStorage.getItem("sandify_bootstrap");
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as {
        data: { sandTypes: any[]; dealers: any[]; trucks: any[] };
        cachedAt: number;
      };
      if (!parsed?.data || !parsed.cachedAt) {
        return null;
      }
      const maxAgeMs = 5 * 60 * 1000;
      if (Date.now() - parsed.cachedAt > maxAgeMs) {
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  });
  const viewer = useQuery(
    api.users.viewer,
    isAuthenticated ? {} : "skip",
  );
  const profile = useQuery(
    api.users.profile,
    isAuthenticated ? {} : "skip",
  );
  const prefs = useQuery(
    api.users.getPrefs,
    isAuthenticated ? {} : "skip",
  );
  const adminStatus = useQuery(
    api.users.adminStatus,
    isAuthenticated ? {} : "skip",
  );
  const adminSnapshot = useQuery(
    api.admin.adminSnapshot,
    isAuthenticated ? {} : "skip",
  );
  const clearAuditLogs = useMutation(api.admin.clearAuditLogs);
  const revokeSeller = useMutation(api.admin.revokeSeller);
  const revokeTransporter = useMutation(api.admin.revokeTransporter);
  const removeSandType = useMutation(api.admin.removeSandType);
  const submitReview = useMutation(api.reviews.submitReview);
  const calculatePrice = useMutation(api.pricing.calculatePrice);
  const submitQuoteRequest = useMutation(api.quotes.submitQuoteRequest);
  const addTrackingUpdate = useMutation(api.tracking.addTrackingUpdate);
  const notifications = useQuery(
    api.notifications.listMyNotifications,
    isAuthenticated ? {} : "skip",
  );
  const markNotificationsRead = useMutation(
    api.notifications.markAllRead,
  );
  const [selectedSandId, setSelectedSandId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const reviewsForSand = useQuery(
    api.reviews.listReviewsForSand,
    selectedSandId ? ({ sandId: selectedSandId } as any) : "skip",
  );
  const trackingUpdates = useQuery(
    api.tracking.listOrderTracking,
    trackingOrderId ? ({ orderId: trackingOrderId } as any) : "skip",
  );
  const orders = useQuery(
    api.sand.listOrders,
    isAuthenticated ? {} : "skip",
  );
  const quoteRequests = useQuery(
    api.quotes.listMyQuoteRequests,
    isAuthenticated ? {} : "skip",
  );
  const bootstrap = useQuery(api.sand.bootstrap);
  const setPrefs = useMutation(api.users.setPrefs);
  const upsertProfile = useMutation(api.users.upsertProfile);
  const addLocation = useMutation(api.users.addLocation);
  const setDefaultLocation = useMutation(api.users.setDefaultLocation);
  const removeLocation = useMutation(api.users.removeLocation);
  const locations = useQuery(
    api.users.listLocations,
    isAuthenticated ? {} : "skip",
  );
  const createOrder = useMutation(api.sand.createOrder);
  const updateOrderStatus = useMutation(api.sand.updateOrderStatus);
  const submitSellerApplication = useMutation(
    api.applications.submitSellerApplication,
  );
  const submitTransportApplication = useMutation(
    api.applications.submitTransportApplication,
  );
  const generateApplicationUploadUrl = useMutation(
    api.applications.generateApplicationUploadUrl,
  );
  const updateSellerApplicationStatus = useMutation(
    api.applications.updateSellerApplicationStatus,
  );
  const updateTransportApplicationStatus = useMutation(
    api.applications.updateTransportApplicationStatus,
  );
  const partnerStatus = useQuery(
    api.partners.myPartnerStatus,
    isAuthenticated ? {} : "skip",
  );
  const sellerListings = useQuery(api.partners.listSellerListings);
  const transporters = useQuery(api.partners.listTransporters);
  const sellerDashboard = useQuery(
    api.partners.listSellerDashboard,
    partnerStatus?.seller ? {} : "skip",
  );
  const transportDashboard = useQuery(
    api.partners.listTransporterDashboard,
    partnerStatus?.transporter ? {} : "skip",
  );
  const createSandTypeAndListing = useMutation(
    api.partners.createSandTypeAndListing,
  );
  const generateImageUploadUrl = useMutation(
    api.partners.generateImageUploadUrl,
  );
  const addTransporterVehicle = useMutation(
    api.partners.addTransporterVehicle,
  );
  const updateListingInventory = useMutation(
    api.partners.updateListingInventory,
  );
  const [route, setRoute] = useState<string>(
    () => window.location.hash.replace("#", "") || "home",
  );
  const [localSnapshot, setLocalSnapshot] = useState<any>(null);
  const scriptLoaded = useRef(false);
  const bootstrapRef = useRef(bootstrapCache);
  const legacyRoot = useMemo(
    () => ({
      __html: legacyHtml,
    }),
    [],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace("#", "") || "home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (bootstrap?.sandTypes && bootstrap?.dealers && bootstrap?.trucks) {
      sessionStorage.setItem(
        "sandify_bootstrap",
        JSON.stringify({ data: bootstrap, cachedAt: Date.now() }),
      );
      bootstrapRef.current = bootstrap;
    }
  }, [bootstrap]);

  useEffect(() => {
    const data = bootstrapRef.current ?? bootstrap;
    if (!data?.sandTypes || !data?.dealers || !data?.trucks) {
      return;
    }
    (window as any).__sandTypesData = data.sandTypes.map(
      (s: any, index: number) => ({
        ...s,
        id: s.id ?? index + 1,
        dbId: s._id ?? s.id,
      }),
    );
    (window as any).__dealersData = data.dealers.map(
      (d: any, index: number) => ({
        ...d,
        id: d.id ?? index + 1,
      }),
    );
    (window as any).__trucksData = data.trucks.map(
      (t: any, index: number) => ({
        ...t,
        id: t.id ?? index + 1,
        dbId: t._id ?? t.id,
      }),
    );
    if (sellerListings) {
      (window as any).__sellerListingsData = sellerListings.map((l: any) => ({
        ...l,
      }));
    }
    if (transporters) {
      (window as any).__transportersData = transporters.map((t: any) => ({
        ...t,
      }));
    }
    if (scriptLoaded.current || (window as any).__sandifyScriptInjected) {
      return;
    }
    (window as any).__sandifyScriptInjected = true;

    const inject = () => {
      if (document.getElementById("sandify-legacy-script")) {
        return;
      }
      const script = document.createElement("script");
      script.id = "sandify-legacy-script";
      script.src = "/app.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        (window as any).__convexAuthSignIn = signIn;
        (window as any).__convexAuthSignOut = signOut;
        (window as any).__convexSetPrefs = (prefs: {
          location: string;
          theme: string;
        }) => setPrefs(prefs);
        (window as any).__convexSaveProfile = (data: {
          name: string;
          email: string;
          phone: string;
        }) => upsertProfile(data);
        (window as any).__convexCreateOrder = (data: {
          orderNumber: string;
          sandId?: string;
          dealerId?: string;
          truckId?: string;
          sandName: string;
          dealerName: string;
          truckName: string;
          quantity: number;
          total: number;
          paymentMethod: string;
          address: string;
          distanceKm?: number;
          deliveryWindow?: string;
        }) => createOrder(data as any);
        (window as any).__convexUpdateOrderStatus = (data: {
          orderId: string;
          status: string;
        }) => updateOrderStatus(data as any);
        (window as any).__convexSubmitReview = (data: {
          orderId: string;
          rating: number;
          comment: string;
        }) => submitReview(data as any);
        (window as any).__convexCalculatePrice = (data: {
          listingId: string;
          transporterId?: string;
          truckId?: string;
          quantity: number;
          distanceKm: number;
          deliveryWindow: string;
        }) => calculatePrice(data as any);
        (window as any).__convexSubmitQuoteRequest = (data: {
          sandId?: string;
          sellerId?: string;
          quantity: number;
          deliveryWindow: string;
          address: string;
          notes?: string;
        }) => submitQuoteRequest(data as any);
        (window as any).__convexAddTrackingUpdate = (data: {
          orderId: string;
          status: string;
          message: string;
          lat?: number;
          lng?: number;
          etaMinutes?: number;
        }) => addTrackingUpdate(data as any);
        (window as any).__convexSubmitSellerApp = (data: {
          company: string;
          contactName: string;
          phone: string;
          email: string;
          location: string;
          details: string;
          documents?: { label: string; storageId: string }[];
        }) => submitSellerApplication(data as any);
        (window as any).__convexSubmitTransportApp = (data: {
          company: string;
          contactName: string;
          phone: string;
          email: string;
          vehicleType: string;
          capacity: string;
          baseLocation: string;
          documents?: { label: string; storageId: string }[];
        }) => submitTransportApplication(data as any);
        (window as any).__setSelectedSandId = (sandId: string) => {
          setSelectedSandId(sandId);
        };
        (window as any).__setTrackingOrderId = (orderId: string) => {
          setTrackingOrderId(orderId);
        };
        (window as any).__convexRemoveSandType = (data: {
          sandId: string;
          reason?: string;
        }) => removeSandType(data as any);
        (window as any).__convexMarkNotificationsRead = () =>
          markNotificationsRead({} as any);
        (window as any).__convexGenerateAppUploadUrl = () =>
          generateApplicationUploadUrl();
        (window as any).__convexUpdateSellerAppStatus = (data: {
          applicationId: string;
          status: string;
        }) => updateSellerApplicationStatus(data as any);
        (window as any).__convexUpdateTransportAppStatus = (data: {
          applicationId: string;
          status: string;
        }) => updateTransportApplicationStatus(data as any);
        (window as any).__convexSignInWithPassword = (
          email: string,
          password: string,
        ) => signIn("password", { flow: "signIn", email, password });
        (window as any).__convexSignUpWithPassword = (
          name: string,
          email: string,
          password: string,
        ) => signIn("password", {
          flow: "signUp",
          email,
          password,
          name,
          createAccount: true,
        });
        (window as any).__convexAddLocation = (data: {
          label: string;
          address: string;
          makeDefault?: boolean;
        }) => addLocation(data as any);
        (window as any).__convexSetDefaultLocation = (data: {
          locationId: string;
        }) => setDefaultLocation(data as any);
        (window as any).__convexRemoveLocation = (data: {
          locationId: string;
        }) => removeLocation(data as any);
      };
      document.body.appendChild(script);
    };

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(inject, { timeout: 1200 });
      } else {
        setTimeout(inject, 600);
      }
    };

    let injected = false;
    const injectOnce = () => {
      if (injected) {
        return;
      }
      injected = true;
      inject();
    };
    const onInteraction = () => injectOnce();

    scheduleIdle();
    window.addEventListener("pointerdown", onInteraction, { once: true });
    window.addEventListener("keydown", onInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, [
    signIn,
    signOut,
    bootstrap,
    setPrefs,
    upsertProfile,
    createOrder,
    updateOrderStatus,
    calculatePrice,
    submitQuoteRequest,
    addTrackingUpdate,
    submitSellerApplication,
    submitTransportApplication,
    updateSellerApplicationStatus,
    updateTransportApplicationStatus,
    addLocation,
    setDefaultLocation,
    removeLocation,
    sellerListings,
    transporters,
  ]);

  useEffect(() => {
    if (!scriptLoaded.current) {
      return;
    }
    if (isAuthenticated && viewer) {
      if (profile === undefined || prefs === undefined) {
        return;
      }
      const nextUser = {
        id: viewer._id,
        name:
          profile?.name ||
          viewer.name ||
          viewer.email?.split("@")[0] ||
          "User",
        email: profile?.email || viewer.email || "user@email.com",
        phone: profile?.phone || viewer.phone || "",
        joined: viewer.createdAt
          ? new Date(viewer.createdAt).toLocaleDateString("en-IN")
          : new Date().toLocaleDateString("en-IN"),
      };
      localStorage.setItem("sandify_user", JSON.stringify(nextUser));
      (window as any).state = (window as any).state ?? {};
      (window as any).state.user = nextUser;
      (window as any).showLoggedInUI?.();
      (window as any).closeModal?.("auth-modal");
      const nextLocation = prefs?.location?.trim() ?? "";
      if (nextLocation) {
        localStorage.setItem("sandify_location", nextLocation);
        (window as any).state = (window as any).state ?? {};
        (window as any).state.location = nextLocation;
        const navLocation = document.getElementById("nav-location-text");
        if (navLocation) {
          navLocation.textContent = nextLocation;
        }
      } else {
        localStorage.removeItem("sandify_location");
        (window as any).state = (window as any).state ?? {};
        (window as any).state.location = "";
      }
      if (!nextLocation) {
        setTimeout(() => {
          (window as any).openModal?.("location-modal");
        }, 300);
      }
      if (!nextUser.phone) {
        setTimeout(() => {
          (window as any).openProfileSetup?.(nextUser);
        }, 300);
      }
    }
    if (orders) {
      (window as any).state = (window as any).state ?? {};
      (window as any).state.orders = orders;
      localStorage.setItem("sandify_orders", JSON.stringify(orders));
      (window as any).renderOrders?.();
    }
    if (adminStatus) {
      (window as any).__isAdmin = adminStatus.isAdmin;
      (window as any).updateAdminUI?.();
    }
    if (adminSnapshot?.ok) {
      (window as any).__adminSnapshot = adminSnapshot;
      (window as any).renderAdminSummary?.();
    }
    if (partnerStatus) {
      (window as any).__partnerStatus = partnerStatus;
      (window as any).updatePartnerUI?.();
    }
    if (adminSnapshot) {
      setLocalSnapshot(adminSnapshot);
    }
  }, [
    isAuthenticated,
    viewer,
    profile,
    prefs,
    orders,
    adminStatus,
    adminSnapshot,
    partnerStatus,
  ]);

  useEffect(() => {
    if (!reviewsForSand) {
      return;
    }
    (window as any).__sandReviewsData = reviewsForSand;
  }, [reviewsForSand]);

  useEffect(() => {
    if (!trackingUpdates) {
      return;
    }
    (window as any).__trackingUpdatesData = trackingUpdates;
    (window as any).__renderTrackingUpdates?.(trackingUpdates);
  }, [trackingUpdates]);

  useEffect(() => {
    if (!notifications) {
      return;
    }
    (window as any).__notificationsData = notifications;
    (window as any).__renderNotifications?.(notifications);
  }, [notifications]);

  useEffect(() => {
    if (!quoteRequests) {
      return;
    }
    (window as any).__quoteRequestsData = quoteRequests;
    (window as any).__renderQuoteRequests?.(quoteRequests);
  }, [quoteRequests]);

  useEffect(() => {
    if (!locations) {
      return;
    }
    (window as any).__userLocationsData = locations;
    (window as any).__renderLocations?.(locations);
  }, [locations]);

  useEffect(() => {
    if (sellerListings) {
      (window as any).__sellerListingsData = sellerListings;
      (window as any).__updateSellerListings?.(sellerListings);
    }
  }, [sellerListings]);

  useEffect(() => {
    if (transporters) {
      (window as any).__transportersData = transporters;
      (window as any).__updateTransporters?.(transporters);
    }
  }, [transporters]);

  const isAdmin = adminStatus?.isAdmin === true;
  const currentSnapshot = localSnapshot ?? adminSnapshot;

  const handleApproveSeller = async (id: string) => {
    await updateSellerApplicationStatus({ applicationId: id, status: "approved" } as any);
    setLocalSnapshot((prev: any) =>
      prev?.latestSellers
        ? {
            ...prev,
            latestSellers: prev.latestSellers.filter((s: any) => s._id !== id),
          }
        : prev,
    );
  };

  const handleRejectSeller = async (id: string) => {
    await updateSellerApplicationStatus({ applicationId: id, status: "rejected" } as any);
    setLocalSnapshot((prev: any) =>
      prev?.latestSellers
        ? {
            ...prev,
            latestSellers: prev.latestSellers.filter((s: any) => s._id !== id),
          }
        : prev,
    );
  };

  const handleApproveTransport = async (id: string) => {
    await updateTransportApplicationStatus({
      applicationId: id,
      status: "approved",
    } as any);
    setLocalSnapshot((prev: any) =>
      prev?.latestTransporters
        ? {
            ...prev,
            latestTransporters: prev.latestTransporters.filter(
              (t: any) => t._id !== id,
            ),
          }
        : prev,
    );
  };

  const handleRejectTransport = async (id: string) => {
    await updateTransportApplicationStatus({
      applicationId: id,
      status: "rejected",
    } as any);
    setLocalSnapshot((prev: any) =>
      prev?.latestTransporters
        ? {
            ...prev,
            latestTransporters: prev.latestTransporters.filter(
              (t: any) => t._id !== id,
            ),
          }
        : prev,
    );
  };

  const hideLegacy =
    route === "admin" ||
    route === "seller-dashboard" ||
    route === "transport-dashboard";

  return (
    <>
      <div
        style={{ display: hideLegacy ? "none" : "block" }}
        dangerouslySetInnerHTML={legacyRoot}
      />
      {route === "admin" ? (
        <AdminPanel
          isAdmin={isAdmin}
          adminSnapshot={currentSnapshot}
          onClearAudit={() => clearAuditLogs({} as any)}
          onApproveSeller={handleApproveSeller}
          onRejectSeller={handleRejectSeller}
          onApproveTransport={handleApproveTransport}
          onRejectTransport={handleRejectTransport}
          onRevokeSeller={(userId, reason) =>
            revokeSeller({ userId, reason } as any)
          }
          onRevokeTransporter={(userId, reason) =>
            revokeTransporter({ userId, reason } as any)
          }
          onSignIn={() =>
            signIn("google", {
              flow: "signIn",
              redirectTo: window.location.origin,
            })
          }
        />
      ) : null}

      {route === "seller-dashboard" ? (
        <SellerDashboard
          data={sellerDashboard}
          approved={partnerStatus?.seller === true}
          onCreate={(payload) => createSandTypeAndListing(payload as any)}
          onUpdateInventory={(payload) =>
            updateListingInventory(payload as any)
          }
          onUpload={async (file) => {
            const maxBytes = 5 * 1024 * 1024;
            if (file.size > maxBytes) {
              throw new Error("File too large (max 5MB)");
            }
            if (!file.type.startsWith("image/")) {
              throw new Error("Invalid file type");
            }
            const uploadUrl = await generateImageUploadUrl();
            const res = await fetch(uploadUrl, {
              method: "POST",
              headers: { "Content-Type": file.type },
              body: file,
            });
            if (!res.ok) {
              throw new Error("Upload failed");
            }
            const { storageId } = await res.json();
            return { storageId };
          }}
        />
      ) : null}
      {route === "transport-dashboard" ? (
        <TransportDashboard
          data={transportDashboard}
          approved={partnerStatus?.transporter === true}
          onAddVehicle={(payload) => addTransporterVehicle(payload as any)}
        />
      ) : null}
    </>
  );
}
