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
// 装備データ作成用
// =====================================================

function createEquipmentItem(
    id,
    filename
) {

    return {
        id: id,

        // 拡張子を除いたファイル名を表示名にする
        name: filename.replace(
            /\.(png|webp|jpg|jpeg)$/i,
            ""
        ),

        image:
            `images/${filename}`
    };

}


// =====================================================
// 装備マスター
// =====================================================

const equipmentMaster = {

    // =================================================
    // 武器
    // =================================================

    weapons: {

        // ---------------------------------------------
        // ガントレット
        // ---------------------------------------------

        "ガントレット": [

            createEquipmentItem(
                "flame_gauntlet",
                "炎火ガントレット.png"
            ),

            createEquipmentItem(
                "black_gauntlet",
                "黒炎ガントレット.webp"
            ),

            createEquipmentItem(
                "soul_gauntlet",
                "魂ガントレット.webp"
            )

        ],


        // ---------------------------------------------
        // スタッフ
        // ---------------------------------------------

        "スタッフ": [

            createEquipmentItem(
                "flame_staff",
                "炎火スタッフ.png"
            ),

            createEquipmentItem(
                "black_staff",
                "黒炎スタッフ.webp"
            )

        ],


        // ---------------------------------------------
        // 魔導書
        // ---------------------------------------------

        "魔導書": [

            createEquipmentItem(
                "flame_grimoire",
                "炎火魔導書.png"
            ),

            createEquipmentItem(
                "black_grimoire",
                "黒炎魔導書.webp"
            ),

            createEquipmentItem(
                "soul_grimoire",
                "魂魔導書.webp"
            ),

            createEquipmentItem(
                "craft_grimoire",
                "製作魔導書.webp"
            ),

            createEquipmentItem(
                "rupture_grimoire",
                "破裂魔導書.webp"
            )

        ],


        // ---------------------------------------------
        // ランス
        // ---------------------------------------------

        "ランス": [

            createEquipmentItem(
                "flame_lance",
                "炎火ランス.png"
            ),

            createEquipmentItem(
                "black_lance",
                "黒炎ランス.webp"
            )

        ],


        // ---------------------------------------------
        // レイピア
        // ---------------------------------------------

        "レイピア": [

            createEquipmentItem(
                "flame_rapier",
                "炎火レイピア.png"
            ),

            createEquipmentItem(
                "black_rapier",
                "黒炎レイピア.webp"
            ),

            createEquipmentItem(
                "soul_rapier",
                "魂レイピア.png"
            ),

            createEquipmentItem(
                "craft_rapier",
                "製作レイピア.webp"
            )

        ],


        // ---------------------------------------------
        // ワンド
        // ---------------------------------------------

        "ワンド": [

            createEquipmentItem(
                "flame_wand",
                "炎火ワンド.png"
            ),

            createEquipmentItem(
                "black_wand",
                "黒炎ワンド.webp"
            ),

            createEquipmentItem(
                "soul_wand",
                "魂ワンド.webp"
            )

        ],


        // ---------------------------------------------
        // 三節棍
        // ---------------------------------------------

        "三節棍": [

            createEquipmentItem(
                "flame_three_section_staff",
                "炎火三節棍.png"
            ),

            createEquipmentItem(
                "black_three_section_staff",
                "黒炎三節棍.webp"
            ),

            createEquipmentItem(
                "soul_three_section_staff",
                "魂三節棍.webp"
            )

        ],


        // ---------------------------------------------
        // 剣盾
        // ---------------------------------------------

        "剣盾": [

            createEquipmentItem(
                "flame_sword_shield",
                "炎火剣盾.png"
            ),

            createEquipmentItem(
                "black_sword_shield",
                "黒炎剣盾.webp"
            ),

            createEquipmentItem(
                "soul_sword_shield",
                "魂剣盾.png"
            )

        ],


        // ---------------------------------------------
        // 双剣
        // ---------------------------------------------

        "双剣": [

            createEquipmentItem(
                "flame_dual_swords",
                "炎火双剣.png"
            ),

            createEquipmentItem(
                "black_dual_swords",
                "黒炎双剣.webp"
            ),

            createEquipmentItem(
                "craft_dual_swords",
                "製作双剣.webp"
            )

        ],


        // ---------------------------------------------
        // 大剣
        // ---------------------------------------------

        "大剣": [

            createEquipmentItem(
                "flame_great_sword",
                "炎火大剣.png"
            ),

            createEquipmentItem(
                "black_great_sword",
                "黒炎大剣.webp"
            ),

            createEquipmentItem(
                "snake_dragon_great_sword",
                "蛇龍大剣.webp"
            )

        ],


        // ---------------------------------------------
        // 長剣
        // ---------------------------------------------

        "長剣": [

            createEquipmentItem(
                "flame_long_sword",
                "炎火長剣.png"
            ),

            createEquipmentItem(
                "black_long_sword",
                "黒炎長剣.webp"
            ),

            createEquipmentItem(
                "soul_long_sword",
                "魂長剣.webp"
            )

        ],


        // ---------------------------------------------
        // 斧
        // ---------------------------------------------

        "斧": [

            createEquipmentItem(
                "flame_axe",
                "炎火斧.png"
            ),

            createEquipmentItem(
                "black_axe",
                "黒炎斧.webp"
            ),

            createEquipmentItem(
                "soul_axe",
                "魂斧.webp"
            ),

            createEquipmentItem(
                "snake_dragon_axe",
                "蛇龍斧.webp"
            )

        ]

    },


    // =================================================
    // トップス
    // =================================================

    top: [

        createEquipmentItem(
            "arachne_top",
            "アラクネートップス.webp"
        ),

        createEquipmentItem(
            "galand_top",
            "ガラントップス.webp"
        ),

        createEquipmentItem(
            "taranis_top",
            "タラニストップス.webp"
        ),

        createEquipmentItem(
            "shaggy_top",
            "シャキーラトップス.webp"
        ),

        createEquipmentItem(
            "watcher_top",
            "監視者トップス.webp"
        ),

        createEquipmentItem(
            "knight_top",
            "騎士団トップス.webp"
        ),

        createEquipmentItem(
            "jet_black_top",
            "漆黒トップス.webp"
        ),

        createEquipmentItem(
            "wild_top",
            "野生トップス.webp"
        )

    ],


    // =================================================
    // ベルト
    // =================================================

    belt: [

        createEquipmentItem(
            "arachne_belt",
            "アラクネーベルト.webp"
        ),

        createEquipmentItem(
            "taranis_belt",
            "タラニスベルト.webp"
        ),

        createEquipmentItem(
            "shaggy_belt",
            "シャキーラベルト.webp"
        ),

        createEquipmentItem(
            "watcher_belt",
            "監視者ベルト.webp"
        ),

        createEquipmentItem(
            "knight_belt",
            "騎士団ベルト.webp"
        ),

        createEquipmentItem(
            "jet_black_belt",
            "漆黒ベルト.webp"
        ),

        createEquipmentItem(
            "wild_belt",
            "野生ベルト.webp"
        )

    ],


    // =================================================
    // ボトムス
    // =================================================

    bottom: [

        createEquipmentItem(
            "arachne_bottom",
            "アラクネーボトムス.webp"
        ),

        createEquipmentItem(
            "taranis_bottom",
            "タラニスボトムス.webp"
        ),

        createEquipmentItem(
            "shaggy_bottom",
            "シャキーラボトムス.webp"
        ),

        createEquipmentItem(
            "golem_bottom",
            "ゴーレムボトムス.webp"
        ),

        createEquipmentItem(
            "watcher_bottom",
            "監視者ボトムス.webp"
        ),

        createEquipmentItem(
            "knight_bottom",
            "騎士団ボトムス.webp"
        ),

        createEquipmentItem(
            "jet_black_bottom",
            "漆黒ボトムス.webp"
        ),

        createEquipmentItem(
            "wild_bottom",
            "野生ボトムス.webp"
        )

    ],


    // =================================================
    // ブーツ
    // =================================================

    boots: [

        createEquipmentItem(
            "taranis_boots",
            "タラニスブーツ.webp"
        ),

        createEquipmentItem(
            "shaggy_boots",
            "シャキーラブーツ.webp"
        ),

        createEquipmentItem(
            "monspeet_boots",
            "モンスピートブーツ.webp"
        ),

        createEquipmentItem(
            "watcher_boots",
            "監視者ブーツ.webp"
        ),

        createEquipmentItem(
            "knight_boots",
            "騎士団ブーツ.webp"
        ),

        createEquipmentItem(
            "jet_black_boots",
            "漆黒ブーツ.webp"
        ),

        createEquipmentItem(
            "spider_boots",
            "蜘蛛ブーツ.webp"
        ),

        createEquipmentItem(
            "wild_boots",
            "野生ブーツ.webp"
        )

    ],


    // =================================================
    // 耳飾り
    // =================================================

    earring: [

        createEquipmentItem(
            "arachne_earring",
            "アラクネー耳飾り.webp"
        ),

        createEquipmentItem(
            "taranis_earring",
            "タラニス耳飾り.webp"
        ),

        createEquipmentItem(
            "shaggy_earring",
            "シャキーラ耳飾り.webp"
        ),

        createEquipmentItem(
            "knight_earring",
            "騎士団耳飾り.webp"
        ),

        createEquipmentItem(
            "chaos_earring",
            "混沌耳飾り.webp"
        ),

        createEquipmentItem(
            "regeneration_earring",
            "再生耳飾り.webp"
        ),

        createEquipmentItem(
            "curse_earring",
            "呪い耳飾り.webp"
        ),

        createEquipmentItem(
            "fallen_earring",
            "堕落耳飾り.webp"
        )

    ],


    // =================================================
    // 首飾り
    // =================================================

    necklace: [

        createEquipmentItem(
            "arachne_necklace",
            "アラクネー首飾り.webp"
        ),

        createEquipmentItem(
            "taranis_necklace",
            "タラニス首飾り.webp"
        ),

        createEquipmentItem(
            "durack_necklace",
            "デュラック首飾り.webp"
        ),

        createEquipmentItem(
            "shaggy_necklace",
            "シャキーラ首飾り.webp"
        ),

        createEquipmentItem(
            "knight_necklace",
            "騎士団首飾り.webp"
        ),

        createEquipmentItem(
            "regeneration_necklace",
            "再生首飾り.webp"
        ),

        createEquipmentItem(
            "curse_necklace",
            "呪い首飾り.webp"
        ),

        createEquipmentItem(
            "fallen_necklace",
            "堕落首飾り.webp"
        )

    ],


    // =================================================
    // 指輪
    // =================================================

    ring: [

        createEquipmentItem(
            "arachne_ring",
            "アラクネー指輪.webp"
        ),

        createEquipmentItem(
            "taranis_ring",
            "タラニス指輪.webp"
        ),

        createEquipmentItem(
            "shaggy_ring",
            "シャキーラ指輪.webp"
        ),

        createEquipmentItem(
            "knight_ring",
            "騎士団指輪.webp"
        ),

        createEquipmentItem(
            "regeneration_ring",
            "再生指輪.webp"
        ),

        createEquipmentItem(
            "curse_ring",
            "呪い指輪.webp"
        ),

        createEquipmentItem(
            "fallen_ring",
            "堕落指輪.webp"
        ),

        createEquipmentItem(
            "oath_ring",
            "盟約指輪.webp"
        )

    ]

};

