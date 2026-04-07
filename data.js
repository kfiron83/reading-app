// ===== HEBREW READING APP - DATA =====
// Curriculum for 1st-2nd grade Hebrew reading
// Letter sounds based on standard Israeli Hebrew (Modern Hebrew) pronunciation

const HEBREW_DATA = {

    // ===== ALL 27 LETTER ENTRIES (22 base + 5 final forms) =====
    letters: [
        // ---- Group 1: א, בּ, ב ----
        { letter: 'א', name: 'אָלֶף',   sound: 'silent',  phonetic: '—',    hint: 'אות שקטה — כמו בתחילת המילה אֲרִי 🦁', example: 'אֲרִי', exampleMeaning: 'lion' },
        { letter: 'בּ', name: 'בֵּית',  sound: 'B',       phonetic: 'ב',    hint: 'כמו B — בַּלוֹן 🎈', example: 'בַּלוֹן', exampleMeaning: 'balloon' },
        { letter: 'ב',  name: 'בֵּית — וֶת', sound: 'V',  phonetic: 'ו',    hint: 'כמו V — בְּלִי נְקֻדָּה = צליל V', example: 'וֶרֶד', exampleMeaning: 'rose' },
        // ---- Group 2: ג, ד, ה ----
        { letter: 'ג', name: 'גִּימֶל', sound: 'G',       phonetic: 'ג',    hint: 'כמו G — גִּירָפָה 🦒', example: 'גִּירָפָה', exampleMeaning: 'giraffe' },
        { letter: 'ד', name: 'דָּלֶת',  sound: 'D',       phonetic: 'ד',    hint: 'כמו D — דָּג 🐟', example: 'דָּג', exampleMeaning: 'fish' },
        { letter: 'ה', name: 'הֵא',     sound: 'H',       phonetic: 'ה',    hint: 'כמו H — הַר ⛰️', example: 'הַר', exampleMeaning: 'mountain' },
        // ---- Group 3: ו, ז, ח ----
        { letter: 'ו', name: 'וָו',     sound: 'V',       phonetic: 'ו',    hint: 'כמו V — וֶרֶד 🌹', example: 'וֶרֶד', exampleMeaning: 'rose' },
        { letter: 'ז', name: 'זַיִן',   sound: 'Z',       phonetic: 'ז',    hint: 'כמו Z — זֵאב 🐺', example: 'זֵאב', exampleMeaning: 'wolf' },
        { letter: 'ח', name: 'חֵית',    sound: 'Ch (כְּמוֹ ח\')', phonetic: 'ח', hint: 'צליל גרוני — חָתוּל 🐱', example: 'חָתוּל', exampleMeaning: 'cat' },
        // ---- Group 4: ט, י ----
        { letter: 'ט', name: 'טֵית',   sound: 'T',        phonetic: 'ט',    hint: 'כמו T — טַיָּס ✈️', example: 'טַיָּס', exampleMeaning: 'pilot' },
        { letter: 'י', name: 'יוֹד',   sound: 'Y',        phonetic: 'י',    hint: 'כמו Y — יַד ✋', example: 'יַד', exampleMeaning: 'hand' },
        // ---- Group 5: כּ, כ, ך ----
        { letter: 'כּ', name: 'כַּף',  sound: 'K',        phonetic: 'כ',    hint: 'כמו K — כֶּלֶב 🐕', example: 'כֶּלֶב', exampleMeaning: 'dog' },
        { letter: 'כ',  name: 'כַּף — חָף', sound: 'Ch (כְּמוֹ ח\')', phonetic: 'כ', hint: 'בְּלִי נְקֻדָּה = צליל כּ/ח', example: 'כֶּלֶב', exampleMeaning: 'dog' },
        { letter: 'ך',  name: 'כַּף סוֹפִית', sound: 'Ch / K', phonetic: 'ך', hint: 'כַּף בְּסוֹף מִילָה — מֶלֶךְ 👑', example: 'מֶלֶךְ', exampleMeaning: 'king' },
        // ---- Group 6: ל, מ, ם ----
        { letter: 'ל', name: 'לָמֶד',  sound: 'L',        phonetic: 'ל',    hint: 'כמו L — לֵב ❤️', example: 'לֵב', exampleMeaning: 'heart' },
        { letter: 'מ', name: 'מֵם',    sound: 'M',        phonetic: 'מ',    hint: 'כמו M — מַיִם 💧', example: 'מַיִם', exampleMeaning: 'water' },
        { letter: 'ם', name: 'מֵם סוֹפִית', sound: 'M',   phonetic: 'ם',    hint: 'מֵם בְּסוֹף מִילָה — שָׁמַיִם ☁️', example: 'שָׁמַיִם', exampleMeaning: 'sky' },
        // ---- Group 7: נ, ן, ס ----
        { letter: 'נ', name: 'נוּן',   sound: 'N',        phonetic: 'נ',    hint: 'כמו N — נֵר 🕯️', example: 'נֵר', exampleMeaning: 'candle' },
        { letter: 'ן', name: 'נוּן סוֹפִית', sound: 'N',  phonetic: 'ן',    hint: 'נוּן בְּסוֹף מִילָה — גָּן 🌳', example: 'גָּן', exampleMeaning: 'garden' },
        { letter: 'ס', name: 'סָמֶך',  sound: 'S',        phonetic: 'ס',    hint: 'כמו S — סוּס 🐴', example: 'סוּס', exampleMeaning: 'horse' },
        // ---- Group 8: ע, פּ, פ, ף ----
        { letter: 'ע', name: 'עַיִן',  sound: 'silent/guttural', phonetic: '—', hint: 'אות גרונית — עַיִן 👁️', example: 'עַיִן', exampleMeaning: 'eye' },
        { letter: 'פּ', name: 'פֵּא',  sound: 'P',        phonetic: 'פ',    hint: 'כמו P — פִּיל 🐘', example: 'פִּיל', exampleMeaning: 'elephant' },
        { letter: 'פ',  name: 'פֵּא — פֶה', sound: 'F',   phonetic: 'פ',    hint: 'בְּלִי נְקֻדָּה = צליל F — פַּרְפַּר 🦋', example: 'פַּרְפַּר', exampleMeaning: 'butterfly' },
        { letter: 'ף', name: 'פֵּא סוֹפִית', sound: 'F',  phonetic: 'ף',    hint: 'פֵּא בְּסוֹף מִילָה — אַף 👃', example: 'אַף', exampleMeaning: 'nose' },
        // ---- Group 9: צ, ץ, ק ----
        { letter: 'צ', name: 'צָדִי',  sound: 'Ts',       phonetic: 'צ',    hint: 'כמו Ts — צִפּוֹר 🐦', example: 'צִפּוֹר', exampleMeaning: 'bird' },
        { letter: 'ץ', name: 'צָדִי סוֹפִית', sound: 'Ts', phonetic: 'ץ',   hint: 'צָדִי בְּסוֹף מִילָה — עֵץ 🌳', example: 'עֵץ', exampleMeaning: 'tree' },
        { letter: 'ק', name: 'קוֹף',   sound: 'K',        phonetic: 'ק',    hint: 'כמו K — קוֹף 🐵', example: 'קוֹף', exampleMeaning: 'monkey' },
        // ---- Group 10: ר, שׁ, שׂ, תּ ----
        { letter: 'ר', name: 'רֵישׁ',  sound: 'R',        phonetic: 'ר',    hint: 'כמו R — רוֹבּוֹט 🤖', example: 'רוֹבּוֹט', exampleMeaning: 'robot' },
        { letter: 'שׁ', name: 'שִׁין', sound: 'Sh',       phonetic: 'שׁ',   hint: 'כמו Sh — שֶׁמֶשׁ ☀️', example: 'שֶׁמֶשׁ', exampleMeaning: 'sun' },
        { letter: 'שׂ', name: 'שִׂין', sound: 'S',        phonetic: 'שׂ',   hint: 'כמו S — שָׂדֶה 🌾', example: 'שָׂדֶה', exampleMeaning: 'field' },
        { letter: 'תּ', name: 'תָּו',  sound: 'T',        phonetic: 'ת',    hint: 'כמו T — תַּפּוּחַ 🍎', example: 'תַּפּוּחַ', exampleMeaning: 'apple' },
    ],

    // ===== VOWELS =====
    vowels: [
        { vowel: 'ָ',  name: 'קָמָץ',      sound: 'A (אָ)', example: 'בָּ', hint: 'פה פתוח רחב — אָאָאָ', position: 'below' },
        { vowel: 'ַ',  name: 'פַּתָח',      sound: 'A (אַ)', example: 'בַּ', hint: 'פה פתוח — אַאַאַ', position: 'below' },
        { vowel: 'ֵ',  name: 'צֵרֵי',       sound: 'E (אֵ)', example: 'בֵּ', hint: 'שתי נקודות — אֵאֵאֵ', position: 'below' },
        { vowel: 'ֶ',  name: 'סֶגוֹל',      sound: 'E (אֶ)', example: 'בֶּ', hint: 'שלוש נקודות — אֶאֶאֶ', position: 'below' },
        { vowel: 'ִ',  name: 'חִירִיק',     sound: 'I (אִ)', example: 'בִּ', hint: 'נקודה אחת למטה — אִאִאִ', position: 'below' },
        { vowel: 'וֹ', name: 'חוֹלָם מָלֵא', sound: 'O (אוֹ)', example: 'בּוֹ', hint: 'וָו עם נקודה — אוֹאוֹאוֹ', position: 'above' },
        { vowel: 'וּ', name: 'שׁוּרוּק',    sound: 'U (אוּ)', example: 'בּוּ', hint: 'וָו עם נקודה באמצע — אוּאוּאוּ', position: 'middle' },
        { vowel: 'ֻ',  name: 'קֻבּוּץ',     sound: 'U (אֻ)', example: 'בֻּ', hint: 'שלוש נקודות אלכסוניות — אוּאוּאוּ', position: 'below' },
        { vowel: 'ְ',  name: 'שְׁוָא נָע',  sound: 'short E / silent', example: 'בְּ', hint: 'שתי נקודות אנכיות — לפעמים שקט', position: 'below' },
        { vowel: 'ֹ',  name: 'חוֹלָם חָסֵר', sound: 'O (אֹ)', example: 'בֹּ', hint: 'נקודה קטנה מעל האות', position: 'above' },
    ],

    // ===== SYLLABLE GROUPS =====
    syllableGroups: [
        {
            id: 'kamatz', name: 'הברות עם קָמָץ', vowelName: 'קָמָץ', icon: '🔤',
            syllables: [
                { text: 'בָּ', sound: 'BA' }, { text: 'גָּ', sound: 'GA' }, { text: 'דָּ', sound: 'DA' },
                { text: 'הָ',  sound: 'HA' }, { text: 'וָ',  sound: 'VA' }, { text: 'זָ',  sound: 'ZA' },
                { text: 'חָ',  sound: 'CHA'}, { text: 'טָ',  sound: 'TA' }, { text: 'יָ',  sound: 'YA' },
                { text: 'כָּ', sound: 'KA' }, { text: 'לָ',  sound: 'LA' }, { text: 'מָ',  sound: 'MA' },
                { text: 'נָ',  sound: 'NA' }, { text: 'סָ',  sound: 'SA' }, { text: 'פָּ', sound: 'PA' },
                { text: 'צָ',  sound: 'TSA'}, { text: 'קָ',  sound: 'KA' }, { text: 'רָ',  sound: 'RA' },
                { text: 'שָׁ', sound: 'SHA'}, { text: 'תָּ', sound: 'TA' },
            ]
        },
        {
            id: 'patach', name: 'הברות עם פַּתָח', vowelName: 'פַּתָח', icon: '📝',
            syllables: [
                { text: 'בַּ', sound: 'BA' }, { text: 'גַּ', sound: 'GA' }, { text: 'דַּ', sound: 'DA' },
                { text: 'הַ',  sound: 'HA' }, { text: 'וַ',  sound: 'VA' }, { text: 'זַ',  sound: 'ZA' },
                { text: 'חַ',  sound: 'CHA'}, { text: 'טַ',  sound: 'TA' }, { text: 'יַ',  sound: 'YA' },
                { text: 'כַּ', sound: 'KA' }, { text: 'לַ',  sound: 'LA' }, { text: 'מַ',  sound: 'MA' },
                { text: 'נַ',  sound: 'NA' }, { text: 'סַ',  sound: 'SA' }, { text: 'פַּ', sound: 'PA' },
                { text: 'רַ',  sound: 'RA' }, { text: 'שַׁ', sound: 'SHA'}, { text: 'תַּ', sound: 'TA' },
            ]
        },
        {
            id: 'tsere', name: 'הברות עם צֵרֵי', vowelName: 'צֵרֵי', icon: '✏️',
            syllables: [
                { text: 'בֵּ', sound: 'BE' }, { text: 'גֵּ', sound: 'GE' }, { text: 'דֵּ', sound: 'DE' },
                { text: 'הֵ',  sound: 'HE' }, { text: 'זֵ',  sound: 'ZE' }, { text: 'חֵ',  sound: 'CHE'},
                { text: 'טֵ',  sound: 'TE' }, { text: 'יֵ',  sound: 'YE' }, { text: 'כֵּ', sound: 'KE' },
                { text: 'לֵ',  sound: 'LE' }, { text: 'מֵ',  sound: 'ME' }, { text: 'נֵ',  sound: 'NE' },
                { text: 'סֵ',  sound: 'SE' }, { text: 'פֵּ', sound: 'PE' }, { text: 'רֵ',  sound: 'RE' },
                { text: 'שֵׁ', sound: 'SHE'}, { text: 'תֵּ', sound: 'TE' },
            ]
        },
        {
            id: 'chirik', name: 'הברות עם חִירִיק', vowelName: 'חִירִיק', icon: '📖',
            syllables: [
                { text: 'בִּ', sound: 'BI' }, { text: 'גִּ', sound: 'GI' }, { text: 'דִּ', sound: 'DI' },
                { text: 'הִ',  sound: 'HI' }, { text: 'זִ',  sound: 'ZI' }, { text: 'חִ',  sound: 'CHI'},
                { text: 'טִ',  sound: 'TI' }, { text: 'יִ',  sound: 'YI' }, { text: 'כִּ', sound: 'KI' },
                { text: 'לִ',  sound: 'LI' }, { text: 'מִ',  sound: 'MI' }, { text: 'נִ',  sound: 'NI' },
                { text: 'סִ',  sound: 'SI' }, { text: 'פִּ', sound: 'PI' }, { text: 'רִ',  sound: 'RI' },
                { text: 'שִׁ', sound: 'SHI'}, { text: 'תִּ', sound: 'TI' },
            ]
        },
        {
            id: 'cholam', name: 'הברות עם חוֹלָם', vowelName: 'חוֹלָם', icon: '🔵',
            syllables: [
                { text: 'בּוֹ', sound: 'BO' }, { text: 'גּוֹ', sound: 'GO' }, { text: 'דּוֹ', sound: 'DO' },
                { text: 'הוֹ',  sound: 'HO' }, { text: 'זוֹ',  sound: 'ZO' }, { text: 'חוֹ',  sound: 'CHO'},
                { text: 'טוֹ',  sound: 'TO' }, { text: 'יוֹ',  sound: 'YO' }, { text: 'כּוֹ', sound: 'KO' },
                { text: 'לוֹ',  sound: 'LO' }, { text: 'מוֹ',  sound: 'MO' }, { text: 'נוֹ',  sound: 'NO' },
                { text: 'סוֹ',  sound: 'SO' }, { text: 'פּוֹ', sound: 'PO' }, { text: 'רוֹ',  sound: 'RO' },
                { text: 'שׁוֹ', sound: 'SHO'}, { text: 'תּוֹ', sound: 'TO' },
            ]
        },
        {
            id: 'shuruk', name: 'הברות עם שׁוּרוּק', vowelName: 'שׁוּרוּק', icon: '🟣',
            syllables: [
                { text: 'בּוּ', sound: 'BU' }, { text: 'גּוּ', sound: 'GU' }, { text: 'דּוּ', sound: 'DU' },
                { text: 'הוּ',  sound: 'HU' }, { text: 'זוּ',  sound: 'ZU' }, { text: 'חוּ',  sound: 'CHU'},
                { text: 'טוּ',  sound: 'TU' }, { text: 'יוּ',  sound: 'YU' }, { text: 'כּוּ', sound: 'KU' },
                { text: 'לוּ',  sound: 'LU' }, { text: 'מוּ',  sound: 'MU' }, { text: 'נוּ',  sound: 'NU' },
                { text: 'סוּ',  sound: 'SU' }, { text: 'פּוּ', sound: 'PU' }, { text: 'רוּ',  sound: 'RU' },
                { text: 'שׁוּ', sound: 'SHU'}, { text: 'תּוּ', sound: 'TU' },
            ]
        },
    ],

    // ===== WORD GROUPS =====
    wordGroups: [
        {
            id: 'words-2letter', name: 'מילים קצרות', description: 'מילים בנות שתי אותיות', icon: '🌱',
            words: [
                { word: 'אָב',  meaning: 'אבא',  image: '👨', syllables: ['אָב'] },
                { word: 'אֵם',  meaning: 'אמא',  image: '👩', syllables: ['אֵם'] },
                { word: 'יָד',  meaning: 'יד',   image: '✋', syllables: ['יָד'] },
                { word: 'גָּן', meaning: 'גן',   image: '🌳', syllables: ['גָּן'] },
                { word: 'דָּג', meaning: 'דג',   image: '🐟', syllables: ['דָּג'] },
                { word: 'הַר',  meaning: 'הר',   image: '⛰️', syllables: ['הַר'] },
                { word: 'חָם',  meaning: 'חם',   image: '🌡️', syllables: ['חָם'] },
                { word: 'טוֹב', meaning: 'טוב',  image: '👍', syllables: ['טוֹב'] },
                { word: 'לֵב',  meaning: 'לב',   image: '❤️', syllables: ['לֵב'] },
                { word: 'נֵר',  meaning: 'נר',   image: '🕯️', syllables: ['נֵר'] },
                { word: 'סוּס', meaning: 'סוס',  image: '🐴', syllables: ['סוּס'] },
                { word: 'קוֹל', meaning: 'קול',  image: '🔊', syllables: ['קוֹל'] },
                { word: 'עֵץ',  meaning: 'עץ',   image: '🌳', syllables: ['עֵץ'] },
                { word: 'יָם',  meaning: 'ים',   image: '🌊', syllables: ['יָם'] },
                { word: 'כַּד', meaning: 'כד',   image: '🏺', syllables: ['כַּד'] },
            ]
        },
        {
            id: 'words-simple', name: 'מילים פשוטות', description: 'מילים בנות שלוש אותיות', icon: '🌿',
            words: [
                { word: 'בַּיִת',  meaning: 'בית',   image: '🏠', syllables: ['בַּ', 'יִת'] },
                { word: 'סֵפֶר',  meaning: 'ספר',   image: '📖', syllables: ['סֵ', 'פֶר'] },
                { word: 'שֶׁמֶשׁ', meaning: 'שמש',   image: '☀️', syllables: ['שֶׁ', 'מֶשׁ'] },
                { word: 'יֶלֶד',  meaning: 'ילד',   image: '👦', syllables: ['יֶ', 'לֶד'] },
                { word: 'יַלְדָּה', meaning: 'ילדה', image: '👧', syllables: ['יַלְ', 'דָּה'] },
                { word: 'כֶּלֶב',  meaning: 'כלב',   image: '🐕', syllables: ['כֶּ', 'לֶב'] },
                { word: 'חָתוּל', meaning: 'חתול',  image: '🐱', syllables: ['חָ', 'תוּל'] },
                { word: 'פֶּרַח',  meaning: 'פרח',   image: '🌸', syllables: ['פֶּ', 'רַח'] },
                { word: 'לֶחֶם',  meaning: 'לחם',   image: '🍞', syllables: ['לֶ', 'חֶם'] },
                { word: 'מַיִם',  meaning: 'מים',   image: '💧', syllables: ['מַ', 'יִם'] },
                { word: 'דֶּלֶת', meaning: 'דלת',   image: '🚪', syllables: ['דֶּ', 'לֶת'] },
                { word: 'עוּגָה', meaning: 'עוגה',  image: '🎂', syllables: ['עוּ', 'גָה'] },
                { word: 'תַּפּוּחַ', meaning: 'תפוח', image: '🍎', syllables: ['תַּ', 'פּוּחַ'] },
                { word: 'גֶּשֶׁם', meaning: 'גשם',   image: '🌧️', syllables: ['גֶּ', 'שֶׁם'] },
                { word: 'בָּנָנָה', meaning: 'בננה', image: '🍌', syllables: ['בָּ', 'נָ', 'נָה'] },
            ]
        },
        {
            id: 'words-animals', name: 'חיות', description: 'שמות של חיות', icon: '🦁',
            words: [
                { word: 'אַרְיֵה',  meaning: 'אריה',  image: '🦁', syllables: ['אַרְ', 'יֵה'] },
                { word: 'פִּיל',    meaning: 'פיל',   image: '🐘', syllables: ['פִּיל'] },
                { word: 'קוֹף',    meaning: 'קוף',   image: '🐵', syllables: ['קוֹף'] },
                { word: 'צִפּוֹר',  meaning: 'ציפור', image: '🐦', syllables: ['צִ', 'פּוֹר'] },
                { word: 'דֻּבּ',   meaning: 'דוב',   image: '🐻', syllables: ['דֻּבּ'] },
                { word: 'נָחָשׁ',  meaning: 'נחש',   image: '🐍', syllables: ['נָ', 'חָשׁ'] },
                { word: 'צָב',     meaning: 'צב',    image: '🐢', syllables: ['צָב'] },
                { word: 'פַּרְפַּר', meaning: 'פרפר', image: '🦋', syllables: ['פַּרְ', 'פַּר'] },
                { word: 'אַרְנָב', meaning: 'ארנב',  image: '🐰', syllables: ['אַרְ', 'נָב'] },
                { word: 'גִּירָפָה', meaning: 'ג\'ירפה', image: '🦒', syllables: ['גִּי', 'רָ', 'פָה'] },
                { word: 'תַּרְנְגוֹל', meaning: 'תרנגול', image: '🐓', syllables: ['תַּרְ', 'נְ', 'גוֹל'] },
                { word: 'חֲמוֹר',  meaning: 'חמור',  image: '🫏', syllables: ['חֲ', 'מוֹר'] },
            ]
        },
        {
            id: 'words-food', name: 'אוכל', description: 'שמות של מאכלים', icon: '🍕',
            words: [
                { word: 'חָלָב',    meaning: 'חלב',    image: '🥛', syllables: ['חָ', 'לָב'] },
                { word: 'גְּלִידָה', meaning: 'גלידה', image: '🍦', syllables: ['גְּ', 'לִי', 'דָה'] },
                { word: 'שׁוֹקוֹלָד', meaning: 'שוקולד', image: '🍫', syllables: ['שׁוֹ', 'קוֹ', 'לָד'] },
                { word: 'פִּיצָה',  meaning: 'פיצה',  image: '🍕', syllables: ['פִּי', 'צָה'] },
                { word: 'עוּגִיָּה', meaning: 'עוגייה', image: '🍪', syllables: ['עוּ', 'גִי', 'יָה'] },
                { word: 'תּוּת',    meaning: 'תות',    image: '🍓', syllables: ['תּוּת'] },
                { word: 'אֲבַטִּיחַ', meaning: 'אבטיח', image: '🍉', syllables: ['אֲ', 'בַ', 'טִּיחַ'] },
                { word: 'גֶּזֶר',   meaning: 'גזר',    image: '🥕', syllables: ['גֶּ', 'זֶר'] },
                { word: 'בֵּיצָה',  meaning: 'ביצה',  image: '🥚', syllables: ['בֵּי', 'צָה'] },
                { word: 'עִנְבִים', meaning: 'ענבים', image: '🍇', syllables: ['עִנְ', 'בִים'] },
            ]
        },
        {
            id: 'words-nature', name: 'טבע', description: 'מילים מהטבע', icon: '🌳',
            words: [
                { word: 'עֵץ',      meaning: 'עץ',    image: '🌳', syllables: ['עֵץ'] },
                { word: 'פֶּרַח',   meaning: 'פרח',   image: '🌸', syllables: ['פֶּ', 'רַח'] },
                { word: 'שָׁמַיִם',  meaning: 'שמיים', image: '🌤️', syllables: ['שָׁ', 'מַ', 'יִם'] },
                { word: 'כּוֹכָב',  meaning: 'כוכב',  image: '⭐', syllables: ['כּוֹ', 'כָב'] },
                { word: 'יָרֵחַ',   meaning: 'ירח',   image: '🌙', syllables: ['יָ', 'רֵ', 'חַ'] },
                { word: 'עָנָן',    meaning: 'ענן',   image: '☁️', syllables: ['עָ', 'נָן'] },
                { word: 'קֶשֶׁת',   meaning: 'קשת',   image: '🌈', syllables: ['קֶ', 'שֶׁת'] },
                { word: 'חוֹל',    meaning: 'חול',   image: '🏖️', syllables: ['חוֹל'] },
                { word: 'אֶבֶן',    meaning: 'אבן',   image: '🪨', syllables: ['אֶ', 'בֶן'] },
                { word: 'גֶּשֶׁם',  meaning: 'גשם',   image: '🌧️', syllables: ['גֶּ', 'שֶׁם'] },
            ]
        },
        {
            id: 'sentences-simple', name: 'משפטים קצרים', description: 'קוראים משפטים!', icon: '📝',
            words: [
                { word: 'אָבָא בָּא',        meaning: 'אבא בא',         image: '👨', syllables: ['אָ', 'בָא', 'בָּא'] },
                { word: 'אִמָּא פֹּה',        meaning: 'אמא פה',         image: '👩', syllables: ['אִ', 'מָּא', 'פֹּה'] },
                { word: 'הַיֶּלֶד רָץ',      meaning: 'הילד רץ',        image: '🏃', syllables: ['הַ', 'יֶּ', 'לֶד', 'רָץ'] },
                { word: 'הַכֶּלֶב גָּדוֹל',  meaning: 'הכלב גדול',      image: '🐕', syllables: ['הַ', 'כֶּ', 'לֶב', 'גָּ', 'דוֹל'] },
                { word: 'הַחָתוּל יָשֵׁן',   meaning: 'החתול ישן',      image: '😺', syllables: ['הַ', 'חָ', 'תוּל', 'יָ', 'שֵׁן'] },
                { word: 'אֲנִי אוֹהֵב',      meaning: 'אני אוהב',       image: '❤️', syllables: ['אֲ', 'נִי', 'אוֹ', 'הֵב'] },
                { word: 'הַשֶּׁמֶשׁ זוֹרַחַת', meaning: 'השמש זורחת',  image: '☀️', syllables: ['הַ', 'שֶּׁ', 'מֶשׁ', 'זוֹ', 'רַ', 'חַת'] },
                { word: 'יֵשׁ לִי סֵפֶר',    meaning: 'יש לי ספר',     image: '📖', syllables: ['יֵשׁ', 'לִי', 'סֵ', 'פֶר'] },
            ]
        }
    ],

    // ===== LEVEL DEFINITIONS — 10 letter levels + 10 others = 26 total =====
    levels: [
        // Letter levels (10 groups)
        { id: 'letters-1',  type: 'learn-letters', name: 'א, בּ, ב',      icon: '🔤', dataSlice: [0,  3],  color: '#FF6B9D', desc: 'אלף, בית, ויז' },
        { id: 'letters-2',  type: 'learn-letters', name: 'ג, ד, ה',       icon: '🔤', dataSlice: [3,  6],  color: '#FF8C6B', desc: 'גימל, דלת, הא' },
        { id: 'letters-3',  type: 'learn-letters', name: 'ו, ז, ח',       icon: '🔤', dataSlice: [6,  9],  color: '#FFE66D', desc: 'וו, זין, חית' },
        { id: 'letters-4',  type: 'learn-letters', name: 'ט, י',          icon: '🔤', dataSlice: [9,  11], color: '#7BE495', desc: 'טית, יוד' },
        { id: 'letters-5',  type: 'learn-letters', name: 'כּ, כ, ך',     icon: '🔤', dataSlice: [11, 14], color: '#4ECDC4', desc: 'כף ואותיות סופיות' },
        { id: 'letters-6',  type: 'learn-letters', name: 'ל, מ, ם',       icon: '🔤', dataSlice: [14, 17], color: '#6BCBFF', desc: 'למד, מם סופית' },
        { id: 'letters-7',  type: 'learn-letters', name: 'נ, ן, ס',       icon: '🔤', dataSlice: [17, 20], color: '#A78BFA', desc: 'נון, סמך' },
        { id: 'letters-8',  type: 'learn-letters', name: 'ע, פּ, פ, ף',  icon: '🔤', dataSlice: [20, 24], color: '#FF6B9D', desc: 'עין, פא' },
        { id: 'letters-9',  type: 'learn-letters', name: 'צ, ץ, ק',       icon: '🔤', dataSlice: [24, 27], color: '#FF8C6B', desc: 'צדי, קוף' },
        { id: 'letters-10', type: 'learn-letters', name: 'ר, שׁ, שׂ, תּ',icon: '🔤', dataSlice: [27, 31], color: '#FFE66D', desc: 'ריש, שין, תו' },
        // Vowels
        { id: 'vowels',     type: 'learn-vowels',  name: 'ניקוד',         icon: '🎵', dataSlice: [0, 10],  color: '#E91E63', desc: 'כל הניקוד' },
        // Syllable levels
        { id: 'syl-kamatz', type: 'learn-syllables', name: 'הברות קָמָץ', icon: '🔤', groupIndex: 0, color: '#FF8C6B', desc: 'בָּ גָּ דָּ...' },
        { id: 'syl-patach', type: 'learn-syllables', name: 'הברות פַּתָח', icon: '📝', groupIndex: 1, color: '#FFE66D', desc: 'בַּ גַּ דַּ...' },
        { id: 'syl-tsere',  type: 'learn-syllables', name: 'הברות צֵרֵי', icon: '✏️', groupIndex: 2, color: '#7BE495', desc: 'בֵּ גֵּ דֵּ...' },
        { id: 'syl-chirik', type: 'learn-syllables', name: 'הברות חִירִיק', icon: '📖', groupIndex: 3, color: '#4ECDC4', desc: 'בִּ גִּ דִּ...' },
        { id: 'syl-cholam', type: 'learn-syllables', name: 'הברות חוֹלָם', icon: '🔵', groupIndex: 4, color: '#6BCBFF', desc: 'בּוֹ גּוֹ...' },
        { id: 'syl-shuruk', type: 'learn-syllables', name: 'הברות שׁוּרוּק', icon: '🟣', groupIndex: 5, color: '#A78BFA', desc: 'בּוּ גּוּ...' },
        // Word levels
        { id: 'words-2letter', type: 'learn-words', name: 'מילים קצרות', icon: '🌱', groupIndex: 0, color: '#7BE495', desc: 'מילים של 2 אותיות' },
        { id: 'words-simple',  type: 'learn-words', name: 'מילים פשוטות', icon: '🌿', groupIndex: 1, color: '#4ECDC4', desc: 'מילים של 3 אותיות' },
        { id: 'words-animals', type: 'learn-words', name: 'חיות',         icon: '🦁', groupIndex: 2, color: '#FFE66D', desc: 'חיות וחיות' },
        { id: 'words-food',    type: 'learn-words', name: 'אוכל',         icon: '🍕', groupIndex: 3, color: '#FF8C6B', desc: 'מאכלים טעימים' },
        { id: 'words-nature',  type: 'learn-words', name: 'טבע',          icon: '🌳', groupIndex: 4, color: '#7BE495', desc: 'עצים ושמים' },
        { id: 'sentences',     type: 'learn-words', name: 'משפטים',        icon: '📝', groupIndex: 5, color: '#A78BFA', desc: 'קוראים משפטים!' },
    ]
};
