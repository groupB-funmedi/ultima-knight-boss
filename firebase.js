// =====================================================
// Firebase 設定
// =====================================================

// Firebase本体
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// 管理者ログイン用
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firestore用
import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =====================================================
// Firebase Config
// =====================================================
// ↓ Firebase Consoleの「Config」に表示されている値を
//   そのまま貼り付けてください。

const firebaseConfig = {

    apiKey: "AIzaSyBgopTU0yYO8YUhuSe3hltpNDYc1gUiWyc",

    authDomain: "ultima-knight-boss.firebaseapp.com",

    projectId: "ultima-knight-boss",

    storageBucket: "ultima-knight-boss.firebasestorage.app",

    messagingSenderId: "677535279178",

    appId: "1:677535279178:web:556600bb252e0e14811eb3",

    measurementId: "G-K6PS99T32E"

};


// =====================================================
// Firebase 初期化
// =====================================================

const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth(app);


// Firestore
const db = getFirestore(app);


// =====================================================
// 他のJavaScriptファイルから使えるようにする
// =====================================================

export {
    app,
    auth,
    db
};


console.log(
    "Firebaseの接続準備が完了しました。"
);

// =====================================================
// 管理者ログイン
// =====================================================

const adminLoginButton =
    document.getElementById(
        "adminLoginButton"
    );

const adminLogoutButton =
    document.getElementById(
        "adminLogoutButton"
    );

const adminStatus =
    document.getElementById(
        "adminStatus"
    );

const adminLoginModal =
    document.getElementById(
        "adminLoginModal"
    );

const adminModalClose =
    document.getElementById(
        "adminModalClose"
    );

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );

const adminEmail =
    document.getElementById(
        "adminEmail"
    );

const adminPassword =
    document.getElementById(
        "adminPassword"
    );

const adminLoginMessage =
    document.getElementById(
        "adminLoginMessage"
    );


// =====================================================
// ログイン画面を開く
// =====================================================

if (adminLoginButton) {

    adminLoginButton.addEventListener(
        "click",
        () => {

            adminLoginModal.hidden =
                false;

            adminLoginMessage.textContent =
                "";

        }
    );

}


// =====================================================
// ログイン画面を閉じる
// =====================================================

function closeAdminModal() {

    adminLoginModal.hidden =
        true;

    adminPassword.value =
        "";

    adminLoginMessage.textContent =
        "";

}


if (adminModalClose) {

    adminModalClose.addEventListener(
        "click",
        closeAdminModal
    );

}


const adminModalOverlay =
    document.querySelector(
        ".admin-modal-overlay"
    );


if (adminModalOverlay) {

    adminModalOverlay.addEventListener(
        "click",
        closeAdminModal
    );

}


// =====================================================
// ログイン
// =====================================================

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                adminEmail
                    .value
                    .trim();

            const password =
                adminPassword
                    .value;


            adminLoginMessage.textContent =
                "ログイン中...";


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                adminLoginMessage.textContent =
                    "";

                closeAdminModal();


            } catch (error) {

                console.error(
                    "ログインエラー:",
                    error
                );


                adminLoginMessage.textContent =
                    "メールアドレスまたはパスワードを確認してください。";

            }

        }
    );

}


// =====================================================
// ログアウト
// =====================================================

if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

            } catch (error) {

                console.error(
                    "ログアウトエラー:",
                    error
                );

            }

        }
    );

}


// =====================================================
// ログイン状態を監視
// =====================================================

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "管理者ログイン:",
                user.uid
            );


            adminStatus.textContent =
                "管理者ログイン中";


            adminLoginButton.hidden =
                true;


            adminLogoutButton.hidden =
                false;


            document.body.classList.add(
                "admin-logged-in"
            );


        } else {

            console.log(
                "未ログイン"
            );


            adminStatus.textContent =
                "未ログイン";


            adminLoginButton.hidden =
                false;


            adminLogoutButton.hidden =
                true;


            document.body.classList.remove(
                "admin-logged-in"
            );

        }

    }
);

// =====================================================
// 管理者UID
// =====================================================
// Firebase Authenticationで確認した
// 管理者のUIDをここに入力してください。

const ADMIN_UID = "nAPNxgLfcnVC9HPmk2Ycj5hGlkw2";


// =====================================================
// キャラクターマスター
// =====================================================

const characterMaster = [

    {
        id: "merlin",
        name: "マーリン",
        image: "images/マーリン.png",
        transcend: "推奨超越3"
    },

    {
        id: "gowther",
        name: "ゴウセル",
        image: "images/ゴウセル.png",
        transcend: "推奨超越3"
    },

    {
        id: "elizabeth",
        name: "エリザベス",
        image: "images/エリザべス.png",
        transcend: "推奨超越なし"
    },

    {
        id: "daisy",
        name: "デイジー",
        image: "images/デイジー.png",
        transcend: "推奨超越なし"
    },

    {
        id: "manny",
        name: "マニー",
        image: "images/マニー.png",
        transcend: "推奨超越2"
    },

    {
        id: "meliodas",
        name: "メリオダス",
        image: "images/メリオダス.png",
        transcend: "推奨超越3"
    },

    {
        id: "ban",
        name: "バン",
        image: "images/バン.png",
        transcend: "推奨超越3"
    },

    {
        id: "derieri",
        name: "デリエリ",
        image: "images/デリエリ.png",
        transcend: "推奨超越3"
    },

    {
        id: "drake",
        name: "ドレイク",
        image: "images/ドレイク.png",
        transcend: "推奨超越2"
    },

    {
        id: "clotho",
        name: "クロト",
        image: "images/クロト.png",
        transcend: "推奨超越なし"
    },

    {
        id: "escanor",
        name: "エスカノール",
        image: "images/エスカノール.png",
        transcend: "推奨超越なし"
    },

    {
        id: "diane",
        name: "ディアンヌ",
        image: "images/ディアンヌ.png",
        transcend: "推奨超越なし"
    },

    {
        id: "king",
        name: "キング",
        image: "images/キング.png",
        transcend: "推奨超越なし"
    },

    {
        id: "jericho",
        name: "ジェリコ",
        image: "images/ジェリコ.png",
        transcend: "推奨超越なし"
    },

    {
        id: "guila",
        name: "ギーラ",
        image: "images/ギーラ.png",
        transcend: "推奨超越なし"
    },

    {
        id: "elaine",
        name: "エレイン",
        image: "images/エレイン.png",
        transcend: "推奨超越なし"
    },

    {
        id: "hauser",
        name: "ハウザー",
        image: "images/ハウザー.png",
        transcend: "推奨超越2"
    },

    {
        id: "tristan",
        name: "トリスタン",
        image: "images/トリスタン.png",
        transcend: "推奨超越なし"
    },

    {
        id: "tioreh",
        name: "ティオレー",
        image: "images/ティオレー.png",
        transcend: "推奨超越なし"
    },

    {
        id: "gilthunder",
        name: "ギルサンダー",
        image: "images/ギルサンダー.png",
        transcend: "推奨超越なし"
    },

    {
        id: "deldry",
        name: "ドレドリン",
        image: "images/ドレドリン.png",
        transcend: "推奨超越なし"
    },

    {
        id: "bug",
        name: "バグ",
        image: "images/バグ.png",
        transcend: "推奨超越なし"
    },

    {
        id: "dreyfus",
        name: "ドレファス",
        image: "images/ドレファス.png",
        transcend: "推奨超越なし"
    },

    {
        id: "hendrickson",
        name: "ヘンドリクセン",
        image: "images/ヘンドリクセン.png",
        transcend: "推奨超越なし"
    },

    {
        id: "slader",
        name: "スレイダー",
        image: "images/スレイダー.png",
        transcend: "推奨超越なし"
    },

    {
        id: "griamore",
        name: "グリアモール",
        image: "images/グリアモール.png",
        transcend: "推奨超越なし"
    }

];

// =====================================================
// 装備マスター
// =====================================================

// 武器種
const weaponTypes = [
    "ガントレット",
    "スタッフ",
    "魔導書",
    "ランス",
    "レイピア",
    "ワンド",
    "三節棍",
    "剣盾",
    "双剣",
    "大剣",
    "長剣",
    "斧"
];


// 装備部位
const equipmentTypes = {
    engraving: "刻印",
    weapon: "武器",
    top: "トップス",
    belt: "ベルト",
    bottom: "ボトムス",
    boots: "ブーツ",
    earring: "耳飾り",
    necklace: "首飾り",
    ring: "指輪"
};


// =====================================================
// 装備マスター
// =====================================================

