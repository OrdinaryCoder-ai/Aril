// Pressing the bait button on the simulated page adds a held pop-up to the
// tray instead of opening a tab. Showing the mechanic beats describing it.

(function () {
  const bait = document.getElementById("baitBtn");
  const tray = document.getElementById("tray");
  const stack = document.getElementById("trayStack");
  const countEl = document.getElementById("trayCount");
  const clearBtn = document.getElementById("clearBtn");
  const hint = document.getElementById("demoHint");
  if (!bait || !stack) return;

  const OFFERS = [
    { host: "win-prize-now.example", title: "You are visitor #1,000,000" },
    { host: "hd-player-update.example", title: "Your player is out of date" },
    { host: "secure-scan.example", title: "3 issues found on your device" },
    { host: "mega-deals.example", title: "Offer ends in 04:59" },
    { host: "cdn-redirect.example", title: "Redirecting to sponsor" }
  ];

  let held = [];
  let n = 0;

  function draw() {
    tray.hidden = held.length === 0;
    countEl.textContent = held.length;
    stack.innerHTML = "";

    held.slice(-3).forEach((item, i, arr) => {
      const layer = arr.length - 1 - i;
      const el = document.createElement("div");
      el.className = "held" + (item.fresh ? " entering" : "");
      el.style.top = layer * 7 + "px";
      el.style.right = layer * 7 + "px";
      el.style.zIndex = String(10 - layer);
      el.style.opacity = String(1 - layer * 0.1);
      el.innerHTML =
        '<div class="held-bar"><i></i><i></i><i></i><span>' + item.host + "</span></div>" +
        '<div class="held-body"><b>' + item.title + "</b>advertisement</div>" +
        '<div class="held-foot"><button class="go" type="button">Open</button>' +
        '<button class="no" type="button">Dismiss</button></div>';
      el.querySelector(".go").addEventListener("click", () => remove(item.id));
      el.querySelector(".no").addEventListener("click", () => remove(item.id));
      stack.appendChild(el);
      item.fresh = false;
    });
  }

  function remove(id) {
    held = held.filter((h) => h.id !== id);
    draw();
    if (!held.length) hint.textContent = "Nothing held. Press Play in HD again.";
  }

  bait.addEventListener("click", () => {
    const offer = OFFERS[n % OFFERS.length];
    n += 1;
    held.push({ id: n, host: offer.host, title: offer.title, fresh: true });
    draw();
    hint.textContent =
      held.length === 1
        ? "No new tab. It is waiting in the corner."
        : held.length + " held, and the tab strip has not changed.";
  });

  clearBtn.addEventListener("click", () => {
    held = [];
    n = 0;
    draw();
    hint.textContent = "Try it. Press Play in HD.";
  });

  draw();
})();
