import { ScoreData } from 'types';

const key = 'cinephiliacSB';

export const getScores = (): ScoreData[] => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export const addScore = (value: ScoreData): ScoreData[] => {
  const scores = getScores();
  const newScores = scores.concat([value]);

  localStorage.setItem(key, JSON.stringify(newScores));

  return newScores;
};

export const deleteScores = (id: string): boolean => {
  const scores = getScores();
  const newScores = scores.filter((score) => score.id !== id);

  localStorage.setItem(key, JSON.stringify(newScores));

  return true;
};
