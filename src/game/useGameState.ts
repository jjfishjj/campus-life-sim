import { useState, useCallback } from "react";
import { Character, Stats, GameEvent, Choice, getRandomEvent, clampStat } from "./gameData";

export type GamePhase = "select" | "campus" | "event" | "result" | "gameover";

export interface GameState {
  phase: GamePhase;
  character: Character | null;
  stats: Stats;
  day: number;
  currentEvent: GameEvent | null;
  lastResult: string | null;
  usedEventIds: string[];
  log: string[];
}

const MAX_DAYS = 20;

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: "select",
    character: null,
    stats: { academic: 50, social: 50, health: 50, money: 50, stress: 50 },
    day: 1,
    currentEvent: null,
    lastResult: null,
    usedEventIds: [],
    log: [],
  });

  const selectCharacter = useCallback((char: Character) => {
    setState({
      phase: "campus",
      character: char,
      stats: { ...char.stats },
      day: 1,
      currentEvent: null,
      lastResult: null,
      usedEventIds: [],
      log: [`🎓 ${char.name}（${char.title}）開始了大學生活！`],
    });
  }, []);

  const visitLocation = useCallback((locationId: string) => {
    setState((prev) => {
      const event = getRandomEvent(locationId, prev.usedEventIds);
      if (!event) return prev;
      return { ...prev, phase: "event", currentEvent: event };
    });
  }, []);

  const makeChoice = useCallback((choice: Choice) => {
    setState((prev) => {
      const newStats: Stats = {
        academic: clampStat(prev.stats.academic + (choice.effects.academic || 0)),
        social: clampStat(prev.stats.social + (choice.effects.social || 0)),
        health: clampStat(prev.stats.health + (choice.effects.health || 0)),
        money: clampStat(prev.stats.money + (choice.effects.money || 0)),
        stress: clampStat(prev.stats.stress + (choice.effects.stress || 0)),
      };

      const newDay = prev.day + 1;
      const isGameOver =
        newDay > MAX_DAYS ||
        newStats.health <= 0 ||
        newStats.stress >= 100;

      const logEntry = `📅 第${prev.day}天：${prev.currentEvent?.title} → ${choice.text}`;

      return {
        ...prev,
        stats: newStats,
        day: newDay,
        phase: isGameOver ? "gameover" : "result",
        lastResult: choice.result,
        usedEventIds: prev.currentEvent
          ? [...prev.usedEventIds, prev.currentEvent.id]
          : prev.usedEventIds,
        log: [...prev.log, logEntry],
      };
    });
  }, []);

  const continueToMap = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "campus", currentEvent: null, lastResult: null }));
  }, []);

  const restart = useCallback(() => {
    setState({
      phase: "select",
      character: null,
      stats: { academic: 50, social: 50, health: 50, money: 50, stress: 50 },
      day: 1,
      currentEvent: null,
      lastResult: null,
      usedEventIds: [],
      log: [],
    });
  }, []);

  return { state, selectCharacter, visitLocation, makeChoice, continueToMap, restart };
}
