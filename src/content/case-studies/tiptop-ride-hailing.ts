import type { CaseStudy } from '@/types/case-study'

export const tiptopRideHailing: CaseStudy = {
  slug: 'tiptop-ride-hailing',
  title: 'Both sides of a ride-hailing network, live in Australia',
  summary:
    'Two apps built to work as one system. One for passengers booking a ride, one for drivers earning from it, running across Australia on both app stores.',
  industry: 'ride-hailing',
  year: '2024',
  platform: 'iOS and Android',
  readTime: '6 min read',

  heroImage: '/work/tiptop-ride-hailing/hero.png',

  atAGlance: [
    { label: 'Sector', value: 'Ride-hailing' },
    { label: 'Apps built', value: 'Passenger and driver' },
    { label: 'Platform', value: 'iOS and Android' },
    { label: 'Market', value: 'Australia' },
    { label: 'Payments', value: 'Card, no cash' },
    { label: 'Year', value: '2024' },
  ],

  metrics: [
    { value: '2', label: 'Apps built as one connected system' },
    { value: '4', label: 'App store listings live and maintained' },
    { value: '0', label: 'Cash handled by drivers or passengers' },
  ],

  problem: {
    heading: 'A ride-hailing service is really two products',
    paragraphs: [
      'Everyone thinks of the passenger app. Open it, pick a destination, watch a car arrive. But that experience only works if a second app, the one the driver is using, is doing its job at the same moment.',
      'The two have opposite needs. A passenger wants simplicity and certainty: what will it cost, how long until it arrives, is this driver safe. A driver wants control and clarity: how much will I make, what is the best route, when do I get paid.',
      'Build one well and the other badly and the whole service fails. A passenger with a perfect app still waits half an hour if drivers cannot see requests properly. The client needed both, built to work as a single system.',
    ],
  },

  pullQuote: {
    text: 'A ride only happens when two strangers, two phones, and one map agree on the same thing at the same time.',
    afterParagraph: 1,
  },

  challengesHeading: 'What had to line up on both sides',

  challenges: [
    {
      title: 'Two apps, one moment',
      body: 'When a passenger books, a driver has to know within seconds. When a driver accepts, the passenger has to see it happen. The two apps are separate downloads but have to behave like one thing.',
    },
    {
      title: 'Location that keeps up',
      body: 'A map showing where a car was thirty seconds ago is worse than no map. Position has to update constantly, on phones that vary wildly in age and signal quality, without draining a battery a driver needs for a full shift.',
    },
    {
      title: 'Money that cannot go wrong',
      body: 'Passengers are charged automatically at the end of a trip. Drivers are paid automatically for it. Neither side is in the room to check. Every fare has to be calculated, charged, and recorded correctly the first time.',
    },
    {
      title: 'Safety on both sides',
      body: 'A passenger is getting into a stranger car. A driver is letting a stranger into theirs. Both need to know something about the other before the door opens.',
    },
  ],

  solution: {
    heading: 'How the two apps fit together',
    intro:
      'We built them as one system with two front doors. The same trip data, the same map, the same fare, presented differently depending on which side you are on.',
    image: '/work/tiptop-ride-hailing/sticky.png',
    steps: [
      {
        title: 'The passenger side: book, watch, pay',
        paragraphs: [
          'A passenger books in a few taps, either for now or for later. Before confirming they see what it will cost. Not an estimate that changes at the end, the actual price.',
          'Once a driver accepts, the passenger watches the car approach on a live map with a real arrival time. That single feature removes most of the anxiety of waiting, because the uncertainty is what makes waiting feel long.',
          'Payment happens by card at the end of the trip. No cash, no fumbling, no working out a tip at the roadside. The passenger closes the door and walks away.',
        ],
      },
      {
        title: 'The driver side: earn on your own terms',
        paragraphs: [
          'Drivers choose their own hours. Some work full time, some fit it around other jobs. The app does not push a schedule at them.',
          'Ride requests arrive as instant notifications with the details attached, so a driver can decide quickly rather than accepting blind. Navigation is built in and accounts for live traffic, which matters because a driver paid per trip loses money sitting still.',
          'Earnings are visible as they happen and transfer automatically. A driver can see what they made today without doing arithmetic at the end of a shift.',
        ],
      },
      {
        title: 'The shared parts underneath',
        paragraphs: [
          'Both apps sit on the same trip system. When a passenger books, that request goes out to nearby drivers immediately. When one accepts, the passenger app updates in the same moment. Neither side is polling or waiting for a refresh.',
          'The map, the route, and the fare are calculated once and shown to both people. There is no version of a trip where the passenger and the driver are looking at different numbers.',
        ],
      },
      {
        title: 'Safety built into both',
        paragraphs: [
          'Drivers are checked before they can take rides. Passengers are vetted too, which drivers notice and appreciate, because most ride-hailing safety features only run in one direction.',
          'Both sides rate each other after a trip. Ratings are visible before a trip starts, so nobody gets in a car knowing nothing about who is in it.',
          'Support sits inside both apps. A driver dealing with a problem at two in the morning does not need to find a phone number.',
        ],
      },
    ],
  },

  capabilitiesHeading: 'What both apps do',

  capabilities: [
    {
      title: 'Book now or later',
      body: 'Passengers request a ride immediately or schedule one in advance.',
    },
    {
      title: 'Live tracking',
      body: 'Both sides see the same car on the same map, updating as it moves.',
    },
    {
      title: 'Price before you ride',
      body: 'The fare is shown up front and does not change at the end.',
    },
    {
      title: 'Instant ride requests',
      body: 'Drivers get notified with enough detail to decide in seconds.',
    },
    {
      title: 'Built in navigation',
      body: 'Routes account for live traffic, so drivers spend less time stationary.',
    },
    {
      title: 'Automatic payment',
      body: 'Cards charged at the end of the trip, earnings transferred to drivers without chasing.',
    },
    {
      title: 'Two way ratings',
      body: 'Drivers and passengers rate each other, and both can see it beforehand.',
    },
    {
      title: 'In app support',
      body: 'Help available inside both apps at any hour.',
    },
  ],

  techStack: [
    {
      layer: 'The apps',
      items: [
        { abbr: 'Fl', name: 'Flutter', role: 'One codebase, four store listings' },
        { abbr: 'Gx', name: 'GetX', role: 'Keeps trip state in step across screens' },
      ],
    },
    {
      layer: 'Live features',
      items: [
        { abbr: 'Ap', name: 'REST APIs', role: 'Moves trip and fare data between both apps' },
        { abbr: 'Gp', name: 'GPS and location', role: 'Live position, routing, and arrival times' },
        { abbr: 'Nt', name: 'Push notifications', role: 'Ride requests and status updates' },
      ],
    },
    {
      layer: 'Money',
      items: [
        { abbr: 'Pg', name: 'Payment gateway', role: 'Card payments and driver payouts' },
      ],
    },
  ],

  outcome: {
    heading: 'Two apps, four store listings, one working service',
    paragraphs: [
      'Both apps went live on the App Store and Google Play and run across Australia. Passengers book, watch, and pay without touching cash. Drivers set their own hours and see their earnings as they go.',
      'Building them as one system rather than two projects is what makes the timing work. A booking reaching a driver in seconds is not a feature you can add afterwards. It has to be the thing the whole system is built around.',
    ],
  },

  featured: true,
  order: 20,
}
