export type LearningRecord = {
    id: string; // uuid型なので、numberではなくstring型
    created_at: string;
    updated_at: string;
    day_number: number;
    date: string; // date型 → string("2026-01-28"形式)
    goal: string;
    completed: boolean; // DEFAULT falseがあるので?は不要
    understanding_level: number | null; // integer,null許可
    notes: string | null; // null許可
    time_spent: number | null; //null許可
  };
  // レコードを持ってくる関数なので、?は不要、代わりにnull許可をする。
  // ? → undefined は許可、null は許可しない
  // | null → null は許可、undefined は許可しない

  // 新規作成用の型
  export type NewLearningRecord = {
    day_number: number;
    date: string;
    goal: string;
    completed?: boolean; // optional(DEFAULT値があるため)
    understanding_level?: number; //number,optional
    notes?: string;
    time_spent?: number;
  };
  
  // 更新用の型
  export type UpdateLearningRecord = {
    day_number?: number;
    date?: string;
    goal?: string;
    completed?: boolean;
    understanding_level?: number;
    notes?: string;
    time_spent?: number;
  };