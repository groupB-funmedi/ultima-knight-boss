// =====================================================
// ULTIMA 騎士団ボス攻略
// Main JavaScript
// =====================================================


// =====================================================
// ページ内リンク
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);


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


// =====================================================
// サイドメニュー
// =====================================================

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;


        if (
            window.scrollY >=
            sectionTop - 150
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    menuItems.forEach(item => {

        item.classList.remove(
            "active"
        );


        const href =
            item.getAttribute("href");


        if (
            href ===
            "#" + currentSection
        ) {

            item.classList.add(
                "active"
            );

        }

    });

});


// =====================================================
// 検索
// =====================================================

const searchInput =
    document.querySelector(
        ".search-box input"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const keyword =
                searchInput
                    .value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".player-card, .video-card, .tip-card"
                );


            cards.forEach(card => {

                const text =
                    card
                        .textContent
                        .toLowerCase();


                if (
                    keyword === "" ||
                    text.includes(keyword)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );

}


// =====================================================
// 魔獣アクム Lv.1～30
// =====================================================

const akumBossStats = {

    1: {
        hp: "2,090,121",
        attack: "8,795",
        defense: "3,454",
        criticalRate: "29.78%",
        criticalDamage: "86.1%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "20%",
        criticalDefense: "50%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    2: {
        hp: "2,923,402",
        attack: "10,291",
        defense: "4,161",
        criticalRate: "34.1%",
        criticalDamage: "97.55%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "22%",
        criticalDefense: "54%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    3: {
        hp: "3,974,208",
        attack: "12,164",
        defense: "5,045",
        criticalRate: "39.44%",
        criticalDamage: "111.54%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "24.2%",
        criticalDefense: "58.32%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    4: {
        hp: "5,180,389",
        attack: "14,163",
        defense: "6,009",
        criticalRate: "45.11%",
        criticalDamage: "126.39%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "26.62%",
        criticalDefense: "62.99%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    5: {
        hp: "6,541,945",
        attack: "16,287",
        defense: "7,054",
        criticalRate: "51.12%",
        criticalDamage: "142.08%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "29.28%",
        criticalDefense: "68.03%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    6: {
        hp: "8,198,714",
        attack: "18,852",
        defense: "8,316",
        criticalRate: "58.32%",
        criticalDamage: "160.75%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "32.21%",
        criticalDefense: "73.47%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    7: {
        hp: "10,197,308",
        attack: "21,895",
        defense: "9,819",
        criticalRate: "66.79%",
        criticalDamage: "182.65%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "35.43%",
        criticalDefense: "79.35%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    8: {
        hp: "12,413,428",
        attack: "25,114",
        defense: "11,436",
        criticalRate: "75.74%",
        criticalDamage: "205.74%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "38.97%",
        criticalDefense: "85.7%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    9: {
        hp: "14,847,073",
        attack: "28,508",
        defense: "13,165",
        criticalRate: "85.16%",
        criticalDamage: "230.02%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "42.87%",
        criticalDefense: "92.56%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    10: {
        hp: "17,700,232",
        attack: "33,562",
        defense: "14,453",
        criticalRate: "99.34%",
        criticalDamage: "266.85%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "47.16%",
        criticalDefense: "99.96%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    11: {
        hp: "24,022,303",
        attack: "43,117",
        defense: "17,891",
        criticalRate: "126.53%",
        criticalDamage: "338.1%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "51.88%",
        criticalDefense: "107.96%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    12: {
        hp: "28,721,553",
        attack: "47,078",
        defense: "19,521",
        criticalRate: "137.16%",
        criticalDamage: "364.88%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "57.07%",
        criticalDefense: "116.6%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    13: {
        hp: "34,135,530",
        attack: "51,479",
        defense: "21,333",
        criticalRate: "148.97%",
        criticalDamage: "394.63%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "62.78%",
        criticalDefense: "125.93%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    14: {
        hp: "40,334,151",
        attack: "56,320",
        defense: "23,326",
        criticalRate: "161.97%",
        criticalDamage: "427.35%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "69.06%",
        criticalDefense: "136%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    15: {
        hp: "47,387,335",
        attack: "61,602",
        defense: "25,500",
        criticalRate: "176.14%",
        criticalDamage: "463.05%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "75.97%",
        criticalDefense: "146.88%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    16: {
        hp: "54,999,870",
        attack: "66,883",
        defense: "27,674",
        criticalRate: "190.32%",
        criticalDamage: "498.75%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "83.57%",
        criticalDefense: "158.63%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    17: {
        hp: "63,560,194",
        attack: "72,604",
        defense: "30,029",
        criticalRate: "205.67%",
        criticalDamage: "537.43%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "91.93%",
        criticalDefense: "171.32%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    18: {
        hp: "73,549,970",
        attack: "79,206",
        defense: "32,747",
        criticalRate: "223.39%",
        criticalDamage: "582.05%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "101.12%",
        criticalDefense: "185.03%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    19: {
        hp: "84,238,935",
        attack: "85,807",
        defense: "35,464",
        criticalRate: "241.11%",
        criticalDamage: "626.68%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "111.23%",
        criticalDefense: "199.83%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    20: {
        hp: "96,543,801",
        attack: "93,289",
        defense: "38,544",
        criticalRate: "261.19%",
        criticalDamage: "677.25%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "122.35%",
        criticalDefense: "215.82%",
        ignoreResistance: "20%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    21: {
        hp: "102,375,267",
        attack: "95,583",
        defense: "40,175",
        criticalRate: "267.16%",
        criticalDamage: "691.96%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "134.59%",
        criticalDefense: "358.06%",
        ignoreResistance: "20.2%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    22: {
        hp: "112,611,620",
        attack: "101,566",
        defense: "43,919",
        criticalRate: "283.04%",
        criticalDamage: "731.61%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "148.05%",
        criticalDefense: "380.1%",
        ignoreResistance: "20.4%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    23: {
        hp: "123,127,648",
        attack: "107,278",
        defense: "47,735",
        criticalRate: "298.18%",
        criticalDamage: "769.41%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "162.86%",
        criticalDefense: "401.14%",
        ignoreResistance: "20.6%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    24: {
        hp: "134,412,784",
        attack: "113,128",
        defense: "51,811",
        criticalRate: "313.7%",
        criticalDamage: "808.16%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "179.15%",
        criticalDefense: "422.7%",
        ignoreResistance: "20.8%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    25: {
        hp: "146,490,333",
        attack: "119,093",
        defense: "56,152",
        criticalRate: "329.52%",
        criticalDamage: "847.68%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "197.07%",
        criticalDefense: "444.68%",
        ignoreResistance: "21%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    26: {
        hp: "158,878,632",
        attack: "124,757",
        defense: "60,575",
        criticalRate: "344.54%",
        criticalDamage: "885.17%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "216.78%",
        criticalDefense: "465.54%",
        ignoreResistance: "21.2%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    27: {
        hp: "172,090,420",
        attack: "130,506",
        defense: "65,271",
        criticalRate: "359.79%",
        criticalDamage: "923.23%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "238.46%",
        criticalDefense: "486.72%",
        ignoreResistance: "21.4%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    28: {
        hp: "185,628,496",
        attack: "135,939",
        defense: "70,051",
        criticalRate: "374.18%",
        criticalDamage: "959.16%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "262.31%",
        criticalDefense: "506.73%",
        ignoreResistance: "21.6%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    29: {
        hp: "200,021,136",
        attack: "141,427",
        defense: "75,113",
        criticalRate: "388.73%",
        criticalDamage: "995.45%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "288.54%",
        criticalDefense: "526.94%",
        ignoreResistance: "21.8%",
        burstGauge: "1,500",
        moveSpeed: "500"
    },

    30: {
        hp: "214,755,600",
        attack: "146,582",
        defense: "80,264",
        criticalRate: "402.38%",
        criticalDamage: "1029.5%",
        penetration: "8%",
        endurance: "9%",
        criticalResistance: "317.39%",
        criticalDefense: "545.93%",
        ignoreResistance: "22%",
        burstGauge: "1,500",
        moveSpeed: "500"
    }

};


// =====================================================
// 数字へ変換
// =====================================================

function statNumber(value) {

    return parseFloat(
        String(value)
            .replace(/,/g, "")
            .replace("%", "")
    );

}


// =====================================================
// バー
// =====================================================

function setBossBar(
    fillId,
    dotId,
    percentage
) {

    const fill =
        document.getElementById(fillId);

    const dot =
        document.getElementById(dotId);


    const safePercentage =
        Math.max(
            3,
            Math.min(
                percentage,
                97
            )
        );


    if (fill) {

        fill.style.width =
            safePercentage + "%";

    }


    if (dot) {

        dot.style.left =
            safePercentage + "%";

    }

}


// =====================================================
// ステータス変更
// =====================================================

function updateAkumBossStatus(level) {

    const stat =
        akumBossStats[level];


    if (!stat) {
        return;
    }


    document.getElementById(
        "bossHp"
    ).textContent =
        stat.hp;


    document.getElementById(
        "bossAttack"
    ).textContent =
        stat.attack;


    document.getElementById(
        "bossDefense"
    ).textContent =
        stat.defense;


    document.getElementById(
        "bossCriticalRate"
    ).textContent =
        stat.criticalRate;


    document.getElementById(
        "bossCriticalDamage"
    ).textContent =
        stat.criticalDamage;


    document.getElementById(
        "bossPenetration"
    ).textContent =
        stat.penetration;


    document.getElementById(
        "bossEndurance"
    ).textContent =
        stat.endurance;


    document.getElementById(
        "bossCriticalResistance"
    ).textContent =
        stat.criticalResistance;


    document.getElementById(
        "bossCriticalDefense"
    ).textContent =
        stat.criticalDefense;


    document.getElementById(
        "bossIgnoreResistance"
    ).textContent =
        stat.ignoreResistance;


    document.getElementById(
        "bossBurstGauge"
    ).textContent =
        stat.burstGauge;


    document.getElementById(
        "bossMoveSpeed"
    ).textContent =
        stat.moveSpeed;


    // ===============================
    // バー
    // ===============================

    const hpMax =
        statNumber(
            akumBossStats[30].hp
        );


    const attackMax =
        statNumber(
            akumBossStats[30].attack
        );


    const defenseMax =
        statNumber(
            akumBossStats[30].defense
        );


    setBossBar(
        "hpBar",
        "hpDot",
        statNumber(stat.hp) /
        hpMax *
        100
    );


    setBossBar(
        "attackBar",
        "attackDot",
        statNumber(stat.attack) /
        attackMax *
        100
    );


    setBossBar(
        "defenseBar",
        "defenseDot",
        statNumber(stat.defense) /
        defenseMax *
        100
    );


    setBossBar(
        "criticalRateBar",
        "criticalRateDot",
        statNumber(
            stat.criticalRate
        ) / 4.15
    );


    setBossBar(
        "criticalDamageBar",
        "criticalDamageDot",
        statNumber(
            stat.criticalDamage
        ) / 10.6
    );


    setBossBar(
        "penetrationBar",
        "penetrationDot",
        statNumber(
            stat.penetration
        )
    );


    setBossBar(
        "enduranceBar",
        "enduranceDot",
        statNumber(
            stat.endurance
        )
    );

}


// =====================================================
// ボスレベルボタン
// =====================================================

const bossLevelButtons =
    document.querySelectorAll(
        ".boss-level-button"
    );


bossLevelButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const level =
                    Number(
                        button.dataset.level
                    );


                bossLevelButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateAkumBossStatus(
                    level
                );

            }
        );

    }
);


// =====================================================
// 初期表示
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAkumBossStatus(1);

        console.log(
            "ULTIMA 騎士団ボス攻略サイト loaded."
        );

    }
);