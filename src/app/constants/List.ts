export const Table = [
    {"name":"cmd","columnname":"cmd"},
    // {"name":"id","columnname":"id"},
    {"name":"name","columnname":"name"},
    // {"name":"xml","columnname":"xml"},
    {"name":"query","columnname":"query"},
    {"name":"created_at","columnname":"created_at"},
    {"name":"updated_at","columnname":"updated_at"},
    // {"name":"user_id","columnname":"user_id"},
    {"name":"user_name","columnname":"user_name"},
    ]

    export const description = 
        `
        - QueryPlanを共有するためのもの
            - PlanをXml形式のPlanテキストで登録
            - チャート化したイメージを共有可能に
                - Ｘｍｌだけだと理解が難しい、チャート化したものをＳＳＭＳで画像共有も可能
                - 画像共有だと、本当に欲しい情報がポップアップである場合など把握できない
        - 利用上の注意も必要
        - 公開範囲は作業者にＨｔｍｌを提示するので、そこでコントロール。
            - 公開に伴うＨｔｍｌは削除もできるようにする。
        - ログイン者は自分が登録したＸｍｌを確認できる。
        - 非ログイン時にも自分が登録したＸｍｌを確認できる。
            - 非ログイン者の情報として履歴に残る
        - 保存期間はログイン者２か月、非ログイン者１４日、ただし、プランの画面で更新可能
        - 掲示板など配置も検討したほうがいいのでは？
            - 実際には別再度で質疑をこたえていくほうが、横のつながりも持ちやすいという認識
        - 評価者・ゲスト（非ログイン者）の機能差異はなしでいいので、PT2ベースでの機能整理が必要
        `.trim()