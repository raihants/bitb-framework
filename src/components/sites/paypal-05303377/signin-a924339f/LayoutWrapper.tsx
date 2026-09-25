import React from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2c2e2f] bg-white sm:bg-[#f5f7fa]">
      {/* Header */}
      <header className="w-full flex justify-center pt-8 sm:pt-12 pb-4">
        {/* Menggunakan persis elemen p yang Anda minta */}
        <p role="img" aria-label="PayPal Logo" className="paypal-logo paypal-logo-long signin-paypal-logo"></p>
      </header>

      <main className="flex-1 w-full flex flex-col justify-start items-center px-4 sm:px-0 pb-8 pt-2">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer w-full bg-[#f5f7fa] py-4" role="contentinfo">
        <div className="legalFooter max-w-[600px] mx-auto flex justify-center">
          <ul className="footerGroup flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] text-[#6b7177] font-medium m-0 p-0 list-none">
            <li><a className="hover:underline" target="_blank" href="/id/smarthelp/contact-us" pa-marked="1">Contact Us</a></li>
            <li><a className="hover:underline" target="_blank" href="/id/webapps/mpp/ua/privacy-full" pa-marked="1">Privacy</a></li>
            <li><a className="hover:underline" target="_blank" href="/id/webapps/mpp/ua/legalhub-full" pa-marked="1">Legal</a></li>
            <li><a className="hover:underline" target="_blank" href="/id/webapps/mpp/ua/upcoming-policies-full" pa-marked="1">Policy Updates</a></li>
            <li><a className="hover:underline" target="_blank" href="/id/webapps/mpp/country-worldwide" pa-marked="1">Worldwide</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
