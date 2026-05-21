# Elegant Wedding Invitation Website 💍

A beautifully designed, fully responsive, and animated single-page website for a wedding invitation. 

## ✨ Features
- **Modern & Elegant Design**: Clean typography and smooth scrolling animations.
- **Countdown Timer**: Automatically calculates and displays the time remaining until the big day.
- **Add to Calendar**: A built-in feature that generates an `.ics` file so guests can easily add the event to their calendars (Google, Apple, Outlook).
- **Google Maps Integration**: Direct link button to the venue's location.
- **Easy to Customize**: All texts, dates, and links are managed from a single configuration file (`config.js`) without needing to touch the HTML structure.

## 🚀 Getting Started

1. Clone or download this repository.
2. Open the project folder.
3. Simply double-click `index.html` to open the website in any modern web browser. (No server required!)

## 🛠️ Customization

You can easily personalize this invitation by editing the `config.js` file and replacing the background image.

### 1. Update Details (`config.js`)
Open `config.js` in any text editor and modify the `CONFIG` object:
```javascript
const CONFIG = {
    groomName: "CONNOR",
    brideName: "CLAUDIA",
    // ... update dates, location, and links here
};
```

### 2. Change the Background Image
1. Prepare a high-quality portrait image of the couple or wedding rings.
2. Name the image `background.jpg` (or `.png`).
3. Place it in the root directory (alongside `index.html`).
4. Make sure the `backgroundImage` property in `config.js` matches your image's file name.

## 🤝 Built With
- **HTML5**
- **CSS3** (Animations & Responsive Layouts)
- **Vanilla JavaScript** (Countdown Logic, ICS Generation, Intersection Observers)
- **Google Fonts** (Great Vibes & Montserrat)
- **FontAwesome** (Icons)

---
*Created with ❤️ for your special day.*
