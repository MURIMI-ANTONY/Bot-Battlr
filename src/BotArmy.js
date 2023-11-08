import React from "react";

function BotArmy({ enlistedBots, releaseFromArmy, removeFromCollection }) {
  const removeFromArmy = (botToRelease) => {
    const updatedEnlistedBots = enlistedBots.filter((bot) => bot.id !== botToRelease.id);
    releaseFromArmy(updatedEnlistedBots);
  };
  
   // Remove the bot from the army (enlistedBots) but not from the collection
  const handleClickInArmy = (bot) => {
   
    removeFromArmy(bot);
  }

// Send a DELETE request to the server to remove the bot
  const releaseBot = async (botToRelease) => {
    try {
      
      const resp = await fetch(`http://localhost:8001/bots/${botToRelease.id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        console.log("Bot successfully deleted from the server.");
        removeFromArmy(botToRelease); 
        removeFromCollection(botToRelease)
      } else {
        console.error("Error deleting bot from the server.");
      }
    } catch (error) {
      console.error("Error releasing bot:", error);
    }
  };

  const groupedBots = [];

  for (let i = 0; i < enlistedBots.length; i += 3) {
    groupedBots.push(enlistedBots.slice(i, i + 3));
  }

  return (
    <div className="bot-army">
      <h2>Your Bot Army</h2>
      {groupedBots.map((group, index) => (
        <div key={index} className="bot-row">
          {group.map((bot) => (
            <div key={bot.id} className="bot-card enlisted" onClick={()=>handleClickInArmy(bot)}>
              <img src={bot.avatar_url} alt={bot.name} />
              <h3>{bot.name}</h3>
              <p className="catchphrase">Catchphrase: {bot.catchphrase}</p>
              <div className="bot-details">
                <p>
                  <span className="icon">🧑🏾‍⚕️</span>Health: {bot.health}
                </p>
                <p>
                  <span className="icon">🔥</span>Damage: {bot.damage}
                </p>
                <p>
                  <span className="icon">🛡️</span>Armor: {bot.armor}
                </p>
                <p>
                  <span className="icon">🏛️</span>Class: {bot.bot_class}
                </p>
                <button
                  style={{ color: "red", borderRadius: "20px" }}
                  onClick={() => releaseBot(bot)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BotArmy;
