# Digital World Clock

A beautiful and responsive digital clock application that displays the current time in multiple time zones around the world.

## Features

✨ **Multiple Time Zones**
- Displays time in 8 major cities worldwide:
  - New York (America/New_York)
  - London (Europe/London)
  - Tokyo (Asia/Tokyo)
  - Sydney (Australia/Sydney)
  - Dubai (Asia/Dubai)
  - Singapore (Asia/Singapore)
  - India (Asia/Kolkata)
  - Los Angeles (America/Los_Angeles)

🎨 **Beautiful UI**
- Modern gradient background
- Card-based layout with hover effects
- Digital display style with neon green text
- Responsive design for all screen sizes
- Smooth animations and transitions

⏱️ **Real-time Updates**
- Updates every second
- Shows time, date, and timezone info
- Accurate timezone conversion using Intl API

📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Adaptive grid layout
- Touch-friendly interface

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chandrapal-cloud/ride-easy-ev.git
cd ride-easy-ev
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

The clock automatically starts displaying times for all configured time zones. The display updates every second to show the current time.

### Customizing Time Zones

To add or modify time zones, edit the `timezonesList` array in `src/components/WorldClock.tsx`:

```typescript
const timezonesList = [
  { name: 'City Name', timezone: 'Continent/City' },
  // Add more time zones here
];
```

Common timezone formats:
- `America/New_York`, `America/Los_Angeles`, `America/Chicago`
- `Europe/London`, `Europe/Paris`, `Europe/Berlin`
- `Asia/Tokyo`, `Asia/Shanghai`, `Asia/Hong_Kong`
- `Asia/Dubai`, `Asia/Bangkok`, `Asia/Bangkok`
- `Australia/Sydney`, `Australia/Melbourne`
- `UTC` for Coordinated Universal Time

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **CSS3** - Styling with gradients and animations
- **Intl API** - Timezone conversion

## Component Structure

```
src/
├── components/
│   └── WorldClock.tsx      # Main clock component
├── styles/
│   └── WorldClock.css      # Styling
├── App.tsx                 # Root component
└── index.tsx               # Entry point
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Minimal re-renders using React hooks
- Efficient interval cleanup
- No external library dependencies for timezone handling

## Future Enhancements

- Add ability to customize selected time zones
- Analog clock display option
- 12-hour and 24-hour format toggle
- Timezone search functionality
- Alarm functionality
- Dark mode toggle
- Local storage for saved preferences

## License

This project is part of the ride-easy-ev repository and follows the same license terms.

## Author

Created by @chandrapal-cloud

---

Enjoy tracking time around the world! 🌍⏰
