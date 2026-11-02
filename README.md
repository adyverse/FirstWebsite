# Stubby – Event Management Website

A responsive event discovery and registration site built with plain HTML5, CSS3 and JavaScript (no build step).

**Live site:** _add your deployed link here_

## Features
- Hero section with a live countdown to the next event
- Event cards with name, date, venue, category, image area and short description
- Search by name, venue or keyword, plus category filters
- Detail popup for each event with its own countdown and a register button
- Registration form (name, email, phone, event) with JavaScript validation and inline error messages
- Confirmation message with a ticket ID after a successful registration
- Dark/light mode (remembers your choice, follows system theme by default)
- Registrations saved in Local Storage, with a "My tickets" list and cancel option
- Responsive layout for mobile, tablet and desktop; keyboard focus styles; reduced-motion support

## Project structure
```
index.html   page structure
style.css    theme variables, layout, animations, responsive rules
script.js    event data, rendering, search/filter, modal, validation, storage, countdown
```

## How it works
- Events live in the `EVENTS` array in `script.js`. Add or edit objects to change the site; dates must be in `YYYY-MM-DDTHH:mm` format. Past events are hidden automatically.
- To use real photos, add an `img` URL to an event and render it in `renderGrid()` instead of the gradient and emoji.
- Validation rules: name (letters, 3+ characters), email format, Indian 10-digit mobile number, event selected, and no duplicate email for the same event.
- Data is stored under the `stubby_regs` Local Storage key; the theme under `stubby_theme`.

## Run locally
Open `index.html` in a browser, or run `npx serve .`

## Deploy
Push to GitHub, then enable **Settings → Pages → Deploy from branch (main, root)**, or import the repo on Netlify/Vercel.
## Try It Out
https://adyverse.github.io/FirstWebsite/
