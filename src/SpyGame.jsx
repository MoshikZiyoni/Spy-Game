import React, { useState, useRef, useEffect } from 'react';

// מאגר מילים מתוחכם - רמזים של מילה-שתיים שיכולים להתאים לכמה מקומות במקביל
const WORD_BANK = [
    { word: "מסעדה", easyHint: "המתנה", hardHint: "חשבון" },
    { word: "בית חולים", easyHint: "לילה", hardHint: "ריח חריף" },
    { word: "שדה תעופה", easyHint: "הכרזה", hardHint: "פרידה" },
    { word: "בית ספר", easyHint: "פעמון", hardHint: "שעמום" },
    { word: "בסיס צבאי", easyHint: "השכמה", hardHint: "שגרה" },
    { word: "סופרמרקט", easyHint: "תור", hardHint: "ניאון" },
    { word: "קולנוע", easyHint: "לחישה", hardHint: "זרים" },
    { word: "איצטדיון", easyHint: "הד", hardHint: "גל" },
    { word: "מוזיאון", easyHint: "שמירה", hardHint: "צעדים" },
    { word: "חוף הים", easyHint: "מלח", hardHint: "אופק" },
    { word: "פארק שעשועים", easyHint: "צעקות", hardHint: "סחרחורת" },
    { word: "תחנת משטרה", easyHint: "תלונה", hardHint: "עט" },
    { word: "תחנת כיבוי אש", easyHint: "מוט", hardHint: "שניות" },
    { word: "מלון", easyHint: "קומה", hardHint: "זמני" },
    { word: "בנק", easyHint: "תור", hardHint: "שקט מתוח" },
    { word: "משרד", easyHint: "שעון", hardHint: "לבן" },
    { word: "ספרייה", easyHint: "שלט", hardHint: "אבק" },
    { word: "בית כנסת", easyHint: "כיסוי ראש", hardHint: "עמידה" },
    { word: "גן חיות", easyHint: "שלט", hardHint: "ריחות" },
    { word: "חדר כושר", easyHint: "מראה", hardHint: "נשימות" },
    { word: "ספא", easyHint: "חלוק", hardHint: "לחש" },
    { word: "תחנת רכבת", easyHint: "ספסל", hardHint: "זמזום" },
    { word: "נמל", easyHint: "חבלים", hardHint: "מלח" },
    { word: "תחנת דלק", easyHint: "מספרים", hardHint: "עצירה" },
    { word: "בית קפה", easyHint: "פינה", hardHint: "קצף" },
    { word: "קניון", easyHint: "רצפה מבריקה", hardHint: "מדרגות" },
    { word: "מוסך", easyHint: "כתמים", hardHint: "מתכת" },
    { word: "מספרה", easyHint: "שיחה", hardHint: "רצפה" },
    { word: "תיאטרון", easyHint: "וילון", hardHint: "מחיאות" },
    { word: "קרקס", easyHint: "אוהל", hardHint: "פחד" },
    { word: "כלא", easyHint: "ספירה", hardHint: "שגרה" },
    { word: "בית משפט", easyHint: "פטיש", hardHint: "עדות" },
    { word: "שגרירות", easyHint: "חותמת", hardHint: "המתנה" },
    { word: "אוניברסיטה", easyHint: "ספסלים", hardHint: "לחץ" },
    { word: "גן ילדים", easyHint: "גדר", hardHint: "בכי" },
    { word: "סדנת אמנות", easyHint: "סינר", hardHint: "לכלוך" },
    { word: "מעבדה", easyHint: "כפפות", hardHint: "שקוף" },
    { word: "בית אבות", easyHint: "מסדרון", hardHint: "איטי" },
    { word: "מגדלור", easyHint: "סיבוב", hardHint: "בודד" },
    { word: "טירה", easyHint: "מדרגות", hardHint: "קור" },
    { word: "תחנת חלל", easyHint: "חלון", hardHint: "שקט" },
    { word: "צוללת", easyHint: "צפיפות", hardHint: "לחץ" },
    { word: "מטוס", easyHint: "חגורה", hardHint: "אוזניים" },
    { word: "ספינת פיראטים", easyHint: "נדנוד", hardHint: "מפה" },
    { word: "מכרה זהב", easyHint: "קסדה", hardHint: "עמוק" },
    { word: "מדבר", easyHint: "צמא", hardHint: "שקט" },
    { word: "יער", easyHint: "שבילים", hardHint: "רישרוש" },
    { word: "מערה", easyHint: "טפטוף", hardHint: "קור" },
    { word: "הר מושלג", easyHint: "דקות", hardHint: "נשימה" },
    { word: "אי בודד", easyHint: "אופק", hardHint: "שקט" },
    { word: "ג'ונגל", easyHint: "רעשים", hardHint: "סבך" },
    { word: "מקדש", easyHint: "אבן", hardHint: "הד" },
    { word: "חממה", easyHint: "אדים", hardHint: "ירוק" },
    { word: "מגדל פיקוח", easyHint: "זכוכית", hardHint: "אחריות" },
    { word: "אולם אירועים", easyHint: "רמקול", hardHint: "זרים" },
    { word: "בריכת שחייה", easyHint: "כחול", hardHint: "הד" },
    { word: "מרפאת שיניים", easyHint: "המתנה", hardHint: "צליל חד" },
    { word: "וטרינר", easyHint: "המתנה", hardHint: "דאגה" },
    { word: "פיצרייה", easyHint: "חום", hardHint: "מספר" },
    { word: "מאפייה", easyHint: "בוקר", hardHint: "ריח מתוק" },
    { word: "גלריית אמנות", easyHint: "שתיקה", hardHint: "לבן" },
    { word: "חנות בגדים", easyHint: "תא", hardHint: "תווית" },
    { word: "חנות צעצועים", easyHint: "קופסאות", hardHint: "נוסטלגיה" },
    { word: "חנות ספרים", easyHint: "אבק", hardHint: "שתיקה" },
    { word: "בית מרקחת", easyHint: "תור", hardHint: "מרשם" },
    { word: "שוק", easyHint: "צעקות", hardHint: "ערבוב" },
    { word: "מטווח", easyHint: "אטמים", hardHint: "ריכוז" },
    { word: "מגרש גולף", easyHint: "שקט", hardHint: "ירוק" },
    { word: "אתר סקי", easyHint: "משקפיים", hardHint: "מהירות" },
    { word: "יקב", easyHint: "מרתף", hardHint: "זמן" },
    { word: "אקווריום", easyHint: "כחול", hardHint: "שקט" },
    { word: "פלנטריום", easyHint: "כיסא", hardHint: "חושך" },
    { word: "תחנת מטרו", easyHint: "רוח", hardHint: "עומק" },
    { word: "מפעל", easyHint: "חזרה", hardHint: "מתכת" },
    { word: "תחנת כוח", easyHint: "גדר", hardHint: "זמזום" },
    { word: "בית דפוס", easyHint: "ריח", hardHint: "חזרה" },
    { word: "אולפן הקלטות", easyHint: "ספוג", hardHint: "בידוד" },
    { word: "אולפן טלוויזיה", easyHint: "חום", hardHint: "שעון" },
    { word: "חוות סוסים", easyHint: "גדר", hardHint: "אדמה" },
    { word: "כרם", easyHint: "שורות", hardHint: "סבלנות" },
    { word: "שדה תותים", easyHint: "כפיפה", hardHint: "אדום" },
    { word: "כוורת", easyHint: "עשן", hardHint: "סדר" },
    { word: "קמפינג ביער", easyHint: "עשן", hardHint: "כוכבים" },
    { word: "קזינו", easyHint: "שטיח", hardHint: "מזל" },
    { word: "מועדון לילה", easyHint: "חושך", hardHint: "רטט" },
    { word: "באולינג", easyHint: "נעליים", hardHint: "רעש" },
    { word: "מגרש טניס", easyHint: "גבולות", hardHint: "הלוך ושוב" },
    { word: "פארק מים", easyHint: "צעקות", hardHint: "בטן" },
    { word: "משתלה", easyHint: "ברז", hardHint: "ירוק" },
    { word: "חלל עבודה שיתופי", easyHint: "אוזניות", hardHint: "זרים" },
    { word: "גשר תלוי", easyHint: "חבלים", hardHint: "רוח" },
    { word: "ספינת קרוז", easyHint: "קומות", hardHint: "אופק" },
    { word: "מעבורת", easyHint: "זמן", hardHint: "חזרה" },
    { word: "תחנת מחקר בקוטב", easyHint: "מעיל", hardHint: "בידוד" },
    { word: "ספארי", easyHint: "אבק", hardHint: "משקפת" },
    { word: "מועדון גלישה", easyHint: "שעווה", hardHint: "בוקר" },
    { word: "מנחת מסוקים", easyHint: "עיגול", hardHint: "רוח" },
    { word: "חדר בריחה", easyHint: "שעון", hardHint: "תסכול" },
    { word: "פאב", easyHint: "עץ", hardHint: "שיחה" },
    { word: "מעיין חם", easyHint: "אדים", hardHint: "ריח" },
    { word: "מספרה גברים", easyHint: "מראה", hardHint: "שיחה" },
    { word: "קולנוע קיץ", easyHint: "שמיכה", hardHint: "כוכבים" }
];