const equipmentMaster = {

    // =================================================
    // 武器
    // =================================================

    weapons: {

        "ガントレット": [],

        "スタッフ": [],

        "魔導書": [],

        "ランス": [],

        "レイピア": [],

        "ワンド": [],

        "三節棍": [],

        "剣盾": [],


        // -----------------------------------------
        // 双剣
        // -----------------------------------------

        "双剣": [

            {
                id: "flame_dual_swords",
                name: "炎火双剣",
                image: "images/炎火双剣.png"
            },

            {
                id: "black_flame_dual_swords",
                name: "黒炎双剣",
                image: "images/黒炎双剣.png"
            },

            {
                id: "crafted_dual_swords",
                name: "製作双剣",
                image: "images/製作双剣.png"
            }

        ],


        "大剣": [],


        // -----------------------------------------
        // 長剣
        // -----------------------------------------

        "長剣": [

            {
                id: "flame_long_sword",
                name: "炎火長剣",
                image: "images/炎火長剣.png"
            },

            {
                id: "black_flame_long_sword",
                name: "黒炎長剣",
                image: "images/黒炎長剣.png"
            },

            {
                id: "soul_long_sword",
                name: "魂長剣",
                image: "images/魂長剣.png"
            }

        ],


        // -----------------------------------------
        // 斧
        // -----------------------------------------

        "斧": [

            {
                id: "flame_axe",
                name: "炎火斧",
                image: "images/炎火斧.png"
            },

            {
                id: "black_flame_axe",
                name: "黒炎斧",
                image: "images/黒炎斧.png"
            },

            {
                id: "soul_axe",
                name: "魂斧",
                image: "images/魂斧.png"
            }

        ]

    },


    // =================================================
    // トップス
    // =================================================

    top: [

        {
            id: "arachne_top",
            name: "アラクネートップス",
            image: "images/アラクネートップス.png"
        },

        {
            id: "taranis_top",
            name: "タラニストップス",
            image: "images/タラニストップス.png"
        },

        {
            id: "knight_top",
            name: "騎士団トップス",
            image: "images/騎士団トップス.png"
        },

        {
            id: "madness_top",
            name: "狂気トップス",
            image: "images/狂気トップス.png"
        },

        {
            id: "jet_black_top",
            name: "漆黒トップス",
            image: "images/漆黒トップス.png"
        },

        {
            id: "wild_top",
            name: "野生トップス",
            image: "images/野生トップス.png"
        },

        {
            id: "galand_top",
            name: "ガラントップス",
            image: "images/ガラントップス.png"
        }

    ],


    // =================================================
    // ベルト
    // =================================================

    belt: [

        {
            id: "arachne_belt",
            name: "アラクネーベルト",
            image: "images/アラクネーベルト.png"
        },

        {
            id: "taranis_belt",
            name: "タラニスベルト",
            image: "images/タラニスベルト.png"
        },

        {
            id: "watcher_belt",
            name: "監視者ベルト",
            image: "images/監視者ベルト.png"
        },

        {
            id: "knight_belt",
            name: "騎士団ベルト",
            image: "images/騎士団ベルト.png"
        },

        {
            id: "madness_belt",
            name: "狂気ベルト",
            image: "images/狂気ベルト.png"
        },

        {
            id: "jet_black_belt",
            name: "漆黒ベルト",
            image: "images/漆黒ベルト.png"
        },

        {
            id: "wild_belt",
            name: "野生ベルト",
            image: "images/野生ベルト.png"
        }

    ],


    // =================================================
    // ボトムス
    // =================================================

    bottom: [

        {
            id: "arachne_bottom",
            name: "アラクネーボトムス",
            image: "images/アラクネーボトムス.png"
        },

        {
            id: "golem_bottom",
            name: "ゴーレムボトムス",
            image: "images/ゴーレムボトムス.png"
        },

        {
            id: "taranis_bottom",
            name: "タラニスボトムス",
            image: "images/タラニスボトムス.png"
        },

        {
            id: "watcher_bottom",
            name: "監視者ボトムス",
            image: "images/監視者ボトムス.png"
        },

        {
            id: "knight_bottom",
            name: "騎士団ボトムス",
            image: "images/騎士団ボトムス.png"
        },

        {
            id: "madness_bottom",
            name: "狂気ボトムス",
            image: "images/狂気ボトムス.png"
        },

        {
            id: "jet_black_bottom",
            name: "漆黒ボトムス",
            image: "images/漆黒ボトムス.png"
        },

        {
            id: "spider_bottom",
            name: "蜘蛛ボトムス",
            image: "images/蜘蛛ボトムス.png"
        },

        {
            id: "wild_bottom",
            name: "野生ボトムス",
            image: "images/野生ボトムス.png"
        }

    ],


    // =================================================
    // ブーツ
    // =================================================

    boots: [

        {
            id: "arachne_boots",
            name: "アラクネーブーツ",
            image: "images/アラクネーブーツ.png"
        },

        {
            id: "taranis_boots",
            name: "タラニスブーツ",
            image: "images/タラニスブーツ.png"
        },

        {
            id: "madness_boots",
            name: "狂気ブーツ",
            image: "images/狂気ブーツ.webp"
        },

        {
            id: "jet_black_boots",
            name: "漆黒ブーツ",
            image: "images/漆黒ブーツ.png"
        },

        {
            id: "spider_boots",
            name: "蜘蛛ブーツ",
            image: "images/蜘蛛ブーツ.png"
        }

    ],


    // =================================================
    // 耳飾り
    // =================================================

    earring: [

        {
            id: "taranis_earring",
            name: "タラニス耳飾り",
            image: "images/タラニス耳飾り.webp"
        },

        {
            id: "knight_earring",
            name: "騎士団耳飾り",
            image: "images/騎士団耳飾り.png"
        },

        {
            id: "regeneration_earring",
            name: "再生耳飾り",
            image: "images/再生耳飾り.png"
        },

        {
            id: "curse_earring",
            name: "呪い耳飾り",
            image: "images/呪い耳飾り.png"
        },

        {
            id: "fallen_earring",
            name: "堕落耳飾り",
            image: "images/堕落耳飾り.png"
        }

    ],


    // =================================================
    // 首飾り
    // =================================================

    necklace: [

        {
            id: "arachne_necklace",
            name: "アラクネー首飾り",
            image: "images/アラクネー首飾り.png"
        },

        {
            id: "taranis_necklace",
            name: "タラニス首飾り",
            image: "images/タラニス首飾り.webp"
        },

        {
            id: "durack_necklace",
            name: "デュラック首飾り",
            image: "images/デュラック首飾り.png"
        },

        {
            id: "knight_necklace",
            name: "騎士団首飾り",
            image: "images/騎士団首飾り.png"
        },

        {
            id: "madness_necklace",
            name: "狂気首飾り",
            image: "images/狂気首飾り.png"
        },

        {
            id: "regeneration_necklace",
            name: "再生首飾り",
            image: "images/再生首飾り.png"
        },

        {
            id: "curse_necklace",
            name: "呪い首飾り",
            image: "images/呪い首飾り.png"
        },

        {
            id: "fallen_necklace",
            name: "堕落首飾り",
            image: "images/堕落首飾り.png"
        }

    ],


    // =================================================
    // 指輪
    // =================================================

    ring: [

        {
            id: "arachne_ring",
            name: "アラクネー指輪",
            image: "images/アラクネー指輪.png"
        },

        {
            id: "taranis_ring",
            name: "タラニス指輪",
            image: "images/タラニス指輪.webp"
        },

        {
            id: "knight_ring",
            name: "騎士団指輪",
            image: "images/騎士団指輪.png"
        },

        {
            id: "madness_ring",
            name: "狂気指輪",
            image: "images/狂気指輪.png"
        },

        {
            id: "regeneration_ring",
            name: "再生指輪",
            image: "images/再生指輪.png"
        },

        {
            id: "curse_ring",
            name: "呪い指輪",
            image: "images/呪い指輪.png"
        },

        {
            id: "fallen_ring",
            name: "堕落指輪",
            image: "images/堕落指輪.png"
        },

        {
            id: "spider_ring",
            name: "蜘蛛指輪",
            image: "images/蜘蛛指輪.png"
        },

        {
            id: "oath_ring",
            name: "盟約指輪",
            image: "images/盟約指輪.png"
        }

    ]

};

// =====================================================
// キャラクター別 装備ルール
// =====================================================

