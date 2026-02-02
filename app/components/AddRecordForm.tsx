import { useState } from "react";
import { addLearningRecord } from "../lib/api";
import type { NewLearningRecord } from "../types/learning";

type Props = {
  onAdd: () => void;
};

export default function AddRecordForm({ onAdd }: Props) {
  const [formData, setFormData] = useState({
    day_number: "",
    date: "",
    goal: "",
    understanding_level: undefined as number | undefined,
    time_spent: "",
    notes: "",
    completed: false,
  });

  const handleAdd = async () => {
    // バリデーション
    if (!formData.day_number || !formData.date || !formData.goal) {
      alert("Day番号、日付、学習目標は必須です");
      return;
    }

    // 文字列 → 数値に変換
    const newRecord: NewLearningRecord = {
      day_number: Number(formData.day_number),
      date: formData.date,
      goal: formData.goal,
      understanding_level: formData.understanding_level,
      time_spent: formData.time_spent ? Number(formData.time_spent) : undefined,
      notes: formData.notes || undefined,
      completed: formData.completed,
    };

    try {
      await addLearningRecord(newRecord);
      onAdd();
      // フォームクリア
      setFormData({
        day_number: "",
        date: "",
        goal: "",
        understanding_level: undefined,
        time_spent: "",
        notes: "",
        completed: false,
      });
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">新しい学習記録を追加</h2>

      {/* Day番号 */}
      <div className="mb-4">
        <label className="block font-bold mb-2">Day番号：</label>
        <input
          type="number"
          value={formData.day_number}
          onChange={(e) =>
            setFormData({ ...formData, day_number: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* 日付 */}
      <div className="mb-4">
        <label className="block font-bold mb-2">日付：</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* 学習目標 */}
      <div className="mb-4">
        <label className="block font-bold mb-2">学習目標：</label>
        <input
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* 理解度選択 */}
      <div className="mb-4">
        <label className="block font-bold mb-2">理解度：</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() =>
                setFormData({ ...formData, understanding_level: level })
              }
              className={`
                                px-4 py-2 rounded border
                                ${
                                  formData.understanding_level === level
                                    ? "bg-blue-500 text-white"
                                    : "bg-white hover:bg-gray-100"
                                }
                            `}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 学習時間 */}
      <div className="mb-4">
        <label className="block font-bold mb-2">学習時間：</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={formData.time_spent}
            onChange={(e) =>
              setFormData({ ...formData, time_spent: e.target.value })
            }
            className="border rounded px-3 py-2 w-32"
          />
          <span>分</span>
        </div>
      </div>

      {/* メモ */}
      <div className="mb-4">
        <label className="block font-bold mb-2">メモ：</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          rows={4}
        />
      </div>

      {/* 完了チェックボックス */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.completed}
            onChange={(e) =>
              setFormData({ ...formData, completed: e.target.checked })
            }
            className="w-5 h-5"
          />
          <span>この日の学習を完了した</span>
        </label>
      </div>

      {/* 追加ボタン */}
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
      >
        追加
      </button>
    </div>
  );
}
