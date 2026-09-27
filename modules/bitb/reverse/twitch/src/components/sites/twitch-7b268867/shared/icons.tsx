import React from 'react';

export function TwitchLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="currentColor" {...props}>
      <g fillRule="evenodd">
        <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0 0 5v18h6v5l5-5h4l9-9V0H5zm17 13-4 4h-4l-4 4v-4H6V2h16v11z"></path>
        <path fill="#FFF" d="m18 17 4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"></path>
      </g>
    </svg>
  );
}

export function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true" role="presentation" fill="currentColor" {...props}>
      <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
      <path fillRule="evenodd" d="M18.395 7.794 22 12l-3.605 4.206A8 8 0 0 1 12.32 19h-.64a8 8 0 0 1-6.075-2.794L2 12l3.605-4.206A8 8 0 0 1 11.68 5h.64a8 8 0 0 1 6.075 2.794Zm-1.519 1.301L19.366 12l-2.49 2.905A6 6 0 0 1 12.32 17h-.64a6 6 0 0 1-4.556-2.095L4.634 12l2.49-2.905A6 6 0 0 1 11.68 7h.64a6 6 0 0 1 4.556 2.095Z" clipRule="evenodd"></path>
    </svg>
  );
}