const characterEquipmentRules = {

    elaine: {
        engravings: [
            "旅人",
            "軽やか",
            "聖女"
        ],
        weaponTypes: [
            "ワンド",
            "スタッフ",
            "魔導書"
        ]
    },

    guila: {
        engravings: [
            "誘爆",
            "軽やか",
            "紅炎"
        ],
        weaponTypes: [
            "ランス",
            "剣盾",
            "レイピア"
        ]
    },

    jericho: {
        engravings: [
            "星形",
            "秘密",
            "思い出"
        ],
        weaponTypes: [
            "双剣",
            "ランス",
            "レイピア"
        ]
    },

    king: {
        engravings: [
            "怠惰",
            "深き森"
        ],
        weaponTypes: [
            "スタッフ",
            "魔導書",
            "ワンド"
        ]
    },

    diane: {
        engravings: [
            "嫉妬",
            "元気",
            "スパイナス"
        ],
        weaponTypes: [
            "斧",
            "ガントレット",
            "三節棍"
        ]
    },

    drake: {
        engravings: [
            "過去",
            "影",
            "インペリアル"
        ],
        weaponTypes: [
            "大剣",
            "スタッフ",
            "長剣"
        ]
    },

    manny: {
        engravings: [
            "最高位",
            "未知",
            "神聖"
        ],
        weaponTypes: [
            "スタッフ",
            "双剣",
            "長剣"
        ]
    },

    meliodas: {

        engravings: [

            {
                id: "meliodas_engraving_new",
                name: "新たな",
                image: "images/メリオダス刻印新たな.png"
            },

            {
                id: "meliodas_engraving_simple",
                name: "簡易的",
                image: "images/メリオダス刻印簡易的.png"
            },

            {
                id: "meliodas_engraving_strongest",
                name: "最強",
                image: "images/メリオダス刻印最強.png"
            }

        ],

        weaponTypes: [
            "長剣",
            "斧",
            "双剣"
        ]

    },

    daisy: {
        engravings: [
            "小さな",
            "探求",
            "春色"
        ],
        weaponTypes: [
            "剣盾",
            "魔導書",
            "ワンド"
        ]
    },

    escanor: {
        engravings: [
            "黄金",
            "北部",
            "満ち足りた"
        ],
        weaponTypes: [
            "斧",
            "大剣",
            "剣盾"
        ]
    },

    clotho: {
        engravings: [
            "大学者",
            "軽やか",
            "探検家"
        ],
        weaponTypes: [
            "レイピア",
            "魔導書",
            "スタッフ"
        ]
    },

    merlin: {
        engravings: [
            "軽やか",
            "暴食",
            "知識"
        ],
        weaponTypes: [
            "魔導書",
            "ワンド",
            "スタッフ"
        ]
    },

    elizabeth: {
        engravings: [
            "酒場",
            "リオネス"
        ],
        weaponTypes: [
            "魔導書",
            "スタッフ",
            "ワンド"
        ]
    },

    gowther: {
        engravings: [
            "秘蔵",
            "色欲",
            "最小限"
        ],
        weaponTypes: [
            "ワンド",
            "魔導書",
            "スタッフ"
        ]
    },

    derieri: {
        engravings: [
            "反抗",
            "最低限"
        ],
        weaponTypes: [
            "ガントレット",
            "大剣",
            "斧"
        ]
    },

    ban: {
        engravings: [
            "臨時",
            "強欲",
            "軽快"
        ],
        weaponTypes: [
            "三節棍",
            "大剣",
            "ガントレット"
        ]
    },

    tristan: {
        engravings: [
            "品格",
            "冒険",
            "誓い"
        ],
        weaponTypes: [
            "双剣",
            "大剣",
            "長剣"
        ]
    },

    tioreh: {
        engravings: [
            "森と大地",
            "冒険",
            "妖精"
        ],
        weaponTypes: [
            "魔導書",
            "ワンド",
            "スタッフ"
        ]
    },

    gilthunder: {
        engravings: [
            "電撃",
            "模範的",
            "将来有望"
        ],
        weaponTypes: [
            "長剣",
            "剣盾",
            "ランス"
        ]
    },

    hauser: {
        engravings: [
            "暴風",
            "堅固"
        ],
        weaponTypes: [
            "ランス",
            "ガントレット",
            "三節棍"
        ]
    },

    deldry: {
        engravings: [
            "王家",
            "入念",
            "堅固"
        ],
        weaponTypes: [
            "剣盾",
            "斧",
            "レイピア"
        ]
    },

    bug: {
        engravings: [
            "影",
            "足取り",
            "潜行"
        ],
        weaponTypes: [
            "斧",
            "双剣",
            "魔導書"
        ]
    },

    dreyfus: {
        engravings: [
            "老将",
            "飾らない",
            "栄誉"
        ],
        weaponTypes: [
            "レイピア",
            "長剣",
            "ランス"
        ]
    },

    hendrickson: {
        engravings: [
            "若き日",
            "施薬院",
            "帰ってきた"
        ],
        weaponTypes: [
            "長剣",
            "双剣",
            "ランス"
        ]
    },

    slader: {
        engravings: [
            "老王",
            "極秘任務",
            "万全"
        ],
        weaponTypes: [
            "大剣",
            "斧",
            "三節棍"
        ]
    },

    griamore: {
        engravings: [
            "鉄壁",
            "簡易防壁"
        ],
        weaponTypes: [
            "剣盾",
            "三節棍",
            "ガントレット"
        ]
    }

};

// =====================================================
// Firestore 編成ドキュメント
// =====================================================

const partyDocument =
    doc(
        db,
        "partyCompositions",
        "current"
    );


// =====================================================
// 現在の編成
// =====================================================

let currentPartyData = {};


// 現在編集中のPLAYER
let editingPlayer = null;


// 選択中キャラ
let selectedCharacters = [];


// =====================================================
// PLAYERカードに編集ボタンを作成
// =====================================================

function createEditButtons() {

    for (
        let playerNumber = 1;
        playerNumber <= 5;
        playerNumber++
    ) {

        const playerCard =
            document.getElementById(
                `player${playerNumber}`
            );


        if (!playerCard) {
            continue;
        }


        // すでに作成済みなら追加しない
        if (
            playerCard.querySelector(
                ".party-edit-button"
            )
        ) {
            continue;
        }


        const button =
            document.createElement(
                "button"
            );


        button.type = "button";

        button.className =
            "party-edit-button";

        button.textContent =
            "⚙ 編成を編集";

        button.dataset.player =
            playerNumber;


        button.hidden = true;


        button.addEventListener(
            "click",
            () => {

                openPartyEditor(
                    playerNumber
                );

            }
        );


        const role =
            playerCard.querySelector(
                ".player-role"
            );


        if (role) {

            role.insertAdjacentElement(
                "afterend",
                button
            );

        }

    }

}


// =====================================================
// 装備編集ボタンを作成
// =====================================================

function createEquipmentEditButtons() {

    for (
        let playerNumber = 1;
        playerNumber <= 5;
        playerNumber++
    ) {

        const playerCard =
            document.getElementById(
                `player${playerNumber}`
            );


        if (!playerCard) {
            continue;
        }


        const equipmentTitle =
            playerCard.querySelector(
                ".equipment-title"
            );


        if (!equipmentTitle) {
            continue;
        }


        // すでにボタンがある場合は作らない
        if (
            playerCard.querySelector(
                ".equipment-edit-button"
            )
        ) {
            continue;
        }


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "equipment-edit-button";


        button.textContent =
            "⚙ 装備を編集";


        button.dataset.player =
            playerNumber;


        // 最初は非表示
        button.hidden =
            true;


        equipmentTitle.appendChild(
            button
        );

    }

}

// =====================================================
// 装備編集
// =====================================================

let editingEquipmentPlayer = null;


// 装備編集画面で一時的に保持するデータ
let equipmentDraft = {};


// 装備部位の表示名
const equipmentSlotLabels = {
    engraving: "刻印",
    weapon: "武器",
    top: "トップス",
    belt: "ベルト",
    bottom: "ボトムス",
    boots: "ブーツ",
    earring: "耳飾り",
    necklace: "首飾り",
    ring: "指輪"
};


// =====================================================
// 装備編集モーダルを作成
// =====================================================

