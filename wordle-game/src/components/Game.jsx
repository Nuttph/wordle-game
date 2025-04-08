import { useState } from "react";
import wordle from "../../public/json/wordle.json";

const Game = () => {
  const [word, setWord] = useState("");
  const [count, setCount] = useState(5);
  const [round,setRound] = useState(1);
  const [endGame,setEndGame] = useState(false);
const [result,setResult] = useState(false)

  const [inGame, setInGame] = useState(false);
  const [sum, setSum] = useState("");
  const [mySum, setMySum] = useState([]);
  const fetchData = async () => {
    try {
      const shuffled = wordle.sort(() => 0.5 - Math.random());
      const randomOne = shuffled.slice(0, 1)[0];
    //   console.log(randomOne);
      setWord(randomOne);
    } catch (err) {
    //   console.log(err);
    }
  };

  const checkSum = () => {
    // console.log("Word to guess:", word);
    // console.log("User's input:", sum.toUpperCase());
    const sWord = word.toUpperCase().split("");
    const sSum = sum.toUpperCase().split("");
    const compare = sWord.map((item, index) => {
        if(item == sSum[index]){
            return "yes"
        }else if(sWord.includes(sSum[index])){
            return "near"
        }else{
            return "no"
        }
    });
    // console.log(compare);
    const preSum = sSum.map((item, index) => {
      return {
        word: item,
        status: compare[index],
      };
    });
    // console.log(preSum);
    setMySum((pre) => [...pre, preSum]);
    // console.log(mySum);
    if(word == sum.toUpperCase()){
        setResult(true)
        return;
    }
    if(round == count){
        setEndGame(true)
        // console.log("End game : true")
    }else{
        setRound(round+1);
    }
    
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div>Round : {inGame ? round+"/"+count : count}</div>
     {!inGame && (
         <div className="flex flex-row items-center justify-center gap-4">
         <button
           className="cursor-pointer bg-green-500 hover:bg-green-600 px-2 py-1 rounded-lg text-[14px] duration-300"
           onClick={() => count < 50 && setCount(count + 1)}
         >
           Increment
         </button>
         <button
           className="cursor-pointer bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded-lg text-[14px] duration-300"
           onClick={() => count > 1 && setCount(count - 1)}
         >
           Decrement
         </button>
       </div>
     )}
      <button
        className="bg-yellow-500 px-2 py-1 rounded-lg m-2"
        onClick={() => {
          if (inGame) {
            setInGame(false);
            window.location.reload()
          } else {
            fetchData();
            setInGame(true);
          }
        }}
      >
        {inGame ? endGame ? "Reset":"Stop" : "Start"}
      </button>
      {word && inGame && (
        <div>
         {!endGame && !result && (
             <div className="text-center m-3">
             <form
               className="flex flex-row items-center justify-center gap-2"
               onSubmit={(e) => {
                 e.preventDefault();
                 checkSum();
                 setSum("");
               }}
             >
               <input
                 type="text"
                 value={sum}
                 onChange={(e) => setSum(e.target.value)}
                 placeholder="Word"
                 maxLength={5}
                 className="text-center border-1 rounded-lg h-[25px]"
               />
               <button className="bg-green-500 rounded-lg px-2 text-[13px] h-[25px] hover:bg-green-700 duration-300 cursor-pointer">
                 Check
               </button>
             </form>
           </div>
         )}
          <div className="flex flex-col gap-4">
            {mySum && (
              <div className="flex flex-col gap-4">
                {mySum.map((item, index) => (
                  <div className="flex flex-row gap-4" key={index}>
                    {item.map((w, i) => (
                      <div
                        className={`${
                          w.status == "yes" ? "bg-green-300" : w.status == "near" ? "bg-yellow-300": "bg-red-300"
                        } w-[50px] h-[50px] flex items-center justify-center border-2`}
                        key={i}
                      >
                        {w.word}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {result && (
                <div className="mt-4 bg-green-200 px-2 rounded-md py-3">
                    ✅ Mission complete 🎊 🎉
                </div>
            )}
            {endGame && (
                <div className="text-center bg-red-200 text-red-500 mt-4 rounded-md font-semibold text-[12px]">
                    ❌ You failed the mission and the answer is this : 
                    <div>
                        {word}
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
