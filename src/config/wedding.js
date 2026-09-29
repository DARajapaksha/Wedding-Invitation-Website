export const WEDDING = {
  siteTitle: 'Nimesha & Kasun | Wedding Invitation',
  bride: 'Nimesha',
  groom: 'Kasun',
  greeting: 'Together with their families',
  intro: 'joyfully invite you to celebrate the beginning of their forever.',

  // Sri Lanka time (UTC+05:30). The supplied time was 9.30; this starter uses 9:30 AM.
  // Change the time below to 21:30:00 if your event is at 9:30 PM.
  date: '2026-12-20T09:30:00+05:30',
  dateLabel: 'Sunday, 20 December 2026',
  timeLabel: '9:30 AM',

  location: 'Colombo, Sri Lanka',
  venue: 'Hilton Colombo',
  address: '2 Sir Chittampalam A Gardiner Mawatha, Colombo 00200',
  mapsUrl: 'https://maps.app.goo.gl/musk4aFfUDdS9xmr8',

  year: '2026',
  rsvpDeadline: null,
  rsvpMessage: 'Please let us know whether you can join us in celebrating our special day.',

  music: {
    enabled: true,
    src: '/audio/wedding-music.mp3',
    label: 'Play our song',
  },

  // Add your 5–6 wedding photographs to public/images/ using these filenames.
  gallery: [
    { src: '/images/photo-01.jpg', alt: 'Nimesha and Kasun portrait', featured: true },
    { src: '/images/photo-02.jpg', alt: 'Nimesha and Kasun together' },
    { src: '/images/photo-03.jpg', alt: 'Engagement photograph' },
    { src: '/images/photo-04.jpg', alt: 'A special moment together' },
    { src: '/images/photo-05.jpg', alt: 'Celebration photograph' },
    { src: '/images/photo-06.jpg', alt: 'A quiet moment together' },
  ],

  // Replace the placeholder copy below with your real story when ready.
  story: [
    {
      year: '01',
      title: 'How it began',
      text: 'Add the story of how Nimesha and Kasun first met here. Keep it short, personal and warm.',
    },
    {
      year: '02',
      title: 'The memories',
      text: 'Add a favourite memory, a first trip, a funny moment or the little things that brought you closer.',
    },
    {
      year: '03',
      title: 'The next chapter',
      text: 'Add the moment you knew you wanted to build a future together.',
    },
    {
      year: '04',
      title: 'Forever begins',
      text: 'On 20 December 2026, the next chapter begins with the people you love beside you.',
    },
  ],

  schedule: [
    {
      time: '08:00 AM',
      title: 'Guest Arrival',
      text: 'Welcome and gathering of guests.',
    },
    {
      time: '09:00 AM',
      title: 'Wedding Ceremony',
      text: 'The ceremony begins.',
    },
    {
      time: '10:00 AM',
      title: 'Congratulations & Group Photos',
      text: 'Share congratulations and capture group memories.',
    },
    {
      time: '12:00 PM',
      title: 'Lunch Reception',
      text: 'A joyful reception and lunch with family and friends.',
    },
    {
      time: '02:00 PM',
      title: 'Couple Entrance & First Dance',
      text: 'Celebrate the couple’s entrance and first dance.',
    },
    {
      time: '03:30 PM',
      title: 'Cake Cutting Ceremony',
      text: 'A sweet moment shared with everyone.',
    },
    {
      time: '05:00 PM',
      title: 'Closing & Farewell',
      text: 'A warm farewell to end the celebration.',
    },
  ],
};
