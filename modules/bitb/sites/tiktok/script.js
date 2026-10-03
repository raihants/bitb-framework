(() => {
  const states = [...document.querySelectorAll("[data-state]")];
  const buttons = [...document.querySelectorAll("[data-go]")];
  const forms = [...document.querySelectorAll("form")];
  const countryList = document.querySelector(".country-list");
  const countries = `Afghanistan|+93|AF
Åland Islands|+35818|AX
Albania|+355|AL
Algeria|+213|DZ
American Samoa|+1684|AS
Andorra|+376|AD
Angola|+244|AO
Anguilla|+1264|AI
Antigua & Barbuda|+1268|AG
Argentina|+54|AR
Armenia|+374|AM
Aruba|+297|AW
Ascension Island|+247|SH
Australia|+61|AU
Austria|+43|AT
Azerbaijan|+994|AZ
Bahamas|+1242|BS
Bahrain|+973|BH
Bangladesh|+880|BD
Barbados|+1246|BB
Barbuda|+1268|AG
Belarus|+375|BY
Belgium|+32|BE
Belize|+501|BZ
Benin|+229|BJ
Bermuda|+1441|BM
Bhutan|+975|BT
Bolivia|+591|BO
Bosnia & Herzegovina|+387|BA
Botswana|+267|BW
Brazil|+55|BR
British Indian Ocean Territory|+246|IO
British Virgin Islands|+1284|VG
Brunei|+673|BN
Bulgaria|+359|BG
Burkina-faso|+226|BF
Burundi|+257|BI
Cameroon|+237|CM
Canada|+1|CA
Cape Verde|+238|CV
Caribbean Netherlands|+5997|BQ
Cayman Is.|+1345|KY
Central African Republic|+236|CF
Chad|+235|TD
Chile|+56|CL
China mainland|+86|CN
Christmas Island|+61|CX
Cocos (Keeling) Islands|+61|CC
Colombia|+57|CO
Comoros|+269|KM
Congo - Brazzaville|+242|CG
Congo - Kinshasa|+243|CD
Cook Is.|+682|CK
Costa Rica|+506|CR
Croatia|+385|HR
Curaçao|+5999|CW
Cyprus|+357|CY
Czechia|+420|CZ
Denmark|+45|DK
Diego Garcia|+246|DG
Djibouti|+253|DJ
Dominica|+1767|DM
Dominican Republic|+1|DO
EI Salvador|+503|SV
Ecuador|+593|EC
Egypt|+20|EG
Equatorial Guinea|+240|GQ
Eritrea|+291|ER
Estonia|+372|EE
Eswatini|+268|SZ
Ethiopia|+251|ET
Falkland Islands|+500|FK
Faroe Islands|+298|FO
Fiji|+679|FJ
Finland|+358|FI
France|+33|FR
French Guiana|+594|GF
French Polynesia|+689|PF
Gabon|+241|GA
Gambia|+220|GM
Georgia|+995|GE
Germany|+49|DE
Ghana|+233|GH
Gibraltar|+350|GI
Greece|+30|GR
Greenland|+299|GL
Grenada|+1473|GD
Guadeloupe|+590|GP
Guam|+1671|GU
Guatemala|+502|GT
Guernsey|+44|GG
Guinea|+224|GN
Guinea-Bissau|+245|GW
Guyana|+592|GY
Haiti|+509|HT
Honduras|+504|HN
Hongkong|+852|HK
Hungary|+36|HU
Iceland|+354|IS
India|+91|IN
Indonesia|+62|ID
Iraq|+964|IQ
Ireland|+353|IE
Israel|+972|IL
Isle of Man|+44|IM
Italy|+39|IT
Ivory Coast|+225|CI
Jamaica|+1876|JM
Japan|+81|JP
Jersey|+44|JE
Jordan|+962|JO
Kampuchea (Cambodia )|+855|KH
Kazakhstan|+76|KZ
Kazakhstan|+77|KZ
Kenya|+254|KE
Kiribati|+686|KI
Korea|+82|KR
Kosovo|+383|XK
Kuwait|+965|KW
Kyrgyzstan|+996|KG
Laos|+856|LA
Latvia|+371|LV
Lebanon|+961|LB
Lesotho|+266|LS
Liberia|+231|LR
Libya|+218|LY
Liechtenstein|+423|LI
Lithuania|+370|LT
Luxembourg|+352|LU
Macao|+853|MO
Madagascar|+261|MG
Malawi|+265|MW
Malaysia|+60|MY
Maldives|+960|MV
Mali|+223|ML
Malta|+356|MT
Marshall Islands|+692|MH
Martinique|+596|MQ
Mauritania|+222|MR
Mauritius|+230|MU
Mayotte|+262|YT
Mexico|+52|MX
Micronesia|+691|FM
Moldova, Republic of|+373|MD
Monaco|+377|MC
Mongolia|+976|MN
Montenegro|+382|ME
Montserrat|+1664|MS
Morocco|+212|MA
Mozambique|+258|MZ
Myanmar (Burma)|+95|MM
Namibia|+264|NA
Nauru|+674|NR
Nepal|+977|NP
Netherlands|+31|NL
New Caledonia|+687|NC
New Zealand|+64|NZ
Nicaragua|+505|NI
Niger|+227|NE
Nigeria|+234|NG
Niue|+683|NU
Norfolk Island|+672|NF
North Macedonia|+389|MK
Northern Mariana Islands|+1670|MP
Norway|+47|NO
Oman|+968|OM
Pakistan|+92|PK
Palau|+680|PW
Palestinian Territories|+970|PS
Panama|+507|PA
Papua New Cuinea|+675|PG
Paraguay|+595|PY
Peru|+51|PE
Philippines|+63|PH
Pitcairn Islands|+64|PN
Poland|+48|PL
Portugal|+351|PT
Puerto Rico|+1787|PR
Puerto Rico|+1939|PR
Qatar|+974|QA
Réunion|+262|RE
Romania|+40|RO
Russia|+7|RU
Rwanda|+250|RW
Samoa|+685|WS
San Marino|+378|SM
Sao Tome and Principe|+239|ST
Saudi Arabia|+966|SA
Senegal|+221|SN
Serbia|+381|RS
Seychelles|+248|SC
Sierra Leone|+232|SL
Singapore|+65|SG
Sint Maarten|+1721|SX
Slovakia|+421|SK
Slovenia|+386|SI
Solomon Is|+677|SB
Somali|+252|SO
South Africa|+27|ZA
So. Georgia & So. Sandwich  Isl.|+500|GS
South Sudan|+211|SS
Spain|+34|ES
Sri Lanka|+94|LK
St. Barthélemy|+590|BL
St. Helena|+290|SH
St. Kitts & Nevis|+1869|KN
St. Martin|+590|MF
St. Pierre & Miquelon|+508|PM
St.Lucia|+1758|LC
St. Vincent & Grenadines|+1784|VC
Sudan|+249|SD
Suriname|+597|SR
Svalbard & Jan Mayen|+4779|SJ
Sweden|+46|SE
Switzerland|+41|CH
Taiwan|+886|TW
Tajikstan|+992|TJ
Tanzania|+255|TZ
Thailand|+66|TH
Timor-Leste|+670|TL
Togo|+228|TG
Tokelau|+690|TK
Tonga|+676|TO
Trinidad & Tobago|+1868|TT
Tunisia|+216|TN
Turkey|+90|TR
Turkmenistan|+993|TM
Turks & Caicos Islands|+1649|TC
Tuvalu|+688|TV
U.S. Virgin Islands|+1340|VI
Uganda|+256|UG
Ukraine|+380|UA
United Arab Emirates|+971|AE
United Kingdom|+44|UK
United States|+1|US
Uruguay|+598|UY
Uzbekistan|+998|UZ
Vanuatu|+678|VU
Vatican City|+379|VA
Vatican City|+3906698|VA
Venezuela|+58|VE
Vietnam|+84|VN
Wallis & Futuna|+681|WF
Western Sahara|+212|EH
Yemen|+967|YE
Zambia|+260|ZM
Zimbabwe|+263|ZW`.split("\n").map((entry) => entry.split("|"));
  const firstByLetter = new Map();
  for (const [name, code, region] of countries) {
    const letter = name.normalize("NFD").replace(/[̀-ͯ]/g, "").charAt(0).toUpperCase();
    if (!firstByLetter.has(letter)) firstByLetter.set(letter, countryList.children.length);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "country-option";
    button.setAttribute("role", "option");
    button.append(document.createTextNode(name));
    const dial = document.createElement("span");
    dial.textContent = code;
    button.append(dial);
    button.addEventListener("click", () => {
      document.querySelector(".country-label").textContent = `${region} ${code}`;
      document.querySelector(".country").setAttribute("aria-label", `Select country or region, ${name} ${code}`);
      show("phone");
    });
    countryList.append(button);
  }
  const countryIndex = document.querySelector(".country-index");
  for (const [letter, position] of firstByLetter) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = letter;
    button.setAttribute("aria-label", `Jump to ${letter}`);
    button.addEventListener("click", () => {
      countryList.scrollTop = countryList.children[position].offsetTop - countryList.offsetTop;
    });
    countryIndex.append(button);
  }

  document.querySelectorAll('.signup-panel .choice-button').forEach((button, index) => {
    const icon = document.querySelectorAll('.state[data-state="choices"] .choice-button .icon')[index + 1];
    button.querySelector('.icon')?.replaceChildren(icon.querySelector('svg').cloneNode(true));
  });

  const show = (name) => {
    states.forEach((state) => state.classList.toggle("active", state.dataset.state === name));
    document.body.dataset.view = name;
    document.querySelector(".header-title").textContent = name === "country" ? "Select country/region" : "Log in";
    document.querySelector(".shell")?.scrollTo({ top: 0, behavior: "instant" });
    if (name === "country") countryList.scrollTop = 0;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.go === "country" && !window.matchMedia("(max-width: 767px)").matches) return;
      show(button.dataset.go);
    });
  });

  document.querySelector(".header-back")?.addEventListener("click", (event) => {
    if (document.body.dataset.view !== "country") return;
    event.stopImmediatePropagation();
    show("phone");
  }, true);

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });

  document.querySelector(".mobile-signup")?.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    event.preventDefault();
    show("signup");
  });

  const prompt = document.querySelector(".app-prompt");
  const mobile = window.matchMedia("(max-width: 767px)");
  if (prompt && mobile.matches) prompt.showModal();
  prompt?.querySelector(".app-prompt-dismiss")?.addEventListener("click", () => prompt.close());
  mobile.addEventListener("change", (event) => {
    if (!event.matches && prompt?.open) prompt.close();
  });
})();
