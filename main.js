// =========================================
// ULTIMA 騎士団ボス攻略
// Main JavaScript
// =========================================


// =========================================
// ページ内リンクをなめらかに移動
// =========================================

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
// サイドメニュー切り替え
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

            currentSection =
                section.getAttribute("id");

        }

    });


    menuItems.forEach(item => {

        item.classList.remove("active");

        const href =
            item.getAttribute("href");

        if (href === "#" + currentSection) {

            item.classList.add("active");

        }

    });

});


// =========================================
// 検索ボックス
// =========================================

const searchInput =
    document.querySelector(
        ".search-box input"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const keyword =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".player-card, .video-card, .tip-card"
                );


            cards.forEach(card => {

                const text =
                    card.textContent
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


// =========================================
// キャラクター画像選択機能
// =========================================

const STORAGE_PREFIX =
    "ultima-character-image-";


// -----------------------------------------
// 選択した画像を表示
// -----------------------------------------

function showCharacterImage(
    uploadBox,
    imageData
) {

    const preview =
        uploadBox.querySelector(
            ".character-preview"
        );

    if (!preview) {
        return;
    }

    preview.src = imageData;

    uploadBox.classList.add(
        "has-image"
    );

}


// -----------------------------------------
// 画像を削除
// -----------------------------------------

function removeCharacterImage(
    uploadBox
) {

    const slot =
        uploadBox.dataset.slot;


    const preview =
        uploadBox.querySelector(
            ".character-preview"
        );


    if (preview) {

        preview.src = "";

    }


    uploadBox.classList.remove(
        "has-image"
    );


    if (slot) {

        localStorage.removeItem(
            STORAGE_PREFIX + slot
        );

    }

}


// =========================================
// 画像を小さくして保存
// =========================================

function resizeImage(
    file,
    maxSize = 500
) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = () => {

                const image =
                    new Image();


                image.onload = () => {

                    let width =
                        image.width;

                    let height =
                        image.height;


                    // 大きい画像だけ縮小
                    if (
                        width > maxSize ||
                        height > maxSize
                    ) {

                        const scale =
                            Math.min(
                                maxSize / width,
                                maxSize / height
                            );


                        width =
                            Math.round(
                                width * scale
                            );


                        height =
                            Math.round(
                                height * scale
                            );

                    }


                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    canvas.width =
                        width;

                    canvas.height =
                        height;


                    const ctx =
                        canvas.getContext(
                            "2d"
                        );


                    ctx.drawImage(
                        image,
                        0,
                        0,
                        width,
                        height
                    );


                    const dataUrl =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.85
                        );


                    resolve(dataUrl);

                };


                image.onerror = () => {

                    reject(
                        new Error(
                            "画像を読み込めませんでした"
                        )
                    );

                };


                image.src =
                    reader.result;

            };


            reader.onerror = () => {

                reject(
                    new Error(
                        "ファイルを読み込めませんでした"
                    )
                );

            };


            reader.readAsDataURL(
                file
            );

        }
    );

}


// =========================================
// すべての画像枠を設定
// =========================================

document.querySelectorAll(
    ".image-upload"
).forEach(uploadBox => {


    const fileInput =
        uploadBox.querySelector(
            ".character-file-input"
        );


    const deleteButton =
        uploadBox.querySelector(
            ".remove-image-button"
        );


    const slot =
        uploadBox.dataset.slot;


    // -------------------------------------
    // 保存されている画像を読み込む
    // -------------------------------------

    if (slot) {

        const savedImage =
            localStorage.getItem(
                STORAGE_PREFIX + slot
            );


        if (savedImage) {

            showCharacterImage(
                uploadBox,
                savedImage
            );

        }

    }


    // -------------------------------------
    // キャラクター枠をクリック
    // -------------------------------------

    uploadBox.addEventListener(
        "click",
        event => {


            // ×ボタンの場合は開かない
            if (
                event.target.closest(
                    ".remove-image-button"
                )
            ) {

                return;

            }


            if (fileInput) {

                fileInput.click();

            }

        }
    );


    // -------------------------------------
    // 画像を選択
    // -------------------------------------

    if (fileInput) {

        fileInput.addEventListener(
            "change",
            async event => {


                const file =
                    event.target.files[0];


                if (!file) {
                    return;
                }


                // 画像以外を拒否
                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "画像ファイルを選択してください。"
                    );

                    return;

                }


                try {

                    const imageData =
                        await resizeImage(
                            file
                        );


                    // 画像表示
                    showCharacterImage(
                        uploadBox,
                        imageData
                    );


                    // ブラウザに保存
                    if (slot) {

                        try {

                            localStorage.setItem(
                                STORAGE_PREFIX + slot,
                                imageData
                            );

                        } catch (error) {

                            console.warn(
                                "画像を保存できませんでした",
                                error
                            );

                        }

                    }

                } catch (error) {

                    console.error(
                        error
                    );


                    alert(
                        "画像の読み込みに失敗しました。"
                    );

                }


                // 同じ画像を再選択できるようにする
                fileInput.value = "";

            }
        );

    }


    // -------------------------------------
    // ×ボタンで画像削除
    // -------------------------------------

    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                removeCharacterImage(
                    uploadBox
                );

            }
        );

    }

});


// =========================================
// 読み込み完了
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "ULTIMA 騎士団ボス攻略サイト loaded."
        );

    }
);