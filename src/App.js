import './App.css';
import React, { useState, useEffect } from 'react';
import Header from "./Header"
import BotCollection from './BotCollection';
import BotArmy from './BotArmy';

function App() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then((resp) => resp.json())
      .then((data) => setBots(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

    // Function to remove a bot from both collection and army
    const removeFromCollection = (botToRemove) => {
      // Update the collection by removing the bot
      const updatedBots = bots.filter((bot) => bot.id !== botToRemove.id);
      setBots(updatedBots);
  
      // Also, update the enlistedBots to remove the bot
      const updatedEnlistedBots = enlistedBots.filter((bot) => bot.id !== botToRemove.id);
      setEnlistedBots(updatedEnlistedBots);
    };

  return (
    <div className="App">
      <Header/>
      <BotArmy  enlistedBots={enlistedBots} releaseFromArmy={setEnlistedBots} removeFromCollection={removeFromCollection}/>
      <BotCollection  bots={bots} enlistedBots={enlistedBots} setEnlistedBots={setEnlistedBots} />
    </div>
  );
}

export default App;
