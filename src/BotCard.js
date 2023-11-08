import React from "react";

function BotCard({ bot, enlistedBots, setEnlistedBots }) {
  const isEnlisted = enlistedBots.some(
    (enlistedBot) => enlistedBot.id === bot.id
  );

  const handleClick = () => {
    if (isEnlisted) {
        console.log("Removing bot from enlistedBots")
      const updatedEnlistedBots = enlistedBots.filter(
        (enlistedBot) => enlistedBot.id !== bot.id
      );
      setEnlistedBots(updatedEnlistedBots);
    } else {
        console.log("Adding bot to enlistedBots")
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

  return (
    <div 
    className="bot-card" onClick={handleClick}>
      <h2>{bot.name}</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <p>{bot.description}</p>
      <p>Health:{bot.health}</p>
      <p>Damage:{bot.damage}</p>
      <p>Armor:{bot.armor}</p>
    </div>

    
  );
}

export default BotCard;