function createEquipmentEditorModal() {

    // 二重作成防止
    if (
        document.getElementById(
            "equipmentEditorModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "equipmentEditorModal";

    modal.className =
        "equipment-editor-modal";

    modal.hidden =
        true;


    modal.innerHTML = `

        <div class="equipment-editor-backdrop"></div>

        <div class="equipment-editor-panel">

            <div class="equipment-editor-header">

                <div>

                    <div class="equipment-editor-label">
                        EQUIPMENT EDITOR
                    </div>

                    <h2 id="equipmentEditorTitle">
                        装備を編集
                    </h2>

                </div>


                <button
                    type="button"
                    class="equipment-editor-close"
                    id="equipmentEditorClose"
                >
                    ×
                </button>

            </div>


            <p class="equipment-editor-help">
                各装備枠をクリックして装備を選択してください。
            </p>


            <div
                class="equipment-editor-characters"
                id="equipmentEditorCharacters"
            ></div>


            <div
                class="equipment-select-area"
                id="equipmentSelectArea"
                hidden
            >

                <div class="equipment-select-header">

                    <div>

                        <div
                            class="equipment-select-character"
                            id="equipmentSelectCharacter"
                        ></div>

                        <h3
                            id="equipmentSelectTitle"
                        >
                            装備を選択
                        </h3>

                    </div>


                    <button
                        type="button"
                        class="equipment-select-close"
                        id="equipmentSelectClose"
                    >
                        閉じる
                    </button>

                </div>


                <div
                    class="equipment-option-grid"
                    id="equipmentOptionGrid"
                ></div>

            </div>


            <div
                class="equipment-editor-message"
                id="equipmentEditorMessage"
            ></div>


            <div class="equipment-editor-actions">

                <button
                    type="button"
                    class="equipment-editor-cancel"
                    id="equipmentEditorCancel"
                >
                    キャンセル
                </button>


                <button
                    type="button"
                    class="equipment-editor-save"
                    id="equipmentEditorSave"
                >
                    装備を保存
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // ×ボタン
    document
        .getElementById(
            "equipmentEditorClose"
        )
        .addEventListener(
            "click",
            closeEquipmentEditor
        );


    // キャンセル
    document
        .getElementById(
            "equipmentEditorCancel"
        )
        .addEventListener(
            "click",
            closeEquipmentEditor
        );


    // 装備候補を閉じる
    document
        .getElementById(
            "equipmentSelectClose"
        )
        .addEventListener(
            "click",
            closeEquipmentSelector
        );


    // 背景クリック
    modal
        .querySelector(
            ".equipment-editor-backdrop"
        )
        .addEventListener(
            "click",
            closeEquipmentEditor
        );


    // 保存
    document
        .getElementById(
            "equipmentEditorSave"
        )
        .addEventListener(
            "click",
            saveEquipment
        );

}


// =====================================================
// 装備編集ボタンにクリック処理を追加
// =====================================================

function setupEquipmentEditButtons() {

    const buttons =
        document.querySelectorAll(
            ".equipment-edit-button"
        );


    buttons.forEach(
        button => {

            // 二重登録防止
            if (
                button.dataset.listenerAdded ===
                "true"
            ) {
                return;
            }


            button.dataset.listenerAdded =
                "true";


            button.addEventListener(
                "click",
                () => {

                    const playerNumber =
                        Number(
                            button.dataset.player
                        );


                    openEquipmentEditor(
                        playerNumber
                    );

                }
            );

        }
    );

}


// =====================================================
// 装備編集画面を開く
// =====================================================

function openEquipmentEditor(
    playerNumber
) {

    const user =
        auth.currentUser;


    // 管理者以外は開けない
    if (
        !user ||
        user.uid !== ADMIN_UID
    ) {
        return;
    }


    const characters =
        currentPartyData[
        `player${playerNumber}`
        ];


    if (
        !Array.isArray(characters) ||
        characters.length === 0
    ) {

        alert(
            "このPLAYERには編成データがありません。"
        );

        return;
    }


    editingEquipmentPlayer =
        playerNumber;


    // =========================================
    // Firestoreの保存済み装備をコピー
    // =========================================

    const storedEquipment =
        currentPartyData[
        `player${playerNumber}Equipment`
        ] || {};


    equipmentDraft =
        JSON.parse(
            JSON.stringify(
                storedEquipment
            )
        );


    // =========================================
    // 現在の4キャラ分の保存領域を作成
    // =========================================

    characters
        .slice(0, 4)
        .forEach(
            character => {

                if (
                    !equipmentDraft[
                    character.id
                    ]
                ) {

                    equipmentDraft[
                        character.id
                    ] = {};

                }

            }
        );


    document.getElementById(
        "equipmentEditorTitle"
    ).textContent =
        `PLAYER ${playerNumber} の装備を編集`;


    document.getElementById(
        "equipmentEditorMessage"
    ).textContent =
        "";


    closeEquipmentSelector();


    renderEquipmentEditor();


    document.getElementById(
        "equipmentEditorModal"
    ).hidden =
        false;

}


// =====================================================
// 装備編集画面を閉じる
// =====================================================

function closeEquipmentEditor() {

    const modal =
        document.getElementById(
            "equipmentEditorModal"
        );


    if (modal) {
        modal.hidden =
            true;
    }


    editingEquipmentPlayer =
        null;

    equipmentDraft =
        {};

}


// =====================================================
// 4キャラ × 9装備枠を表示
// =====================================================

function renderEquipmentEditor() {

    if (
        editingEquipmentPlayer ===
        null
    ) {
        return;
    }


    const container =
        document.getElementById(
            "equipmentEditorCharacters"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    const characters =
        currentPartyData[
        `player${editingEquipmentPlayer}`
        ] || [];


    characters
        .slice(0, 4)
        .forEach(
            (
                character,
                characterIndex
            ) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "equipment-editor-character-row";


                // -------------------------------------
                // キャラ名
                // -------------------------------------

                const characterInfo =
                    document.createElement(
                        "div"
                    );


                characterInfo.className =
                    "equipment-editor-character-info";


                characterInfo.innerHTML = `

                    <span class="equipment-editor-character-number">
                        CHARACTER ${characterIndex + 1}
                    </span>

                    <strong>
                        ${character.name}
                    </strong>

                `;


                row.appendChild(
                    characterInfo
                );


                // -------------------------------------
                // 装備9枠
                // -------------------------------------

                const slots =
                    document.createElement(
                        "div"
                    );


                slots.className =
                    "equipment-editor-slots";


                Object.keys(
                    equipmentSlotLabels
                )
                    .forEach(
                        equipmentType => {

                            const slot =
                                createEquipmentEditorSlot(
                                    character,
                                    equipmentType
                                );


                            slots.appendChild(
                                slot
                            );

                        }
                    );


                row.appendChild(
                    slots
                );


                container.appendChild(
                    row
                );

            }
        );

}


// =====================================================
// 装備編集画面の1スロットを作る
// =====================================================

function createEquipmentEditorSlot(
    character,
    equipmentType
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "equipment-editor-slot";


    const savedItem =
        equipmentDraft[
        character.id
        ]?.[
        equipmentType
        ];


    if (
        savedItem &&
        savedItem.image
    ) {

        button.innerHTML = `

            <span class="equipment-editor-slot-label">
                ${equipmentSlotLabels[equipmentType]}
            </span>

            <img
                src="${savedItem.image}"
                alt="${savedItem.name}"
                loading="lazy"
            >

            <small>
                ${savedItem.name}
            </small>

        `;

    } else {

        button.innerHTML = `

            <span class="equipment-editor-slot-label">
                ${equipmentSlotLabels[equipmentType]}
            </span>

            <span class="equipment-editor-empty">
                ＋
            </span>

            <small>
                未選択
            </small>

        `;

    }


    button.addEventListener(
        "click",
        () => {

            openEquipmentSelector(
                character,
                equipmentType
            );

        }
    );


    return button;

}


// =====================================================
// 選択できる装備候補を取得
// =====================================================

function getEquipmentOptions(
    character,
    equipmentType
) {

    // =========================================
    // 刻印
    // =========================================

    if (
        equipmentType ===
        "engraving"
    ) {

        const rule =
            characterEquipmentRules[
            character.id
            ];


        if (
            !rule ||
            !Array.isArray(
                rule.engravings
            )
        ) {
            return [];
        }


        return rule.engravings
            .map(
                (
                    engraving,
                    index
                ) => {

                    // すでに画像付きオブジェクトの場合
                    if (
                        typeof engraving ===
                        "object"
                    ) {

                        return engraving;

                    }


                    // まだ文字列だけ登録されている刻印
                    return {

                        id:
                            `${character.id}_engraving_${index + 1}`,

                        name:
                            engraving,

                        image:
                            null

                    };

                }
            );

    }


    // =========================================
    // 武器
    // =========================================

    if (
        equipmentType ===
        "weapon"
    ) {

        const rule =
            characterEquipmentRules[
            character.id
            ];


        if (
            !rule ||
            !Array.isArray(
                rule.weaponTypes
            )
        ) {
            return [];
        }


        const weaponOptions =
            [];


        rule.weaponTypes
            .forEach(
                weaponType => {

                    const weapons =
                        equipmentMaster
                            .weapons[
                        weaponType
                        ] || [];


                    weapons.forEach(
                        weapon => {

                            weaponOptions.push({

                                ...weapon,

                                weaponType:
                                    weaponType

                            });

                        }
                    );

                }
            );


        return weaponOptions;

    }


    // =========================================
    // 防具・アクセサリー
    // =========================================

    return (
        equipmentMaster[
        equipmentType
        ] || []
    );

}


// =====================================================
// 装備候補画面を開く
// =====================================================

function openEquipmentSelector(
    character,
    equipmentType
) {

    const selectArea =
        document.getElementById(
            "equipmentSelectArea"
        );


    const title =
        document.getElementById(
            "equipmentSelectTitle"
        );


    const characterLabel =
        document.getElementById(
            "equipmentSelectCharacter"
        );


    const grid =
        document.getElementById(
            "equipmentOptionGrid"
        );


    if (
        !selectArea ||
        !title ||
        !characterLabel ||
        !grid
    ) {
        return;
    }


    characterLabel.textContent =
        character.name;


    title.textContent =
        `${equipmentSlotLabels[equipmentType]}を選択`;


    grid.innerHTML =
        "";


    const options =
        getEquipmentOptions(
            character,
            equipmentType
        );


    // =========================================
    // 「装備を外す」
    // =========================================

    const removeButton =
        document.createElement(
            "button"
        );


    removeButton.type =
        "button";


    removeButton.className =
        "equipment-option-card equipment-remove-card";


    removeButton.innerHTML = `

        <span class="equipment-remove-icon">
            ×
        </span>

        <strong>
            装備を外す
        </strong>

    `;


    removeButton.addEventListener(
        "click",
        () => {

            if (
                !equipmentDraft[
                character.id
                ]
            ) {

                equipmentDraft[
                    character.id
                ] = {};

            }


            delete equipmentDraft[
                character.id
            ][
                equipmentType
            ];


            renderEquipmentEditor();

            closeEquipmentSelector();

        }
    );


    grid.appendChild(
        removeButton
    );


    // =========================================
    // 候補がない場合
    // =========================================

    if (
        options.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "equipment-option-empty";


        if (
            equipmentType ===
            "weapon"
        ) {

            empty.textContent =
                "このキャラクターが使用できる武器は、まだ装備マスターに登録されていません。";

        } else {

            empty.textContent =
                "この装備の候補はまだ登録されていません。";

        }


        grid.appendChild(
            empty
        );

    }


    // =========================================
    // 装備候補
    // =========================================

    options.forEach(
        option => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "equipment-option-card";


            const currentlySelected =
                equipmentDraft[
                    character.id
                ]?.[
                    equipmentType
                ]?.id ===
                option.id;


            if (
                currentlySelected
            ) {

                card.classList.add(
                    "selected"
                );

            }


            const weaponTypeText =
                option.weaponType
                    ?
                    `<span class="equipment-option-type">
                        ${option.weaponType}
                    </span>`
                    :
                    "";


            const imageHtml =
                option.image
                    ?
                    `
                    <img
                        src="${option.image}"
                        alt="${option.name}"
                        loading="lazy"
                    >
                    `
                    :
                    `
                    <div class="equipment-option-no-image">
                        画像未登録
                    </div>
                    `;


            card.innerHTML = `

                ${imageHtml}

                <strong>
                    ${option.name}
                </strong>

                ${weaponTypeText}

            `;


            card.addEventListener(
                "click",
                () => {

                    if (
                        !equipmentDraft[
                        character.id
                        ]
                    ) {

                        equipmentDraft[
                            character.id
                        ] = {};

                    }


                    equipmentDraft[
                        character.id
                    ][
                        equipmentType
                    ] = {

                        id:
                            option.id,

                        name:
                            option.name,

                        image:
                            option.image || null

                    };


                    if (
                        option.weaponType
                    ) {

                        equipmentDraft[
                            character.id
                        ][
                            equipmentType
                        ].weaponType =
                            option.weaponType;

                    }


                    renderEquipmentEditor();

                    closeEquipmentSelector();

                }
            );


            grid.appendChild(
                card
            );

        }
    );


    selectArea.hidden =
        false;


    selectArea.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


// =====================================================
// 装備候補画面を閉じる
// =====================================================

function closeEquipmentSelector() {

    const area =
        document.getElementById(
            "equipmentSelectArea"
        );


    if (area) {
        area.hidden =
            true;
    }

}


// =====================================================
// 装備をFirestoreへ保存
// =====================================================

async function saveEquipment() {

    if (
        editingEquipmentPlayer ===
        null
    ) {
        return;
    }


    const user =
        auth.currentUser;


    if (
        !user ||
        user.uid !== ADMIN_UID
    ) {
        return;
    }


    const saveButton =
        document.getElementById(
            "equipmentEditorSave"
        );


    const message =
        document.getElementById(
            "equipmentEditorMessage"
        );


    saveButton.disabled =
        true;


    saveButton.textContent =
        "保存中...";


    message.textContent =
        "";


    try {

        await setDoc(
            partyDocument,
            {

                [`player${editingEquipmentPlayer}Equipment`]:
                    equipmentDraft

            },
            {
                merge: true
            }
        );


        message.textContent =
            "装備を保存しました。";


        setTimeout(
            () => {

                closeEquipmentEditor();

            },
            500
        );

    } catch (error) {

        console.error(
            "装備保存エラー:",
            error
        );


        message.textContent =
            "装備を保存できませんでした。";

    } finally {

        saveButton.disabled =
            false;


        saveButton.textContent =
            "装備を保存";

    }

}

// =====================================================
// 編成編集モーダルを作成
// =====================================================

function createPartyEditorModal() {

    if (
        document.getElementById(
            "partyEditorModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "partyEditorModal";

    modal.className =
        "party-editor-modal";

    modal.hidden =
        true;


    modal.innerHTML = `

        <div
            class="party-editor-overlay"
        ></div>

        <div
            class="party-editor-window"
        >

            <button
                type="button"
                class="party-editor-close"
                id="partyEditorClose"
            >
                ×
            </button>


            <div
                class="party-editor-kicker"
            >
                PARTY EDITOR
            </div>


            <h2
                id="partyEditorTitle"
            >
                編成を編集
            </h2>


            <p
    class="party-editor-description"
>
    編成情報とキャラクターを設定してください。
</p>


<!-- 編成名 -->
<div class="party-setting-group">

    <label for="partyNameInput">
        編成名
    </label>

    <input
        type="text"
        id="partyNameInput"
        class="party-setting-input"
        placeholder="例：デイジー入りマーリン編成"
    >

</div>


<!-- 担当 -->
<div class="party-setting-group">

    <label for="partyRoleSelect">
        担当
    </label>

    <select
        id="partyRoleSelect"
        class="party-setting-select"
    >

        <option value="アタッカー">
            アタッカー
        </option>

        <option value="サポーター">
            サポーター
        </option>

    </select>

</div>


<div
    class="selected-count"
>

                選択中：

                <strong
                    id="selectedCharacterCount"
                >
                    0
                </strong>

                / 4

            </div>


            <div
                class="character-select-grid"
                id="characterSelectGrid"
            >
            </div>


            <div
                id="partyEditorMessage"
                class="party-editor-message"
            >
            </div>


            <div
                class="party-editor-actions"
            >

                <button
                    type="button"
                    class="party-editor-cancel"
                    id="partyEditorCancel"
                >
                    キャンセル
                </button>


                <button
                    type="button"
                    class="party-editor-save"
                    id="partyEditorSave"
                >
                    この編成を保存
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document.getElementById(
        "partyEditorClose"
    ).addEventListener(
        "click",
        closePartyEditor
    );


    document.getElementById(
        "partyEditorCancel"
    ).addEventListener(
        "click",
        closePartyEditor
    );


    modal
        .querySelector(
            ".party-editor-overlay"
        )
        .addEventListener(
            "click",
            closePartyEditor
        );


    document.getElementById(
        "partyEditorSave"
    ).addEventListener(
        "click",
        savePartyComposition
    );

}


// =====================================================
// 編成編集画面を開く
// =====================================================

function openPartyEditor(
    playerNumber
) {

    editingPlayer =
        playerNumber;


    selectedCharacters = [];


    const storedParty =
        currentPartyData[
        `player${playerNumber}`
        ];


    // Firestoreに保存済みの編成がある場合
    if (
        Array.isArray(storedParty)
    ) {

        selectedCharacters =
            storedParty
                .map(character => {

                    const master =
                        characterMaster.find(
                            item =>
                                item.id ===
                                character.id
                        );


                    if (!master) {

                        return null;

                    }


                    return {

                        ...master,

                        transcend:
                            character.transcend ||
                            master.transcend ||
                            "推奨超越なし"

                    };

                })
                .filter(Boolean);

    } else {

        // まだFirestoreにない場合は
        // 現在HTMLに表示されているキャラを取得
        const playerCard =
            document.getElementById(
                `player${playerNumber}`
            );


        const slots =
            playerCard.querySelectorAll(
                ".character-slot"
            );


        slots.forEach(slot => {

            const name =
                slot
                    .querySelector(
                        "strong"
                    )
                    ?.textContent
                    .trim();


            const character =
                characterMaster.find(
                    item =>
                        item.name === name ||
                        (
                            name &&
                            item.name.includes(
                                name
                            )
                        )
                );


            if (character) {

                selectedCharacters.push(
                    character
                );

            }

        });

    }


    // 最大4人
    selectedCharacters =
        selectedCharacters.slice(
            0,
            4
        );


    document.getElementById(
        "partyEditorTitle"
    ).textContent =
        `PLAYER ${playerNumber} の編成を編集`;


    document.getElementById(
        "partyEditorMessage"
    ).textContent =
        "";


    renderCharacterSelector();


    document.getElementById(
        "partyEditorModal"
    ).hidden =
        false;

}


// =====================================================
// 編成編集画面を閉じる
// =====================================================

function closePartyEditor() {

    const modal =
        document.getElementById(
            "partyEditorModal"
        );


    if (modal) {

        modal.hidden =
            true;

    }


    editingPlayer =
        null;


    selectedCharacters = [];

}


// =====================================================
// キャラ選択一覧を表示
// ※ 初回だけ全カードを生成
// =====================================================

function renderCharacterSelector() {

    const grid =
        document.getElementById(
            "characterSelectGrid"
        );

    const count =
        document.getElementById(
            "selectedCharacterCount"
        );

    if (!grid || !count) {
        return;
    }


    // 選択人数を更新
    count.textContent =
        selectedCharacters.length;


    // 一覧を初期化
    grid.innerHTML = "";


    characterMaster.forEach(
        character => {

            const isSelected =
                selectedCharacters.some(
                    selected =>
                        selected.id ===
                        character.id
                );


            const card =
                document.createElement(
                    "button"
                );

            card.type = "button";

            card.className =
                "character-select-card";

            card.dataset.characterId =
                character.id;


            if (isSelected) {

                card.classList.add(
                    "selected"
                );

            }


            card.innerHTML = `

                <div
                    class="character-select-image"
                >

                    <img
                        src="${character.image}"
                        alt="${character.name}"
                        loading="lazy"
                    >

                    <div
                        class="character-check"
                    >
                        ✓
                    </div>

                </div>

                <strong>
                    ${character.name}
                </strong>

                <small>
                    ${character.transcend}
                </small>

            `;


            card.addEventListener(
                "click",
                () => {

                    toggleCharacterFast(
                        character,
                        card
                    );

                }
            );


            if (isSelected) {

                const selectedCharacter =
                    selectedCharacters.find(
                        selected =>
                            selected.id ===
                            character.id
                    );

                if (selectedCharacter) {

                    createTranscendEditor(
                        selectedCharacter,
                        card
                    );

                }

            }

            grid.appendChild(
                card
            );

        }
    );

}

// =====================================================
// 推奨超越の選択欄を作成
// =====================================================

function createTranscendEditor(
    character,
    card
) {

    // すでにある場合は作らない
    if (
        card.querySelector(
            ".transcend-editor"
        )
    ) {
        return;
    }


    const editor =
        document.createElement(
            "div"
        );

    editor.className =
        "transcend-editor";


    // 現在の値を取得
    let currentValue =
        character.transcend
            ?.replace(
                "推奨超越",
                ""
            ) || "なし";


    if (
        ![
            "なし",
            "1",
            "2",
            "3"
        ].includes(currentValue)
    ) {
        currentValue = "なし";
    }


    editor.innerHTML = `

        <span class="transcend-label">
            推奨超越
        </span>

        <select
            class="transcend-select"
        >

            <option value="なし">
                なし
            </option>

            <option value="1">
                1
            </option>

            <option value="2">
                2
            </option>

            <option value="3">
                3
            </option>

        </select>

    `;


    const select =
        editor.querySelector(
            ".transcend-select"
        );


    select.value =
        currentValue;


    // selectを押したとき
    // キャラ選択が解除されないようにする
    select.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    // 推奨超越を変更
    select.addEventListener(
        "change",
        event => {

            event.stopPropagation();

            character.transcend =
                `推奨超越${event.target.value}`;

        }
    );


    // キャラカードをクリック扱いにしない
    editor.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    card.appendChild(
        editor
    );

}

// =====================================================
// キャラクター選択
// 高速版：クリックしたカードだけ更新
// =====================================================

function toggleCharacterFast(
    character,
    card
) {

    const count =
        document.getElementById(
            "selectedCharacterCount"
        );

    const message =
        document.getElementById(
            "partyEditorMessage"
        );


    const index =
        selectedCharacters.findIndex(
            selected =>
                selected.id ===
                character.id
        );


    // =========================================
    // 選択済み → 解除
    // =========================================

    if (index !== -1) {

        selectedCharacters.splice(
            index,
            1
        );


        card.classList.remove(
            "selected"
        );

        const transcendEditor =
            card.querySelector(
                ".transcend-editor"
            );


        if (transcendEditor) {

            transcendEditor.remove();

        }


        if (count) {

            count.textContent =
                selectedCharacters.length;

        }


        if (message) {

            message.textContent = "";

        }


        return;

    }


    // =========================================
    // 最大4人
    // =========================================

    if (
        selectedCharacters.length >= 4
    ) {

        if (message) {

            message.textContent =
                "選択できるキャラクターは4人までです。";

        }

        return;

    }


    // =========================================
    // キャラを追加
    // =========================================

    // キャラごとに独立したデータとして追加
    const selectedCharacter = {

        ...character,

        transcend:
            character.transcend ||
            "推奨超越なし"

    };


    selectedCharacters.push(
        selectedCharacter
    );


    // このカードだけ選択状態にする
    card.classList.add(
        "selected"
    );


    // 推奨超越の選択欄を追加
    createTranscendEditor(
        selectedCharacter,
        card
    );


    // 人数だけ変更
    if (count) {

        count.textContent =
            selectedCharacters.length;

    }


    if (message) {

        message.textContent = "";

    }

}


// =====================================================
// Firestoreに編成を保存
// =====================================================

async function savePartyComposition() {

    const message =
        document.getElementById(
            "partyEditorMessage"
        );


    if (
        selectedCharacters.length !== 4
    ) {

        message.textContent =
            "キャラクターを4人選択してください。";

        return;

    }


    if (!editingPlayer) {
        return;
    }


    const saveButton =
        document.getElementById(
            "partyEditorSave"
        );


    saveButton.disabled =
        true;


    saveButton.textContent =
        "保存中...";


    message.textContent =
        "";


    try {

        const playerKey =
            `player${editingPlayer}`;

        const partyName =
            document.getElementById(
                "partyNameInput"
            ).value.trim();


        const partyRole =
            document.getElementById(
                "partyRoleSelect"
            ).value;


        if (!partyName) {

            message.textContent =
                "編成名を入力してください。";

            saveButton.disabled =
                false;

            saveButton.textContent =
                "この編成を保存";

            return;
        }


        const saveData =
            selectedCharacters
                .map(character => ({

                    id:
                        character.id,

                    name:
                        character.name,

                    image:
                        character.image,

                    transcend:
                        character.transcend

                }));


        await setDoc(
            partyDocument,
            {
                [playerKey]:
                    saveData,

                [`player${editingPlayer}Name`]:
                    partyName,

                [`player${editingPlayer}Role`]:
                    partyRole

            },
            {
                merge: true
            }
        );


        message.textContent =
            "編成を保存しました。";


        setTimeout(
            () => {

                closePartyEditor();

            },
            500
        );


    } catch (error) {

        console.error(
            "編成保存エラー:",
            error
        );


        message.textContent =
            "保存できませんでした。管理者ログインを確認してください。";

    } finally {

        saveButton.disabled =
            false;


        saveButton.textContent =
            "この編成を保存";

    }

}


// =====================================================
// PLAYERカードの編成表示を更新
// =====================================================

function updatePlayerCard(
    playerNumber,
    characters
) {

    if (
        !Array.isArray(characters)
    ) {
        return;
    }


    const playerCard =
        document.getElementById(
            `player${playerNumber}`
        );


    if (!playerCard) {
        return;
    }


    const slots =
        playerCard.querySelectorAll(
            ".character-slot"
        );


    characters
        .slice(
            0,
            4
        )
        .forEach(
            (
                character,
                index
            ) => {

                const slot =
                    slots[index];


                if (!slot) {
                    return;
                }


                const image =
                    slot.querySelector(
                        ".character-image img"
                    );


                const name =
                    slot.querySelector(
                        "strong"
                    );


                const transcend =
                    slot.querySelector(
                        "small"
                    );


                if (image) {

                    image.src =
                        character.image;


                    image.alt =
                        character.name;

                }


                if (name) {

                    name.textContent =
                        character.name;

                }


                if (transcend) {

                    transcend.textContent =
                        character.transcend;

                }

            }
        );

    // =========================================
    // EQUIPMENT欄のキャラ情報も更新
    // =========================================

    const equipmentArea =
        document.getElementById(
            `player${playerNumber}Equipment`
        );


    if (equipmentArea) {

        const equipmentRows =
            equipmentArea.querySelectorAll(
                ".equipment-character-row"
            );


        characters
            .slice(0, 4)
            .forEach(
                (
                    character,
                    index
                ) => {

                    const row =
                        equipmentRows[index];


                    if (!row) {
                        return;
                    }




                    const characterName =
                        row.querySelector(
                            ".equipment-character-name"
                        );



                    if (characterName) {

                        characterName.textContent =
                            character.name;

                    }

                }
            );

    }

    // =========================================
    // 保存済み装備をEQUIPMENT欄に表示
    // =========================================

    const playerEquipment =
        currentPartyData[
        `player${playerNumber}Equipment`
        ] || {};


    if (equipmentArea) {

        const equipmentRows =
            equipmentArea.querySelectorAll(
                ".equipment-character-row"
            );


        characters
            .slice(0, 4)
            .forEach(
                (
                    character,
                    index
                ) => {

                    const row =
                        equipmentRows[
                        index
                        ];


                    if (!row) {
                        return;
                    }


                    const characterEquipment =
                        playerEquipment[
                        character.id
                        ] || {};


                    const equipmentSlots =
                        row.querySelectorAll(
                            ".equipment-slot"
                        );


                    equipmentSlots.forEach(
                        slot => {

                            const type =
                                slot.dataset
                                    .equipmentType;


                            const item =
                                characterEquipment[
                                type
                                ];


                            if (
                                item &&
                                item.image
                            ) {

                                slot.innerHTML = `

                                    <img
                                        src="${item.image}"
                                        alt="${item.name}"
                                        title="${item.name}"
                                        loading="lazy"
                                    >

                                `;

                            } else {

                                slot.textContent =
                                    equipmentSlotLabels[
                                    type
                                    ] || "";

                            }

                        }
                    );

                }
            );

    }

}


// =====================================================
// Firestoreの編成をリアルタイム監視
// =====================================================

onSnapshot(
    partyDocument,
    snapshot => {

        if (!snapshot.exists()) {

            return;

        }


        currentPartyData =
            snapshot.data();


        for (
            let playerNumber = 1;
            playerNumber <= 5;
            playerNumber++
        ) {

            const characters =
                currentPartyData[
                `player${playerNumber}`
                ];


            if (
                Array.isArray(
                    characters
                )
            ) {

                updatePlayerCard(
                    playerNumber,
                    characters
                );

                const playerCard =
                    document.getElementById(
                        `player${playerNumber}`
                    );


                if (playerCard) {

                    const partyName =
                        currentPartyData[
                        `player${playerNumber}Name`
                        ];


                    const partyRole =
                        currentPartyData[
                        `player${playerNumber}Role`
                        ];


                    const titleElement =
                        playerCard.querySelector(
                            ".player-header h3"
                        );


                    const roleElement =
                        playerCard.querySelector(
                            ".player-role"
                        );


                    if (
                        titleElement &&
                        partyName
                    ) {

                        titleElement.textContent =
                            partyName;

                    }


                    if (
                        roleElement &&
                        partyRole
                    ) {

                        roleElement.textContent =
                            `担当：${partyRole}`;

                    }

                }

            }

        }

    },
    error => {

        console.error(
            "編成読み込みエラー:",
            error
        );

    }
);


// =====================================================
// 管理者ログイン状態に応じて
// 編集ボタンを表示
// =====================================================

onAuthStateChanged(
    auth,
    user => {

        // =========================================
        // 管理者かどうか
        // =========================================

        const isAdmin =
            user &&
            user.uid ===
            ADMIN_UID;


        // =========================================
        // 編成編集ボタン
        // =========================================

        const editButtons =
            document.querySelectorAll(
                ".party-edit-button"
            );


        editButtons.forEach(
            button => {

                button.hidden =
                    !isAdmin;

            }
        );


        // =========================================
        // 装備編集ボタン
        // =========================================

        const equipmentEditButtons =
            document.querySelectorAll(
                ".equipment-edit-button"
            );


        equipmentEditButtons.forEach(
            button => {

                button.hidden =
                    !isAdmin;

            }
        );

    }
);


// =====================================================
// 初期化
// =====================================================

createEditButtons();

createEquipmentEditButtons();

createEquipmentEditorModal();

setupEquipmentEditButtons();

createPartyEditorModal();

// =====================================================
// 全編成共通 BATTLE STRATEGY
// =====================================================

const sharedStrategyButton =
    document.getElementById("editSharedStrategyButton");

const sharedStrategyText =
    document.getElementById("sharedStrategyText");


// =====================================================
// BATTLE STRATEGY 編集モーダルを作成
// =====================================================

function createSharedStrategyModal() {

    if (
        document.getElementById(
            "sharedStrategyModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");


    modal.id =
        "sharedStrategyModal";

    modal.className =
        "party-editor-modal";

    modal.hidden =
        true;


    modal.innerHTML = `

        <div
            class="party-editor-overlay"
        ></div>

        <div
            class="party-editor-window strategy-editor-window"
        >

            <button
                type="button"
                class="party-editor-close"
                id="sharedStrategyClose"
            >
                ×
            </button>


            <div class="party-editor-kicker">
                BATTLE STRATEGY EDITOR
            </div>


            <h2>
                全編成共通の立ち回り
            </h2>


            <p class="party-editor-description">
                5人全員で共有する立ち回りを入力してください。
            </p>


            <textarea
                id="sharedStrategyInput"
                class="strategy-editor-textarea"
                placeholder="例：

【開幕】
PLAYER 1が○○を使用する。

【序盤】
PLAYER 2とPLAYER 3は○○を担当する。

【終盤】
全員で必殺技を合わせる。"
            ></textarea>


            <div
                id="sharedStrategyMessage"
                class="party-editor-message"
            ></div>


            <div class="party-editor-actions">

                <button
                    type="button"
                    class="party-editor-cancel"
                    id="sharedStrategyCancel"
                >
                    キャンセル
                </button>


                <button
                    type="button"
                    class="party-editor-save"
                    id="sharedStrategySave"
                >
                    立ち回りを保存
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById("sharedStrategyClose")
        .addEventListener(
            "click",
            closeSharedStrategyEditor
        );


    document
        .getElementById("sharedStrategyCancel")
        .addEventListener(
            "click",
            closeSharedStrategyEditor
        );


    modal
        .querySelector(".party-editor-overlay")
        .addEventListener(
            "click",
            closeSharedStrategyEditor
        );


    document
        .getElementById("sharedStrategySave")
        .addEventListener(
            "click",
            saveSharedStrategy
        );
}


// =====================================================
// 編集画面を開く
// =====================================================

function openSharedStrategyEditor() {

    const input =
        document.getElementById(
            "sharedStrategyInput"
        );


    const message =
        document.getElementById(
            "sharedStrategyMessage"
        );


    input.value =
        currentPartyData.sharedStrategy || "";


    message.textContent =
        "";


    document.getElementById(
        "sharedStrategyModal"
    ).hidden = false;
}


// =====================================================
// 編集画面を閉じる
// =====================================================

function closeSharedStrategyEditor() {

    const modal =
        document.getElementById(
            "sharedStrategyModal"
        );


    if (modal) {

        modal.hidden =
            true;

    }
}


// =====================================================
// Firestoreへ保存
// =====================================================

async function saveSharedStrategy() {

    const input =
        document.getElementById(
            "sharedStrategyInput"
        );


    const message =
        document.getElementById(
            "sharedStrategyMessage"
        );


    const saveButton =
        document.getElementById(
            "sharedStrategySave"
        );


    const user =
        auth.currentUser;


    // 管理者チェック
    if (
        !user ||
        user.uid !== ADMIN_UID
    ) {

        message.textContent =
            "管理者としてログインしてください。";

        return;
    }


    const text =
        input.value.trim();


    saveButton.disabled =
        true;

    saveButton.textContent =
        "保存中...";

    message.textContent =
        "";


    try {

        await setDoc(
            partyDocument,
            {
                sharedStrategy: text
            },
            {
                merge: true
            }
        );


        message.textContent =
            "立ち回りを保存しました。";


        setTimeout(
            () => {

                closeSharedStrategyEditor();

            },
            500
        );


    } catch (error) {

        console.error(
            "立ち回り保存エラー:",
            error
        );


        message.textContent =
            "保存できませんでした。";

    } finally {

        saveButton.disabled =
            false;

        saveButton.textContent =
            "立ち回りを保存";

    }
}


// =====================================================
// 編集ボタン
// =====================================================

if (sharedStrategyButton) {

    sharedStrategyButton.addEventListener(
        "click",
        openSharedStrategyEditor
    );

}


// =====================================================
// 編集モーダル作成
// =====================================================

createSharedStrategyModal();


// =====================================================
// 管理者だけ編集ボタンを表示
// =====================================================

onAuthStateChanged(
    auth,
    user => {

        if (!sharedStrategyButton) {
            return;
        }


        const isAdmin =
            user &&
            user.uid === ADMIN_UID;


        sharedStrategyButton.hidden =
            !isAdmin;

    }
);


// =====================================================
// FirestoreからBATTLE STRATEGYを読み込む
// =====================================================

onSnapshot(
    partyDocument,
    snapshot => {

        if (!snapshot.exists()) {
            return;
        }


        const data =
            snapshot.data();


        if (
            typeof data.sharedStrategy ===
            "string"
        ) {

            if (sharedStrategyText) {

                sharedStrategyText.textContent =
                    data.sharedStrategy ||
                    "共通の立ち回りはまだ登録されていません。";

            }

        }

    },
    error => {

        console.error(
            "立ち回り読み込みエラー:",
            error
        );

    }
);

// =====================================================
// PLAYER 1～5 個別立ち回り編集
// =====================================================

let editingTacticPlayer = null;


// =====================================================
// 各PLAYERに「立ち回りを編集」ボタンを作成
// =====================================================

function createTacticEditButtons() {

    for (
        let playerNumber = 1;
        playerNumber <= 5;
        playerNumber++
    ) {

        const playerCard =
            document.getElementById(
                `player${playerNumber}`
            );


        if (!playerCard) {
            continue;
        }


        const tacticBox =
            playerCard.querySelector(
                ".player-tactic"
            );


        if (!tacticBox) {
            continue;
        }


        // 文章部分に識別用IDを付ける
        const tacticText =
            tacticBox.querySelector("p");


        if (tacticText) {

            tacticText.id =
                `player${playerNumber}TacticText`;

        }


        // ボタンがすでにある場合は追加しない
        if (
            tacticBox.querySelector(
                ".tactic-edit-button"
            )
        ) {
            continue;
        }


        const button =
            document.createElement("button");


        button.type =
            "button";

        button.className =
            "tactic-edit-button";

        button.textContent =
            "✎ 立ち回りを編集";

        button.dataset.player =
            playerNumber;

        button.hidden =
            true;


        button.addEventListener(
            "click",
            () => {

                openPlayerTacticEditor(
                    playerNumber
                );

            }
        );


        tacticBox.appendChild(
            button
        );

    }

}


// =====================================================
// 個別立ち回り編集モーダルを作成
// =====================================================

function createPlayerTacticModal() {

    if (
        document.getElementById(
            "playerTacticModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");


    modal.id =
        "playerTacticModal";

    modal.className =
        "party-editor-modal";

    modal.hidden =
        true;


    modal.innerHTML = `

        <div
            class="party-editor-overlay"
        ></div>


        <div
            class="party-editor-window strategy-editor-window"
        >

            <button
                type="button"
                class="party-editor-close"
                id="playerTacticClose"
            >
                ×
            </button>


            <div class="party-editor-kicker">
                PLAYER STRATEGY EDITOR
            </div>


            <h2 id="playerTacticEditorTitle">
                PLAYERの立ち回り
            </h2>


            <p class="party-editor-description">
                この編成を担当するプレイヤーの
                立ち回りを入力してください。
            </p>


            <textarea
                id="playerTacticInput"
                class="strategy-editor-textarea"
                placeholder="例：

【開幕】
○○のスキルを使用する。

【中盤】
ボスの攻撃を確認して○○する。

【終盤】
必殺技を使用する。"
            ></textarea>


            <div
                id="playerTacticMessage"
                class="party-editor-message"
            ></div>


            <div class="party-editor-actions">

                <button
                    type="button"
                    class="party-editor-cancel"
                    id="playerTacticCancel"
                >
                    キャンセル
                </button>


                <button
                    type="button"
                    class="party-editor-save"
                    id="playerTacticSave"
                >
                    立ち回りを保存
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document
        .getElementById(
            "playerTacticClose"
        )
        .addEventListener(
            "click",
            closePlayerTacticEditor
        );


    document
        .getElementById(
            "playerTacticCancel"
        )
        .addEventListener(
            "click",
            closePlayerTacticEditor
        );


    modal
        .querySelector(
            ".party-editor-overlay"
        )
        .addEventListener(
            "click",
            closePlayerTacticEditor
        );


    document
        .getElementById(
            "playerTacticSave"
        )
        .addEventListener(
            "click",
            savePlayerTactic
        );

}


// =====================================================
// 個別立ち回り編集画面を開く
// =====================================================

function openPlayerTacticEditor(
    playerNumber
) {

    editingTacticPlayer =
        playerNumber;


    const input =
        document.getElementById(
            "playerTacticInput"
        );


    const message =
        document.getElementById(
            "playerTacticMessage"
        );


    const title =
        document.getElementById(
            "playerTacticEditorTitle"
        );


    title.textContent =
        `PLAYER ${playerNumber} の立ち回り`;


    const savedText =
        currentPartyData[
        `player${playerNumber}Tactic`
        ];


    // Firestoreに保存済みならそれを表示
    if (
        typeof savedText === "string"
    ) {

        input.value =
            savedText;

    } else {

        // 未保存なら現在HTMLにある文章を入れる
        const currentText =
            document.getElementById(
                `player${playerNumber}TacticText`
            );


        input.value =
            currentText
                ? currentText.textContent.trim()
                : "";

    }


    message.textContent =
        "";


    document.getElementById(
        "playerTacticModal"
    ).hidden = false;

}


// =====================================================
// 個別立ち回り編集画面を閉じる
// =====================================================

function closePlayerTacticEditor() {

    const modal =
        document.getElementById(
            "playerTacticModal"
        );


    if (modal) {

        modal.hidden =
            true;

    }


    editingTacticPlayer =
        null;

}


// =====================================================
// PLAYER個別立ち回りをFirestoreへ保存
// =====================================================

async function savePlayerTactic() {

    if (!editingTacticPlayer) {
        return;
    }


    const user =
        auth.currentUser;


    const message =
        document.getElementById(
            "playerTacticMessage"
        );


    if (
        !user ||
        user.uid !== ADMIN_UID
    ) {

        message.textContent =
            "管理者としてログインしてください。";

        return;

    }


    const input =
        document.getElementById(
            "playerTacticInput"
        );


    const saveButton =
        document.getElementById(
            "playerTacticSave"
        );


    const text =
        input.value.trim();


    const tacticKey =
        `player${editingTacticPlayer}Tactic`;


    saveButton.disabled =
        true;

    saveButton.textContent =
        "保存中...";

    message.textContent =
        "";


    try {

        await setDoc(
            partyDocument,
            {
                [tacticKey]: text
            },
            {
                merge: true
            }
        );


        message.textContent =
            "立ち回りを保存しました。";


        setTimeout(
            () => {

                closePlayerTacticEditor();

            },
            500
        );


    } catch (error) {

        console.error(
            "PLAYER立ち回り保存エラー:",
            error
        );


        message.textContent =
            "保存できませんでした。";

    } finally {

        saveButton.disabled =
            false;

        saveButton.textContent =
            "立ち回りを保存";

    }

}


// =====================================================
// Firestoreの個別立ち回りを画面へ反映
// =====================================================

function updatePlayerTactics(
    data
) {

    for (
        let playerNumber = 1;
        playerNumber <= 5;
        playerNumber++
    ) {

        const tacticKey =
            `player${playerNumber}Tactic`;


        const savedText =
            data[tacticKey];


        const textElement =
            document.getElementById(
                `player${playerNumber}TacticText`
            );


        if (
            textElement &&
            typeof savedText === "string"
        ) {

            textElement.textContent =
                savedText ||
                "立ち回りはまだ登録されていません。";

        }

    }

}


// =====================================================
// Firestoreをリアルタイム監視
// =====================================================

onSnapshot(
    partyDocument,
    snapshot => {

        if (!snapshot.exists()) {
            return;
        }


        const data =
            snapshot.data();


        updatePlayerTactics(
            data
        );

    },
    error => {

        console.error(
            "PLAYER立ち回り読み込みエラー:",
            error
        );

    }
);


// =====================================================
// 管理者だけ編集ボタンを表示
// =====================================================

onAuthStateChanged(
    auth,
    user => {

        const buttons =
            document.querySelectorAll(
                ".tactic-edit-button"
            );


        const isAdmin =
            user &&
            user.uid === ADMIN_UID;


        buttons.forEach(
            button => {

                button.hidden =
                    !isAdmin;

            }
        );

    }
);


// =====================================================
// 初期化
// =====================================================

createTacticEditButtons();

createPlayerTacticModal();