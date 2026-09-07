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
import { getFirestore } from
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