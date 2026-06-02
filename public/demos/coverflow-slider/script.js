// LoremFlickr のキーワード別画像を扇スライダーで表示（API・キー・モジュール不要）

const COUNT = 12;

const slidesEl = document.getElementById("slides");
const tabsEl = document.getElementById("tabs");
const modalEl = {
  root: document.getElementById("modal"),
  img: document.getElementById("modalImg"),
  desc: document.getElementById("modalDesc"),
  meta: document.getElementById("modalMeta"),
};

let swiper = null;

// lock=N で「キーワードごとに安定した別画像」を N 枚得る
function urlsFor(keyword) {
  return Array.from(
    { length: COUNT },
    (_, i) => `https://loremflickr.com/1600/900/${keyword}?lock=${i + 1}`,
  );
}

function render(keyword) {
  slidesEl.innerHTML = urlsFor(keyword)
    .map(
      (src, i) =>
        `<div class="swiper-slide" data-idx="${i}">
           <img src="${src}" alt="${keyword} ${i + 1}" />
         </div>`,
    )
    .join("");

  // オフライン/障害時はローカル画像へフォールバック
  slidesEl.querySelectorAll("img").forEach((img, i) => {
    img.addEventListener(
      "error",
      () => {
        img.src = `./images/swipe${i + 1}.jpg`;
      },
      { once: true },
    );
  });

  buildSwiper();
}

function buildSwiper() {
  if (swiper) swiper.destroy(true, true);
  swiper = new Swiper(".swiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto", // 幅は CSS 側で指定
    coverflowEffect: {
      rotate: 26,
      stretch: -28,
      depth: 190,
      modifier: 1.4,
      slideShadows: false,
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 1000,
  });

  // allowClick はドラッグ後の誤クリックを弾く Swiper のフラグ
  swiper.on("click", (sw) => {
    if (sw.allowClick && sw.clickedSlide) openModal(sw.clickedSlide);
  });
}

function openModal(slideEl) {
  const img = slideEl.querySelector("img");
  if (!img) return;
  const n = Number(slideEl.getAttribute("data-idx")) + 1;
  modalEl.img.src = img.currentSrc || img.src; // フォールバック後の実URLを反映
  modalEl.img.alt = img.alt;
  modalEl.desc.textContent = `Image ${n}`;
  modalEl.meta.textContent = `${n} / ${COUNT} · LoremFlickr`;
  modalEl.root.hidden = false;
  swiper.autoplay.stop();
}

function closeModal() {
  modalEl.root.hidden = true;
  modalEl.img.src = "";
  swiper.autoplay.start();
}

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  render(btn.dataset.kw);
});

modalEl.root.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.root.hidden) closeModal();
});

render("nature");
