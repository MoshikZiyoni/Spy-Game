import React, { useState } from 'react';

// מאגר מילים מתוחכם - רמזים של מילה-שתיים שיכולים להתאים לכמה מקומות במקביל
const WORD_BANK = [
    { word: "מסעדה", easyHint: "שולחנות", hardHint: "ריח" },
    { word: "בית חולים", easyHint: "מיטה", hardHint: "אנשים" },
    { word: "שדה תעופה", easyHint: "מזוודה", hardHint: "שער" },
    { word: "בית ספר", easyHint: "לוח", hardHint: "קבוצה" },
    { word: "בסיס צבאי", easyHint: "שמירה", hardHint: "סדר" },
    { word: "סופרמרקט", easyHint: "עגלה", hardHint: "קופסה" },
    { word: "קולנוע", easyHint: "מסך", hardHint: "חושך" },
    { word: "איצטדיון", easyHint: "דשא", hardHint: "קהל" },
    { word: "מוזיאון", easyHint: "ציור", hardHint: "מדריך" },
    { word: "חוף הים", easyHint: "חול", hardHint: "שמש" },
    { word: "פארק שעשועים", easyHint: "תור", hardHint: "גובה" },
    { word: "תחנת משטרה", easyHint: "מדים", hardHint: "ניירת" },
    { word: "תחנת כיבוי אש", easyHint: "צינור", hardHint: "אדום" },
    { word: "מלון", easyHint: "מפתח", hardHint: "ניקיון" },
    { word: "בנק", easyHint: "כסף", hardHint: "מספרים" },
    { word: "משרד", easyHint: "מחשב", hardHint: "כיסא" },
    { word: "ספרייה", easyHint: "ספר", hardHint: "דממה" },
    { word: "בית כנסת", easyHint: "תפילה", hardHint: "ספרים" },
    { word: "גן חיות", easyHint: "כלוב", hardHint: "רעשים" },
    { word: "חדר כושר", easyHint: "משקולת", hardHint: "מאמץ" },
    { word: "ספא", easyHint: "עיסוי", hardHint: "רגיעה" },
    { word: "תחנת רכבת", easyHint: "רציף", hardHint: "לוח זמנים" },
    { word: "נמל", easyHint: "עוגן", hardHint: "רוח" },
    { word: "תחנת דלק", easyHint: "צינור", hardHint: "ריח" },
    { word: "בית קפה", easyHint: "כוס", hardHint: "שולחן" },
    { word: "קניון", easyHint: "חנות", hardHint: "קומה" },
    { word: "מוסך", easyHint: "גלגל", hardHint: "ריח" },
    { word: "מספרה", easyHint: "מספריים", hardHint: "מראה" },
    { word: "תיאטרון", easyHint: "במה", hardHint: "אורות" },
    { word: "קרקס", easyHint: "מופע", hardHint: "צבעים" },
    { word: "כלא", easyHint: "סורגים", hardHint: "כללים" },
    { word: "בית משפט", easyHint: "שופט", hardHint: "דיון" },
    { word: "שגרירות", easyHint: "דרכון", hardHint: "דגל" },
    { word: "אוניברסיטה", easyHint: "מבחן", hardHint: "מחקר" },
    { word: "גן ילדים", easyHint: "צעצועים", hardHint: "רעש" },
    { word: "סדנת אמנות", easyHint: "צבע", hardHint: "חומר" },
    { word: "מעבדה", easyHint: "מבחנה", hardHint: "נתונים" },
    { word: "בית אבות", easyHint: "מטפל", hardHint: "שקט" },
    { word: "מגדלור", easyHint: "ים", hardHint: "מגדל" },
    { word: "טירה", easyHint: "חומה", hardHint: "אבן" },
    { word: "תחנת חלל", easyHint: "חלל", hardHint: "ריחופים" },
    { word: "צוללת", easyHint: "עומק", hardHint: "ברזל" },
    { word: "מטוס", easyHint: "טיסה", hardHint: "חלון" },
    { word: "ספינת פיראטים", easyHint: "סיפון", hardHint: "עץ" },
    { word: "מכרה זהב", easyHint: "מתכת", hardHint: "חושך" },
    { word: "מדבר", easyHint: "חום", hardHint: "יובש" },
    { word: "יער", easyHint: "עצים", hardHint: "צל" },
    { word: "מערה", easyHint: "סלע", hardHint: "הד" },
    { word: "הר מושלג", easyHint: "קור", hardHint: "לבן" },
    { word: "אי בודד", easyHint: "חוף", hardHint: "בידוד" },
    { word: "ג'ונגל", easyHint: "לחות", hardHint: "ירוק" },
    { word: "מקדש", easyHint: "פסל", hardHint: "ריח" },
    { word: "חממה", easyHint: "עציץ", hardHint: "חום" },
    { word: "מגדל פיקוח", easyHint: "תקשורת", hardHint: "מבט" },
    { word: "אולם אירועים", easyHint: "מוזיקה", hardHint: "חגיגה" },
    { word: "בריכת שחייה", easyHint: "מים", hardHint: "רעש" },
    { word: "מרפאת שיניים", easyHint: "כיסא", hardHint: "רעשים" },
    { word: "וטרינר", easyHint: "כלב", hardHint: "טיפול" },
    { word: "פיצרייה", easyHint: "תנור", hardHint: "בצק" },
    { word: "מאפייה", easyHint: "לחם", hardHint: "בצק" },
    { word: "גלריית אמנות", easyHint: "תמונה", hardHint: "קירות" },
    { word: "חנות בגדים", easyHint: "בגד", hardHint: "מראה" },
    { word: "חנות צעצועים", easyHint: "משחק", hardHint: "צבעים" },
    { word: "חנות ספרים", easyHint: "מדף", hardHint: "ספרים" },
    { word: "בית מרקחת", easyHint: "תרופה", hardHint: "ניירת" },
    { word: "שוק", easyHint: "דוכן", hardHint: "קולות" },
    { word: "מטווח", easyHint: "רעש", hardHint: "משקפיים" },
    { word: "מגרש גולף", easyHint: "דשא", hardHint: "רכב" },
    { word: "אתר סקי", easyHint: "שלג", hardHint: "רכבל" },
    { word: "יקב", easyHint: "בקבוק", hardHint: "ריח" },
    { word: "אקווריום", easyHint: "דג", hardHint: "זכוכית" },
    { word: "פלנטריום", easyHint: "כוכב", hardHint: "תקרה" },
    { word: "תחנת מטרו", easyHint: "מנהרה", hardHint: "כרטיס" },
    { word: "מפעל", easyHint: "קו ייצור", hardHint: "רעש" },
    { word: "תחנת כוח", easyHint: "חשמל", hardHint: "רעש" },
    { word: "בית דפוס", easyHint: "נייר", hardHint: "צבע" },
    { word: "אולפן הקלטות", easyHint: "מיקרופון", hardHint: "שקט" },
    { word: "אולפן טלוויזיה", easyHint: "מצלמה", hardHint: "אורות" },
    { word: "חוות סוסים", easyHint: "חול", hardHint: "ריח" },
    { word: "כרם", easyHint: "ענבים", hardHint: "שורה" },
    { word: "שדה תותים", easyHint: "פרי", hardHint: "אדמה" },
    { word: "כוורת", easyHint: "דבש", hardHint: "רישרוש" },
    { word: "קמפינג ביער", easyHint: "אוהל", hardHint: "אש" },
    { word: "קזינו", easyHint: "קלפים", hardHint: "כסף" },
    { word: "מועדון לילה", easyHint: "רחבה", hardHint: "מוזיקה" },
    { word: "באולינג", easyHint: "כדור", hardHint: "עץ" },
    { word: "מגרש טניס", easyHint: "רשת", hardHint: "קווים" },
    { word: "פארק מים", easyHint: "מגלשה", hardHint: "צעקות" },
    { word: "משתלה", easyHint: "פרח", hardHint: "אדמה" },
    { word: "חלל עבודה שיתופי", easyHint: "מחשב נייד", hardHint: "קפה" },
    { word: "גשר תלוי", easyHint: "גובה", hardHint: "נדנוד" },
    { word: "ספינת קרוז", easyHint: "ים", hardHint: "חדרים" },
    { word: "מעבורת", easyHint: "סיפון", hardHint: "מים" },
    { word: "תחנת מחקר בקוטב", easyHint: "קרח", hardHint: "חושך" },
    { word: "ספארי", easyHint: "חיות", hardHint: "נסיעה" },
    { word: "מועדון גלישה", easyHint: "גל", hardHint: "ים" },
    { word: "מנחת מסוקים", easyHint: "גג", hardHint: "רעש" },
    { word: "חדר בריחה", easyHint: "מפתח", hardHint: "זמן" },
    { word: "פאב", easyHint: "בירה", hardHint: "כוסות" },
    { word: "מעיין חם", easyHint: "אדים", hardHint: "חום" },
    { word: "מספרה גברים", easyHint: "כיסא", hardHint: "שיחה" },
    { word: "קולנוע קיץ", easyHint: "פופקורן", hardHint: "חושך" }
];

