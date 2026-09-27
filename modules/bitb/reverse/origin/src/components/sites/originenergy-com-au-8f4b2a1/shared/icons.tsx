import React from "react"
import { cn } from "@/lib/utils"

export function OriginLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 62 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-12 w-auto", className)}
      aria-label="origin"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 3C15.5 3 3 15.5 3 31s12.5 28 28 28 28-12.5 28-28S46.5 3 31 3Zm0 40.5c-6.9 0-12.5-5.6-12.5-12.5S24.1 18.5 31 18.5 43.5 24.1 43.5 31 37.9 43.5 31 43.5Z"
        fill="#ff5a1f"
      />
      <text
        x="31"
        y="71"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="-0.6"
        fill="#ff5a1f"
      >
        origin
      </text>
    </svg>
  )
}

export function EyeOffIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}

export function CheckIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}