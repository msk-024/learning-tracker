"use client";

import { useEffect, useState } from "react";
import { LearningRecord } from "../types/learning";

type Props = {
  records: LearningRecord[]; // ← 複数のレコードを受け取るため「[]」をつけて配列にする
  onFilter: (filtered: LearningRecord[]) => void;
};

export default function RecordFilter({ records, onFilter }: Props) {
  // ↑ {records}で「Propsの中のrecordsだけ取り出す」という意味になる。
  //    → const Props = { records: [...], 他のもの: "..." }; ＝ const { records } = Props;
  const [filters, setFilters] = useState({
    keyword: "", // 何でも入る（文字列）
    completed: "all", // "all" か "completed" か "incomplete" の3つだけ入る
    understanding: "all", // "all" か "5" か "4" か "3" か "2" か "1" の6つだけ入る
    sortBy: "date-desc", // "date-desc" か "date-asc" か "day-asc" か "day-desc" など
  });
  const [inputKeyword, setInputKeyword] = useState(""); // 入力中の値
  // filters.keyword → 実際に検索で使う値（検索ボタン押した時に更新）

  const filteredRecords = records
    .filter((record) => {
      // キーワード検索
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchGoal = record.goal.toLowerCase().includes(keyword);
        const matchNotes = record.notes?.toLowerCase().includes(keyword);
        if (!matchGoal && !matchNotes) return false;
      }
      // 完了状態フィルター
      if (filters.completed !== "all") {
        if (filters.completed === "completed" && !record.completed)
          return false;
        if (filters.completed === "incomplete" && record.completed)
          return false;
      }
      // 理解度フィルター
      if (filters.understanding !== "all") {
        if (record.understanding_level !== Number(filters.understanding))
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "date-desc") return b.date.localeCompare(a.date);
      if (filters.sortBy === "date-asc") return a.date.localeCompare(b.date);
      if (filters.sortBy === "day-desc") return b.day_number - a.day_number;
      if (filters.sortBy === "day-asc") return a.day_number - b.day_number;
      return 0;
    });

  // 検索ボタン押した時
  const handleSearch = () => {
    setFilters({ ...filters, keyword: inputKeyword });
    // サーバーとのやり取りはないためtry catchは不要。値を変化させるだけ。
  };
  // クリアボタン押した時
  const handleClear = () => {
    setFilters({
      keyword: "",
      completed: "all",
      understanding: "all",
      sortBy: "date-desc",
    });
    setInputKeyword(""); // 入力欄もクリア
  };

  useEffect(() => {
    onFilter(filteredRecords);
  }, [filteredRecords, onFilter]);

  return (
    <div>
      <div className="border">
        <div className="py-2 ml-2 border-b">
          <p className="font-semibold">🔍 検索・フィルター</p>
        </div>
        <div className="py-2 ml-2">
          {/* キーワード検索 */}
          <div className="mb-2 flex gap-2">
            <label>キーワード検索：</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputKeyword}
                onChange={(e) => setInputKeyword(e.target.value)}
                className="border rounded px-2"
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                検索
              </button>{" "}
            </div>
          </div>
          {/* 完了状態 */}
          <div className="mb-2 flex gap-2">
            <label>完了状態：</label>
            <select
              value={filters.completed}
              onChange={(e) =>
                setFilters({ ...filters, completed: e.target.value })
              }
              className="border rounded px-2"
            >
              <option value="all">全て</option>
              <option value="completed">完了のみ</option>
              <option value="incomplete">未完了のみ</option>
            </select>
          </div>
          {/* 理解度 */}
          <div className="mb-2 flex gap-2">
            <label>理解度：</label>
            <select
              value={filters.understanding}
              onChange={(e) =>
                setFilters({ ...filters, understanding: e.target.value })
              }
              className="border rounded px-2"
            >
              <option value="all">全て</option>
              <option value="5">⭐5</option>
              <option value="4">⭐4</option>
              <option value="3">⭐3</option>
              <option value="2">⭐2</option>
              <option value="1">⭐1</option>
            </select>
          </div>
          {/* 並び替え */}
          <div className="mb-2 flex gap-2">
            <label>並び替え：</label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="border rounded px-2"
            >
              <option value="date-desc">日付（新い順）</option>
              <option value="date-asc">日付（古い順）</option>
              <option value="day-desc">Day番号（降順）</option>
              <option value="day-asc">Day番号（昇順）</option>
            </select>
          </div>
        </div>
        {/* 検索・キャンセルボタン */}
        <div className="m-2 mt-0">
          <button
            onClick={handleClear}
            className="px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            すべてクリア
          </button>
        </div>
      </div>
      {/* 表示件数 */}
      <div className="my-4">
        <p>
          表示：{filteredRecords.length}件 / {records.length}件
        </p>
      </div>
    </div>
  );
}
