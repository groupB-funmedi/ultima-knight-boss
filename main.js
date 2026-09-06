// =========================================
// ULTIMA 騎士団ボス攻略
// Main JavaScript
// =========================================


// ページ内リンクをクリックしたときに
// なめらかに移動する
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// =========================================
// 現在表示しているセクションに合わせて
// サイドメニューを切り替える
// =========================================

const sections = document.querySelectorAll(
    "main section[id]"
);

const menuItems = document.querySelectorAll(
    ".menu-item"
);


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });


    menuItems.forEach(item => {

        item.classList.remove("active");

        const href = item.getAttribute("href");

        if (href === "#" + currentSection) {
            item.classList.add("active");
        }

    });

});


// =========================================
// 検索ボックス
// =========================================

const searchInput = document.querySelector(
    ".search-box input"
);


if (searchInput) {

    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value.toLowerCase().trim();

        const cards =
            document.querySelectorAll(
                ".player-card, .video-card, .tip-card"
            );


        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            if (
                keyword === "" ||
                text.includes(keyword)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// =========================================
// ページ読み込み完了
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "ULTIMA 騎士団ボス攻略サイト loaded."
    );

});