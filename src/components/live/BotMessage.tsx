import { Button } from "@/components/ui/button";
import { BotQuestion } from "@/data/botQuestions";
import { Bot } from "lucide-react";

interface BotMessageProps {
  message: string;
  questions?: BotQuestion[];
  onQuestionClick: (question: BotQuestion) => void;
}

export const BotMessage = ({ message, questions, onQuestionClick }: BotMessageProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2 text-primary">
        <Bot className="h-4 w-4" />
        <span className="font-medium">Assistant</span>
      </div>
      <p className="text-sm bg-primary/10 p-2 rounded-lg">{message}</p>
      {questions && questions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {questions.map((question) => (
            <Button
              key={question.id}
              variant="outline"
              size="sm"
              onClick={() => onQuestionClick(question)}
              className="text-xs"
            >
              {question.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};