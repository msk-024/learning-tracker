import { useState } from 'react';
import type { LearningRecord } from '../types/learning';
import { updateLearningRecord, deleteLearningRecord } from '../lib/api';

type Props = {
  record: LearningRecord;
  onUpdate: () => void;  // 更新後に親に通知
  onDelete: () => void;  // 削除後に親に通知
};

export default function LearningRecordItem({ record, onUpdate, onDelete }: Props) {
  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false);
  // 編集中のデータ（理解度、メモ、完了状態）
  const [editingData, setEditingData] = useState({
    understanding_level: record.understanding_level ?? undefined, // nullならundefined
    notes: record.notes || '',
    completed: record.completed
  });
  
  // 理解度を星マークに変換
  const stars = '⭐'.repeat(record.understanding_level || 0);
  // understanding_level が 4 なら '⭐⭐⭐⭐'

  // 保存処理
  const handleSave = async () => {
    try{
      await updateLearningRecord(record.id, editingData);
      onUpdate(); // 親に通知
      setIsEditing(false); // 編集モード終了
    } catch (error) {
      console.error('更新エラー:', error);
    }
  };

  // 削除処理
  const handleDelete = async () => {
      if (!window.confirm(`Day ${record.day_number} を削除しますか？`)) {
        return;  // キャンセルされた
      }
      try {
        await deleteLearningRecord(record.id);
        onDelete();  // 親に通知
      } catch (error) {
        console.error('削除エラー:', error);
      }
  };

  // 通常モードの表示
  if (!isEditing) {
    return (
    <div className='border p-4 rounded'>
      <div className="flex justify-between">
        <div>
          <span className="font-bold">
            Day {record.day_number}
          </span>
          <span className="ml-4">
            {record.date}
          </span>
          {record.completed && <span className='ml-4 text-green-600'>✅完了</span>}
        </div>
      </div>
      <div className="mt-2">{record.goal}</div>
      {record.understanding_level && (
        <div className="mt-2">
          理解度: {'⭐'.repeat(record.understanding_level)} ({record.understanding_level}/5)
        </div>
      )}
      <div className="mt-4 flex gap-2">
        {/* 編集ボタン */}
        <button onClick={() => setIsEditing(true)} className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>編集</button>
        {/* キャンセルボタン */}
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">削除</button>
      </div>
    </div>
    );
  }

  // TODO: 編集モードの表示
  return (
    <div className="border p-4 rounded bg-gray-50">
      <div className="font-bold">Day {record.day_number} の編集</div>
       {/* 理解度選択（1-5のボタン） */}
       <div className="mt-4">
        <label className="block font-semibold mb-2">理解度</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button 
            key={level}
            onClick={() => setEditingData({ ...editingData, understanding_level: level })}
            className={`
              px-4 py-2 rounded border
              ${editingData.understanding_level === level 
                ? 'bg-blue-500 text-white' 
                : 'bg-white hover:bg-gray-100'}
            `}>
              {level}
            </button>
          ))}
        </div>
       </div>
      
      {/* メモ入力 */}
      <div className="mt-4">
        <label className="block font-semibold mb-2">メモ</label>
        <textarea
         value={editingData.notes}
         onChange={(e) => setEditingData({ ...editingData, notes: e.target.value })}
         className='w-full border rounded p-2'
         rows={4}
         placeholder="学習内容のメモを入力..."
         />
      </div>
      {/* 完了チェックボックス */}
      <div className="mt-4">
        <label className='flex items-center gap-2'>
          <input type="checkbox" checked={editingData.completed}
          onChange={(e) => setEditingData({ ...editingData, completed: e.target.checked })}
          className="w-5 h-5"
        />
        <span>この日の学習を完了した</span>
        </label>
      </div>
      {/* 保存・キャンセルボタン */}
      <div className="mt-4 flex gap-2">
        <button onClick={handleSave} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>保存</button>
        <button onClick={() => setIsEditing(false)} className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>キャンセル</button>
      </div>
    </div>
  );
}