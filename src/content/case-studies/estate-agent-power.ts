import type { CaseStudy } from '@/types/case-study'

export const estateAgentPower: CaseStudy = {
  slug: 'estate-agent-power',
  title: 'Buying and selling property without the waiting',
  summary:
    'A property app that finds the right listings, markets a home automatically, and lets buyers and sellers talk price without anyone standing in the middle.',
  industry: 'real-estate',
  year: '2024',
  platform: 'iOS and Android',
  readTime: '6 min read',

  heroImage: '/work/estate-agent-power/hero.png',

  atAGlance: [
    { label: 'Sector', value: 'Real estate' },
    { label: 'Platform', value: 'iOS and Android' },
    { label: 'Users', value: 'Buyers and sellers' },
    { label: 'Reach', value: 'Multiple countries' },
    { label: 'Live chat', value: 'Always available' },
    { label: 'Year', value: '2024' },
  ],

  problem: {
    heading: 'Everything about buying a house happens through someone else',
    paragraphs: [
      'A seller lists a property and then waits. Waits for an agent to write the listing, waits for it to appear on the right sites, waits to hear whether anyone looked at it. A buyer searches and gets hundreds of results, most of which do not fit what they can afford or where they need to live.',
      'When an offer finally happens, neither side talks to the other. Messages go through an agent, get repeated, get softened, and take days to come back. People end up negotiating on the price of a house through a game of telephone.',
      'The client wanted to take the waiting out of it. Sellers should be able to list once and have the marketing happen on its own. Buyers should see the handful of properties that actually match. And when the two are ready to talk numbers, they should just talk.',
    ],
  },

  pullQuote: {
    text: 'Property is the biggest purchase most people make, and it is the one where they get the least information.',
    afterParagraph: 1,
  },

  challengesHeading: 'What made this harder than a normal listings app',

  challenges: [
    {
      title: 'Different countries, different rules',
      body: 'The app had to work for people in several countries at once. Prices in different currencies, addresses written in different orders, listings that mean different things in different markets. All of it had to feel normal to whoever was looking at it.',
    },
    {
      title: 'Matching, not just searching',
      body: 'A search box returns everything containing a word. That is not useful when someone has a budget, a school catchment, a commute, and a minimum number of bedrooms. The app needed to narrow the list rather than widen it.',
    },
    {
      title: 'Conversations that cannot drop',
      body: 'Two people negotiating a price need to see each other messages immediately. A message that arrives ten minutes late, or twice, or not at all, breaks trust in the middle of the most important part of the process.',
    },
    {
      title: 'Help at any hour',
      body: 'Property questions do not arrive between nine and five. Someone viewing a listing at eleven at night with a question about the process will close the app if nobody answers.',
    },
  ],

  solution: {
    heading: 'Four things we built',
    intro:
      'The app does four jobs. It finds the right properties, markets them without the seller lifting a finger, keeps buyer and seller talking directly, and answers questions whenever they come up.',
    image: '/work/estate-agent-power/sticky.png',
    steps: [
      {
        title: 'A search that narrows instead of widening',
        paragraphs: [
          'We built the matching around what a buyer actually cares about rather than what the listing happens to say. Budget, location, size, and the specific things that matter to that person.',
          'Location works off a map rather than a postcode, so someone can draw the area they will live in and see only what falls inside it. That single change removes most of the results a normal property search would show them.',
          'The result is a shorter list. Fewer properties, all of which fit. Buyers stop scrolling and start viewing.',
        ],
      },
      {
        title: 'Marketing that runs itself',
        paragraphs: [
          'When a seller lists a property, the app does the parts that normally need chasing. The listing gets built, formatted, and pushed out to where buyers will see it, without the seller filling in the same details five times.',
          'Interested buyers get alerts the moment something matching their criteria appears. That is the part that shortens a sale. A property that reaches the right buyer on day one does not sit on the market for three months.',
        ],
      },
      {
        title: 'Buyers and sellers talking directly',
        paragraphs: [
          'Offers and counter offers happen inside the app, between the two people making them. Both sides see the same numbers at the same time. Nothing is relayed, nothing gets softened in the retelling.',
          'The messages update live rather than on a refresh. When one person sends a number the other sees it appear. That immediacy is what makes it feel like a conversation instead of correspondence.',
        ],
      },
      {
        title: 'Support that is actually there',
        paragraphs: [
          'A help channel sits inside the app and stays open around the clock. Someone stuck on a step at midnight can ask and get an answer.',
          'It is built on the same live connection as the negotiation messaging, so a question and its reply behave the same way as an offer and its response. One system, two uses.',
        ],
      },
    ],
  },

  capabilitiesHeading: 'What the app does',

  capabilities: [
    {
      title: 'Property matching',
      body: 'Filters listings down to what fits a buyer budget, area, and requirements.',
    },
    {
      title: 'Map based search',
      body: 'Buyers pick the area they want on a map rather than guessing at postcodes.',
    },
    {
      title: 'Automatic listing',
      body: 'A property gets written up and distributed without the seller repeating themselves.',
    },
    {
      title: 'Instant alerts',
      body: 'Buyers hear about a matching property as soon as it goes live.',
    },
    {
      title: 'Direct negotiation',
      body: 'Offers and replies happen between the two people involved, in real time.',
    },
    {
      title: 'Round the clock help',
      body: 'A support channel inside the app that answers at any hour.',
    },
  ],

  techStack: [
    {
      layer: 'The app',
      items: [
        { abbr: 'Fl', name: 'Flutter', role: 'One set of code for iPhone and Android' },
        { abbr: 'Dt', name: 'Dart', role: 'The language the app is written in' },
        { abbr: 'Gx', name: 'GetX', role: 'Keeps track of what the user is looking at' },
        { abbr: 'Pv', name: 'Provider', role: 'Handles the heavier property data' },
      ],
    },
    {
      layer: 'Live features',
      items: [
        { abbr: 'Fb', name: 'Firebase', role: 'Makes messages appear instantly on both sides' },
        { abbr: 'Cm', name: 'Cloud Messaging', role: 'Sends alerts when a match appears' },
        { abbr: 'Ap', name: 'REST APIs', role: 'Moves listing data in and out' },
      ],
    },
    {
      layer: 'Location',
      items: [
        { abbr: 'Gm', name: 'Google Maps', role: 'Draws the search area and places properties on it' },
      ],
    },
  ],

  outcome: {
    heading: 'Fewer results, faster sales, direct conversations',
    paragraphs: [
      'Buyers see a short list of properties that fit rather than a long list that mostly does not. Sellers list once and the marketing happens without them chasing it. When the two sides are ready to talk price, they talk to each other.',
      'The parts that used to take days of back and forth now happen in the app while both people are still looking at the same listing.',
    ],
  },

  featured: false,
  order: 10,
}
