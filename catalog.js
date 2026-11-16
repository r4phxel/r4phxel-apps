const appList = document.querySelector("#app-list");
const cardTemplate = document.querySelector("#app-card-template");
const preview = document.querySelector("#indiz-preview");
const catalogMessage = document.querySelector("#catalog-message");
const sourceLink = document.querySelector("#source-url");
const copyButton = document.querySelector("#copy-source");
const copyStatus = document.querySelector("#copy-status");
const megabytes = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

function renderApp(app) {
  const version = app.versions[0];
  const card = cardTemplate.content.cloneNode(true);
  const image = card.querySelector(".app-art img");
  const subtitle = card.querySelector(".app-subtitle");
  const description = card.querySelector(".app-description");
  const notes = card.querySelector(".release-notes");

  image.src = app.iconURL;
  card.querySelector("h3").textContent = app.name;
  subtitle.textContent = app.subtitle ?? "";
  subtitle.hidden = !app.subtitle;
  description.textContent = app.localizedDescription ?? "";
  description.hidden = !app.localizedDescription;

  const metadata = ["Version " + version.version];
  if (version.minOSVersion) metadata.push("Ab iOS " + version.minOSVersion);
  if (version.size > 0) metadata.push(megabytes.format(version.size / 1_000_000) + " MB");
  card.querySelector(".app-meta").textContent = metadata.join(" · ");
  card.querySelector(".button").href = version.downloadURL;

  notes.hidden = !version.localizedDescription;
  notes.querySelector("p").textContent = version.localizedDescription ?? "";
  return card;
}

async function loadCatalog() {
  try {
    const response = await fetch("source.json");
    if (!response.ok) throw new Error("Quelle nicht erreichbar");

    const source = await response.json();
    const apps = source.apps.filter(app => app.versions?.length);
    appList.replaceChildren(...apps.map(renderApp));
    preview.hidden = apps.some(app => app.bundleIdentifier === "com.indiz.game");
  } catch {
    catalogMessage.textContent = "Der App-Katalog konnte nicht geladen werden. Versuche es in Kürze erneut.";
    catalogMessage.hidden = false;
  }
}

if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(sourceLink.href);
      copyStatus.textContent = "Adresse kopiert.";
    } catch {
      copyStatus.textContent = "Kopiere die Adresse aus dem Link oben.";
    }
  });
}

loadCatalog();
