const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const logoImage = document.querySelector(".brand-mark img");
const header = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-lang-option]");
const cursorAwarePhotos = document.querySelectorAll(".cursor-aware");
const teamMembers = document.querySelectorAll(".team-member");

const translations = {
  de: {
    "nav.start": "Start",
    "nav.services": "Leistungen",
    "nav.packages": "Pakete",
    "nav.preview": "Projekte",
    "nav.team": "Team",
    "nav.process": "Ablauf",
    "nav.inquiry": "Anfragen",
    "nav.inquirySingle": "Anfrage",
    "nav.contact": "Kontakt",
    "nav.legal": "Impressum",
    "nav.home": "Zur Startseite",
    "nav.open": "Menü öffnen",
    "home.hero.eyebrow": "Webdesign für Gewerbe, Teams und Vereine",
    "home.hero.copy":
      "Moderne Websites, die professionell wirken, schnell laden und auf Handy sowie Desktop sauber funktionieren.",
    "home.hero.primary": "Projekt starten",
    "home.hero.secondary": "Leistungen ansehen",
    "home.trust.clubs": "Vereinsseiten",
    "home.mock.title": "Dein digitaler Auftritt",
    "home.mock.business": "Unternehmen",
    "home.mock.businessText": "Klare Seiten für Angebote, Kontakt und Vertrauen.",
    "home.mock.clubs": "Sportvereine",
    "home.mock.clubsText": "Teams, News, Sponsoren und Spieltage auf einen Blick.",
    "home.phone.copy": "Perfekt lesbar auf jedem Display.",
    "home.services.title": "Alles für einen starken Online-Auftritt",
    "home.services.businessTitle": "Websites für Unternehmen",
    "home.services.businessText":
      "Präsentationsseiten, Landingpages und Kontaktbereiche, die Besucher schnell zum Ziel führen.",
    "home.services.clubTitle": "Websites für Sportvereine",
    "home.services.clubText":
      "Vereinsstruktur, Mannschaften, Trainingszeiten, Sponsoren und News in einem modernen Layout.",
    "home.services.careTitle": "Pflege und Optimierung",
    "home.services.careText":
      "Inhalte aktualisieren, Geschwindigkeit verbessern und die Seite technisch sauber halten.",
    "home.pricing.title": "Klare Angebote für unterschiedliche Projektgrößen",
    "home.pricing.copy":
      "Ob kleine Vereinsseite oder umfangreicher Webauftritt mit vielen Inhalten: Die Pakete geben eine erste Orientierung für Budget und Umfang.",
    "home.pricing.basicText": "Kleiner Verein oder einfache Seite mit klarer Struktur.",
    "home.pricing.basic1": "Startseite mit den wichtigsten Infos",
    "home.pricing.basic2": "Kontaktbereich",
    "home.pricing.basic3": "Responsive Umsetzung",
    "home.pricing.plusText": "Für mehrere Mannschaften, News und eine bessere Inhaltsstruktur.",
    "home.pricing.plus1": "Mehrere Unterseiten",
    "home.pricing.plus2": "News- oder Aktuelles-Bereich",
    "home.pricing.plus3": "Struktur für Teams, Angebote oder Leistungen",
    "home.pricing.supportName": "Langzeit-Support",
    "home.pricing.supportText":
      "Für regelmäßige Pflege, kleine Anpassungen und technische Sicherheit.",
    "home.pricing.support1": "Inhalte und Bilder aktualisieren",
    "home.pricing.support2": "Kleine Änderungen an bestehenden Seiten",
    "home.pricing.support3": "Technische Kontrolle und laufende Betreuung",
    "home.preview.eyebrow": "Vorschau",
    "home.preview.title": "Ein Look, der direkt professionell wirkt",
    "home.preview.copy":
      "Die Gestaltung setzt deine Markenfarbe prominent ein, bleibt aber hell, übersichtlich und vertrauenswürdig. So passt sie sowohl zu lokalen Betrieben als auch zu Vereinen mit aktiver Community.",
    "home.metrics.phases": "klare Projektphasen",
    "home.metrics.visible": "online sichtbar",
    "home.process.title": "Von der Idee zur fertigen Website",
    "home.process.step1": "Briefing",
    "home.process.step1Text": "Ziele, Inhalte und Wunschstil werden kompakt abgestimmt.",
    "home.process.step2": "Design",
    "home.process.step2Text": "Du bekommst eine klare Vorschau für Desktop und Smartphone.",
    "home.process.step3": "Launch",
    "home.process.step3Text": "Die Website geht technisch sauber und mobil optimiert online.",
    "home.contact.title": "Bereit für deine neue Webpräsenz?",
    "home.contact.copy":
      "Erzähl kurz, ob es um ein Unternehmen, einen Sportverein oder eine neue Idee geht. Thilogic MultiMedia bringt den Auftritt ins Web.",
    "home.contact.cta": "Anfrage senden",
    "request.eyebrow": "Projektanfrage",
    "request.title": "Erzähl mir kurz von deiner Webpräsenz",
    "request.copy":
      "Ob Unternehmen, Verein oder neue Idee: Mit ein paar Infos kann ich besser einschätzen, welches Paket passt und wie der nächste Schritt aussieht.",
    "request.name": "Name",
    "request.namePlaceholder": "Vorname Nachname",
    "request.email": "E-Mail",
    "request.projectType": "Projektart",
    "request.choose": "Bitte auswählen",
    "request.businessSite": "Unternehmenswebsite",
    "request.clubSite": "Sportverein",
    "request.redesign": "Bestehende Website überarbeiten",
    "request.other": "Sonstiges Projekt",
    "request.package": "Gewünschtes Paket",
    "request.open": "Noch offen",
    "request.supportOption": "Langzeit-Support - 40 € / Monat",
    "request.message": "Worum geht es?",
    "request.messagePlaceholder":
      "Beschreibe kurz, was die Website können soll, welche Inhalte wichtig sind und ob es schon eine bestehende Seite gibt.",
    "request.helpTitle": "Was hilfreich ist",
    "request.help1": "Art des Projekts und Zielgruppe",
    "request.help2": "Gewünschtes Paket oder Budgetrahmen",
    "request.help3": "Bestehende Website, falls vorhanden",
    "request.help4": "Wunschdatum für den Start",
    "request.mailHint":
      "Das Formular öffnet dein E-Mail-Programm mit den eingetragenen Daten. Die E-Mail-Adresse kannst du später jederzeit im Code austauschen.",
    "team.eyebrow": "Team",
    "team.title": "Menschen hinter deiner Webpräsenz",
    "team.copy":
      "Hier kannst du dein Team vorstellen, Rollen erklären und zeigen, wer hinter Thilogic MultiMedia steht.",
    "team.roleFounder": "Webdesign und Entwicklung",
    "team.memberText":
      "Ansprechpartner für moderne Websites, klare Struktur und mobile Umsetzung.",
    "team.rolePlaceholder": "Platzhalter",
    "team.addTitle": "Weitere Person ergänzen",
    "team.addText": "Diese Karte kannst du später für weitere Teammitglieder duplizieren.",
    "legal.eyebrow": "Rechtliches",
    "legal.intro": "Bitte ersetze alle Platzhalter vor der Veröffentlichung durch deine echten Daten.",
    "legal.provider": "Angaben zum Anbieter",
    "legal.providerText":
      "<strong>Thilogic MultiMedia</strong><br />Vorname Nachname<br />Straße Hausnummer<br />PLZ Ort<br />Deutschland",
    "legal.contactText": "Telefon: +49 000 00000000<br />E-Mail: info@thilogic-multimedia.de",
    "legal.represented": "Vertreten durch",
    "legal.namePlaceholder": "Vorname Nachname",
    "legal.vat": "Umsatzsteuer-ID",
    "legal.vatText": "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE000000000",
    "legal.businessRegistration": "Gewerbeanmeldung",
    "legal.registrationText":
      "Die Gewerbeanmeldung nach § 14 GewO wurde am TT.MM.JJJJ durch die folgende Stelle erteilt: Stadt/Gemeinde Musterstadt.",
    "legal.contentResponsible": "Verantwortlich für den Inhalt",
    "legal.responsibleText":
      "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:<br />Vorname Nachname<br />Straße Hausnummer<br />PLZ Ort",
    "legal.euDispute": "EU-Streitschlichtung",
    "legal.euText":
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>',
    "legal.consumerDispute": "Verbraucherstreitbeilegung",
    "legal.consumerText":
      "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    "legal.contentLiability": "Haftung für Inhalte",
    "legal.contentLiabilityText1":
      "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    "legal.contentLiabilityText2":
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    "legal.linkLiability": "Haftung für Links",
    "legal.linkLiabilityText1":
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
    "legal.linkLiabilityText2":
      "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    "legal.copyright": "Urheberrecht",
    "legal.copyrightText1":
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors beziehungsweise Erstellers.",
    "legal.copyrightText2":
      "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    "legal.backHome": "Zurück zur Startseite",
  },
  en: {
    "nav.start": "Home",
    "nav.services": "Services",
    "nav.packages": "Packages",
    "nav.preview": "Projects",
    "nav.team": "Team",
    "nav.process": "Process",
    "nav.inquiry": "Inquiries",
    "nav.inquirySingle": "Inquiry",
    "nav.contact": "Contact",
    "nav.legal": "Legal Notice",
    "nav.home": "Back to Home",
    "nav.open": "Open menu",
    "home.hero.eyebrow": "Web design for businesses, teams and clubs",
    "home.hero.copy":
      "Modern websites that look professional, load quickly and work cleanly on mobile and desktop.",
    "home.hero.primary": "Start a project",
    "home.hero.secondary": "View services",
    "home.trust.clubs": "Club websites",
    "home.mock.title": "Your digital presence",
    "home.mock.business": "Businesses",
    "home.mock.businessText": "Clear pages for offers, contact and trust.",
    "home.mock.clubs": "Sports clubs",
    "home.mock.clubsText": "Teams, news, sponsors and match days at a glance.",
    "home.phone.copy": "Perfectly readable on every display.",
    "home.services.title": "Everything for a strong online presence",
    "home.services.businessTitle": "Websites for businesses",
    "home.services.businessText":
      "Presentation pages, landing pages and contact sections that guide visitors quickly.",
    "home.services.clubTitle": "Websites for sports clubs",
    "home.services.clubText":
      "Club structure, teams, training times, sponsors and news in a modern layout.",
    "home.services.careTitle": "Care and optimization",
    "home.services.careText":
      "Update content, improve speed and keep the website technically clean.",
    "home.pricing.title": "Clear offers for different project sizes",
    "home.pricing.copy":
      "Whether it is a small club website or a larger web presence with many pages: the packages give you a first orientation for budget and scope.",
    "home.pricing.basicText": "A small club or simple website with a clear structure.",
    "home.pricing.basic1": "Home page with the most important information",
    "home.pricing.basic2": "Contact section",
    "home.pricing.basic3": "Responsive implementation",
    "home.pricing.plusText": "For multiple teams, news and a better content structure.",
    "home.pricing.plus1": "Multiple subpages",
    "home.pricing.plus2": "News or updates section",
    "home.pricing.plus3": "Structure for teams, offers or services",
    "home.pricing.supportName": "Long-term support",
    "home.pricing.supportText":
      "For regular maintenance, small changes and technical peace of mind.",
    "home.pricing.support1": "Update content and images",
    "home.pricing.support2": "Small changes to existing pages",
    "home.pricing.support3": "Technical checks and ongoing support",
    "home.preview.eyebrow": "Preview",
    "home.preview.title": "A look that feels professional right away",
    "home.preview.copy":
      "The design uses your brand color prominently while staying bright, clear and trustworthy. It fits local businesses as well as clubs with an active community.",
    "home.metrics.phases": "clear project phases",
    "home.metrics.visible": "visible online",
    "home.process.title": "From idea to finished website",
    "home.process.step1": "Briefing",
    "home.process.step1Text": "Goals, content and preferred style are aligned compactly.",
    "home.process.step2": "Design",
    "home.process.step2Text": "You receive a clear preview for desktop and smartphone.",
    "home.process.step3": "Launch",
    "home.process.step3Text": "The website goes online technically clean and mobile optimized.",
    "home.contact.title": "Ready for your new web presence?",
    "home.contact.copy":
      "Tell me briefly whether it is for a business, a sports club or a new idea. Thilogic MultiMedia brings your presence to the web.",
    "home.contact.cta": "Send inquiry",
    "request.eyebrow": "Project inquiry",
    "request.title": "Tell me briefly about your web presence",
    "request.copy":
      "Whether it is a business, club or new idea: with a few details I can better estimate which package fits and what the next step looks like.",
    "request.name": "Name",
    "request.namePlaceholder": "First name Last name",
    "request.email": "Email",
    "request.projectType": "Project type",
    "request.choose": "Please choose",
    "request.businessSite": "Business website",
    "request.clubSite": "Sports club",
    "request.redesign": "Revise an existing website",
    "request.other": "Other project",
    "request.package": "Preferred package",
    "request.open": "Still open",
    "request.supportOption": "Long-term support - €40 / month",
    "request.message": "What is it about?",
    "request.messagePlaceholder":
      "Briefly describe what the website should do, which content is important and whether an existing website already exists.",
    "request.helpTitle": "Helpful details",
    "request.help1": "Project type and target audience",
    "request.help2": "Preferred package or budget range",
    "request.help3": "Existing website, if available",
    "request.help4": "Preferred start date",
    "request.mailHint":
      "The form opens your email app with the entered data. You can change the email address in the code at any time.",
    "team.eyebrow": "Team",
    "team.title": "The people behind your web presence",
    "team.copy":
      "Here you can introduce your team, explain roles and show who stands behind Thilogic MultiMedia.",
    "team.roleFounder": "Web design and development",
    "team.memberText":
      "Your contact for modern websites, clear structure and mobile implementation.",
    "team.rolePlaceholder": "Placeholder",
    "team.addTitle": "Add another person",
    "team.addText": "You can duplicate this card later for more team members.",
    "legal.eyebrow": "Legal",
    "legal.intro": "Please replace all placeholders with your real details before publishing.",
    "legal.provider": "Provider information",
    "legal.providerText":
      "<strong>Thilogic MultiMedia</strong><br />First name Last name<br />Street House number<br />Postal code City<br />Germany",
    "legal.contactText": "Phone: +49 000 00000000<br />Email: info@thilogic-multimedia.de",
    "legal.represented": "Represented by",
    "legal.namePlaceholder": "First name Last name",
    "legal.vat": "VAT ID",
    "legal.vatText": "VAT identification number according to § 27 a German VAT Act: DE000000000",
    "legal.businessRegistration": "Business registration",
    "legal.registrationText":
      "The business registration according to § 14 GewO was issued on DD.MM.YYYY by the following authority: City/Municipality of Sample City.",
    "legal.contentResponsible": "Responsible for content",
    "legal.responsibleText":
      "Responsible for content according to § 18 para. 2 MStV:<br />First name Last name<br />Street House number<br />Postal code City",
    "legal.euDispute": "EU dispute resolution",
    "legal.euText":
      'The European Commission provides a platform for online dispute resolution: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>',
    "legal.consumerDispute": "Consumer dispute resolution",
    "legal.consumerText":
      "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    "legal.contentLiability": "Liability for content",
    "legal.contentLiabilityText1":
      "As a service provider, we are responsible for our own content on these pages in accordance with general law. However, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity.",
    "legal.contentLiabilityText2":
      "Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the time we become aware of a specific legal violation. If we become aware of such legal violations, we will remove this content immediately.",
    "legal.linkLiability": "Liability for links",
    "legal.linkLiabilityText1":
      "Our offer contains links to external third-party websites over whose content we have no influence. We therefore cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.",
    "legal.linkLiabilityText2":
      "The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at that time. Permanent monitoring of linked pages is not reasonable without concrete indications of a legal violation. If we become aware of legal violations, we will remove such links immediately.",
    "legal.copyright": "Copyright",
    "legal.copyrightText1":
      "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, editing, distribution and any kind of use outside the limits of copyright law require the written consent of the respective author or creator.",
    "legal.copyrightText2":
      "If content on this page was not created by the operator, third-party copyrights are respected. If you nevertheless become aware of a copyright infringement, please let us know. If we become aware of legal violations, we will remove such content immediately.",
    "legal.backHome": "Back to Home",
  },
};