// =====================================================
// 刻印データ作成用
// =====================================================

function createEngravingItem(
    characterName,
    id,
    filename
) {

    // ファイル名から拡張子を削除
    let displayName =
        filename.replace(
            /\.(png|webp|jpg|jpeg)$/i,
            ""
        );


    // 「キャラ名 + 刻印」を削除
    const prefix =
        `${characterName}刻印`;


    if (
        displayName.startsWith(
            prefix
        )
    ) {

        displayName =
            displayName.slice(
                prefix.length
            );

    }


    return {

        id: id,

        name: displayName,

        image:
            `images/${filename}`

    };

}

// =====================================================
// キャラクター別 装備ルール
// =====================================================

const characterEquipmentRules = {

    // =================================================
    // エスカノール
    // =================================================

    escanor: {

        engravings: [

            createEngravingItem(
                "エスカノール",
                "escanor_engraving_1",
                "エスカノール刻印黄金の威厳.webp"
            ),

            createEngravingItem(
                "エスカノール",
                "escanor_engraving_2",
                "エスカノール刻印北部の野生.webp"
            ),

            createEngravingItem(
                "エスカノール",
                "escanor_engraving_3",
                "エスカノール刻印満ち足りた傲慢さ.webp"
            )

        ],

        weaponTypes: [
            "斧",
            "大剣",
            "剣盾"
        ]

    },


    // =================================================
    // エリザベス
    // =================================================

    elizabeth: {

        engravings: [

            createEngravingItem(
                "エリザベス",
                "elizabeth_engraving_1",
                "エリザベス刻印リオネスの英雄.webp"
            ),

            createEngravingItem(
                "エリザベス",
                "elizabeth_engraving_2",
                "エリザベス刻印リオネスの光.webp"
            ),

            createEngravingItem(
                "エリザベス",
                "elizabeth_engraving_3",
                "エリザベス刻印酒場の花.webp"
            )

        ],

        weaponTypes: [
            "魔導書",
            "スタッフ",
            "ワンド"
        ]

    },


    // =================================================
    // エレイン
    // =================================================

    elaine: {

        engravings: [

            createEngravingItem(
                "エレイン",
                "elaine_engraving_1",
                "エレイン刻印軽やかなお出かけ.webp"
            ),

            createEngravingItem(
                "エレイン",
                "elaine_engraving_2",
                "エレイン刻印聖女の威厳.webp"
            ),

            createEngravingItem(
                "エレイン",
                "elaine_engraving_3",
                "エレイン刻印旅人を導く光.webp"
            )

        ],

        weaponTypes: [
            "ワンド",
            "スタッフ",
            "魔導書"
        ]

    },


    // =================================================
    // ギーラ
    // =================================================

    guila: {

        engravings: [

            createEngravingItem(
                "ギーラ",
                "guila_engraving_1",
                "ギーラ刻印軽やかな足取り.webp"
            ),

            createEngravingItem(
                "ギーラ",
                "guila_engraving_2",
                "ギーラ刻印紅炎の痕跡.webp"
            ),

            createEngravingItem(
                "ギーラ",
                "guila_engraving_3",
                "ギーラ刻印誘爆の聖騎士.webp"
            )

        ],

        weaponTypes: [
            "ランス",
            "剣盾",
            "レイピア"
        ]

    },


    // =================================================
    // ギルサンダー
    // =================================================

    gilthunder: {

        engravings: [

            createEngravingItem(
                "ギルサンダー",
                "gilthunder_engraving_1",
                "ギルサンダー刻印将来有望な聖騎士.webp"
            ),

            createEngravingItem(
                "ギルサンダー",
                "gilthunder_engraving_2",
                "ギルサンダー刻印雷撃の聖騎士.webp"
            ),

            createEngravingItem(
                "ギルサンダー",
                "gilthunder_engraving_3",
                "ギルサンダー刻印模範的な冒険.webp"
            )

        ],

        weaponTypes: [
            "長剣",
            "剣盾",
            "ランス"
        ]

    },


    // =================================================
    // キング
    // =================================================

    king: {

        engravings: [

            createEngravingItem(
                "キング",
                "king_engraving_1",
                "キング刻印〈怠惰の罪〉.webp"
            ),

            createEngravingItem(
                "キング",
                "king_engraving_2",
                "キング刻印深き森の影.webp"
            ),

            createEngravingItem(
                "キング",
                "king_engraving_3",
                "キング刻印妖精王の影.webp"
            )

        ],

        weaponTypes: [
            "スタッフ",
            "魔導書",
            "ワンド"
        ]

    },


    // =================================================
    // グリアモール
    // =================================================

    griamore: {

        engravings: [

            createEngravingItem(
                "グリアモール",
                "griamore_engraving_1",
                "グリアモール刻印簡易防壁.webp"
            ),

            createEngravingItem(
                "グリアモール",
                "griamore_engraving_2",
                "グリアモール刻印鉄壁の聖騎士.webp"
            ),

            createEngravingItem(
                "グリアモール",
                "griamore_engraving_3",
                "グリアモール刻印難攻不落の鉄壁.webp"
            )

        ],

        weaponTypes: [
            "剣盾",
            "三節棍",
            "ガントレット"
        ]

    },


    // =================================================
    // クロト
    // =================================================

    clotho: {

        engravings: [

            createEngravingItem(
                "クロト",
                "clotho_engraving_1",
                "クロト刻印軽やかなパーティー服.webp"
            ),

            createEngravingItem(
                "クロト",
                "clotho_engraving_2",
                "クロト刻印大学者の格式.webp"
            ),

            createEngravingItem(
                "クロト",
                "clotho_engraving_3",
                "クロト刻印探検家のユニフォーム.webp"
            )

        ],

        weaponTypes: [
            "レイピア",
            "魔導書",
            "スタッフ"
        ]

    },


    // =================================================
    // ゴウセル
    // =================================================

    gowther: {

        engravings: [

            createEngravingItem(
                "ゴウセル",
                "gowther_engraving_1",
                "ゴウセル刻印〈色欲の罪〉.webp"
            ),

            createEngravingItem(
                "ゴウセル",
                "gowther_engraving_2",
                "ゴウセル刻印最小限の備え.webp"
            ),

            createEngravingItem(
                "ゴウセル",
                "gowther_engraving_3",
                "ゴウセル刻印秘蔵のデートルック.webp"
            )

        ],

        weaponTypes: [
            "ワンド",
            "魔導書",
            "スタッフ"
        ]

    },


    // =================================================
    // ジェリコ
    // =================================================

    jericho: {

        engravings: [

            createEngravingItem(
                "ジェリコ",
                "jericho_engraving_1",
                "ジェリコ刻印思い出の痕跡.webp"
            ),

            createEngravingItem(
                "ジェリコ",
                "jericho_engraving_2",
                "ジェリコ刻印星型面頬の聖騎士.webp"
            ),

            createEngravingItem(
                "ジェリコ",
                "jericho_engraving_3",
                "ジェリコ刻印秘密を抱えし旅人.webp"
            )

        ],

        weaponTypes: [
            "双剣",
            "ランス",
            "レイピア"
        ]

    },


    // =================================================
    // スレイダー
    // =================================================

    slader: {

        engravings: [

            createEngravingItem(
                "スレイダー",
                "slader_engraving_1",
                "スレイダー刻印極秘任務.webp"
            ),

            createEngravingItem(
                "スレイダー",
                "slader_engraving_2",
                "スレイダー刻印万全の態勢.webp"
            ),

            createEngravingItem(
                "スレイダー",
                "slader_engraving_3",
                "スレイダー刻印老王の剣.webp"
            )

        ],

        weaponTypes: [
            "大剣",
            "斧",
            "三節棍"
        ]

    },


    // =================================================
    // ディアンヌ
    // =================================================

    diane: {

        engravings: [

            createEngravingItem(
                "ディアンヌ",
                "diane_engraving_1",
                "ディアンヌ刻印〈嫉妬の罪〉.webp"
            ),

            createEngravingItem(
                "ディアンヌ",
                "diane_engraving_2",
                "ディアンヌ刻印スパイナス戦闘服.webp"
            ),

            createEngravingItem(
                "ディアンヌ",
                "diane_engraving_3",
                "ディアンヌ刻印元気な少女.webp"
            )

        ],

        weaponTypes: [
            "斧",
            "ガントレット",
            "三節棍"
        ]

    },


    // =================================================
    // ティオレー
    // =================================================

    tioreh: {

        engravings: [

            createEngravingItem(
                "ティオレー",
                "tioreh_engraving_1",
                "ティオレー刻印森と大地の娘.webp"
            ),

            createEngravingItem(
                "ティオレー",
                "tioreh_engraving_2",
                "ティオレー刻印冒険の始まり.webp"
            ),

            createEngravingItem(
                "ティオレー",
                "tioreh_engraving_3",
                "ティオレー刻印妖精の加護.webp"
            )

        ],

        weaponTypes: [
            "魔導書",
            "ワンド",
            "スタッフ"
        ]

    },


    // =================================================
    // デイジー
    // =================================================

    daisy: {

        engravings: [

            createEngravingItem(
                "デイジー",
                "daisy_engraving_1",
                "デイジー刻印春色の礼服.webp"
            ),

            createEngravingItem(
                "デイジー",
                "daisy_engraving_2",
                "デイジー刻印小さな探検家.webp"
            ),

            createEngravingItem(
                "デイジー",
                "daisy_engraving_3",
                "デイジー刻印探求の意思.webp"
            )

        ],

        weaponTypes: [
            "剣盾",
            "魔導書",
            "ワンド"
        ]

    },


    // =================================================
    // デリエリ
    // =================================================

    derieri: {

        engravings: [

            createEngravingItem(
                "デリエリ",
                "derieri_engraving_1",
                "デリエリ刻印最低限の礼節.webp"
            ),

            createEngravingItem(
                "デリエリ",
                "derieri_engraving_2",
                "デリエリ刻印反抗と革命.webp"
            ),

            createEngravingItem(
                "デリエリ",
                "derieri_engraving_3",
                "デリエリ刻印反骨の所作.webp"
            )

        ],

        weaponTypes: [
            "ガントレット",
            "大剣",
            "斧"
        ]

    },


    // =================================================
    // トリスタン
    // =================================================

    tristan: {

        engravings: [

            createEngravingItem(
                "トリスタン",
                "tristan_engraving_1",
                "トリスタン刻印王子の誓い.webp"
            ),

            createEngravingItem(
                "トリスタン",
                "tristan_engraving_2",
                "トリスタン刻印王子の品格.webp"
            ),

            createEngravingItem(
                "トリスタン",
                "tristan_engraving_3",
                "トリスタン刻印王子の冒険.webp"
            )

        ],

        weaponTypes: [
            "双剣",
            "大剣",
            "長剣"
        ]

    },


    // =================================================
    // ドレイク
    // =================================================

    drake: {

        engravings: [

            createEngravingItem(
                "ドレイク",
                "drake_engraving_1",
                "ドレイク刻印インペリアル・ナイト.webp"
            ),

            createEngravingItem(
                "ドレイク",
                "drake_engraving_2",
                "ドレイク刻印影の帝王.webp"
            ),

            createEngravingItem(
                "ドレイク",
                "drake_engraving_3",
                "ドレイク刻印過去の栄光.webp"
            )

        ],

        weaponTypes: [
            "大剣",
            "スタッフ",
            "長剣"
        ]

    },


    // =================================================
    // ドレドリン
    // =================================================

    deldry: {

        engravings: [

            createEngravingItem(
                "ドレドリン",
                "deldry_engraving_1",
                "ドレドリン刻印王家の末裔.webp"
            ),

            createEngravingItem(
                "ドレドリン",
                "deldry_engraving_2",
                "ドレドリン刻印堅固な防御.webp"
            ),

            createEngravingItem(
                "ドレドリン",
                "deldry_engraving_3",
                "ドレドリン刻印入念な準備.webp"
            )

        ],

        weaponTypes: [
            "剣盾",
            "斧",
            "レイピア"
        ]

    },


    // =================================================
    // ドレファス
    // =================================================

    dreyfus: {

        engravings: [

            createEngravingItem(
                "ドレファス",
                "dreyfus_engraving_1",
                "ドレファス刻印栄誉ある騎士.webp"
            ),

            createEngravingItem(
                "ドレファス",
                "dreyfus_engraving_2",
                "ドレファス刻印飾らない装い.webp"
            ),

            createEngravingItem(
                "ドレファス",
                "dreyfus_engraving_3",
                "ドレファス刻印老将の名誉.webp"
            )

        ],

        weaponTypes: [
            "レイピア",
            "長剣",
            "ランス"
        ]

    },


    // =================================================
    // ハウザー
    // =================================================

    hauser: {

        engravings: [

            createEngravingItem(
                "ハウザー",
                "hauser_engraving_1",
                "ハウザー刻印堅固な冒険.webp"
            ),

            createEngravingItem(
                "ハウザー",
                "hauser_engraving_2",
                "ハウザー刻印聖騎士長の威厳.webp"
            ),

            createEngravingItem(
                "ハウザー",
                "hauser_engraving_3",
                "ハウザー刻印暴風の聖騎士.webp"
            )

        ],

        weaponTypes: [
            "ランス",
            "ガントレット",
            "三節棍"
        ]

    },


    // =================================================
    // バグ
    // =================================================

    bug: {

        engravings: [

            createEngravingItem(
                "バグ",
                "bug_engraving_1",
                "バグ刻印影の足取り.webp"
            ),

            createEngravingItem(
                "バグ",
                "bug_engraving_2",
                "バグ刻印鋭い勘.webp"
            ),

            createEngravingItem(
                "バグ",
                "bug_engraving_3",
                "バグ刻印魔神の潜行.webp"
            )

        ],

        weaponTypes: [
            "斧",
            "双剣",
            "魔導書"
        ]

    },


    // =================================================
    // バン
    // =================================================

    ban: {

        engravings: [

            createEngravingItem(
                "バン",
                "ban_engraving_1",
                "バン刻印〈強欲の罪〉.webp"
            ),

            createEngravingItem(
                "バン",
                "ban_engraving_2",
                "バン刻印軽快な略奪者.webp"
            ),

            createEngravingItem(
                "バン",
                "ban_engraving_3",
                "バン刻印臨時料理人.webp"
            )

        ],

        weaponTypes: [
            "三節棍",
            "大剣",
            "ガントレット"
        ]

    },


    // =================================================
    // ヘンドリクセン
    // =================================================

    hendrickson: {

        engravings: [

            createEngravingItem(
                "ヘンドリクセン",
                "hendrickson_engraving_1",
                "ヘンドリクセン刻印帰ってきた聖騎士.webp"
            ),

            createEngravingItem(
                "ヘンドリクセン",
                "hendrickson_engraving_2",
                "ヘンドリクセン刻印施薬院の作業服.webp"
            ),

            createEngravingItem(
                "ヘンドリクセン",
                "hendrickson_engraving_3",
                "ヘンドリクセン刻印若き日の正装.webp"
            )

        ],

        weaponTypes: [
            "長剣",
            "双剣",
            "ランス"
        ]

    },


    // =================================================
    // マーリン
    // =================================================

    merlin: {

        engravings: [

            createEngravingItem(
                "マーリン",
                "merlin_engraving_1",
                "マーリン刻印〈暴食の罪〉.webp"
            ),

            createEngravingItem(
                "マーリン",
                "merlin_engraving_2",
                "マーリン刻印軽やかな礼服.webp"
            ),

            createEngravingItem(
                "マーリン",
                "merlin_engraving_3",
                "マーリン刻印知識の探究者.webp"
            )

        ],

        weaponTypes: [
            "魔導書",
            "ワンド",
            "スタッフ"
        ]

    },


    // =================================================
    // マニー
    // =================================================

    manny: {

        engravings: [

            createEngravingItem(
                "マニー",
                "manny_engraving_1",
                "マニー刻印最高位巫女の権威.webp"
            ),

            createEngravingItem(
                "マニー",
                "manny_engraving_2",
                "マニー刻印神聖な祭礼.webp"
            ),

            createEngravingItem(
                "マニー",
                "manny_engraving_3",
                "マニー刻印未知への探究.webp"
            )

        ],

        weaponTypes: [
            "スタッフ",
            "双剣",
            "長剣"
        ]

    },


    // =================================================
    // メリオダス
    // =================================================

    meliodas: {

        engravings: [

            createEngravingItem(
                "メリオダス",
                "meliodas_engraving_1",
                "メリオダス刻印簡易的な防御.webp"
            ),

            createEngravingItem(
                "メリオダス",
                "meliodas_engraving_2",
                "メリオダス刻印最強最凶の威容.webp"
            ),

            createEngravingItem(
                "メリオダス",
                "meliodas_engraving_3",
                "メリオダス刻印新たな冒険.webp"
            )

        ],

        weaponTypes: [
            "長剣",
            "斧",
            "双剣"
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
    bottom: "ボトムス",
    belt: "ベルト",
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