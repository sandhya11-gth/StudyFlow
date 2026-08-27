import React from 'react';

export default function PixelIcon({ name, className = 'w-4 h-4' }) {
  const icons = {
    home: (
      <path d="M6 1h4v2H6V1zm-2 2h8v2H4V3zm-2 2h12v2H2V5zm-1 2h14v9H1V7zm3 2v5h3V9H4zm5 0v5h3V9H9z" />
    ),
    calendar: (
      <path d="M3 1h2v2H3V1zm8 0h2v2h-2V1zM1 3h14v12H1V3zm2 4h2v2H3V7zm4 0h2v2H7V7zm4 0h2v2h-2V7zm-8 4h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2z" />
    ),
    task: (
      <path d="M1 2h14v12H1V2zm2 3v2h2V5H3zm0 4v2h2V9H3zm4-4v2h6V5H7zm0 4v2h6V9H7z" />
    ),
    clock: (
      <path d="M5 1h6v2H5V1zM3 3h10v2H3V3zM1 5h14v6H1V5zm2 6h10v2H3v-2zm2 2h6v2H5v-2zm2-7h2v3H7V7z" />
    ),
    book: (
      <path d="M1 2h6v12H1V2zm8 0h6v12H9V2zm-6 3h3v1.5H3V5zm0 3h3v1.5H3V8zm8-3h3v1.5h-3V5zm0 3h3v1.5h-3V8z" />
    ),
    stats: (
      <path d="M1 13h14v2H1v-2zm1-3h3v2H2v-2zm4-4h3v6H6V6zm4-3h3v9h-3V3z" />
    ),
    notes: (
      <path d="M2 1h9l4 4v10H2V1zm2 3v1.5h5V4H4zm0 3v1.5h8V7H4zm0 3v1.5h8V10H4z" />
    ),
    star: (
      <path d="M7 1h2v2H7V1zm-2 2h6v2H5V3zm-4 3h14v2H1V6zm2 2h10v2H3V8zm2 2h6v2H5v-2zm-2 2h2v3H3v-3zm8 0h2v3h-2v-3z" />
    ),
    flower: (
      <path d="M7 1h2v3H7V1zm-4 4h3v2H3V5zm8 0h3v2h-3V5zm-3 3h2v2H8V8zm-1 3h2v4H7v-4z" />
    )
  };

  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name] || icons.star}
    </svg>
  );
}