export interface UserInputValidator {
  query: string;
}

export interface AuthorModel {
  name: string;
  link: string | null;
}

export interface RankingResponse {
  score: number;
  title: string;
  title_link: string | null;
  authors: AuthorModel[];
  publish_date: string | null;
  journal_name: string | null;
  journal_volume: string | null;
  number_of_pages: string | null;
}
