"use client";

import { useState, useEffect } from "react";
import { fetchLearningRecords } from "../lib/api";
import type { LearningRecord } from "../types/learning";
import LearningRecordItem from "./LearningRecordItem";
import LearningStats from "./LearningStats";
import AddRecordForm from "./AddRecordForm";
import RecordFilter from "./RecordFilter";

export default function LearningRecordList() {
  // 1. 状態管理
  const [records, setRecords] = useState<LearningRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // フィルターの状態管理
  const [filteredRecords, setFilteredRecords] = useState<LearningRecord[]>([]);


  // 2. データ取得
  const loadRecords = async () => {
    // 1. setLoading(true) でローディング開始
    try {
      const data = await fetchLearningRecords(); // 2. fetchLearningRecords() でデータ取得
      setRecords(data); // 3. setRecords(data) で状態更新
    } catch (error) {
      console.error("データ取得エラー:", error);
    } finally {
      setLoading(false); // 4. ローディング終了。成功でも失敗でも実行。
    }
  };

  // 3. 初回読み込み
  useEffect(() => {
    loadRecords();
  }, []); // 空配列 = マウント時のみ実行

  // ローディング中の表示
  if (loading) {
    return <div>読み込み中...</div>;
  }
  // データがない場合の表示
  if (records.length === 0) {
    return <div>学習記録がありません</div>;
  }

  // 4. 子コンポーネントを繰り返し表示
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">学習記録一覧</h2>
      <AddRecordForm onAdd={loadRecords} />
      <RecordFilter records={records} onFilter={setFilteredRecords} />
      <LearningStats records={records} />
      {filteredRecords.map((record) => (
        <LearningRecordItem
          key={record.id}
          record={record}
          onUpdate={loadRecords} // 更新後に再取得
          onDelete={loadRecords} // 削除後に再取得
        />
      ))}
    </div>
  );
}
