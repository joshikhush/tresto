import type { CaseStudy } from '@/types/case-study'

export const allInOneErp: CaseStudy = {
  slug: 'all-in-one-erp',
  title: 'Five business systems folded into one app',
  summary:
    'Accounting, GST filing, sales tracking, field visits, and document handling. All the things a growing business normally buys separately, running in a single app.',
  industry: 'erp',
  year: '2024',
  platform: 'iOS and Android',
  readTime: '7 min read',

  heroImage: '/work/all-in-one-erp/hero.png',

  atAGlance: [
    { label: 'Sector', value: 'Business systems' },
    { label: 'Platform', value: 'iOS and Android' },
    { label: 'Covers', value: 'Accounts, sales, field, docs' },
    { label: 'Tax', value: 'GST filing built in' },
    { label: 'Companies', value: 'Several from one login' },
    { label: 'Year', value: '2024' },
  ],

  metrics: [
    { value: '5', label: 'Separate systems replaced by one app' },
    { value: '1', label: 'Login covering multiple companies' },
  ],

  problem: {
    heading: 'A growing business ends up with five systems that do not talk',
    paragraphs: [
      'It starts reasonably. Accounting software for the books. A spreadsheet for leads. A WhatsApp group for the field team. A folder somewhere for invoices the accountant needs. Each one solves a real problem on the day it arrives.',
      'Two years later the sales team logs a new customer in one place, the accounts team enters the same customer somewhere else, and neither list matches. Nobody can answer a simple question like how much a customer owes without opening three things and doing sums.',
      'Then GST filing comes around and someone spends a week pulling numbers out of systems that were never designed to hand them over. The client wanted one app where entering something once meant it was entered everywhere.',
    ],
  },

  pullQuote: {
    text: 'Every extra system is another place the truth can live. Five systems means nobody is sure which one is right.',
    afterParagraph: 1,
  },

  challengesHeading: 'What made this more than a bigger app',

  challenges: [
    {
      title: 'Tax that has to be exactly right',
      body: 'GST filing is not a report you can approximate. GSTR-1, GST payable, the GST register: each has a required shape, and getting it wrong means a filing that gets rejected or a penalty. The numbers have to come out correct without anyone rekeying them.',
    },
    {
      title: 'Every business is a bit different',
      body: 'One company sells across states and needs one set of categories. Another operates in a single city and needs a completely different set. Hardcoding either one makes the app useless to the other.',
    },
    {
      title: 'Field teams have no signal',
      body: 'A salesperson logging a visit is often in a basement, a factory, or somewhere with no reception. If the app only works online, the visit gets written on paper and entered later, which is where accuracy goes to die.',
    },
    {
      title: 'Several companies, one person',
      body: 'Owners and accountants frequently run more than one business. Making them log out and back in to switch between them turns a daily task into a chore.',
    },
  ],

  solution: {
    heading: 'How five systems became one',
    intro:
      'The app is built in modules that share the same underlying records. A customer entered by the sales team is the same customer the accounts team invoices. Nothing gets entered twice.',
    image: '/work/all-in-one-erp/sticky.png',
    steps: [
      {
        title: 'Accounting, with GST that files itself',
        paragraphs: [
          'The accounting side handles the day to day entries a business actually makes: sales, purchases, payments received, payments made, and adjustments. Normal work, entered once.',
          'GST reporting is built on top of those same entries rather than sitting beside them. GSTR-1, GST payable, and the GST register are generated from what is already in the books. Nobody exports anything, nobody rekeys anything, and the numbers cannot drift apart because they come from one source.',
          'The reports a business needs day to day are there too. Ledgers, what is owed to you and by you, purchase and sales registers, the day book, and stock. All from the same entries.',
        ],
      },
      {
        title: 'Sales, from first contact to order',
        paragraphs: [
          'The sales side follows a customer from a name on a list through to a signed order. Leads, follow ups, enquiries, quotations, and then the order itself.',
          'Because it shares records with accounting, a quotation that becomes an order becomes an invoice without anyone retyping the customer name, the address, or the tax details. The chain holds all the way through.',
        ],
      },
      {
        title: 'The field team, tracked properly',
        paragraphs: [
          'Salespeople on the road mark themselves in and out, log the visits they make, and record what came of each one. Location is captured with the visit, so a logged visit is a visit that happened.',
          'Expenses go in from the phone at the time they happen, rather than as a shoebox of receipts at month end. Orders can be created on the spot, in front of the customer, instead of waiting until someone is back at a desk.',
        ],
      },
      {
        title: 'Documents where the accountant can find them',
        paragraphs: [
          'Invoices and the paperwork an accountant needs get uploaded from the phone and stored against the right record. Payments against them are tracked in the same place.',
          'The reason this matters is timing. Documents that live in someone email get found the week before a filing deadline. Documents attached to the transaction they belong to are already where they need to be.',
        ],
      },
      {
        title: 'Making it fit each business',
        paragraphs: [
          'Rather than hardcoding categories, the app lets a business define its own. Which states it sells to, which categories it uses, which fields matter. Each company sets these up once and the rest of the app adapts.',
          'Someone running more than one business switches between them inside the app. Same login, separate books, no confusion about which company a number belongs to.',
        ],
      },
    ],
  },

  capabilitiesHeading: 'What the app handles',

  capabilities: [
    {
      title: 'Day to day accounting',
      body: 'Sales, purchases, payments, receipts, and journal entries in one ledger.',
    },
    {
      title: 'GST filing',
      body: 'GSTR-1, GST payable, and the GST register generated from the books themselves.',
    },
    {
      title: 'Business reports',
      body: 'Ledgers, payables, receivables, registers, day book, and stock.',
    },
    {
      title: 'Lead to order',
      body: 'Leads, follow ups, enquiries, quotations, and sales orders in one chain.',
    },
    {
      title: 'Field attendance and visits',
      body: 'In and out marking, visit logging, and location captured at the time.',
    },
    {
      title: 'Expenses from the phone',
      body: 'Recorded when they happen rather than reconstructed at month end.',
    },
    {
      title: 'Document handling',
      body: 'Invoices and accountant paperwork stored against the right transaction.',
    },
    {
      title: 'Custom categories',
      body: 'Each business defines its own fields and lists instead of using ours.',
    },
    {
      title: 'Multiple companies',
      body: 'Separate books for each business, reached from a single login.',
    },
  ],

  techStack: [
    {
      layer: 'The app',
      items: [
        { abbr: 'Fl', name: 'Flutter', role: 'One codebase for iPhone and Android' },
        { abbr: 'Dt', name: 'Dart', role: 'The language the app is written in' },
        { abbr: 'Gx', name: 'GetX', role: 'Keeps modules in step with each other' },
      ],
    },
    {
      layer: 'Data',
      items: [
        { abbr: 'Ap', name: 'REST APIs', role: 'Moves records between app and server' },
        { abbr: 'Ds', name: 'Document storage', role: 'Holds invoices and paperwork' },
      ],
    },
    {
      layer: 'Field features',
      items: [
        { abbr: 'Lo', name: 'Location services', role: 'Confirms visits happened where they were logged' },
      ],
    },
  ],

  outcome: {
    heading: 'One entry, one number, one place to look',
    paragraphs: [
      'A customer is entered once and everyone works from the same record. Sales sees what accounts sees. Field visits arrive in the system the day they happen rather than the week after.',
      'The GST filing that used to take a week of pulling numbers out of separate systems now comes out of the books directly. That single change is what most of the day to day tidiness was in service of.',
    ],
  },

  featured: false,
  order: 40,
}