export default function SpyGame() {
    const [gameState, setGameState] = useState('SETUP'); // SETUP, REVEAL, PLAYING
    const [playerCount, setPlayerCount] = useState(4);
    const [spyCount, setSpyCount] = useState(1);
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isCardRevealed, setIsCardRevealed] = useState(false);
    const [currentGameWord, setCurrentGameWord] = useState(null);
    const [hintDifficulty, setHintDifficulty] = useState('EASY'); // EASY or HARD

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

    const handleCardClick = () => {
        if (!isCardRevealed) {
            setIsCardRevealed(true);
        } else {
            handleNextPlayer();
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

                            {/* רמת קושי לרמזים */}
                            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-300">רמת הרמז למרגל</p>
                                    <p className="text-xs text-slate-500">משפיע על רמת הכלליות של הרמז שהמרגל מקבל</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setHintDifficulty('EASY')}
                                        className={`py-3 rounded-xl font-bold transition-all text-xs border ${
                                            hintDifficulty === 'EASY'
                                                ? 'bg-orange-500/10 border-orange-500/35 text-orange-400 font-extrabold shadow-md'
                                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                                        }`}
                                    >
                                        קל (ספציפי יותר)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHintDifficulty('HARD')}
                                        className={`py-3 rounded-xl font-bold transition-all text-xs border ${
                                            hintDifficulty === 'HARD'
                                                ? 'bg-red-500/10 border-red-500/35 text-red-400 font-extrabold shadow-md'
                                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                                        }`}
                                    >
                                        קשה (כללי ומתוחכם)
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
                                onClick={handleCardClick}
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
                                                    {hintDifficulty === 'EASY' ? currentGameWord?.easyHint : currentGameWord?.hardHint}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl">🧑‍✈️</div>
                                                <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-wider">אתה בצוות!</h4>
                                                <p className="text-xs text-slate-400 max-w-[240px] mx-auto">זהו המיקום הסודי שלכם:</p>
                                                <div className="bg-emerald-500/10 text-emerald-400 font-bold py-2.5 px-4 rounded-xl border border-emerald-500/20 text-xl inline-block">
                                                    {currentGameWord?.word}
                                                </div>
                                            </>
                                        )}
                                        <p className="text-xs text-orange-400 font-bold pt-2 animate-pulse">
                                            {currentPlayerIndex + 1 === players.length ? 'לחץ שוב להסתרת התפקיד ותחילת המשחק! 🏁' : 'לחץ שוב להסתרה ומעבר לשחקן הבא ➔'}
                                        </p>
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
                                onClick={handleCardClick}
                                className="w-full py-4 font-black rounded-2xl active:scale-[0.98] transition-all text-base bg-slate-100 text-slate-950 shadow-md shadow-slate-950/20 cursor-pointer"
                            >
                                {!isCardRevealed 
                                    ? 'לחץ להצגת התפקיד 👁️' 
                                    : (currentPlayerIndex + 1 === players.length ? 'הסתר והתחל משחק פעיל! 🏁' : 'הסתר והעבר לשחקן הבא ➔')
                                }
                            </button>
                        </div>
                    )}

                    {/* --- מסך משחק פעיל (PLAYING) - חסוי לחלוטין --- */}
                    {gameState === 'PLAYING' && (
                        <div className="space-y-8 text-center py-4">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto text-2xl text-orange-400 animate-pulse">
                                ⏱️
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-slate-100">החקירה בעיצומה!</h3>
                                
                                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-right space-y-3 max-w-[340px] mx-auto" dir="rtl">
                                    <h4 className="text-sm font-bold text-orange-400 flex items-center gap-1.5 justify-start">
                                        <span>💡</span>
                                        <span>חוק המשחק החשוב ביותר:</span>
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                        כאשר אתם שואלים שאלות או עונים עליהן, השתמשו בתיאורים או רמזים ש<strong>רק מי שמכיר את המיקום הסודי יבין</strong>.
                                    </p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        אל תתנו מילים מובנות מאליהן או ישירות מדי שמסגירות ומאפשרות למרגל לנחש את המקום בקלות!
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-slate-800 pt-6 space-y-3">
                                <button
                                    onClick={() => {
                                        if (window.confirm("האם לחשוף את התשובות ולסיים את הסיבוב?")) {
                                            alert(`המיקום הסודי היה: ${currentGameWord.word}\nהרמז למרגל היה: ${hintDifficulty === 'EASY' ? currentGameWord.easyHint : currentGameWord.hardHint}`);
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