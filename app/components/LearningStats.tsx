import type { LearningRecord } from '../types/learning';


type Props = {
    records: LearningRecord[];
}

export default function LarningStats({ records }: Props){
    // 1. 総学習日数、総学習時間
    const total = records.length;
    const totalTime = records.reduce((sum,record) => sum + (record.time_spent || 0), 0);

    // 2. 完了日数
    const completedCount = records.filter(record => record.completed).length;
    // 3. 完了率 
    const completionRate = total > 0 ? (completedCount / total * 100).toFixed(1) : 0;

    // 4. null出ないレコードだけ抽出
    const recordsWithLevel = records.filter(record => record.understanding_level !== null);
    // 5. 合計を計算
    const totalLevel = recordsWithLevel.reduce((sum,record) => sum + (record.understanding_level || 0), 0);    
    // 6. 平均 = 合計 ÷ 件数
    // const averageLevel = totalLevel / recordsWithLevel.length; // ← このままだと小数点以下が全部出てくる
    // const averageLevel = (totalLevel / recordsWithLevel.length).toFixed(1); // ← 小数点1桁に丸めることができる。でも、ゼロもでる。
    const averageLevel = recordsWithLevel.length > 0 ? (totalLevel / recordsWithLevel.length).toFixed(1): '-'; // ゼロ除算を防ぐ



    return(
        <div className="border p-4 rounded">
            <h2 className='text-xl font-bold mb-4'>学習統計</h2>
            {/* 既存の統計 */}
            <div>
                <p>📊 総学習日数: {total}日</p>
                <p>✅ 完了日数: {completedCount}日</p>
                <p>📈 完了率: {completionRate}%</p>
                <p>⭐ 平均理解度: {averageLevel}/5</p>
                <p>⏱️ 総学習時間: {totalTime}分（{(totalTime / 60).toFixed(1)}時間）</p>
            </div> 
            {/* 理解分布 */}
            <div className="mt-6">
                <h3 className="font-bold mb-2">理解分布</h3>
                {[5, 4, 3, 2, 1].map(level => {
                    const count = records.filter(record => record.understanding_level === level).length;
                     return(
                     // mapを使うときが必ずkeyが必要！
                     <div key={level} className='flex items-center gap-2'> 
                        <span className='w-32'>{'⭐'.repeat(level)} ({level}):</span>
                        <span className='text-blue-500'>{'█'.repeat(count)}</span>
                        <span>{count}日</span>
                     </div>
                     );
                })}
            </div>

        </div>
    );
}