const playSound = (type) => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
            
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'reveal') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(250, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.28);
            
            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.28);
        } else if (type === 'hide') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(700, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.28);
            
            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.28);
        } else if (type === 'start') {
            const playTone = (freq, time, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, time);
                gain.gain.setValueAtTime(0.03, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + duration);
            };
            const now = ctx.currentTime;
            playTone(523.25, now, 0.12);        // C5
            playTone(659.25, now + 0.06, 0.12);  // E5
            playTone(783.99, now + 0.12, 0.2);   // G5
        } else if (type === 'alert') {
            const duration = 1.8;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(450, ctx.currentTime);
            
            // Sweep frequency back and forth like a siren
            for (let t = 0; t < duration; t += 0.15) {
                osc.frequency.linearRampToValueAtTime(750, ctx.currentTime + t + 0.07);
                osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + t + 0.15);
            }
            
            // Loud and clear alarm gain profile
            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.setValueAtTime(0.18, ctx.currentTime + duration - 0.2);
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } else if (type === 'reset') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(350, ctx.currentTime);
            osc.frequency.setValueAtTime(280, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.16);
        }
    } catch (e) {
        console.warn(e);
    }
};

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

        playSound('start');
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

    const cardRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const normX = x / (rect.width / 2);
        const normY = y / (rect.height / 2);
        
        card.style.setProperty('--tilt-x', `${normX * 12}deg`);
        card.style.setProperty('--tilt-y', `${-normY * 12}deg`);
        card.style.setProperty('--eye-x', `${normX * 16}px`);
        card.style.setProperty('--eye-y', `${normY * 16}px`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--eye-x', '0px');
        card.style.setProperty('--eye-y', '0px');
    };

    useEffect(() => {
        if (gameState !== 'REVEAL') return;

        const handleOrientation = (e) => {
            const { beta, gamma } = e;
            if (beta === null || gamma === null) return;
            
            const targetBeta = 55;
            const deltaBeta = Math.max(-25, Math.min(25, beta - targetBeta));
            const deltaGamma = Math.max(-25, Math.min(25, gamma));
            
            const normX = deltaGamma / 25;
            const normY = deltaBeta / 25;
            
            const card = cardRef.current;
            if (card) {
                card.style.setProperty('--tilt-x', `${normX * 10}deg`);
                card.style.setProperty('--tilt-y', `${-normY * 10}deg`);
                card.style.setProperty('--eye-x', `${normX * 12}px`);
                card.style.setProperty('--eye-y', `${normY * 12}px`);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [gameState]);

    const handleNextPlayer = () => {
        playSound('hide');
        setIsCardRevealed(false);
        setIsTransitioning(true);
        setTimeout(() => {
            if (currentPlayerIndex + 1 < players.length) {
                setCurrentPlayerIndex(prev => prev + 1);
                setIsTransitioning(false);
            } else {
                setGameState('PLAYING');
                setIsTransitioning(false);
            }
        }, 600);
    };

    const handleCardClick = () => {
        if (isTransitioning) return;

        if (!isCardRevealed) {
            playSound('reveal');
            setIsTransitioning(true);
            setIsCardRevealed(true);
            setTimeout(() => setIsTransitioning(false), 600);
        } else {
            handleNextPlayer();
        }
    };

    const handleReset = () => {
        playSound('reset');
        setGameState('SETUP');
        setPlayers([]);
        setCurrentPlayerIndex(0);
        setIsCardRevealed(false);
        setIsTransitioning(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-between p-4 pb-8 select-none" dir="rtl">

            {/* כותרת עליונה */}
            <header className="w-full max-w-md pt-4 text-center">
                <div className="inline-block bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold text-red-400 tracking-widest mb-1">
                    TOP SECRET OPERATIONS
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
                    המרגל • HAMERAGEL
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
                                            playSound('click');
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
                                        onClick={() => {
                                            playSound('click');
                                            playerCount < 12 && setPlayerCount(playerCount + 1);
                                        }}
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
                                        onClick={() => {
                                            playSound('click');
                                            spyCount > 1 && setSpyCount(spyCount - 1);
                                        }}
                                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-2xl font-bold rounded-xl flex items-center justify-center transition-all border border-slate-700"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-black w-6 text-center text-red-500">{spyCount}</span>
                                    <button
                                        onClick={() => {
                                            playSound('click');
                                            spyCount < playerCount - 1 && setSpyCount(spyCount + 1);
                                        }}
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
                                        onClick={() => {
                                            playSound('click');
                                            setHintDifficulty('EASY');
                                        }}
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
                                        onClick={() => {
                                            playSound('click');
                                            setHintDifficulty('HARD');
                                        }}
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

                            {/* כרטיס סודי - תלת ממדי ומגיב לתנועה */}
                            <div className="w-full min-h-[300px] perspective-1000 my-4 select-none">
                                <div
                                    ref={cardRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        transform: 'rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg))',
                                        transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                    }}
                                    className="w-full h-full min-h-[300px] rounded-3xl preserve-3d"
                                >
                                    <div
                                        onClick={handleCardClick}
                                        style={{
                                            transform: `rotateY(${isCardRevealed ? 180 : 0}deg)`,
                                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                        className="w-full h-full min-h-[300px] rounded-3xl preserve-3d relative cursor-pointer"
                                    >
                                        
                                        {/* גב הכרטיס - סריקת עין ואנימציה אינטראקטיבית */}
                                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                                            {/* קו סורק לייזר ירוק/כתום */}
                                            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_12px_#ea580c] animate-hologram-scan pointer-events-none" />
                                            
                                            {/* עין SVG דינמית ועוקבת */}
                                            <div className="mb-4">
                                                <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                                                    <defs>
                                                        <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
                                                            <stop offset="0%" stopColor="#f97316" />
                                                            <stop offset="70%" stopColor="#ea580c" />
                                                            <stop offset="100%" stopColor="#7c2d12" />
                                                        </radialGradient>
                                                        <clipPath id="eyeball-clip">
                                                            <path d="M20,80 Q80,35 140,80 Q80,125 20,80 Z" />
                                                        </clipPath>
                                                    </defs>

                                                    {/* אלמנט HUD מסתובב חיצוני */}
                                                    <circle cx="80" cy="80" r="76" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 20" opacity="0.4" className="animate-radar-sweep" />
                                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="40 10" opacity="0.6" className="animate-radar-sweep" style={{ animationDirection: 'reverse', animationDuration: '6s' }} />
                                                    
                                                    {/* כוונות וסוגרי HUD בפינות */}
                                                    <path d="M15,40 L15,15 L40,15" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.8" />
                                                    <path d="M145,40 L145,15 L120,15" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.8" />
                                                    <path d="M15,120 L15,145 L40,145" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.8" />
                                                    <path d="M145,120 L145,145 L120,145" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.8" />

                                                    {/* קבוצת גלגל העין הכוללת אנימציית מצמוץ */}
                                                    <g className="origin-center animate-eye-blink">
                                                        {/* גוף גלגל העין */}
                                                        <path d="M20,80 Q80,35 140,80 Q80,125 20,80 Z" fill="#020617" stroke="#ea580c" strokeWidth="2" className="animate-border-glow" />
                                                        
                                                        {/* קבוצת האישון החתוכה (עוקבת אחר התנועה) */}
                                                        <g clipPath="url(#eyeball-clip)">
                                                            <g style={{ transform: 'translate3d(var(--eye-x, 0px), var(--eye-y, 0px), 0)', transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} className="origin-center">
                                                                {/* קשתית */}
                                                                <circle cx="80" cy="80" r="24" fill="url(#iris-grad)" />
                                                                {/* פרטים בתוך הקשתית */}
                                                                <circle cx="80" cy="80" r="18" fill="none" stroke="#fdba74" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
                                                                {/* אישון */}
                                                                <circle cx="80" cy="80" r="11" fill="#020617" />
                                                                {/* השתקפות */}
                                                                <circle cx="76" cy="74" r="3.5" fill="#ffffff" opacity="0.8" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-sm font-black text-orange-400 tracking-widest uppercase animate-pulse">מזהה סוכן ביומטרי</p>
                                                <p className="text-xs text-slate-400 font-bold">לחץ לסריקת רשתית וחשיפת התפקיד</p>
                                            </div>
                                        </div>

                                        {/* חזית הכרטיס - הצגת התפקיד הסודי (מיושר הפוך rotateY-180) */}
                                        <div
                                            style={{ transform: 'rotateY(180deg)' }}
                                            className="absolute inset-0 backface-hidden bg-slate-950 border border-orange-500/40 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden"
                                        >
                                            {/* סריקת הולוגרמה פעילה פעם נוספת */}
                                            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-hologram-scan pointer-events-none" />

                                            <div className="space-y-4 w-full text-center">
                                                {players[currentPlayerIndex]?.isSpy ? (
                                                    <>
                                                        <div className="text-5xl animate-bounce">🕵️‍♂️</div>
                                                        <h4 className="text-3xl font-black text-red-500 uppercase tracking-widest animate-glitch">אתה המרגל!</h4>
                                                        <p className="text-xs text-slate-400 max-w-[240px] mx-auto font-medium">אינך יודע את המיקום הסודי. רמז החקירה שלך:</p>
                                                        <div className="bg-red-500/10 text-red-400 font-bold py-2.5 px-5 rounded-2xl border border-red-500/30 text-2xl inline-block shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                                                            {hintDifficulty === 'EASY' ? currentGameWord?.easyHint : currentGameWord?.hardHint}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-5xl animate-bounce">🧑‍✈️</div>
                                                        <h4 className="text-3xl font-black text-emerald-400 uppercase tracking-widest">אתה בצוות!</h4>
                                                        <p className="text-xs text-slate-400 max-w-[240px] mx-auto font-medium">זהו המיקום הסודי שלכם:</p>
                                                        <div className="bg-emerald-500/10 text-emerald-400 font-bold py-2.5 px-5 rounded-2xl border border-emerald-500/30 text-2xl inline-block shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                                            {currentGameWord?.word}
                                                        </div>
                                                    </>
                                                )}
                                                
                                                <div className="pt-4">
                                                    <p className="text-xs text-orange-400 font-black animate-pulse bg-orange-500/10 border border-orange-500/20 py-1.5 px-3 rounded-full inline-block">
                                                        {currentPlayerIndex + 1 === players.length ? 'לחץ שוב להתחלת המשחק! 🏁' : 'לחץ שוב למעבר לסוכן הבא ➔'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCardClick}
                                className={`w-full py-4 font-black rounded-2xl active:scale-[0.98] transition-all text-base text-white cursor-pointer shadow-lg border ${
                                    !isCardRevealed
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-orange-400/25 shadow-orange-950/40'
                                        : (currentPlayerIndex + 1 === players.length 
                                            ? 'bg-gradient-to-r from-red-600 via-orange-500 to-emerald-500 border-red-500/25 shadow-red-950/40 animate-pulse' 
                                            : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border-slate-700 shadow-slate-950/40')
                                }`}
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
                            {/* מכ"ם סייבר אינטראקטיבי פעיל */}
                            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
                                {/* גלי הד של המכ"ם */}
                                <div className="absolute inset-0 rounded-full bg-red-500/5 border border-red-500/30 animate-radar-ping pointer-events-none" />
                                <div className="absolute inset-0 rounded-full bg-red-500/5 border border-red-500/20 animate-radar-ping-delay pointer-events-none" />
                                
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                                    <defs>
                                        <linearGradient id="sweeper-grad" x1="100%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* מעגלי המכ"ם */}
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                                    <circle cx="50" cy="50" r="34" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.4" />
                                    <circle cx="50" cy="50" r="20" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                                    
                                    {/* קווי שנתות */}
                                    <line x1="50" y1="2" x2="50" y2="98" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
                                    <line x1="2" y1="50" x2="98" y2="50" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
                                    
                                    {/* הזרוע המסתובבת וזנב האור */}
                                    <g className="origin-center animate-radar-sweep">
                                        <line x1="50" y1="50" x2="50" y2="2" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                        <polygon points="50,50 50,2 32,4" fill="url(#sweeper-grad)" />
                                    </g>
                                    
                                    {/* נקודות מטרה במכ"ם */}
                                    <circle cx="28" cy="35" r="2" fill="#f97316" className="animate-pulse" />
                                    <circle cx="72" cy="65" r="2" fill="#ef4444" className="animate-ping" style={{ animationDuration: '3s' }} />
                                </svg>
                                
                                {/* נקודת ליבה מרכזית מהבהבת */}
                                <div className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse shadow-[0_0_10px_#ef4444]" />
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
                                        playSound('alert');
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

            <footer className="w-full max-w-md pt-4 text-center space-y-1">
                <p className="text-[9px] text-slate-600 tracking-widest font-mono">
                    SECURE PASS & PLAY ENGINE v1.2.0
                </p>
                <p className="text-[10px] text-slate-500 font-bold tracking-wide transition-all duration-300 hover:text-orange-400">
                    פותח על ידי <span className="font-mono text-slate-400 hover:text-orange-400 transition-colors">Moshik Ziyoni</span>
                </p>
            </footer>
        </div>
    );
}