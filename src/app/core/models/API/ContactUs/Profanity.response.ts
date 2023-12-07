export interface Profanity {
  bad_words_list: BadWordsList[];
  bad_words_total: number;
  censored_content: string;
  content: string;
}

export interface BadWordsList {
  deviations: number;
  end: number;
  info: number;
  original: string;
  replacedLen: number;
  start: number;
  word: string;
}
