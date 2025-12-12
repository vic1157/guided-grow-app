import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Scroll, Dices } from "lucide-react";

interface ScrollData {
  id: string;
  title: string;
  scriptureReference: string;
  duration: string;
}

// Mock scrolls data
const mockScrolls: ScrollData[] = [
  {
    id: 'scroll-1',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
  },
  {
    id: 'scroll-2',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
  },
  {
    id: 'scroll-3',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
  },
];

// Bible books for select
const bibleBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
  "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation"
];

const NewQuiz = () => {
  const navigate = useNavigate();
  
  // Form state
  const [startBook, setStartBook] = useState("Amos");
  const [startChapter, setStartChapter] = useState("5");
  const [startVerse, setStartVerse] = useState("");
  const [endBook, setEndBook] = useState("");
  const [endChapter, setEndChapter] = useState("");
  const [endVerse, setEndVerse] = useState("");
  const [numQuestions, setNumQuestions] = useState("3");
  const [multipleChoice, setMultipleChoice] = useState(true);
  const [trueFalse, setTrueFalse] = useState(false);

  const handleScrollSelect = (scrollId: string) => {
    navigate(`/scroll/${scrollId}?startQuiz=true`);
  };

  const handleGenerateQuiz = () => {
    // For now, navigate to a demo quiz
    navigate(`/scroll/scroll-1?startQuiz=true`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scripture-explorer')}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <Dices className="h-5 w-5 text-foreground" />
            <h1 className="text-lg font-semibold text-foreground">Quiz Generator</h1>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Define Quiz Scripture Range */}
        <Card className="p-4 sm:p-6 space-y-6 border-2 border-foreground/10">
          <h2 className="text-xl font-bold text-foreground">Define Quiz Scripture Range</h2>
          
          {/* Start From */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Start From</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Select value={startBook} onValueChange={setStartBook}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                  {bibleBooks.map((book) => (
                    <SelectItem key={book} value={book}>{book}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={startChapter} onValueChange={setStartChapter}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={startVerse} onValueChange={setStartVerse}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 176 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End At */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">End At</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Select value={endBook} onValueChange={setEndBook}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                  {bibleBooks.map((book) => (
                    <SelectItem key={book} value={book}>{book}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={endChapter} onValueChange={setEndChapter}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={endVerse} onValueChange={setEndVerse}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 176 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Questions & Question Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Number of Questions */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Number of Questions</label>
              <Select value={numQuestions} onValueChange={setNumQuestions}>
                <SelectTrigger>
                  <SelectValue placeholder="3" />
                </SelectTrigger>
                <SelectContent>
                  {[3, 5, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">*3 question minimum</p>
            </div>

            {/* Question Types */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Question Types</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="multiple-choice" 
                    checked={multipleChoice}
                    onCheckedChange={(checked) => setMultipleChoice(checked as boolean)}
                  />
                  <label htmlFor="multiple-choice" className="text-sm text-foreground cursor-pointer">
                    Multiple Choice
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="true-false" 
                    checked={trueFalse}
                    onCheckedChange={(checked) => setTrueFalse(checked as boolean)}
                  />
                  <label htmlFor="true-false" className="text-sm text-foreground cursor-pointer">
                    True/False
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Quiz Button */}
          <Button 
            onClick={handleGenerateQuiz}
            className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold mt-2"
          >
            Generate Quiz
          </Button>
        </Card>

        {/* Divider with "OR" */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm font-medium text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* From Previous Scroll Section */}
        <Card className="p-4 sm:p-6 space-y-4 border-2 border-foreground/10">
          <h2 className="text-xl font-bold text-foreground">From Previous Scroll</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {mockScrolls.map((scroll) => (
              <Card
                key={scroll.id}
                onClick={() => handleScrollSelect(scroll.id)}
                className="p-3 sm:p-4 flex items-center gap-3 hover:bg-accent transition-all duration-200 cursor-pointer border border-border"
              >
                {/* Scroll Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Scroll className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{scroll.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <span>{scroll.scriptureReference}</span>
                    <span className="hidden sm:inline"> • {scroll.duration}</span>
                  </p>
                  <p className="text-xs text-muted-foreground sm:hidden">
                    {scroll.duration}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 sm:gap-3 pt-2">
            <Button variant="outline" size="sm" className="px-3 sm:px-4 text-xs sm:text-sm">
              &lt; Prev
            </Button>
            <Button variant="outline" size="sm" className="px-3 sm:px-4 text-xs sm:text-sm">
              Next &gt;
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default NewQuiz;
