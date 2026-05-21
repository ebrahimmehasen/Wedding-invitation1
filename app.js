document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate UI from CONFIG
    document.getElementById('groom').textContent = CONFIG.groomName;
    document.getElementById('bride').textContent = CONFIG.brideName;
    document.getElementById('day-name').textContent = CONFIG.displayDate.dayName;
    document.getElementById('month').textContent = CONFIG.displayDate.month;
    document.getElementById('day-num').textContent = CONFIG.displayDate.dayNumber;
    document.getElementById('time').textContent = CONFIG.displayDate.time;
    document.getElementById('hotel-name').textContent = CONFIG.locationName;
    document.getElementById('address').textContent = CONFIG.locationAddress;
    document.getElementById('bg-image').src = CONFIG.backgroundImage;

    // 2. Countdown Timer
    const eventDate = new Date(CONFIG.eventDateISO).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.querySelector('.countdown').innerHTML = "<h3>It's Wedding Day!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Map Button
    document.getElementById('map-btn').addEventListener('click', () => {
        window.open(CONFIG.googleMapsLink, '_blank');
    });

    // 4. Add to Calendar Button (Generates an ICS file)
    document.getElementById('calendar-btn').addEventListener('click', () => {
        const startDate = new Date(CONFIG.eventDateISO);
        const endDate = new Date(startDate.getTime() + (CONFIG.calendarDetails.durationHours * 60 * 60 * 1000));

        const formatDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        };

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${formatDate(startDate)}`,
            `DTEND:${formatDate(endDate)}`,
            `SUMMARY:${CONFIG.calendarDetails.title}`,
            `DESCRIPTION:${CONFIG.calendarDetails.description}`,
            `LOCATION:${CONFIG.locationName}, ${CONFIG.locationAddress}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'wedding_invitation.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // 5. Scroll Animations Trigger (Optional since they run on load here, but good for scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                // Trigger animation by resetting it or letting CSS handle it via class presence
                // It's already handled by the CSS keyframes running once visibility/opacity is applied
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
    });
});
