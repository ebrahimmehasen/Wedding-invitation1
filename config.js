// ╔══════════════════════════════════════════════════════════════════╗
// ║              🎊  WEDDING INVITATION CONFIG  🎊                 ║
// ║                                                                ║
// ║  Edit the values below to customize your wedding invitation.   ║
// ║  You only need to change this file — everything else updates   ║
// ║  automatically!                                                ║
// ╚══════════════════════════════════════════════════════════════════╝

const CONFIG = {

    // ─────────────────────────────────────────────
    // 1. NAMES (Change the bride and groom names)
    // ─────────────────────────────────────────────
    groomName: "CONNOR",
    brideName: "CLAUDIA",

    // ─────────────────────────────────────────────
    // 2. EVENT DATE & TIME
    //    - eventDateISO: Full date/time in ISO format (YYYY-MM-DDTHH:MM:SS)
    //    - displayDate: How the date appears on the invitation card
    // ─────────────────────────────────────────────
    eventDateISO: "2026-05-25T10:00:00",

    displayDate: {
        dayName: "SUNDAY",
        month: "MAY",
        dayNumber: "25",
        time: "AT 10 AM",
    },

    // ─────────────────────────────────────────────
    // 3. LOCATION
    //    - locationName: The venue name
    //    - locationAddress: The street address
    //    - googleMapsLink: Paste the Google Maps link here
    // ─────────────────────────────────────────────
    locationName: "Borcelle Hotel",
    locationAddress: "123 Anywhere St., Any City",
    googleMapsLink: "https://maps.google.com/?q=123+Anywhere+St.,+Any+City",

    // ─────────────────────────────────────────────
    // 4. BACKGROUND IMAGE
    //    - Path to the background/hero image
    // ─────────────────────────────────────────────
    backgroundImage: "background.jpg",

    // ─────────────────────────────────────────────
    // 5. CALENDAR EVENT DETAILS
    //    - title: The calendar event title
    //    - description: A short description for the calendar event
    //    - durationHours: How long the event lasts (in hours)
    // ─────────────────────────────────────────────
    calendarDetails: {
        title: "Wedding of Connor & Claudia",
        description: "Join us to celebrate the wedding of Connor and Claudia!",
        durationHours: 4,
    },
};
