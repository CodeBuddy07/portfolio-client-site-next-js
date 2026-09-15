export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  related?: string; // project slug
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "money-is-not-a-float",
    title: "Money is not a float",
    summary:
      "How I model currency in a wholesale ERP so the books balance to the third decimal: an integer value object, explicit rounding, and a database column that can't lie.",
    date: "2026-09-14",
    readingMinutes: 6,
    tags: ["ERP", "PostgreSQL", "TypeScript", "Finance"],
    related: "wholesale-garments-erp",
    body: [
      {
        type: "p",
        text: "The first thing I decided on the garments ERP was not the framework or the database. It was that no monetary value would ever be a JavaScript number. Everything else followed from that.",
      },
      {
        type: "p",
        text: "The business trades in Omani Rial, which has three decimal places: 1 rial is 1,000 baisa. It buys stock in Bangladeshi Taka. It sells wholesale, so a single invoice line can be 2,400 units at 0.375 rial. If you do that arithmetic in floating point you will, eventually, produce an invoice that is off by one baisa, and then a ledger that doesn't balance, and then an accountant who doesn't trust the system. Nobody trusts a system that is approximately right about money.",
      },
      { type: "h2", text: "Hold money as an integer" },
      {
        type: "p",
        text: "The Money value object holds a bigint count of baisa. Addition, subtraction and multiplication by an integer quantity are exact by definition; there is nothing to round. Construction from user input or the database goes through Decimal.js and rounds half-up once, explicitly, at the boundary.",
      },
      {
        type: "code",
        lang: "ts",
        caption: "src/common/money/money.ts (the core of it)",
        code: `export class Money {
  /** Integer baisa. 12.345 OMR -> 12345n */
  private readonly baisa: bigint;
  static readonly SCALE = 3;

  static fromOmr(value: string | number | Decimal): Money {
    const dec = new Decimal(value).mul(1000)
      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    return new Money(BigInt(dec.toFixed(0)));
  }

  add(other: Money): Money { return new Money(this.baisa + other.baisa); }

  /** unit price × quantity. Stays exact. */
  multiplyByQty(qty: number): Money {
    if (!Number.isInteger(qty)) throw new Error(\`Quantity must be an integer, received \${qty}\`);
    return new Money(this.baisa * BigInt(qty));
  }

  /** VAT, discounts. Rounds half-up back to baisa, once. */
  multiplyByRate(rate: string | number | Decimal): Money {
    const dec = new Decimal(this.baisa.toString()).mul(new Decimal(rate))
      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    return new Money(BigInt(dec.toFixed(0)));
  }

  /** "12.345": canonical string for a NUMERIC(18,3) column. */
  toOmrString(): string { return this.toDecimal().toFixed(Money.SCALE); }
}`,
      },
      {
        type: "p",
        text: "Two details matter more than they look. multiplyByQty refuses a non-integer quantity: if someone tries to sell 2.5 units the bug surfaces at the call site, not as a rounding artefact three tables away. And there is no constructor from a number: you cannot accidentally do new Money(12.345). The only doors in are fromOmr and fromBaisa, and both are explicit about what they accept.",
      },
      { type: "h2", text: "Make the database agree" },
      {
        type: "p",
        text: "The column type is NUMERIC(18,3), not DOUBLE PRECISION and not an integer of baisa. That is a deliberate compromise: an integer column would be purest, but every report, every ad-hoc query an accountant runs in Prisma Studio, and every CSV export would then show 12345 where a human expects 12.345. NUMERIC(18,3) is exact, and it is legible. Money.toOmrString produces exactly the string it stores, so the round trip is lossless.",
      },
      { type: "h2", text: "Cost is per lot, not per product" },
      {
        type: "p",
        text: "Exact money only gets you exact prices. Exact margin needs exact cost, and the same SKU is bought at different prices in different shipments: different Taka price, different exchange rate on the day, different freight. Storing one average cost per product throws that information away.",
      },
      {
        type: "p",
        text: "So every shipment receipt creates a StockLot with its own landed cost, and a sale consumes lots oldest-first and records the cost it took from each one. Cost of goods sold on a sale is a sum of real numbers from real lots. Gross margin is a fact, not an estimate.",
      },
      { type: "h2", text: "Never edit history" },
      {
        type: "p",
        text: "Every financial action posts a double-entry LedgerTransaction: debits equal credits against a seeded chart of accounts. Ledgers, confirmed sales, invoices and stock movements are append-only. When something is wrong, the fix is a reversing record, a new row that undoes the old one, never an UPDATE. That is the difference between books an auditor can replay from day one and a database that merely has the right totals today.",
      },
      {
        type: "ul",
        items: [
          "Balances are derived from transactions, never stored in a column that can drift.",
          "Exchange rate is captured on the shipment, so landed cost is fixed at receipt.",
          "ESLint treats any as an error across the codebase. A monetary value with type any is a float waiting to happen.",
        ],
      },
      { type: "h2", text: "What it costs" },
      {
        type: "p",
        text: "More code, honestly. Every service that touches money goes through the value object; every report sums lots instead of reading a cached balance. It is perhaps a week of extra work across the project. Against that: the client has never once opened the system and found a number that disagreed with another number. For an ERP, that is the entire product.",
      },
    ],
  },
  {
    slug: "tenant-isolation-at-the-orm",
    title: "A tenant filter you can't forget",
    summary:
      "Multi-tenant SaaS leaks data one missing WHERE clause at a time. In the retail POS SaaS I made that class of bug throw before the SQL is built, without hiding the filter from the people reading the code.",
    date: "2026-09-14",
    readingMinutes: 7,
    tags: ["SaaS", "NestJS", "Prisma", "Security"],
    related: "multi-tenant-retail-saas",
    body: [
      {
        type: "p",
        text: "The retail ERP/POS SaaS runs many shops on one database schema. It's the right call for a product aimed at small shops: one migration, cheap cross-tenant reporting for the platform, simple operations. It also means the single most likely security bug in the codebase is a query that forgets to filter by organizationId and returns another shop's sales.",
      },
      {
        type: "p",
        text: "Convention doesn't fix that. Code review doesn't reliably fix that either; there are hundreds of queries and the missing clause looks exactly like a correct one. I wanted the mistake to be impossible to ship, and I wanted the code to stay readable for the next engineer. Those two goals pull in opposite directions, and the design is mostly about resolving that.",
      },
      { type: "h2", text: "Where the tenant comes from" },
      {
        type: "p",
        text: "First principle: the organization is read from the signed access token and from nowhere else. Not a request body, not an X-Org header, not a query parameter. Those are all under the client's control. The guard then re-resolves the caller's membership from the database on every request, so a deactivated employee or a suspended shop loses access immediately rather than at token expiry. The result is an AuthContext that controllers derive everything from.",
      },
      {
        type: "code",
        lang: "ts",
        caption: "src/common/tenancy/tenant-context.ts",
        code: `/**
 * The authenticated caller, resolved server-side from the access token and the
 * database. Controllers must derive organizationId/branchId from here, never
 * from the request body or a client-supplied header.
 */
export interface AuthContext {
  userId: string;
  organizationId: string;
  membershipId: string;
  role: Role;
  branchId: string;
  allowedBranchIds: string[];
  canAccessAllBranches: boolean;
  terminalId: string | null;   // a paired till fixes the branch
  permissions: Set<Permission>;
}`,
      },
      {
        type: "p",
        text: "There is a second axis inside a tenant: branches. A branch manager who calls a list endpoint without a branchId should see their branches, not the whole organization. That used to be a bug (no branchId meant everything), so it became a helper that every branch-scoped query goes through.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export function branchScope(ctx: AuthContext, requested?: string | null) {
  if (requested) return { branchId: requested };
  if (ctx.canAccessAllBranches) return {};
  return { branchId: { in: ctx.allowedBranchIds } };
}`,
      },
      { type: "h2", text: "Services still say it out loud" },
      {
        type: "p",
        text: "The tempting design is to inject the tenant filter automatically so services never mention it. I didn't do that. Services pass organizationId into every query explicitly, because the code a reviewer reads should show the filter, not trust that some middleware added it. Readability is a security property.",
      },
      { type: "h2", text: "…and the ORM refuses when they don't" },
      {
        type: "p",
        text: "The backstop is a Prisma client extension that wraps every operation on the 21 models that belong to a tenant. A findMany, update, delete, count or aggregate that arrives without organizationId in its where clause throws before any SQL is generated. The check recurses through AND and OR, so wrapping the filter in a compound clause still counts. Writes must set organizationId on every row, or connect the organization relation.",
      },
      {
        type: "code",
        lang: "ts",
        caption: "src/database/tenant-guard.extension.ts (trimmed)",
        code: `export const TENANT_SCOPED_MODELS = new Set([
  'Branch', 'Membership', 'Product', 'BranchInventory', 'StockMovement',
  'Customer', 'Sale', 'SaleItem', 'Payment', 'Refund', 'Expense', /* … */
]);

export function createTenantGuardExtension() {
  return Prisma.defineExtension({
    name: 'tenant-guard',
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!model || !TENANT_SCOPED_MODELS.has(model)) return query(args);

          if (WHERE_OPERATIONS.has(operation) && !whereHasOrganization(args.where)) {
            throw new AppException(
              ErrorCode.TENANT_SCOPE_MISSING,
              \`Refused an unscoped \${operation} on \${model}: queries must filter by organizationId.\`,
            );
          }
          if (DATA_OPERATIONS.has(operation) && !dataHasOrganization(args.data)) {
            throw new AppException(ErrorCode.TENANT_SCOPE_MISSING, /* … */);
          }
          return query(args);
        },
      },
    },
  });
}`,
      },
      {
        type: "quote",
        text: "It is a safety net, not the mechanism: services still pass organizationId explicitly, which keeps call sites readable and auditable.",
      },
      {
        type: "p",
        text: "That comment is in the file, and it's the whole philosophy. The extension is not how tenancy works. It is what catches the day someone gets it wrong: in development and in the e2e suite, loudly, with a stable error code, instead of in production, silently, with someone else's data.",
      },
      { type: "h2", text: "The escape hatch is named" },
      {
        type: "p",
        text: "Some work is legitimately cross-tenant: logging in by email before you know the organization, platform-admin aggregates, migrations, seeds. That goes through PrismaService.unscoped, the raw client, with a name that makes it obvious in review. If you see unscoped in a diff, you ask why.",
      },
      { type: "h2", text: "What else is in the same layer" },
      {
        type: "ul",
        items: [
          "Guards check permissions, not roles. Roles are named sets in a catalogue, so a shop can change what a manager can do without a deploy.",
          "Passwords are Argon2id. Refresh tokens are stored as SHA-256 digests, rotated on use, and reusing an old one revokes the whole token family.",
          "One response envelope, stable error codes, no stack traces in responses. Swagger is served in non-production only.",
          "A security.md that lists what is implemented and what is deliberately not claimed. The second list is the more useful one.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic. It's the combination that matters: identity from the token only, membership re-checked per request, explicit filters at call sites, and an ORM-level refusal when a filter is missing. Four layers, each cheap, and the failure mode of each one is caught by the next.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
