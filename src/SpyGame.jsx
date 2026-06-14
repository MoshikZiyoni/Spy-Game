import React, { useState } from 'react';

// מאגר מילים מתוחכם - רמזים של מילה-שתיים שיכולים להתאים לכמה מקומות במקביל
const WORD_BANK = [
    { word: "איצטדיון", hint: "כרטיס" },
    { word: "בית חולים", hint: "חלוק" },
    { word: "שדה תעופה", hint: "תיקים" },
    { word: "מסעדה", hint: "תפריט" },
    { word: "בית ספר", hint: "צלצול" },
    { word: "קולנוע", hint: "מסך" },
    { word: "בסיס צבאי", hint: "מדים" },
    { word: "סופרמרקט", hint: "עגלה" }
];

export default function SpyGame() {
    const [gameState, setGameState] = useState('SETUP'); // SETUP, REVEAL, PLAYING
    const [playerCount, setPlayerCount] = useState(4);
    const [spyCount, setSpyCount] = useState(1);
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isCardRevealed, setIsCardRevealed] = useState(false);
    const [currentGameWord, setCurrentGameWord] = useState(null);

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const handleStartSetup = () => {
        if (spyCount >= playerCount) return;

        const selectedItem = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
        setCurrentGameWord(selectedItem);

        let roles = [];
        for (let i = 0; i < spyCount; i++) roles.push(true);
        for (let i = 0; i < (playerCount - spyCount); i++) roles.push(false);
        roles = shuffleArray(roles);

        const generatedPlayers = roles.map((isSpy, index) => ({
            id: index + 1,
            name: `שחקן ${index + 1}`,
            isSpy: isSpy
        }));

        setPlayers(generatedPlayers);
        setCurrentPlayerIndex(0);
        setIsCardRevealed(false);
        setGameState('REVEAL');
    };

    const handleNextPlayer = () => {
        setIsCardRevealed(false);
        if (currentPlayerIndex + 1 < players.length) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {
            setGameState('PLAYING');
        }
    };

    const handleReset = () => {
        setGameState('SETUP');
        setPlayers([]);
        setCurrentPlayerIndex(0);
        setIsCardRevealed(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-between p-4 pb-8 select-none" dir="rtl">

            {/* כותרת עליונה */}
            <header className="w-full max-w-md pt-4 text-center">
                <div className="inline-block bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold text-red-400 tracking-widest mb-1">
                    TOP SECRET OPERATIONS
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
                    SPYFALL • מרגל
                </h1>
            </header>

            {/* קונטיינר מרכזי למובייל */}
            <main className="w-full max-w-md my-auto py-6">
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800/80 shadow-2xl backdrop-blur-md">

                    {/* --- מסך הגדרות (SETUP) --- */}
                    {gameState === 'SETUP' && (
                        <div className="space-y-6">
                            <div className="text-center space-y-1">
                                <h2 className="text-lg font-bold text-slate-200">הגדרת סוכנים</h2>
                                <p className="text-xs text-slate-400">קבעו את כמות המשתתפים מסביב לשולחן</p>
                            </div>

                            {/* סה"כ שחקנים */}
                            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-300">סה"כ שחקנים</p>
                                    <p className="text-xs text-slate-500">מינימום 3, מקסימום 12</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            if (playerCount > 3) {
                                                const nextCount = playerCount - 1;
                                                setPlayerCount(nextCount);
                                                if (spyCount >= nextCount) setSpyCount(nextCount - 1);
                                            }
                                        }}
                                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-2xl font-bold rounded-xl flex items-center justify-center transition-all border border-slate-700"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-black w-6 text-center text-orange-400">{playerCount}</span>
                                    <button
                                        onClick={() => playerCount < 12 && setPlayerCount(playerCount + 1)}
                                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-2xl font-bold rounded-xl flex items-center justify-center transition-all border border-slate-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* כמות מרגלים */}
                            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-300">כמות מרגלים</p>
                                    <p className="text-xs text-slate-500">סוכנים סמויים בחדר</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => spyCount > 1 && setSpyCount(spyCount - 1)}
                                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-2xl font-bold rounded-xl flex items-center justify-center transition-all border border-slate-700"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-black w-6 text-center text-red-500">{spyCount}</span>
                                    <button
                                        onClick={() => spyCount < playerCount - 1 && setSpyCount(spyCount + 1)}
                                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-2xl font-bold rounded-xl flex items-center justify-center transition-all border border-slate-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleStartSetup}
                                className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-600 hover:opacity-90 active:scale-[0.98] font-black rounded-2xl transition-all shadow-lg shadow-red-950/50 text-base mt-2 tracking-wide"
                            >
                                חלק תפקידים וצא לדרך 🚀
                            </button>
                        </div>
                    )}

                    {/* --- מסך חשיפת תפקידים (REVEAL) --- */}
                    {gameState === 'REVEAL' && (
                        <div className="space-y-6 text-center">
                            <div className="flex justify-between items-center bg-slate-950/40 p-2 px-4 rounded-full border border-slate-800 text-xs text-slate-400">
                                <span>חשיפת תפקידים דיסקרטית</span>
                                <span className="font-bold text-orange-400">{currentPlayerIndex + 1} / {players.length}</span>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">העבירו את הטלפון אל:</p>
                                <h3 className="text-2xl font-black text-slate-100 mt-1">{players[currentPlayerIndex]?.name}</h3>
                            </div>

                            {/* כרטיס סודי */}
                            <div
                                onClick={() => setIsCardRevealed(!isCardRevealed)}
                                className={`w-full min-h-[220px] rounded-2xl border-2 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${isCardRevealed
                                        ? 'bg-slate-950 border-orange-500/80 shadow-xl shadow-orange-500/5'
                                        : 'bg-gradient-to-br from-slate-800 to-slate-900 border-dashed border-slate-700 hover:border-slate-600 shadow-inner'
                                    }`}
                            >
                                {isCardRevealed ? (
                                    <div className="space-y-4 w-full">
                                        {players[currentPlayerIndex]?.isSpy ? (
                                            <>
                                                <div className="text-4xl">🕵️‍♂️</div>
                                                <h4 className="text-2xl font-black text-red-500 uppercase tracking-wider">אתה המרגל!</h4>
                                                <p className="text-xs text-slate-400 max-w-[240px] mx-auto">אינך יודע את המיקום. הרמז היחיד שלך הוא:</p>
                                                <div className="bg-red-500/10 text-red-400 font-bold py-2.5 px-4 rounded-xl border border-red-500/20 text-xl inline-block">
                                                    {currentGameWord?.hint}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl">🧑‍✈️</div>
                                                <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-wider">אתה אזרח</h4>
                                                <p className="text-xs text-slate-400 max-w-[240px] mx-auto">זהו המיקום הסודי שלכם:</p>
                                                <div className="bg-emerald-500/10 text-emerald-400 font-bold py-2.5 px-4 rounded-xl border border-emerald-500/20 text-xl inline-block">
                                                    {currentGameWord?.word}
                                                </div>
                                            </>
                                        )}
                                        <p className="text-[10px] text-slate-500 pt-2">(לחץ שוב כדי להסתיר)</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400 text-xl animate-pulse">
                                            👁️
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-slate-300">לחץ לצפייה בתפקיד</p>
                                            <p className="text-xs text-slate-500 mt-1">ודא שאף אחד לא מציץ</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleNextPlayer}
                                disabled={!isCardRevealed}
                                className={`w-full py-4 font-black rounded-2xl active:scale-[0.98] transition-all text-base ${isCardRevealed
                                        ? 'bg-slate-100 text-slate-950 shadow-md shadow-slate-950/20 cursor-pointer'
                                        : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                                    }`}
                            >
                                {currentPlayerIndex + 1 === players.length ? 'התחל משחק פעיל! 🏁' : 'הבנתי, העבר לשחקן הבא'}
                            </button>
                        </div>
                    )}

                    {/* --- מסך משחק פעיל (PLAYING) - חסוי לחלוטין --- */}
                    {gameState === 'PLAYING' && (
                        <div className="space-y-8 text-center py-4">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto text-2xl text-orange-400 animate-pulse">
                                ⏱️
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-slate-100">החקירה בעיצומה!</h3>
                                <p className="text-sm text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                                    השליכו את המילים מהראש. שאלו שאלות חוקרות בסבב כדי למצוא את המרגלים, או כדי להבין מה המיקום.
                                </p>
                            </div>

                            <div className="border-t border-slate-800 pt-6 space-y-3">
                                <button
                                    onClick={() => {
                                        if (window.confirm("האם לחשוף את התשובות ולסיים את הסיבוב?")) {
                                            alert(`המיקום הסודי היה: ${currentGameWord.word}\nהרמז למרגל היה: ${currentGameWord.hint}`);
                                            handleReset();
                                        }
                                    }}
                                    className="w-full py-3.5 bg-gradient-to-l from-red-600 to-orange-600 hover:opacity-90 active:scale-[0.98] text-white font-black rounded-2xl transition-all text-sm shadow-md"
                                >
                                    חשוף תשובה וסיים סיבוב 🚨
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="w-full py-2 text-xs text-slate-500 hover:text-slate-400 transition font-medium"
                                >
                                    ביטול וחזרה למסך הראשי
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <footer className="text-[10px] text-slate-600 text-center tracking-wider font-mono">
                SECURE PASS & PLAY ENGINE
            </footer>
        </div>
    );
}