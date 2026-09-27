export function FacebookLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-label="Facebook"
      role="img"
    >
      <circle cx="24" cy="24" r="24" fill="#0866ff" />
      <path
        fill="#fff"
        d="M31.5 24H27v14h-6V24h-3v-5h3v-3.2c0-3.5 1.5-5.8 5.8-5.8H31v5h-2.4c-1.3 0-1.6.5-1.6 1.7V19h4.5l-.5 5Z"
      />
    </svg>
  );
}

export function MetaWordmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 66 14"
      height="14"
      aria-label="Meta"
      role="img"
    >
      {/* Infinity mark */}
      <path
        fill="#0064e0"
        d="M2.2 8.9c0 1 .2 1.7.5 2.1.4.6.9.8 1.6.8.9 0 1.7-.5 2.4-1.4.9-1.2 1.5-2.2 2.3-3.7L8.2 5.1C7.6 6.2 7.2 6.9 6.7 7.6c-.5.8-.9 1-1.4 1-.5 0-.9-.5-.9-1.5 0-1.6.5-3.1 1.2-4.2.5-.8 1.1-1.2 1.9-1.2 1 0 1.9.6 2.7 2 .1.2.3.5.4.8l1.4-2.2C11.4 1 10.1.1 8.5.1 6.9.1 5.5.9 4.4 2.3 3 4 2.2 6.4 2.2 8.9Zm7.4-3.8 1.6 2.6c.7 1.2 1.2 2 1.8 2.8.9 1.2 1.9 1.8 3.1 1.8 1.8 0 2.8-1.6 2.8-4.3 0-2.7-.8-5-2.1-6.5C15.9.5 15 .1 14 .1c-1.1 0-2.1.5-3 1.5l1.3 2.1c.5-.7 1-1 1.6-1 .6 0 1 .3 1.4.9.5.9.8 2.2.8 3.5 0 1.3-.3 1.9-.9 1.9-.5 0-.9-.3-1.5-1.2-.4-.6-.9-1.4-1.5-2.5L9.6 5.1Z"
      />
      <text
        x="24"
        y="11.5"
        fontFamily="-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="#1c2b33"
      >
        Meta
      </text>
    </svg>
  );
}
