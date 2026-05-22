document.addEventListener('DOMContentLoaded', () => {

    // ════════════════════════════════════════
    // 1. Populate UI from CONFIG
    // ════════════════════════════════════════
    document.getElementById('groom').textContent = CONFIG.groomName;
    document.getElementById('bride').textContent = CONFIG.brideName;
    document.getElementById('day-name').textContent = CONFIG.displayDate.dayName;
    document.getElementById('month').textContent = CONFIG.displayDate.month;
    document.getElementById('day-num').textContent = CONFIG.displayDate.dayNumber;
    document.getElementById('time').textContent = CONFIG.displayDate.time;
    document.getElementById('hotel-name').textContent = CONFIG.locationName;
    document.getElementById('address').textContent = CONFIG.locationAddress;
    document.getElementById('bg-image').src = CONFIG.backgroundImage;

    // Update page title
    document.title = `Wedding Invitation — ${CONFIG.groomName} & ${CONFIG.brideName}`;

    // ════════════════════════════════════════
    // 2. Countdown Timer
    // ════════════════════════════════════════
    const eventDate = new Date(CONFIG.eventDateISO).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            const countdownEl = document.querySelector('.countdown');
            countdownEl.innerHTML = '';
            const msg = document.createElement('div');
            msg.className = 'celebration-message';
            msg.innerHTML = "<h3>It's Wedding Day! 🎉</h3>";
            countdownEl.appendChild(msg);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        animateValue('days', days);
        animateValue('hours', hours);
        animateValue('minutes', minutes);
        animateValue('seconds', seconds);
    }

    function animateValue(id, value) {
        const el = document.getElementById(id);
        const newVal = value.toString().padStart(2, '0');
        if (el.textContent !== newVal) {
            el.style.transform = 'translateY(-4px)';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = newVal;
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 150);
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ════════════════════════════════════════
    // 3. Location Click → Google Maps
    // ════════════════════════════════════════
    const locationLink = document.getElementById('location-link');
    locationLink.addEventListener('click', () => {
        window.open(CONFIG.googleMapsLink, '_blank');
    });
    locationLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(CONFIG.googleMapsLink, '_blank');
        }
    });

    // ════════════════════════════════════════
    // 4. Map Button → Google Maps
    // ════════════════════════════════════════
    document.getElementById('map-btn').addEventListener('click', () => {
        window.open(CONFIG.googleMapsLink, '_blank');
    });

    // ════════════════════════════════════════
    // 5. Calendar Buttons
    // ════════════════════════════════════════

    // Helper: Format date for ICS (UTC)
    function toICSDate(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }

    // Helper: Format date for Google Calendar (YYYYMMDDTHHmmssZ)
    function toGoogleDate(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }

    const startDate = new Date(CONFIG.eventDateISO);
    const endDate = new Date(startDate.getTime() + (CONFIG.calendarDetails.durationHours * 60 * 60 * 1000));
    const calTitle = CONFIG.calendarDetails.title;
    const calDesc = CONFIG.calendarDetails.description;
    const calLocation = `${CONFIG.locationName}, ${CONFIG.locationAddress}`;

    // ── Google Calendar ──
    document.getElementById('google-cal-btn').addEventListener('click', () => {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(calTitle)}` +
            `&dates=${toGoogleDate(startDate)}/${toGoogleDate(endDate)}` +
            `&details=${encodeURIComponent(calDesc)}` +
            `&location=${encodeURIComponent(calLocation)}`;
        window.open(url, '_blank');
    });

    // ── Apple Calendar (ICS download) ──
    document.getElementById('apple-cal-btn').addEventListener('click', () => {
        downloadICS();
    });

    // ── Outlook Calendar (ICS download) ──
    document.getElementById('outlook-cal-btn').addEventListener('click', () => {
        downloadICS();
    });

    function downloadICS() {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTART:${toICSDate(startDate)}`,
            `DTEND:${toICSDate(endDate)}`,
            `SUMMARY:${calTitle}`,
            `DESCRIPTION:${calDesc}`,
            `LOCATION:${calLocation}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'wedding_invitation.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ════════════════════════════════════════
    // 6. Floating Particles (Gold Sparkles)
    // ════════════════════════════════════════
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = -(Math.random() * 0.3 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.growing = Math.random() > 0.5;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.growing) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 0.5) this.growing = false;
            } else {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) this.reset();
            }

            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
                this.y = canvas.height + 10;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(196, 164, 132, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(40, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ════════════════════════════════════════
    // 7. Scroll-triggered Animations
    // ════════════════════════════════════════
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
    });

    // ════════════════════════════════════════
    // 8. Button Click Ripple Effect
    // ════════════════════════════════════════
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out forwards;
                pointer-events: none;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
