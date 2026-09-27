"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=demo&redirect_uri=https%3A%2F%2Fwww.twitch.tv&response_type=token&scope=email",
      "google_login",
      "width=500,height=600,left=200,top=200",
    );
  };

  return (
    <>
      <div className="Layout-sc-1xcs6mc-0 gDepQe flex-1 flex flex-col w-full h-full min-h-screen bg-[#f7f7f8] dark:bg-[#0e0e10] transition-colors">
        <div className="scrollable-area overflow-auto w-full h-full">
          <div className="mx-auto max-w-[520px]">
            <div className="Layout-sc-1xcs6mc-0 gUJjOO flex w-full flex-col bg-white dark:bg-[#18181b] rounded-none shadow-none transition-colors">
              <div className="Layout-sc-1xcs6mc-0 hIWzhZ">
                <div tabIndex={0} className="Layout-sc-1xcs6mc-0">
                  <div className="Layout-sc-1xcs6mc-0 hJtYyR">
                    <div className="Layout-sc-1xcs6mc-0 KCWXt">
                      <div className="Layout-sc-1xcs6mc-0 chakVu mt-4 h-7 px-4">
                        <div className="Layout-sc-1xcs6mc-0 cuOtSo flex h-full items-center justify-center gap-[5px]">
                          <div className="Layout-sc-1xcs6mc-0 iFXGqU">
                            <div className="ScSvgWrapper-sc-wkgzod-0 iQTZfI tw-svg text-[#9146ff] dark:text-[#bf94ff] flex items-center justify-center">
                              <svg
                                width="24"
                                height="28"
                                viewBox="0 0 24 28"
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                fill="currentColor"
                              >
                                <g fillRule="evenodd">
                                  <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0 0 5v18h6v5l5-5h4l9-9V0H5zm17 13-4 4h-4l-4 4v-4H6V2h16v11z"></path>
                                  <path
                                    fill="#FFF"
                                    d="m18 17 4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <p className="CoreText-sc-1txzju1-0 ScTitleText-sc-d9mj2s-0 fPdFux GsAAv tw-title m-0 text-[24px] leading-[26.4px] font-medium tracking-[-0.24px] text-[#0e0e10] dark:text-[#efeff1] transition-colors">
                            Log in to Twitch
                          </p>
                        </div>
                      </div>
                      <div className="Layout-sc-1xcs6mc-0 fBbQPk mt-4 px-4 pb-4">
                        <form
                          name="login-submit-form"
                          noValidate
                          className="text-[14px] leading-[1.4]"
                          style={{ height: "100%" }}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="Layout-sc-1xcs6mc-0 hJtYyR">
                            <div className="Layout-sc-1xcs6mc-0 dmulkQ">
                              <div className="Layout-sc-1xcs6mc-0">
                                <div className="Layout-sc-1xcs6mc-0 oRizm mb-1 flex h-5 items-center">
                                  <div className="Layout-sc-1xcs6mc-0 dmulkQ">
                                    <label
                                      htmlFor="login-username"
                                      className="ScFormLabel-sc-1p4hav0-0 bgEOlL tw-form-label text-[14px] font-bold text-[#0e0e10] dark:text-[#f7f7f8] transition-colors"
                                    >
                                      Username
                                    </label>
                                  </div>
                                </div>
                                <div className="ScInputContainer-sc-vu7u7d-3 WVQC">
                                  <div
                                    data-a-target="login-username-input"
                                    className="Layout-sc-1xcs6mc-0 glFavL"
                                  >
                                    <input
                                      id="login-username"
                                      aria-label="Enter your username"
                                      type="text"
                                      className="ScInputBase-sc-vu7u7d-0 ScInput-sc-19xfhag-0 gtrOMJ eDIuho tw-input tw-input--large w-full h-[36px] px-3 rounded-[8px] bg-white dark:bg-[#18181b] text-[#0e0e10] dark:text-[#efeff1] text-[14px] leading-[21px] outline-none border-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_0_1px_rgba(222,222,227,0.95)] focus:shadow-[inset_0_0_0_2px_#9146ff] dark:focus:shadow-[inset_0_0_0_2px_#bf94ff] focus:bg-white dark:focus:bg-black transition-colors"
                                      autoCapitalize="off"
                                      autoCorrect="off"
                                      autoComplete="username webauthn"
                                      data-a-target="tw-input"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="Layout-sc-1xcs6mc-0 form-group-auth__animated-text"
                                  style={{ height: "0px" }}
                                ></div>
                                <div role="status" aria-live="polite">
                                  <p className="CoreText-sc-1txzju1-0 fJYwSz InjectLayout-sc-1i43xsx-0 hyrBH"></p>
                                </div>
                              </div>
                              <div className="Layout-sc-1xcs6mc-0 hSEQla mt-4">
                                <div className="Layout-sc-1xcs6mc-0 login-password-input">
                                  <div className="Layout-sc-1xcs6mc-0">
                                    <div className="Layout-sc-1xcs6mc-0 oRizm password-input__label mb-1 flex h-5 items-center">
                                      <div className="Layout-sc-1xcs6mc-0 dmulkQ">
                                        <label
                                          htmlFor="password-input"
                                          className="ScFormLabel-sc-1p4hav0-0 bgEOlL tw-form-label text-[14px] font-bold text-[#0e0e10] dark:text-[#f7f7f8] transition-colors"
                                        >
                                          Password
                                        </label>
                                      </div>
                                    </div>
                                    <div className="Layout-sc-1xcs6mc-0 glFavL password-input__container relative">
                                      <div className="ScInputContainer-sc-vu7u7d-3 WVQC">
                                        <div
                                          data-a-target="login-password-input"
                                          className="Layout-sc-1xcs6mc-0 glFavL"
                                        >
                                          <input
                                            id="password-input"
                                            aria-label="Enter your password"
                                            type={
                                              showPassword ? "text" : "password"
                                            }
                                            className="ScInputBase-sc-vu7u7d-0 ScInput-sc-19xfhag-0 ciVTtl eDIuho tw-input tw-input--large tw-input--password w-full h-[36px] pl-3 pr-10 rounded-[8px] bg-white dark:bg-[#18181b] text-[#0e0e10] dark:text-[#efeff1] text-[14px] leading-[21px] outline-none border-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_0_1px_rgba(222,222,227,0.95)] focus:shadow-[inset_0_0_0_2px_#9146ff] dark:focus:shadow-[inset_0_0_0_2px_#bf94ff] focus:bg-white dark:focus:bg-black transition-colors"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            autoComplete="current-password"
                                            data-a-target="tw-input"
                                            spellCheck={false}
                                            defaultValue=""
                                          />
                                        </div>
                                      </div>
                                      <div className="Layout-sc-1xcs6mc-0 drgTgb absolute right-0 top-0 flex h-[36px] w-[34.5px] items-center justify-center">
                                        <button
                                          className="ScCoreButton-sc-ocjdkq-0 iQpwXl ScButtonIcon-sc-9yap0r-0 lnIUQQ flex h-8 w-8 items-center justify-center rounded-full bg-transparent p-0 text-black/60 hover:bg-black/5 hover:text-black dark:text-[#efeff1] dark:hover:bg-white/10 transition-colors"
                                          type="button"
                                          aria-label="Toggle password visibility"
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                        >
                                          <div className="ButtonIconFigure-sc-1emm8lf-0 jgYFuA">
                                            <div className="ScSvgWrapper-sc-wkgzod-0 cnGLHG tw-svg">
                                              {showPassword ? (
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  focusable="false"
                                                  aria-hidden="true"
                                                  role="presentation"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M4 2.586 21.414 20l-1.414 1.414-3.31-3.31A8 8 0 0 1 12.32 19h-.64a8 8 0 0 1-6.075-2.794L2 12l3.605-4.206a8 8 0 0 1 1.11-1.036L2.586 4 4 2.586Zm4.14 6.968L6.634 12l2.49 2.905A6 6 0 0 0 11.68 17h.64a6 6 0 0 0 2.836-.712l-1.58-1.58A2 2 0 0 1 10.293 11.9l-2.152-2.346ZM11.68 5h.64a8 8 0 0 1 6.075 2.794L22 12l-2.16 2.52-1.42-1.42L19.366 12l-2.49-2.905A6 6 0 0 0 12.32 7h-.64c-.2 0-.398.01-.593.029L9.4 5.33A8.1 8.1 0 0 1 11.68 5Z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                              ) : (
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  focusable="false"
                                                  aria-hidden="true"
                                                  role="presentation"
                                                  fill="currentColor"
                                                >
                                                  <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M18.395 7.794 22 12l-3.605 4.206A8 8 0 0 1 12.32 19h-.64a8 8 0 0 1-6.075-2.794L2 12l3.605-4.206A8 8 0 0 1 11.68 5h.64a8 8 0 0 1 6.075 2.794Zm-1.519 1.301L19.366 12l-2.49 2.905A6 6 0 0 1 12.32 17h-.64a6 6 0 0 1-4.556-2.095L4.634 12l2.49-2.905A6 6 0 0 1 11.68 7h.64a6 6 0 0 1 4.556 2.095Z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      className="Layout-sc-1xcs6mc-0 form-group-auth__animated-text"
                                      style={{ height: "0px" }}
                                    ></div>
                                    <div role="status" aria-live="polite">
                                      <p className="CoreText-sc-1txzju1-0 fJYwSz InjectLayout-sc-1i43xsx-0 hyrBH"></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="Layout-sc-1xcs6mc-0 kamUmt mt-2">
                                <a
                                  className="ScCoreLink-sc-16kq0mq-0 kisgbZ tw-link text-[14px] text-[#9146ff] dark:text-[#bf94ff] underline transition-colors"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  href="https://www.twitch.tv/user/account-recovery"
                                >
                                  Trouble logging in?
                                </a>
                              </div>
                            </div>
                            <div className="Layout-sc-1xcs6mc-0 hByeC mt-4">
                              <div className="Layout-sc-1xcs6mc-0 dQMmwU flex flex-col">
                                <div className="Layout-sc-1xcs6mc-0 YRvnc">
                                  <div className="Layout-sc-1xcs6mc-0 YRvnc">
                                    <div
                                      role="status"
                                      aria-live="polite"
                                      className="Layout-sc-1xcs6mc-0 exYZWV"
                                    ></div>
                                    <button
                                      data-a-target="passport-login-button"
                                      type="submit"
                                      className="ScCoreButton-sc-ocjdkq-0 cYjGgF inline-flex w-full h-[36px] items-center justify-center rounded-full bg-black/5 dark:bg-[#53535f]/55 text-black/40 dark:text-[#efeff1] text-[14px] font-semibold cursor-not-allowed transition-colors"
                                      disabled
                                    >
                                      <div className="ScCoreButtonLabel-sc-s7h2b7-0 hzffYP">
                                        <div
                                          data-a-target="tw-core-button-label-text"
                                          className="Layout-sc-1xcs6mc-0 kPgYne"
                                        >
                                          Log In
                                        </div>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                                <div className="Layout-sc-1xcs6mc-0 kamUmt or-divider mt-2 flex items-center text-center">
                                  <div className="flex-1 me-[10px] border-b border-black/10 dark:border-[#53535f]/48 transition-colors"></div>
                                  <p className="CoreText-sc-1txzju1-0 YISIy m-0 p-0 text-[14px] text-[#53535f] dark:text-[#d3d3d9] transition-colors">
                                    or
                                  </p>
                                  <div className="flex-1 ms-[10px] border-b border-black/10 dark:border-[#53535f]/48 transition-colors"></div>
                                </div>
                                <div className="Layout-sc-1xcs6mc-0 itdUV mt-2">
                                  <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="ScCoreButton-sc-ocjdkq-0 cVVAAJ inline-flex w-full h-[36px] items-center justify-center rounded-full bg-[#ebebeb] hover:bg-[#dfdfdf] dark:bg-[#53535f]/38 dark:hover:bg-[#53535f]/50 text-[#0e0e10] dark:text-[#efeff1] text-[14px] font-semibold transition-colors"
                                  >
                                    <div className="ScCoreButtonLabel-sc-s7h2b7-0 bfhate px-2">
                                      <div
                                        data-a-target="tw-core-button-label-text"
                                        className="Layout-sc-1xcs6mc-0 zdujK px-1.5"
                                      >
                                        <div className="Layout-sc-1xcs6mc-0 kaYXJc flex items-center gap-2">
                                          <picture
                                            className="block h-[14px] w-[14px] shrink-0"
                                            style={{
                                              transform: "translate(0px, -1px)",
                                            }}
                                          >
                                            <img
                                              src="https://static-cdn.jtvnw.net/twilight-static-assets/google-logo.png"
                                              alt=""
                                              className="h-full w-full object-contain"
                                            />
                                          </picture>
                                          <p className="CoreText-sc-1txzju1-0 fJYwSz m-0 font-semibold">
                                            Continue with Google
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                                <div className="Layout-sc-1xcs6mc-0 itdUV mt-2">
                                  <button
                                    type="button"
                                    className="ScCoreButton-sc-ocjdkq-0 cVVAAJ inline-flex w-full h-[36px] items-center justify-center rounded-full bg-[#ebebeb] hover:bg-[#dfdfdf] dark:bg-[#53535f]/38 dark:hover:bg-[#53535f]/50 text-[#0e0e10] dark:text-[#efeff1] text-[14px] font-semibold transition-colors"
                                  >
                                    <div className="ScCoreButtonLabel-sc-s7h2b7-0 bfhate px-2">
                                      <div
                                        data-a-target="tw-core-button-label-text"
                                        className="Layout-sc-1xcs6mc-0 zdujK px-1.5"
                                      >
                                        <div className="Layout-sc-1xcs6mc-0 kaYXJc flex items-center gap-2">
                                          <picture className="block h-[14px] w-[14px] shrink-0">
                                            <img
                                              src="https://static-cdn.jtvnw.net/twilight-static-assets/amazon-white-logo.png"
                                              alt=""
                                              className="dark:invert-0 invert w-full h-full object-contain"
                                            />
                                          </picture>
                                          <p className="CoreText-sc-1txzju1-0 fJYwSz m-0 font-semibold">
                                            Continue with Amazon
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                                <div className="Layout-sc-1xcs6mc-0 itdUV mt-2">
                                  <button
                                    type="button"
                                    className="ScCoreButton-sc-ocjdkq-0 cVVAAJ inline-flex w-full h-[36px] items-center justify-center rounded-full bg-[#ebebeb] hover:bg-[#dfdfdf] dark:bg-[#53535f]/38 dark:hover:bg-[#53535f]/50 text-[#0e0e10] dark:text-[#efeff1] text-[14px] font-semibold transition-colors"
                                  >
                                    <div className="ScCoreButtonLabel-sc-s7h2b7-0 bfhate px-2">
                                      <div
                                        data-a-target="tw-core-button-label-text"
                                        className="Layout-sc-1xcs6mc-0 zdujK px-1.5"
                                      >
                                        <div className="Layout-sc-1xcs6mc-0 kaYXJc flex items-center gap-2">
                                          <picture
                                            className="block h-[14px] w-[14px] shrink-0"
                                            style={{
                                              transform: "translate(0px, -1px)",
                                            }}
                                          >
                                            <img
                                              src="https://static-cdn.jtvnw.net/twilight-static-assets/apple-white-logo.png"
                                              alt=""
                                              className="dark:invert-0 invert w-full h-full object-contain"
                                            />
                                          </picture>
                                          <p className="CoreText-sc-1txzju1-0 fJYwSz m-0 font-semibold">
                                            Continue with Apple
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                                <div className="Layout-sc-1xcs6mc-0 itdUV mt-2">
                                  <button
                                    type="button"
                                    className="ScCoreButton-sc-ocjdkq-0 bYqRWv m-0 inline-flex h-[36px] w-full items-center justify-center rounded-full border-none bg-transparent p-0 text-[14px] font-semibold text-[#9146ff] dark:text-[#bf94ff] cursor-pointer hover:underline transition-colors"
                                  >
                                    <div className="ScCoreButtonLabel-sc-s7h2b7-0 bfhate">
                                      <div
                                        data-a-target="tw-core-button-label-text"
                                        className="Layout-sc-1xcs6mc-0 zdujK"
                                      >
                                        Don't have an account? Sign up
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <iframe
            title="Cookie Sync"
            src="https://s.amazon-adsystem.com/iu3?cm3ppd=1&amp;d=dtb-pub&amp;csif=t&amp;dl=pm-db5_ox-db5_an-db5_rbd_3lift_r1u_gg_n-index_pm-db5_n-MediaNet_n-Ogury_kg_n-vmg_rbd_n-inmobi_n-smaato_rx_smrt_n-sharethrough_n-onetag_cnv_sovrn_n-Seedtag_n-adobe3pb_n-sharethrough"
            height="0"
            width="0"
            style={{ display: "none" }}
          ></iframe>
          <iframe
            title="No Content"
            src="https://s.amazon-adsystem.com/iu3?cs=2d4c2d5c917945ec9ac1f1e545269bb6&amp;cu=&amp;d=twitch.tv&amp;pid=49226e71-48b6-4ccb-bf4c-f82acb404220&amp;s=AUNOVTIsLNymLeQ2Wiaiyq2AdG392xL5sxWRMuBRqkpy&amp;ts=1790139014159"
            height="0"
            width="0"
            frameBorder="0"
            style={{ display: "none" }}
          ></iframe>
          <div></div>
        </div>
        <div
          className="Layout-sc-1xcs6mc-0 eyBJDm snackbar-list__container snackbar-overlay__list"
          aria-live="polite"
          style={{ pointerEvents: "none" }}
        >
          <div className="Layout-sc-1xcs6mc-0 EwVYx">
            <div className="InjectLayout-sc-1i43xsx-0 iqZbWl snackbar-overlay__items tw-transition-group"></div>
          </div>
        </div>
      </div>
      <div
        role="status"
        aria-live="polite"
        className="ScSrOnly-sc-2u0278-0 feRHcJ"
      ></div>
      <div
        role="alert"
        aria-live="assertive"
        className="ScSrOnly-sc-2u0278-0 feRHcJ"
      ></div>
    </>
  );
}
