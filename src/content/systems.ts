export type SystemNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  accent?: boolean;
  detail: { heading: string; body: string; code?: string };
};

export type SystemEdge = { from: string; to: string; label?: string };

export type System = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  project: string;
  viewBox: [number, number];
  nodes: SystemNode[];
  edges: SystemEdge[];
};

export const systems: System[] = [
  {
    slug: "tenant-isolation",
    eyebrow: "Multi-tenant SaaS",
    title: "How one request can't reach another shop's data",
    intro:
      "Every request in the retail ERP/POS SaaS passes four checkpoints before it touches a row. Click a node to see what it does and why it exists.",
    project: "multi-tenant-retail-saas",
    viewBox: [1000, 620],
    nodes: [
      {
        id: "token",
        label: "Access token",
        sub: "organizationId inside",
        x: 60,
        y: 60,
        w: 260,
        accent: true,
        detail: {
          heading: "Tenant identity lives in the token, nowhere else",
          body:
            "The organization a caller belongs to is carried in the signed access token. Controllers never read organizationId from a request body, a header or a query string — those are all under the client's control. If you can't forge the token, you can't claim another shop.",
          code: `// Controllers derive tenant from AuthContext — never from the request.\nexport interface AuthContext {\n  userId: string;\n  organizationId: string;\n  membershipId: string;\n  role: Role;\n  branchId: string;\n  allowedBranchIds: string[];\n  canAccessAllBranches: boolean;\n  terminalId: string | null;      // set when a paired till fixes the branch\n  permissions: Set<Permission>;\n}`,
        },
      },
      {
        id: "tenant-guard",
        label: "TenantGuard",
        sub: "membership re-resolved",
        x: 370,
        y: 60,
        w: 260,
        accent: true,
        detail: {
          heading: "Re-check the membership on every request",
          body:
            "A valid token is not proof of current access. The guard loads the membership from the database each request, so a deactivated employee or a suspended shop is locked out immediately — not fifteen minutes later when the token expires. Branch scope is resolved here too: a branch manager with no branchId in the query sees their branches, not the whole organization.",
          code: `export function branchScope(ctx: AuthContext, requested?: string | null) {\n  if (requested) return { branchId: requested };\n  if (ctx.canAccessAllBranches) return {};\n  return { branchId: { in: ctx.allowedBranchIds } };\n}`,
        },
      },
      {
        id: "perm-guard",
        label: "PermissionsGuard",
        sub: "catalogue, not roles",
        x: 680,
        y: 60,
        w: 260,
        detail: {
          heading: "Permissions, not roles",
          body:
            "Handlers declare the permission they need (sales.refund, inventory.adjust, reports.view). Roles — owner, manager, cashier — are just named sets of permissions in a catalogue. That means a shop can change what a manager may do without a deploy, and the guard never has to know what a 'manager' is.",
          code: `export function hasPermission(ctx: AuthContext, permission: Permission) {\n  return ctx.permissions.has(permission);\n}`,
        },
      },
      {
        id: "service",
        label: "Service",
        sub: "passes organizationId explicitly",
        x: 370,
        y: 250,
        w: 260,
        detail: {
          heading: "Call sites stay explicit",
          body:
            "Services still pass organizationId into every query themselves. That is deliberate: the code a reviewer reads should show the tenant filter, not hide it behind magic. The extension below is a backstop for the day someone forgets.",
        },
      },
      {
        id: "extension",
        label: "Prisma tenant extension",
        sub: "refuses unfiltered queries",
        x: 370,
        y: 420,
        w: 260,
        accent: true,
        detail: {
          heading: "A forgotten filter fails loudly",
          body:
            "A Prisma client extension wraps every operation on the 21 tenant-owned models. If a read, update, delete, count or aggregate arrives without organizationId in its where clause — recursively through AND/OR — it throws before the SQL is built. Writes must set organizationId on every row. There is one documented escape hatch, PrismaService.unscoped, for platform-level work such as login by email.",
          code: `if (WHERE_OPERATIONS.has(operation) && !whereHasOrganization(a.where)) {\n  throw new AppException(\n    ErrorCode.TENANT_SCOPE_MISSING,\n    \`Refused an unscoped \${operation} on \${model}: queries must filter by organizationId.\`,\n  );\n}`,
        },
      },
      {
        id: "db",
        label: "PostgreSQL 16",
        sub: "one schema, many shops",
        x: 680,
        y: 420,
        w: 260,
        detail: {
          heading: "Shared schema, isolated rows",
          body:
            "All shops share one schema; isolation is enforced above it. That keeps migrations simple and reporting cheap, and the extension makes the trade-off safe. Refresh tokens are stored as SHA-256 digests and rotated on use; reusing an old one revokes the whole token family.",
        },
      },
    ],
    edges: [
      { from: "token", to: "tenant-guard" },
      { from: "tenant-guard", to: "perm-guard" },
      { from: "perm-guard", to: "service" },
      { from: "service", to: "extension", label: "where: { organizationId }" },
      { from: "extension", to: "db" },
    ],
  },
  {
    slug: "money-model",
    eyebrow: "Wholesale garments ERP",
    title: "How the books always balance",
    intro:
      "The ERP's numbers are exact by construction: integer money, lot-level costing, and a ledger you can only append to. Click through the model.",
    project: "wholesale-garments-erp",
    viewBox: [1000, 620],
    nodes: [
      {
        id: "money",
        label: "Money",
        sub: "integer baisa, never float",
        x: 60,
        y: 60,
        w: 260,
        accent: true,
        detail: {
          heading: "A third decimal you can't lose",
          body:
            "Omani Rial has three decimal places — 1 rial is 1000 baisa. The Money value object holds a bigint count of baisa, so addition and multiplication by quantity are exact. Rates (VAT, discounts) go through Decimal.js and round half-up back to baisa explicitly. It persists to NUMERIC(18,3). No float ever touches a monetary figure.",
          code: `export class Money {\n  private readonly baisa: bigint;\n\n  static fromOmr(value: string | number | Decimal): Money {\n    const dec = new Decimal(value).mul(1000)\n      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);\n    return new Money(BigInt(dec.toFixed(0)));\n  }\n\n  multiplyByQty(qty: number): Money {\n    if (!Number.isInteger(qty)) throw new Error(\`Quantity must be an integer\`);\n    return new Money(this.baisa * BigInt(qty));\n  }\n}`,
        },
      },
      {
        id: "shipment",
        label: "Shipment",
        sub: "BDT → OMR at a fixed rate",
        x: 370,
        y: 60,
        w: 260,
        detail: {
          heading: "Foreign exchange captured per shipment",
          body:
            "Garments are bought in Bangladeshi Taka and sold in Rial. The exchange rate is recorded on the shipment when it's entered, so the landed cost of every unit is fixed at receipt and never drifts when rates move later.",
        },
      },
      {
        id: "lot",
        label: "StockLot",
        sub: "landed cost per lot",
        x: 680,
        y: 60,
        w: 260,
        accent: true,
        detail: {
          heading: "Every receipt is its own lot",
          body:
            "Instead of one average cost per product, each shipment creates a StockLot with its own landed cost (purchase price, FX, freight, duty). That is the only way cost of goods sold can be exact when the same SKU was bought at different prices.",
        },
      },
      {
        id: "sale",
        label: "Sale",
        sub: "consumes lots FIFO",
        x: 680,
        y: 250,
        w: 260,
        detail: {
          heading: "Oldest lot first, exact COGS",
          body:
            "A sale draws stock from the oldest lots first and records the cost it consumed from each one. Gross margin per sale is real, not an estimate against a moving average.",
        },
      },
      {
        id: "ledger",
        label: "Ledger",
        sub: "double-entry, append-only",
        x: 370,
        y: 420,
        w: 260,
        accent: true,
        detail: {
          heading: "Every action posts a balanced transaction",
          body:
            "Sales, purchases, payments and adjustments each post a LedgerTransaction whose debits equal its credits against a seeded chart of accounts. Ledgers, confirmed sales, invoices and stock movements are append-only: a mistake is corrected by a reversing record, never by editing history. An auditor can replay the books from day one.",
        },
      },
      {
        id: "reports",
        label: "Reports",
        sub: "derived, never stored",
        x: 60,
        y: 420,
        w: 260,
        detail: {
          heading: "Balances are computed, not cached",
          body:
            "Stock on hand, receivables, margin and P&L are derived from lots and ledger entries. There is no separately maintained 'balance' column that can disagree with the transactions beneath it.",
        },
      },
    ],
    edges: [
      { from: "money", to: "shipment" },
      { from: "shipment", to: "lot", label: "receipt" },
      { from: "lot", to: "sale", label: "FIFO" },
      { from: "sale", to: "ledger", label: "posts" },
      { from: "ledger", to: "reports" },
    ],
  },
];

export function getSystem(slug: string) {
  return systems.find((s) => s.slug === slug);
}
