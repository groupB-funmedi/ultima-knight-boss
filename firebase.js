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