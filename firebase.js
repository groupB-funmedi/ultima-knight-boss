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
        id: "hauser",
        name: "ガントレットハウザー",
        image: "images/ハウザー.png",
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
        name: "スタッフドレイク",
        image: "images/ドレイク.png",
        transcend: "推奨超越2"
    },

    {
        id: "clotho",
        name: "レイピアクロト",
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
                キャラクターを4人選択してください。
            </p>


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

                    return characterMaster
                        .find(
                            master =>
                                master.id ===
                                character.id
                        );

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


    grid.innerHTML = "";


    count.textContent =
        selectedCharacters.length;


    characterMaster.forEach(
        character => {

            const isSelected =
                selectedCharacters
                    .some(
                        selected =>
                            selected.id ===
                            character.id
                    );


            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "character-select-card";


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

                    toggleCharacter(
                        character
                    );

                }
            );


            grid.appendChild(
                card
            );

        }
    );

}


// =====================================================
// キャラクター選択
// =====================================================

function toggleCharacter(
    character
) {

    const index =
        selectedCharacters
            .findIndex(
                selected =>
                    selected.id ===
                    character.id
            );


    // 選択済みなら解除
    if (index !== -1) {

        selectedCharacters.splice(
            index,
            1
        );


        renderCharacterSelector();

        return;

    }


    // 4人まで
    if (
        selectedCharacters.length >= 4
    ) {

        const message =
            document.getElementById(
                "partyEditorMessage"
            );


        message.textContent =
            "選択できるキャラクターは4人までです。";


        return;

    }


    selectedCharacters.push(
        character
    );


    document.getElementById(
        "partyEditorMessage"
    ).textContent =
        "";


    renderCharacterSelector();

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
                    saveData
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

        const editButtons =
            document.querySelectorAll(
                ".party-edit-button"
            );


        const isAdmin =
            user &&
            user.uid ===
            ADMIN_UID;


        editButtons.forEach(
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