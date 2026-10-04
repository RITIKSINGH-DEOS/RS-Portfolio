export interface QuoteItem {
  id: number;
  quote: string;
  author?: string;
}

export const PERSONAL_QUOTES: QuoteItem[] = [
  {
    id: 1,
    quote:
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    quote:
      "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
  {
    id: 3,
    quote:
      "Whether you think you can, or think you can’t — you’re right.",
    author: "Henry Ford",
  },
  {
    id: 4,
    quote:
      "The only thing worse than starting something and failing… is not starting something.",
    author: "Seth Godin",
  },
  {
    id: 5,
    quote:
      "The biggest risk is not taking any risk. In a world that’s changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    author: "Mark Zuckerberg",
  },
  {
    id: 6,
    quote:
      "Action is the only way you’ll progress. Not talking. Not planning. And not reading books.",
    author: "Andrew Tate",
  },
  {
    id: 7,
    quote:
      "The day I stop learning, I might as well be dead.",
    author: "Ratan Tata",
  },
  {
    id: 8,
    quote:
      "A jack of all trades is a master of none, but oftentimes better than a master of one.",
  },
];
