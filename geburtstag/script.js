const categoryList = document.querySelector("#categoryList");
const detailView = document.querySelector("#detailView");
const categoryKicker = document.querySelector("#categoryKicker");
const categoryTitle = document.querySelector("#categoryTitle");
const gamesPanel = document.querySelector("#gamesPanel");
const quizPanel = document.querySelector("#quizPanel");
const gamesTab = document.querySelector("#gamesTab");
const quizTab = document.querySelector("#quizTab");
const backButton = document.querySelector("#backButton");
const flowButton = document.querySelector("#flowButton");
const flowDialog = document.querySelector("#flowDialog");
const closeFlowButton = document.querySelector("#closeFlowButton");
const settingsButton = document.querySelector("#settingsButton");
const settingsDialog = document.querySelector("#settingsDialog");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const diceToggle = document.querySelector("#diceToggle");
const rollBox = document.querySelector("#rollBox");
const rollCategoryButton = document.querySelector("#rollCategoryButton");
const rollActionButton = document.querySelector("#rollActionButton");
const rollResult = document.querySelector("#rollResult");
const itemDetailsDialog = document.querySelector("#itemDetailsDialog");
const itemDetailsTitle = document.querySelector("#itemDetailsTitle");
const itemDetailsType = document.querySelector("#itemDetailsType");
const itemDetailsBody = document.querySelector("#itemDetailsBody");
const closeItemDetailsButton = document.querySelector("#closeItemDetailsButton");

let categories = [];
let activeCategory = null;
let activeActions = [];
let activeGames = [];
let activeQuiz = [];
let currentTab = "games";
let diceEnabled = false;
let lastDetailsButton = null;

