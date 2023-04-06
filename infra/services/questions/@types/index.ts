import { Question } from "@/@types";

export interface FeedQuestions {
  data: {
    questions: Question[];
    totalCount: number;
  };
}

export interface GetQuestionByID {
  data: Question;
}

export interface SendQuestion {
  data: null;
}
