import { useGameState } from "@/game/useGameState";
import { CharacterSelect } from "@/components/game/CharacterSelect";
import { CampusMap } from "@/components/game/CampusMap";
import { EventScreen } from "@/components/game/EventScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { GameOverScreen } from "@/components/game/GameOverScreen";

const Index = () => {
  const { state, selectCharacter, visitLocation, makeChoice, continueToMap, restart } = useGameState();

  switch (state.phase) {
    case "select":
      return <CharacterSelect onSelect={selectCharacter} />;
    case "campus":
      return (
        <CampusMap
          stats={state.stats}
          day={state.day}
          characterName={state.character?.name || ""}
          characterEmoji={state.character?.emoji || "🎓"}
          onVisit={visitLocation}
        />
      );
    case "event":
      return state.currentEvent ? (
        <EventScreen event={state.currentEvent} stats={state.stats} day={state.day} onChoice={makeChoice} />
      ) : null;
    case "result":
      return <ResultScreen result={state.lastResult || ""} onContinue={continueToMap} />;
    case "gameover":
      return (
        <GameOverScreen
          stats={state.stats}
          day={state.day}
          characterName={state.character?.name || ""}
          log={state.log}
          onRestart={restart}
        />
      );
    default:
      return null;
  }
};

export default Index;
