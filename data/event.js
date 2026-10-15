/* Programme from the supplied design. Date confirmed by the project owner. */
window.TEJAS_EVENT = {
  date: '2026-10-30', venue: 'JRD Tata Hall', timezone: 'Asia/Kolkata',
  programme: [
    {
      id: 'arrival', start: '10:00', end: '10:30', duration: 30, category: 'Welcome & seating', act: 'Act I', title: 'Arrival & Batch Reception',
      description: 'Doors open at JRD Tata Hall. Badge collection, commemorative welcome kits, guest registration, and hall seating.',
      highlights: ['Door registration & wristbands'], image: 'assets/images/auditorium.webp',
      notes: ['Collect your badge and welcome kit at the reception desk.', 'Please follow the volunteers’ directions to your seats and be seated by 10:25 AM.']
    },
    {
      id: 'tradition', start: '10:30', end: '10:45', duration: 15, category: 'Traditional ceremony', act: 'Act I', title: 'Sacred Tradition', subtitle: 'Inaugural Lamp Lighting & Odissi Dance',
      description: 'An auspicious lamp-lighting ceremony led by department dignitaries, followed by a classical Odissi invocation welcoming new beginnings.',
      highlights: ['Classical Odissi invocation recital', 'Dignitary lamp-lighting ceremony'], image: 'assets/images/odissi.webp',
      notes: ['The ceremonial opening begins at 10:30 AM.', 'All attendees are requested to be seated by 10:25 AM. Please keep the aisles clear during the performance.']
    },
    {
      id: 'addresses', start: '10:45', end: '11:15', duration: 30, category: 'Leadership speeches', act: 'Act I', title: 'Welcome Addresses & Faculty Blessings',
      description: 'Opening addresses and words of wisdom from our esteemed faculty, academic leadership, and senior organising council.',
      highlights: ['Inspirational faculty keynotes'], image: 'assets/images/faculty-group.webp',
      notes: ['A warm welcome to the incoming MCA batch, with guidance and blessings from our faculty and academic leadership.', 'Programme coordinators will guide the sequence of addresses.']
    },
    {
      id: 'refreshments', start: '11:15', end: '11:45', duration: 30, category: 'Stage reset & refreshments', act: 'Interlude', title: 'Enjoy a Refreshment Break',
      description: 'A moment to refresh, reconnect, and get ready for the next exciting segment.', highlights: [], image: 'assets/images/refreshments.webp', compact: true, icon: 'cup', notes: []
    },
    {
      id: 'freshers', start: '11:45', end: '12:00', duration: 15, category: 'Batch spotlight', act: 'Act II', title: 'Introduction of the Freshers', subtitle: 'Welcoming the incoming MCA batch (2026–2028)',
      description: 'The spotlight shines on our newest students. First stage introductions to fellow batchmates, faculty mentors, and seniors.',
      highlights: ['Junior cohort stage roll-call'], image: 'assets/images/freshers.webp',
      notes: ['Meet the incoming MCA batch of 2026–2028.', 'Follow the stage coordinators’ instructions for your introduction and group sequence.']
    },
    {
      id: 'celebrations', start: '12:00', end: '12:45', duration: 45, category: 'Cultural & fun activities', act: 'Celebration', title: 'Games · Performances · Memories',
      description: 'Let’s celebrate, connect, and make it memorable!', highlights: [], image: 'assets/images/celebration.webp', compact: true, icon: 'star', notes: []
    }
  ]
};
