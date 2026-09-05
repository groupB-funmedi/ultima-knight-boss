/* =========================================
   スマホメニュー
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

menuButton.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});


/* =========================================
   スマホメニューをクリックしたら閉じる
========================================= */

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

    });

});


/* =========================================
   検索機能
========================================= */

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");


function searchSite() {

    const keyword = searchInput.value.trim();

    if (keyword === "") {

        searchMessage.textContent =
            "検索したいキーワードを入力してください。";

        return;
    }

    searchMessage.textContent =
        `「${keyword}」を検索しました。攻略データベースは順次追加予定です。`;

}


/* ボタン */

searchButton.addEventListener("click", searchSite);


/* Enterキー */

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchSite();

    }

});


/* =========================================
   ページ表示時の簡単なアニメーション
========================================= */

const cards = document.querySelectorAll(
    ".article-card, .character-card, .boss-card, .tool-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});