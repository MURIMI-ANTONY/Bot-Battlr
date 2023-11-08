import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, enlistedBots, setEnlistedBots }) {
  return (
    <div className="container">
    <div className="bot-collection">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} enlistedBots={enlistedBots} setEnlistedBots={setEnlistedBots} />
      ))}
    </div>
  </div>
  );
}

export default BotCollection;