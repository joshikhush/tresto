import type { CaseStudy } from '@/types/case-study'

export const calibmate: CaseStudy = {
  slug: 'calibmate',
  title: 'Proving a machine is accurate, with photographs',
  summary:
    'A calibration app for factories that have to prove their equipment is accurate. Every reading recorded, every step photographed, ready for an inspector.',
  industry: 'manufacturing',
  year: '2024',
  platform: 'iOS and Android',
  readTime: '6 min read',

  heroImage: '/work/calibmate/hero.png',

  atAGlance: [
    { label: 'Sector', value: 'Manufacturing and compliance' },
    { label: 'Platform', value: 'iOS and Android' },
    { label: 'Purpose', value: 'Equipment calibration records' },
    { label: 'Evidence', value: 'Photograph per reading' },
    { label: 'Forms', value: 'Change per instrument' },
    { label: 'Year', value: '2024' },
  ],

  problem: {
    heading: 'The measurement is easy. Proving you took it is the hard part',
    paragraphs: [
      'Factories in regulated industries have to check their equipment regularly and prove it is still accurate. A gauge that reads two percent high produces two percent wrong parts, and nobody finds out until a customer does.',
      'The checking itself is routine. A technician takes readings, compares them against a standard, and records the result. What is not routine is the paperwork. Every reading has to be written down, signed, filed, and produced on demand when an auditor asks for it.',
      'That paperwork lives on printed forms in binders. Forms get filled in at the end of the day from memory. Numbers get transcribed and transposed. And when an inspector asks how you know a particular reading was taken on a particular machine, the honest answer is often that you do not.',
    ],
  },

  pullQuote: {
    text: 'A calibration record with no evidence behind it is a piece of paper saying somebody remembers doing something.',
    afterParagraph: 1,
  },

  challengesHeading: 'What a compliance app has to get right',

  challenges: [
    {
      title: 'Every instrument is different',
      body: 'A pressure gauge, a torque wrench, and a temperature probe are checked in completely different ways, with different readings, different columns, and different numbers of steps. One fixed form cannot serve all three.',
    },
    {
      title: 'Records that hold up to an auditor',
      body: 'The point of the record is that someone outside the company believes it. That means knowing who took a reading, when, on which machine, and having something more than a typed number to show for it.',
    },
    {
      title: 'Tables on a phone screen',
      body: 'Calibration data is naturally a grid. Rows of readings, columns of conditions. Grids are difficult on a phone at the best of times, and this one had to be filled in by someone standing next to a machine.',
    },
    {
      title: 'Access that is actually controlled',
      body: 'If anyone can log in and edit a calibration record, the record proves nothing. Access has to be genuinely restricted, including the part where somebody forgets their password.',
    },
  ],

  solution: {
    heading: 'How the record became trustworthy',
    intro:
      'The app does two things that paper cannot. It changes shape depending on what is being calibrated, and it attaches a photograph to every single reading.',
    image: '/work/calibmate/sticky.png',
    steps: [
      {
        title: 'Forms that change per instrument',
        paragraphs: [
          'Rather than one form covering everything badly, the app builds the right table for whatever is being calibrated. A pressure gauge gets pressure columns. A torque wrench gets torque columns. The technician sees only the readings that apply.',
          'We used a proper data grid rather than a stack of input boxes, so the table behaves like a table even on a phone. Rows and columns, tapping into cells, moving through them in the order the work is actually done.',
          'This is what makes the app usable at the machine instead of at a desk afterwards. A form that matches the job gets filled in during the job.',
        ],
      },
      {
        title: 'A photograph for every reading',
        paragraphs: [
          'The technician can capture an image against any individual cell in the table. Not one photo of the machine at the end, a photo tied to that specific reading.',
          'This is the part that changes what the record means. A number in a box is a claim. A number with a photograph of the display it was read from is evidence. When an auditor asks how you know, there is an answer.',
          'It also catches mistakes. A photograph and a typed number that disagree is a transcription error found immediately rather than a wrong record filed for three years.',
        ],
      },
      {
        title: 'Scheduling so nothing gets missed',
        paragraphs: [
          'Calibrations are due on a cycle, and the expensive failures come from equipment quietly going past its date. The app tracks what is due and when, so the schedule is a live list rather than a spreadsheet someone remembers to check.',
          'Records are visible as they are entered rather than after processing. Somebody in the office can see a calibration was completed this morning without waiting for a folder to arrive.',
        ],
      },
      {
        title: 'Access that means something',
        paragraphs: [
          'Login is properly controlled, and password resets go through a one time code sent to the user rather than an email link anyone with access to a shared inbox could use.',
          'It sounds like a small detail next to the calibration work itself. It is not. The whole value of the record rests on knowing which named person entered it.',
        ],
      },
    ],
  },

  capabilitiesHeading: 'What the app does',

  capabilities: [
    {
      title: 'Instrument specific forms',
      body: 'The table changes to match whatever is being calibrated.',
    },
    {
      title: 'Photograph per cell',
      body: 'Evidence captured against individual readings, not just the job as a whole.',
    },
    {
      title: 'Live records',
      body: 'Results visible as they are entered rather than after paperwork is processed.',
    },
    {
      title: 'Calibration scheduling',
      body: 'Tracks what is due and when, so equipment does not drift past its date.',
    },
    {
      title: 'Controlled access',
      body: 'Login, logout, and password changes properly restricted.',
    },
    {
      title: 'One time code resets',
      body: 'Password recovery through a code to the user, not a shared inbox.',
    },
  ],

  techStack: [
    {
      layer: 'The app',
      items: [
        { abbr: 'Fl', name: 'Flutter', role: 'One codebase for iPhone and Android' },
        { abbr: 'Dt', name: 'Dart', role: 'The language the app is written in' },
        { abbr: 'Sf', name: 'Syncfusion DataGrid', role: 'Makes calibration tables workable on a phone' },
      ],
    },
    {
      layer: 'Evidence',
      items: [
        { abbr: 'Cm', name: 'Camera capture', role: 'Photographs attached to individual readings' },
        { abbr: 'St', name: 'Image storage', role: 'Keeps evidence against the record it belongs to' },
      ],
    },
    {
      layer: 'Access',
      items: [
        { abbr: 'Au', name: 'Authentication', role: 'Controls who can enter and edit records' },
        { abbr: 'Ot', name: 'One time codes', role: 'Password resets that cannot be intercepted' },
      ],
    },
  ],

  outcome: {
    heading: 'A record an auditor can believe',
    paragraphs: [
      'Calibrations are recorded at the machine, on a form built for that instrument, with a photograph behind every reading. The binder of forms filled in from memory is gone.',
      'What changed is not the speed of the work. It is what the record is worth afterwards. A calibration with photographic evidence and a named person attached answers the question an inspector actually asks, which is not what the reading was, but how you know.',
    ],
  },

  featured: false,
  order: 60,
}
