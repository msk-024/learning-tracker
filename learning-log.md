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