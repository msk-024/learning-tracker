
import LearningRecordList from "./components/LearningRecordList";


export default function Home(){
  return(
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">学習進捗記録システム</h1>
      <LearningRecordList />
    </main>
  )
}