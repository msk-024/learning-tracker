import { supabase } from './supabase';
import type { LearningRecord, NewLearningRecord, UpdateLearningRecord } from '../types/learning';

// 1. 全レコード取得（SELECT）
export async function fetchLearningRecords() {
    const {data, error} = await supabase
    .from('learning_progress')
    .select('*');

    if (error) {
        console.error('学習データの取得に失敗:', error);
        throw new Error('学習データの取得に失敗しました');
      }

    return data || [];
}

// 2. 新規レコード追加（INSERT）
export async function addLearningRecord(record: NewLearningRecord) {
    const { data, error } = await supabase 
    .from('learning_progress')
    .insert(record)
    .select();
    
    if (error) {
        console.error('進捗追加エラー:', error);
        throw new Error('進捗追加に失敗しました');
    }
    return data[0];
}

// 3. レコード更新（UPDATE）
export async function updateLearningRecord(
  id: string,
  updates: UpdateLearningRecord
) {
    const { data, error } = await supabase
    .from('learning_progress')
    .update(updates)
    .eq('id', id)  // ← どのレコードを更新するか指定
    .select();  // ← 更新後のデータを取得

    if (error) {
        console.error('進捗更新エラー:', error);
        throw new Error('進捗情報の更新に失敗しました');
      }

  return data[0];
}

// 4. レコード削除（DELETE）← NEW!
export async function deleteLearningRecord(id: string) {
    const { data, error } = await supabase
    .from('learning_progress')
    .delete()
    .eq('id', id);

    if (error) {
        console.error('進捗削除エラー:', error);
        throw new Error('進捗情報の削除に失敗しました');
      }

    return data;
}