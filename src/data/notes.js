// Short notes. Each body item is one paragraph. Add a note by adding an object.
export const notes = [
  {
    title: 'VLANs in plain words',
    tag: 'Networking',
    minutes: 2,
    intro: 'One set of cables, many small networks.',
    body: [
      'A VLAN splits one physical network into separate virtual ones. Staff, lab and guest devices can plug into the same switches and still never see each other’s traffic.',
      'Each switch port is assigned to a VLAN. The link between the switches and the router is a trunk: it carries every VLAN, with each frame tagged so nothing gets mixed up.',
      'Separate does not mean cut off. When staff need to reach the lab, the router steps in with inter-VLAN routing: one sub-interface per VLAN, each acting as that VLAN’s gateway. Traffic goes up to the router and back down into the other VLAN, and the rules in between are yours to set.',
      'That is the whole idea: fewer cables, cleaner separation, and a router that decides who may talk to whom.',
    ],
  },
  {
    title: 'Accessible by default',
    tag: 'Web',
    minutes: 2,
    intro: 'Mostly cheap decisions, made early.',
    body: [
      'Accessibility is rarely a big feature. It is a handful of small decisions made at the start, when they cost almost nothing.',
      'Use real headings in order, so screen readers can jump around. Give every image honest alt text. Keep text contrast high enough to read in sunlight. Never rely on colour alone to show something, and keep the keyboard focus ring visible.',
      'The quickest test: put the mouse away and tab through the page. If you get lost, a lot of your visitors do too. For a nonprofit site, that is the difference between someone donating and someone leaving.',
    ],
  },
  {
    title: 'How a link checker thinks',
    tag: 'Security',
    minutes: 3,
    intro: 'No single check is enough.',
    body: [
      'A link can look perfectly normal and still lead somewhere dangerous, so one signal is never enough. A checker asks several sources and weighs the answers.',
      'VirusTotal runs the address past many security engines. IPQualityScore adds a risk score based on reputation signals. Neither is perfect, and they disagree sometimes, which is useful: disagreement is a warning in itself.',
      'The part I care about most is the explanation. A bare “unsafe” teaches nothing and causes false alarms. Showing why a link scored badly lets a person decide for themselves, and builds trust in the tool.',
      'It also has to fail safely. If a service is slow or down, the honest answer is “could not check”, never a quiet “looks fine”.',
    ],
  },
  {
    title: 'Meet people where they already are',
    tag: 'Product',
    minutes: 2,
    intro: 'Why an adoption enquiry opens WhatsApp.',
    body: [
      'Contact forms ask people to do work: type a name, an email, a message, then wait. Many simply leave.',
      'In Uganda, and far beyond it, people already live in WhatsApp. A button that opens a chat with the message half-written removes the sign-up, the waiting and the lost email.',
      'The trade-off is real: someone has to answer. A fast, friendly reply is part of the design, as much as the button is.',
    ],
  },
  {
    title: 'How the pencil icons on this site are drawn',
    tag: 'Design',
    minutes: 3,
    intro: 'Plain SVG, one filter, a little animation.',
    body: [
      'Every project icon here is a few SVG strokes. To make them feel hand-drawn, three tricks are layered on top.',
      'First, a wobble: an SVG turbulence filter nudges every point slightly, so no line is perfectly straight. Second, a faint second line, drawn a pixel off, like a pencil that went over the shape twice. Third, a pale pink shadow shape behind the lines, which gives the drawing some weight.',
      'When an icon scrolls into view, each stroke draws itself in turn using its path length. The whole effect is a few lines of Framer Motion, and it respects visitors who ask for reduced motion.',
    ],
  },
]
