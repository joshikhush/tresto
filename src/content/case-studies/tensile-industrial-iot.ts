import type { CaseStudy } from '@/types/case-study'

export const tensileIndustrialIot: CaseStudy = {
  slug: 'tensile-industrial-iot',
  title: 'Controlling factory machines from a phone',
  summary:
    'We built an app that talks to industrial equipment over Bluetooth, so operators can check and adjust machines without plugging anything in.',
  industry: 'industrial-iot',
  year: '2025',
  platform: 'iOS and Android',
  readTime: '6 min read',

  heroImage: '/work/tensile-industrial-iot/hero.png',

  atAGlance: [
    { label: 'Sector', value: 'Industrial IoT' },
    { label: 'Platform', value: 'iOS and Android' },
    { label: 'Language', value: 'Machines speak Modbus' },
    { label: 'Connection', value: 'Bluetooth' },
    { label: 'Equipment', value: 'RS485 controllers' },
    { label: 'Year', value: '2025' },
  ],

  metrics: [
    { value: '78ms', label: 'Time between tapping the screen and the machine responding' },
    { value: '2', label: 'App stores served by one set of code' },
    { value: '0', label: 'Cables needed on the factory floor' },
  ],

  problem: {
    heading: 'Checking one setting meant walking to the machine',
    paragraphs: [
      'A factory runs dozens of machines. Each one has settings that need checking and adjusting during a shift. Temperature, speed, limits, alarms. Small changes, made often.',
      'To make any of those changes, an operator had to walk to the machine carrying a laptop, plug a cable into it, open a program that only ran on Windows, make the change, unplug, and walk back. A thirty second job took ten minutes. Then the next machine needed the same thing.',
      'The company had already looked at replacing the equipment with newer models that connect to a network. The quote came back at six figures, plus shutting the line down while it was installed. They did not want new machines. They wanted a better way to talk to the ones they already owned.',
    ],
  },

  pullQuote: {
    text: 'The hard part was never the app. It was teaching a language built for cables to work over radio.',
    afterParagraph: 1,
  },

  challengesHeading: 'Four things that had to work before anything else could',

  challenges: [
    {
      title: 'A language built for wires',
      body: 'Factory machines talk using something called Modbus. It was designed in 1979 for equipment connected by cable, so it assumes messages arrive complete and on time. Bluetooth promises neither of those things. Every assumption Modbus makes had to be rebuilt in software.',
    },
    {
      title: 'Two phone systems, one behaviour',
      body: 'iPhones and Android phones handle Bluetooth differently. Different permissions, different ways of dropping a connection, different things that go wrong. The machine on the other end could not be allowed to notice which kind of phone was talking to it.',
    },
    {
      title: 'Writing to live equipment',
      body: 'If a message gets lost while reading a value, you just read it again. If it gets lost halfway through changing a setting on running machinery, that is a safety problem. Every change had to be checked before it was sent and confirmed after it arrived.',
    },
    {
      title: 'Delay you can feel',
      body: 'If tapping a button takes longer than about a sixth of a second to do anything, people assume it did not work and tap again. On a control panel for industrial equipment, tapping twice is not harmless.',
    },
  ],

  solution: {
    heading: 'Three decisions, made in order',
    intro:
      'Most of the work sat in the gap between two things that were never meant to meet. Modbus expects a cable. Bluetooth is a radio. Here is how we closed that gap.',
    image: '/work/tensile-industrial-iot/sticky.png',
    steps: [
      {
        title: 'We taught the app to speak Modbus itself',
        paragraphs: [
          'The usual approach is to write separate code for each phone system and have both wrap an existing library. That means two versions of everything, two sets of bugs, and every future change made twice.',
          'Instead we wrote the machine language directly into the app, once, in a way both phone systems share. Reading values, flipping switches, checking messages arrived intact. All of it lives in one place.',
          'That decision paid off later. When the client needed the app to handle a different range of settings on a second type of machine, it was one change instead of two.',
        ],
      },
      {
        title: 'Then built a translator between Bluetooth and the machine',
        paragraphs: [
          'The equipment speaks over a wired connection called RS485. Phones only speak Bluetooth. So we built a layer in between whose only job is translating one into the other, without either side knowing the other exists.',
          'This absorbed most of the debugging time. Bluetooth breaks messages into small pieces and sends them whenever it can. Modbus expects whole messages arriving in order. The translator collects the pieces, puts them back together, and checks the result is complete before passing it on.',
          'That check is what makes it safe. A piece that goes missing becomes a retry rather than a half finished instruction reaching a running machine.',
        ],
      },
      {
        title: 'And tuned it until it felt instant',
        paragraphs: [
          'Working is not the same as usable. The first version was correct and horrible to use. Commands took nearly half a second to come back, which on a control screen reads as broken.',
          'Fixing it meant going underneath the app. We asked the phone to check in with the machine more frequently, requested priority for the connection from the operating system, and combined requests that had been going out one at a time into single batches.',
          'That brought the round trip down to roughly 78 milliseconds. Below that threshold an interface stops feeling like a request and starts feeling like a switch.',
        ],
      },
    ],
  },

  capabilitiesHeading: 'What we handed over',

  capabilities: [
    {
      title: 'Machine language, built in',
      body: 'The app reads and writes machine settings directly, without depending on outside software.',
    },
    {
      title: 'Bluetooth to equipment bridge',
      body: 'A translation layer connecting phones to the wired controllers already installed on the floor.',
    },
    {
      title: 'Response tuning',
      body: 'Connection settings adjusted so commands land in about 78 milliseconds.',
    },
    {
      title: 'Live readings',
      body: 'Current values shown as they are, without the delay that hides what a machine is actually doing.',
    },
    {
      title: 'Safe changes',
      body: 'Every setting change checked before sending and confirmed after arriving.',
    },
    {
      title: 'Finding machines',
      body: 'A pairing process that still works through the electrical noise a factory floor produces.',
    },
  ],

  techStack: [
    {
      layer: 'The app',
      items: [
        { abbr: 'Fl', name: 'Flutter', role: 'One set of code for both iPhone and Android' },
        { abbr: 'Dt', name: 'Dart', role: 'Where the machine language lives' },
        { abbr: 'Gx', name: 'GetX', role: 'Keeps track of what is connected' },
      ],
    },
    {
      layer: 'Talking to machines',
      items: [
        { abbr: 'Mb', name: 'Modbus RTU', role: 'The language factory equipment speaks' },
        { abbr: 'Mt', name: 'Modbus TCP', role: 'Same language for networked units' },
        { abbr: 'BL', name: 'Bluetooth LE', role: 'The wireless connection itself' },
        { abbr: 'fb', name: 'flutter_blue_plus', role: 'Handles Bluetooth connecting and dropping' },
      ],
    },
    {
      layer: 'The equipment',
      items: [
        { abbr: 'RS', name: 'RS485', role: 'The wired connection machines use' },
        { abbr: 'PL', name: 'Industrial controllers', role: 'The hardware being controlled' },
      ],
    },
  ],

  outcome: {
    heading: 'A ten minute job became a thirty second one',
    paragraphs: [
      'Operators now check and adjust machines from wherever they are standing. The laptop and the cable stayed in the cupboard. The equipment the company had already paid for carried on doing its job. No replacement, no shutdown, no six figure bill.',
      'The machine language layer has since been reused on two more types of equipment the same client runs. That was the point of building it into the app rather than borrowing it from somewhere else. The second time cost a fraction of the first.',
    ],
  },

  featured: true,
  order: 30,
}
