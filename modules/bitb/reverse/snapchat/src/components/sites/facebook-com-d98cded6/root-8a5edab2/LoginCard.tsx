"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FacebookLogoIcon,
  MetaWordmarkIcon,
} from "@/components/sites/facebook-com-d98cded6/shared/icons";

function FloatingInput({
  id,
  type,
  label,
}: {
  id: string;
  type: string;
  label: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={label}
        autoComplete="off"
        className={cn(
          "h-[60px] w-full rounded-2xl border px-4 text-[16px] font-medium text-[color:var(--fb-text)]",
          "border-[color:var(--fb-input-border)] bg-white outline-none",
          "placeholder:text-[color:var(--fb-text-muted)]",
          "focus:border-[color:var(--fb-blue)] focus:ring-1 focus:ring-[color:var(--fb-blue)]",
        )}
      />
    </div>
  );
}

export function LoginCard() {
  const [notice, setNotice] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      {/* Logo bar */}
      <div className="flex w-full justify-center border-b border-[color:var(--fb-separator)] py-10">
        <FacebookLogoIcon className="h-12 w-12" />
      </div>

      {/* Card */}
      <div className="w-full max-w-[428px] px-4 pt-12">
        <h1 className="mb-3 text-[17px] font-semibold leading-[22px] text-[color:var(--fb-text)]">
          Log in to Facebook
        </h1>

        {/* Non-functional form — guardrail: no action, no network, password never read */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(true);
          }}
          className="flex flex-col gap-3"
        >
          <FloatingInput
            id="fb-email"
            type="text"
            label="Email address or mobile number"
          />
          <FloatingInput id="fb-pass" type="password" label="Password" />

          <button
            type="button"
            onClick={() => setNotice(true)}
            className={cn(
              "mt-1 h-11 w-full rounded-[22px] text-[15px] font-medium text-[#f2f4f6]",
              "bg-[color:var(--fb-blue)] transition-colors hover:bg-[color:var(--fb-blue-hover)]",
            )}
          >
            Log in
          </button>

          {notice && (
            <p
              role="status"
              className="text-center text-[13px] text-[color:var(--fb-text-muted)]"
            >
              Demo — tidak ada data yang dikirim.
            </p>
          )}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-2 text-center text-[14px] font-bold text-[color:var(--fb-link)] hover:underline"
          >
            Forgotten password?
          </a>
        </form>

        <div className="my-6">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={cn(
              "flex h-11 w-full items-center justify-center rounded-[22px] text-[15px] font-bold",
              "border border-[color:var(--fb-link)] text-[color:var(--fb-link)]",
              "transition-colors hover:bg-[color:var(--fb-link)]/5",
            )}
          >
            Create new account
          </a>
        </div>

        <div className="flex justify-center pb-4">
          <MetaWordmarkIcon className="h-3.5" />
        </div>
      </div>
    </div>
  );
}
