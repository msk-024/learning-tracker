# 学習進捗管理アプリ開発 - 学習記録

## プロジェクト概要

- **アプリ名:** 学習進捗管理システム
- **開発期間:** Day 22-30（2026-01-27 〜 2026-02-05予定）
- **技術スタック:** Next.js 15.1.0, React 19.0.0, TypeScript 5.4.5, Supabase
- **学習目標:** CRUD操作の完全習得、状態管理、UI/UX設計
- **Supabaseプロジェクト:** nursing-assessment-app（既存プロジェクトを共有使用）

---

## Day 22（2026-01-27）: テーブル設計 + 基本CRUD ✅

### 学習内容

- `learning_progress` テーブル設計・作成（uuid, CHECK制約, DEFAULT値）
- RLSポリシー設定（SELECT, INSERT, UPDATE, DELETE）
- 型定義作成（`LearningRecord`, `NewLearningRecord`, `UpdateLearningRecord`）
- CRUD関数実装（`fetchLearningRecords`, `addLearningRecord`, `updateLearningRecord`, `deleteLearningRecord`）
- UPDATE と DELETE を初実装
- Supabaseダッシュボードで動作確認

### 技術的な学び

- **uuid型:** int8（連番）との違い、複数デバイス対応、セキュリティ
- **UPDATE:** `.update(updates).eq('id', id).select()`
- **DELETE:** `.delete().eq('id', id)`
- **.eq() の重要性:** これがないと全レコードが対象になる
- **型定義:** `| null` と `?` の使い分け（null許可 vs optional）
- **CHECK制約:** データベースレベルのバリデーション（understanding_level: 1-5）

### 理解度: ⭐⭐⭐⭐ (4/5)

- UPDATE と DELETE の概念は理解
- TypeScript（Supabase Client）での実装はできた
- SQL を1から書くのはまだ難しい（Month 2 で深掘り予定）

### ハマったポイント

- `.update({ record: updates })` のバグ → `updates` をそのまま渡す
- テーブル名のタイポ（`lerning_progress` → `learning_progress`）
- `data` と `date` の打ち間違い
- `understanding_level` の型（`string` → `number`）

### 作成ファイル

- `app/types/learning.ts`（型定義）
- `app/lib/api.ts`（CRUD関数）

### 学習時間: 60分

### 次回予定

**Day 23:** 一覧・編集・削除機能の実装

- `LearningRecordList.tsx` コンポーネント作成
- 編集・削除機能
- useState での状態管理

---

## Day 23（2026-01-28）: 一覧・編集・削除機能

### 学習内容

- LearningRecordItem 作成（表示・編集・削除）
- LearningRecordList 作成（一覧表示・データ取得）
- 編集モード実装（理解度選択、メモ、完了チェック）
- 親子コンポーネントの連携

### 理解度: ⭐⭐⭐⭐ (4/5)

- useState, useEffect の使い方は理解
- スプレッド構文（...editingData）も理解
- null と undefined の違いを学んだ

### ハマったポイント

- editingData の型エラー（null vs undefined）
- useState 直後の setEditingData 呼び出し（無限ループ）
- チェックボックスのタイポ（cheked → checked）

### 学習時間: 60分

## Day 24（2026-01-29）: 統計・可視化

### 学習内容

- LearningStats コンポーネント作成
- reduce() で合計計算（総学習時間）
- filter() と length で件数集計
- 平均値・完了率の計算
- 理解度分布の集計・表示

### 理解度: ⭐⭐⭐⭐ (4/5)

- reduce() の使い方を理解
- filter() + length のパターンを習得
- ゼロ除算の防止方法を学んだ
- map() で繰り返し表示できた

### ハマったポイント

- reduce() で record. を忘れる
- 代入（=）と足し算（+）を間違える
- map() の key を忘れる

### 学習時間: 60分

## Day 25（2026-01-29）: 統合・動作確認

### 学習内容

- GitHub に push（Firebase Studio → GitHub）
- VSCode でクローン
- .env.local の設定
- npm install, npm run dev
- ブラウザで動作確認成功

### 理解度: ⭐⭐⭐⭐⭐ (5/5)

- Git の基本操作を理解
- ローカル開発環境のセットアップ
- 実際に動くアプリが完成した！

### 成果

- 学習進捗管理アプリ完成
- Day 22-25 の4日間で1つのアプリを作り上げた
- CRUD操作、統計計算、UI実装を習得

### 学習時間: 60分

## Day 26（2026-01-29）: 新規レコード追加機能

### 学習内容

- AddRecordForm コンポーネント作成
- フォームの状態管理（複数フィールド）
- バリデーション実装
- 文字列 → 数値の型変換
- フォーム送信後のクリア処理

### 理解度: ⭐⭐⭐⭐ (4/5)

- フォームの状態管理パターンを理解
- onChange と value の関係を理解
- 型変換（Number(), undefined の扱い）を習得
- onAdd の役割を理解

### ハマったポイント

- Props の設計（record を渡すべきか？）
- onAdd に addLearningRecord を直接渡してしまった
- 入力フィールドのコピペミス

### 学習時間: 60分

## Day 27（2026-02-01）: 検索・フィルター・ソート機能

### 学習内容
- RecordFilter コンポーネント作成
- キーワード検索（検索ボタン付き）
- 完了状態・理解度フィルター
- ソート機能（日付・Day番号）
- 親子コンポーネント間のデータ流通（onFilter）
- UI配置の改善（ボタン位置の見直し）

### 理解度: ⭐⭐⭐⭐ (4/5)
- filter()とsort()の組み合わせを理解
- inputKeywordとfilters.keywordの分離（即座検索vs検索ボタン）
- localeCompareと引き算の使い分け（文字列vs数値）
- booleanに文字列メソッドは使えないことを理解
- Props の型定義の書き方を理解した

### ハマったポイント
- try/catchが必要かどうかの判断（サーバー通信がない場合は不要）
- select の onChange に setInputKeyword を間違えて書いてしまった
- キーワード入力欄の value が filters.keyword のままだった
- ボタン配置がUXとして不自然だと気づいた

### 学習時間: 60分