async function loadText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Datei konnte nicht geladen werden: ${path}`);
  }
  return response.text();
}

function parseDataFile(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const meta = {};
  const items = [];
  let current = null;
  let mode = "meta";

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    if (line === "---") {
      mode = "items";
      continue;
    }

    if (mode === "meta" && line.includes(":")) {
      const [key, ...rest] = line.split(":");
      meta[key.trim().toLowerCase()] = rest.join(":").trim();
      continue;
    }

    if (line.startsWith("- ")) {
      current = {
        title: line.slice(2).trim(),
        type: "Spiel",
        detail: "",
        list: [],
        timerSeconds: 0,
        pixelStages: 0,
      };
      items.push(current);
      continue;
    }

    if (!current || !line.includes(":")) {
      continue;
    }

    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const normalizedKey = key.trim().toLowerCase();

    if (normalizedKey === "typ") {
      current.type = value;
    }

    if (normalizedKey === "details" || normalizedKey === "material" || normalizedKey === "benoetigt") {
      const label = normalizedKey === "details" ? "" : `${key.trim()}: `;
      current.detail = current.detail ? `${current.detail}\n${label}${value}` : `${label}${value}`;
    }

    if (normalizedKey === "aufgaben" || normalizedKey === "optionen" || normalizedKey === "beispiele") {
      current.list = value.split("|").map((entry) => entry.trim()).filter(Boolean);
    }

    if (normalizedKey === "timer") {
      current.timerSeconds = Number.parseInt(value, 10) || 0;
    }

    if (normalizedKey === "pixelstufen") {
      current.pixelStages = Number.parseInt(value, 10) || 0;
    }
  }

  return { meta, items };
}

function appendSteppedList(parent, entries, options = {}) {
  let currentIndex = 0;
  let pixelStage = options.pixelStages || 0;
  const showImages = options.showImages !== false;
  const parsedEntries = entries.map((entry) => {
    const [label, imageUrl] = entry.split("::");
    return {
      label: label.trim(),
      imageUrl: imageUrl?.trim() || "",
    };
  });
  const hasImages = showImages && parsedEntries.some((entry) => entry.imageUrl);
  const maxLabelLength = Math.max(...parsedEntries.map((entry) => entry.label.length));

  const wrapper = document.createElement("div");
  wrapper.className = "step-list";
  if (hasImages) {
    wrapper.classList.add("step-list-visual");
  } else if (maxLabelLength > 120) {
    wrapper.classList.add("step-list-text-large");
  } else if (maxLabelLength > 60) {
    wrapper.classList.add("step-list-text-medium");
  } else {
    wrapper.classList.add("step-list-text-small");
  }
  if (pixelStage) {
    wrapper.classList.add("pixel-list");
    wrapper.dataset.pixelStage = String(pixelStage);
  }

  const meta = document.createElement("p");
  meta.className = "step-list-meta";

  const image = document.createElement("img");
  image.className = "step-list-image";
  image.alt = "";
  image.hidden = true;

  const value = document.createElement("p");
  value.className = "step-list-value";

  const controls = document.createElement("div");
  controls.className = "step-list-controls";

  const previousButton = document.createElement("button");
  previousButton.className = "inline-button";
  previousButton.type = "button";
  previousButton.textContent = "Zurueck";

  const nextButton = document.createElement("button");
  nextButton.className = "inline-button";
  nextButton.type = "button";
  nextButton.textContent = "Weiter";

  const easierButton = document.createElement("button");
  easierButton.className = "inline-button";
  easierButton.type = "button";
  easierButton.textContent = "Einfacher";
  easierButton.hidden = !options.pixelStages;

  function updateStep() {
    const entry = parsedEntries[currentIndex];
    const pixelText = pixelStage ? ` - Pixelstufe ${pixelStage}` : pixelStage === 0 && options.pixelStages ? " - klar" : "";
    meta.textContent = `${currentIndex + 1} von ${parsedEntries.length}${pixelText}`;
    value.textContent = options.hideLabel && pixelStage !== 0 ? `Spiel ${currentIndex + 1}` : entry.label;
    image.hidden = !hasImages || !entry.imageUrl;
    image.src = hasImages ? entry.imageUrl : "";
    image.alt = hasImages && entry.imageUrl ? entry.label : "";
    wrapper.dataset.pixelStage = String(pixelStage);
    easierButton.textContent = pixelStage === 0 ? "Reset" : pixelStage === 1 ? "Aufloesen" : "Einfacher";
  }

  previousButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + entries.length) % entries.length;
    pixelStage = options.pixelStages || 0;
    updateStep();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % entries.length;
    pixelStage = options.pixelStages || 0;
    updateStep();
  });

  easierButton.addEventListener("click", () => {
    pixelStage = pixelStage === 0 ? options.pixelStages || 0 : Math.max(0, pixelStage - 1);
    updateStep();
  });

  controls.append(previousButton, nextButton, easierButton);
  wrapper.append(meta);
  if (hasImages) {
    wrapper.append(image);
  }
  wrapper.append(value, controls);
  parent.append(wrapper);
  updateStep();
}

function appendTimer(parent, seconds) {
  let remaining = seconds;
  let intervalId = null;

  const wrapper = document.createElement("div");
  wrapper.className = "timer-box";

  const display = document.createElement("p");
  display.className = "timer-display";

  const controls = document.createElement("div");
  controls.className = "timer-controls";

  const startButton = document.createElement("button");
  startButton.className = "inline-button";
  startButton.type = "button";
  startButton.textContent = "Start";

  const resetButton = document.createElement("button");
  resetButton.className = "inline-button";
  resetButton.type = "button";
  resetButton.textContent = "Reset";

  function updateDisplay() {
    display.textContent = `${remaining}s`;
    wrapper.classList.toggle("timer-done", remaining === 0);
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  startButton.addEventListener("click", () => {
    if (intervalId || remaining === 0) {
      return;
    }

    intervalId = setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      updateDisplay();

      if (remaining === 0) {
        stopTimer();
      }
    }, 1000);
  });

  resetButton.addEventListener("click", () => {
    stopTimer();
    remaining = seconds;
    updateDisplay();
  });

  controls.append(startButton, resetButton);
  wrapper.append(display, controls);
  parent.append(wrapper);
  updateDisplay();
}

function appendItemDetails(parent, item, options = {}) {
  if (item.detail) {
    const detail = document.createElement("p");
    detail.className = "item-detail";
    detail.textContent = item.detail;
    parent.append(detail);
  }

  if (item.list?.length && options.stepList) {
    appendSteppedList(parent, item.list, {
      pixelStages: item.pixelStages,
      hideLabel: Boolean(item.pixelStages),
      showImages: true,
    });
  } else if (item.list?.length) {
    const list = document.createElement("ul");
    list.className = "item-list";
    for (const listItem of item.list) {
      const li = document.createElement("li");
      li.textContent = listItem;
      list.append(li);
    }
    parent.append(list);
  }

  if (item.timerSeconds) {
    appendTimer(parent, item.timerSeconds);
  }
}

function hasItemDetails(item) {
  return Boolean(item.detail || item.list?.length || item.timerSeconds || item.pixelStages);
}

function shouldShowDetailsInline(item) {
  const type = (item.type || "").toLowerCase();
  return type.includes("pech") || type.includes("glueck");
}

function openItemDetails(item, triggerButton) {
  lastDetailsButton = triggerButton;
  itemDetailsTitle.textContent = item.title;
  itemDetailsType.textContent = item.type || "Details";
  itemDetailsBody.innerHTML = "";
  appendItemDetails(itemDetailsBody, item, { stepList: true });
  itemDetailsDialog.hidden = false;
  closeItemDetailsButton.focus();
}

function closeItemDetails() {
  itemDetailsDialog.hidden = true;
  lastDetailsButton?.focus();
}

function renderItems(panel, items, emptyText, options = {}) {
  panel.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = emptyText;
    panel.append(empty);
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "item";
    card.dataset.actionIndex = String(index + 1);

    const type = document.createElement("p");
    type.className = "item-type";
    type.textContent = `${index + 1}. ${item.type || "Spiel"}`;

    const title = document.createElement("h3");
    title.className = "item-title";
    title.textContent = item.title;

    card.append(type, title);

    if (hasItemDetails(item)) {
      if (options.detailsInModal) {
        if (shouldShowDetailsInline(item)) {
          appendItemDetails(card, item);
        } else {
          const detailsButton = document.createElement("button");
          detailsButton.className = "inline-button";
          detailsButton.type = "button";
          detailsButton.textContent = "Details";
          detailsButton.addEventListener("click", () => openItemDetails(item, detailsButton));
          card.append(detailsButton);
        }
      } else {
        appendItemDetails(card, item);
      }
    }

    if (item.opensQuiz) {
      const quizButton = document.createElement("button");
      quizButton.className = "inline-button";
      quizButton.type = "button";
      quizButton.textContent = "Quiz anzeigen";
      quizButton.addEventListener("click", () => setTab("quiz"));
      card.append(quizButton);
    }

    panel.append(card);
  });
}

function setTab(tabName) {
  currentTab = tabName;
  const showQuiz = tabName === "quiz";
  gamesTab.classList.toggle("active", !showQuiz);
  quizTab.classList.toggle("active", showQuiz);
  gamesTab.setAttribute("aria-selected", String(!showQuiz));
  quizTab.setAttribute("aria-selected", String(showQuiz));
  gamesPanel.hidden = showQuiz;
  quizPanel.hidden = !showQuiz;
}

function clearRolledAction() {
  document.querySelectorAll(".item.rolled").forEach((item) => item.classList.remove("rolled"));
}

function setDiceEnabled(enabled) {
  diceEnabled = enabled;
  diceToggle.checked = enabled;
  rollBox.hidden = !enabled;
  localStorage.setItem("diceEnabled", enabled ? "true" : "false");

  if (!enabled) {
    clearRolledAction();
  }
}

function openSettings() {
  settingsDialog.hidden = false;
  diceToggle.focus();
}

function closeSettings() {
  settingsDialog.hidden = true;
  settingsButton.focus();
}

function openFlow() {
  flowDialog.hidden = false;
  closeFlowButton.focus();
}

function closeFlow() {
  flowDialog.hidden = true;
  flowButton.focus();
}

function highlightAction(index) {
  clearRolledAction();
  const panel = currentTab === "quiz" ? quizPanel : gamesPanel;
  const card = panel.querySelector(`[data-action-index="${index}"]`);

  if (card) {
    card.classList.add("rolled");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function rollNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function applyDynamicItems(category, items) {
  return items.map((item) => {
    const type = (item.type || "").toLowerCase();
    if (!type.includes("pech")) {
      return item;
    }

    const amount = rollNumber(5);
    const action = Math.random() < 0.5 ? "Schritte zurueck" : "Schluck";
    const unit = action === "Schritte zurueck" && amount === 1 ? "Schritt zurueck" : action === "Schluck" && amount > 1 ? "Schlucke" : action;

    return {
      ...item,
      title: "Pech",
      detail: `Pech: ${amount} ${unit}.`,
    };
  });
}

async function rollCategory() {
  if (!diceEnabled) {
    return;
  }

  if (!categories.length) {
    return;
  }

  const result = rollNumber(categories.length);
  const category = categories[result - 1];
  rollResult.textContent = `Kategorie-Wurf: ${result} - ${category.name}`;
  await selectCategory(category, { keepRollText: true });
}

function rollAction() {
  if (!diceEnabled) {
    return;
  }

  const items = currentTab === "quiz" ? activeQuiz : activeActions;
  const label = currentTab === "quiz" ? "Quizfrage" : "Aktion";

  if (!items.length) {
    rollResult.textContent = `Keine ${label}-Punkte in dieser Kategorie eingetragen.`;
    return;
  }

  const result = rollNumber(items.length);
  const item = items[result - 1];
  rollResult.textContent = `${label}-Wurf: ${result} - ${item.title}`;
  highlightAction(result);

  if (item.opensQuiz) {
    setTimeout(() => setTab("quiz"), 450);
  }
}

async function selectCategory(category, options = {}) {
  activeCategory = category;
  detailView.hidden = false;
  categoryKicker.textContent = `Kategorie ${category.number}`;
  categoryTitle.textContent = category.name;

  document.querySelectorAll(".category-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === category.id);
  });

  gamesPanel.innerHTML = "<p class=\"empty\">Lade Spiele...</p>";
  quizPanel.innerHTML = "<p class=\"empty\">Lade Quiz...</p>";
  setTab("games");
  clearRolledAction();

  if (diceEnabled && !options.keepRollText) {
    rollResult.textContent = `Kategorie ${category.number} ist ausgewaehlt. Jetzt Aktion wuerfeln.`;
  }

  const [gamesText, quizText] = await Promise.all([
    loadText(category.file),
    loadText(category.quiz),
  ]);
  const games = parseDataFile(gamesText);
  const quiz = parseDataFile(quizText);
  activeGames = applyDynamicItems(category, games.items);
  activeQuiz = quiz.items;
  activeActions = [
    {
      title: "Quiz",
      type: "Aktion",
      detail: "Wenn dieser Punkt gewuerfelt wird, werden die Quizfragen dieser Kategorie gespielt.",
      list: [],
      opensQuiz: true,
    },
    ...activeGames,
  ];
  renderItems(gamesPanel, activeActions, "Noch keine Aktionen eingetragen.", { detailsInModal: true });
  renderItems(quizPanel, activeQuiz, "Noch keine Quizfragen eingetragen.");
}

function renderCategoryList() {
  categoryList.innerHTML = "";
  for (const category of categories) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.dataset.id = category.id;
    button.innerHTML = `<span class="category-number">${category.number}</span><span>${category.name}</span>`;
    button.addEventListener("click", () => selectCategory(category));
    categoryList.append(button);
  }
}

async function init() {
  try {
    categories = JSON.parse(await loadText("data/categories.json"));
    renderCategoryList();
    backButton.addEventListener("click", () => {
      const currentIndex = categories.findIndex((category) => category.id === activeCategory?.id);
      const previousCategory = categories[Math.max(0, currentIndex - 1)] || categories[0];
      selectCategory(previousCategory);
    });
    gamesTab.addEventListener("click", () => setTab("games"));
    quizTab.addEventListener("click", () => setTab("quiz"));
    flowButton.addEventListener("click", openFlow);
    closeFlowButton.addEventListener("click", closeFlow);
    flowDialog.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-flow]")) {
        closeFlow();
      }
    });
    settingsButton.addEventListener("click", openSettings);
    closeSettingsButton.addEventListener("click", closeSettings);
    settingsDialog.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-settings]")) {
        closeSettings();
      }
    });
    closeItemDetailsButton.addEventListener("click", closeItemDetails);
    itemDetailsDialog.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-details]")) {
        closeItemDetails();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !itemDetailsDialog.hidden) {
        closeItemDetails();
        return;
      }

      if (event.key === "Escape" && !flowDialog.hidden) {
        closeFlow();
        return;
      }

      if (event.key === "Escape" && !settingsDialog.hidden) {
        closeSettings();
      }
    });
    diceToggle.addEventListener("change", () => setDiceEnabled(diceToggle.checked));
    rollCategoryButton.addEventListener("click", rollCategory);
    rollActionButton.addEventListener("click", rollAction);
    setDiceEnabled(localStorage.getItem("diceEnabled") === "true");
    selectCategory(categories[0]);
  } catch (error) {
    categoryTitle.textContent = "Daten konnten nicht geladen werden";
    detailView.innerHTML = `<p class="empty">${error.message}</p>`;
  }
}

init();