const applyLanguage = (language) => {
  const dictionary = translations[language] ?? translations.de;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langOption === language;
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("siteLanguage", language);
};

let activeScrollAnimation = null;

const easeOutSine = (progress) => Math.sin((progress * Math.PI) / 2);

const scrollToTarget = (target) => {
  if (activeScrollAnimation) {
    cancelAnimationFrame(activeScrollAnimation);
  }

  const headerHeight = header?.offsetHeight ?? 0;
  const startTop = window.scrollY;
  const targetTop = Math.max(
    target.getBoundingClientRect().top + window.scrollY - headerHeight - 16,
    0,
  );
  const distance = targetTop - startTop;
  const duration = Math.min(Math.max(Math.abs(distance) * 0.35, 520), 900);
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutSine(progress);

    window.scrollTo(0, startTop + distance * easedProgress);

    if (progress < 1) {
      activeScrollAnimation = requestAnimationFrame(step);
      return;
    }

    activeScrollAnimation = null;
  };

  activeScrollAnimation = requestAnimationFrame(step);
};

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langOption);
  });
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) {
      return;
    }

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    scrollToTarget(target);

    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  },
  true,
);

logoImage?.addEventListener("error", () => {
  logoImage.removeAttribute("src");
});

const setTeamDirection = (activeMember = null) => {
  const activeRect = activeMember?.getBoundingClientRect();
  const activeCenter = activeRect
    ? {
        x: activeRect.left + activeRect.width / 2,
        y: activeRect.top + activeRect.height / 2,
      }
    : null;

  cursorAwarePhotos.forEach((photo) => {
    const card = photo.closest(".team-member");
    let direction = "front";

    if (activeCenter && card && card !== activeMember) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = activeCenter.x - centerX;
      const deltaY = activeCenter.y - centerY;
      const isDirectHorizontalNeighbor =
        Math.abs(deltaX) <= rect.width * 1.45 && Math.abs(deltaY) <= rect.height * 0.55;
      const isDirectVerticalNeighbor =
        Math.abs(deltaY) <= rect.height * 1.45 && Math.abs(deltaX) <= rect.width * 0.55;

      if (isDirectHorizontalNeighbor || isDirectVerticalNeighbor) {
        direction = Math.abs(deltaX) >= Math.abs(deltaY)
          ? deltaX > 0
            ? "right"
            : "left"
          : deltaY > 0
            ? "down"
            : "up";
      }
    }

    photo.classList.remove("is-front", "is-left", "is-right", "is-up", "is-down");
    photo.classList.add(`is-${direction}`);
  });
};

teamMembers.forEach((member) => {
  member.addEventListener("pointerenter", () => {
    setTeamDirection(member);
  });

  member.addEventListener("pointerleave", () => {
    setTeamDirection();
  });
});

applyLanguage(localStorage.getItem("siteLanguage") || "de");
