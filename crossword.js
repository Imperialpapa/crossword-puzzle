// ===== Supabase Configuration =====
const SUPABASE_CONFIG = {
    url: "https://mpmzixrzongtrxhzbbcw.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbXppeHJ6b25ndHJ4aHpiYmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNzU5NTQsImV4cCI6MjA4MDY1MTk1NH0.L7kqxWgHG-ThhZv9MDAUPgFlVto49_Ue-wWGp8zby8s"
};

// Supabase 클라이언트 초기화
let supabaseClient = null;

const POOL_TIER_1_SAT = [
    // Difficulty 4-6 (High School SAT Level)
    { word: 'ABILITY', difficulty: 4, hints: ['The power or skill to do something', 'A special talent or skill'] },
    { word: 'ANALYZE', difficulty: 5, hints: ['To study something closely and carefully', 'To examine in detail'] },
    { word: 'BENEFIT', difficulty: 4, hints: ['A good or helpful result or effect', 'An advantage or profit gained from something'] },
    { word: 'COMPARE', difficulty: 4, hints: ['Assess the similarities and differences between two or more things', 'Examine in order to note likenesses or differences'] },
    { word: 'CULTURE', difficulty: 5, hints: ['The beliefs, customs, arts, etc., of a particular society', 'A way of life of a group of people'] },
    { word: 'DEVELOP', difficulty: 5, hints: ['To grow or cause to grow and become more mature or advanced', 'To create a new product or idea'] },
    { word: 'ECONOMY', difficulty: 6, hints: ['The system of how money is made and used within a country or region', 'The wealth and resources of a country'] },
    { word: 'EVIDENCE', difficulty: 5, hints: ['Something which shows that something else exists or is true', 'Facts or information indicating whether a belief is true'] },
    { word: 'FEATURE', difficulty: 4, hints: ['An important part of something, a characteristic', 'A distinctive attribute or aspect'] },
    { word: 'GLOBAL', difficulty: 4, hints: ['Relating to the whole world', 'Worldwide'] },
    { word: 'IMPACT', difficulty: 5, hints: ['A powerful effect that something has on a situation or person', 'The action of one object coming forcibly into contact with another'] },
    { word: 'JUSTIFY', difficulty: 6, hints: ['Show or prove to be right or reasonable', 'To defend or explain a decision'] },
    { word: 'KNOWLEDGE', difficulty: 4, hints: ['Information, understanding, or skill that you get from experience or education', 'Awareness or familiarity gained by experience of a fact or situation'] },
    { word: 'MAJORITY', difficulty: 4, hints: ['The greater number', 'More than half of a total'] },
    { word: 'NETWORK', difficulty: 5, hints: ['A group of interconnected people or things', 'A system of lines or channels that cross'] },
    { word: 'OBJECTIVE', difficulty: 5, hints: ['A goal or purpose', 'Not influenced by personal feelings'] },
    { word: 'PRINCIPLE', difficulty: 5, hints: ['A fundamental truth or proposition that serves as the foundation for a system of belief', 'A basic rule or law'] },
    { word: 'QUANTIFY', difficulty: 6, hints: ['To express or measure the amount of something', 'To determine the quantity of'] },
    { word: 'RESEARCH', difficulty: 5, hints: ['The systematic investigation into and study of materials and sources to establish facts', 'A detailed study of a subject'] },
    { word: 'STRUCTURE', difficulty: 4, hints: ['The arrangement of and relations between the parts of something complex', 'A building or other object constructed from several parts'] },
    { word: 'THEORY', difficulty: 6, hints: ['A set of ideas that is intended to explain facts or events', 'A hypothesis that has been confirmed or established'] },
    { word: 'VALIDATE', difficulty: 6, hints: ['To check or prove the accuracy of something', 'To make or declare legally acceptable'] },
    { word: 'ACADEMIC', difficulty: 5, hints: ['Relating to education and scholarship', 'A teacher or scholar in a university'] },
    { word: 'COMMIT', difficulty: 4, hints: ['To carry out or perpetrate (a mistake, crime, or immoral act)', 'To pledge or bind to a certain course'] },
    { word: 'DEBATE', difficulty: 4, hints: ['A formal discussion on a particular topic', 'To argue about a subject'] },
    { word: 'ETHICAL', difficulty: 6, hints: ['Relating to moral principles', 'Morally good or correct'] },
    { word: 'FINANCE', difficulty: 5, hints: ['The management of large amounts of money', 'To provide funding for a person or enterprise'] },
    { word: 'GENERATE', difficulty: 5, hints: ['To cause something to arise or come about', 'To produce energy'] },
    { word: 'HYPOTHESIS', difficulty: 7, hints: ['A supposition or proposed explanation made on the basis of limited evidence', 'An idea for a scientific experiment'] },
    { word: 'INNOVATE', difficulty: 6, hints: ['To make changes in something established, especially by introducing new methods', 'To introduce something new'] },
    { word: 'INTEGRATE', difficulty: 6, hints: ['Combine (one thing) with another so that they become a whole', 'To form, coordinate, or blend into a functioning or unified whole'] },
    { word: 'LECTURE', difficulty: 4, hints: ['An educational talk to an audience, especially one of students in a university', 'A speech of reproof or reprimand'] },
    { word: 'MANDATE', difficulty: 5, hints: ['An official order or commission to do something', 'The authority to carry out a policy'] },
    { word: 'NEUTRAL', difficulty: 4, hints: ['Not supporting or helping either side in a conflict', 'Without distinct or dominating characteristics'] },
    { word: 'OPTIMIZE', difficulty: 6, hints: ['Make the best or most effective use of (a situation, opportunity, or resource)', 'Arrange for maximum efficiency'] },
    { word: 'PERSIST', difficulty: 5, hints: ['Continue firmly or obstinately in an opinion or course of action in spite of difficulty or opposition', 'To continue to exist'] },
    { word: 'QUALIFY', difficulty: 5, hints: ['Be entitled to a particular benefit or privilege by fulfilling a necessary condition', 'To make (a statement or assertion) less absolute'] },
    { word: 'REDUNDANT', difficulty: 7, hints: ['Not or no longer needed or useful; superfluous', 'Having a superfluous part or quantity'] },
    { word: 'STRATEGY', difficulty: 6, hints: ['A plan of action or policy designed to achieve a major or overall aim', 'The art of planning and directing overall military operations'] },
    { word: 'TRANSFORM', difficulty: 6, hints: ['Make a thorough or dramatic change in the form, appearance, or character of', 'To change in composition or structure'] },
    { word: 'UNDERTAKE', difficulty: 5, hints: ['Take on (a task or responsibility)', 'Enter into (a pledge or engagement)'] },
    { word: 'VELOCITY', difficulty: 6, hints: ['The speed of something in a given direction', 'Rate of movement'] },
    { word: 'WELFARE', difficulty: 4, hints: ['The health, happiness, and fortunes of a person or group', 'Statutory aid for those in need'] },
    { word: 'YIELD', difficulty: 4, hints: ['Produce or provide (a natural agricultural or industrial product)', 'Give way to pressure'] },
    { word: 'ZENITH', difficulty: 6, hints: ['The point in the sky or celestial sphere directly above an observer', 'The time at which something is most powerful or successful'] }
];

const POOL_TIER_2_GENERAL = [
    // Difficulty 1 (2-3 letters)
    { word: 'GO', difficulty: 1, hints: ['Move from one place to another', 'A Japanese board game'] },
    { word: 'HI', difficulty: 1, hints: ['A common greeting', 'Short for "hello"'] },
    { word: 'IT', difficulty: 1, hints: ['Used to refer to a thing previously mentioned', 'A popular horror movie'] },
    { word: 'NO', difficulty: 1, hints: ['A negative response', 'Opposite of yes'] },
    { word: 'SO', difficulty: 1, hints: ['And for this reason; therefore', 'To a great extent'] },
    { word: 'UP', difficulty: 1, hints: ['Towards a higher place or position', 'Opposite of down'] },
    { word: 'US', difficulty: 1, hints: ['Refers to the speaker and one or more other people', 'Abbreviation for United States'] },
    { word: 'WE', difficulty: 1, hints: ['Used by a speaker to refer to himself or herself and one or more other people', 'Plural of "I"'] },
    { word: 'CAT', difficulty: 1, hints: ['A small domesticated carnivorous mammal', 'A popular pet'] },
    { word: 'DOG', difficulty: 1, hints: ['A domesticated carnivorous mammal that typically has a long snout', 'Man\'s best friend'] },
    { word: 'SUN', difficulty: 1, hints: ['The star around which the earth orbits', 'Provides light and heat'] },
    { word: 'RUN', difficulty: 1, hints: ['Move at a speed faster than a walk', 'A score in baseball'] },
    { word: 'EAT', difficulty: 1, hints: ['Put (food) into the mouth and chew and swallow it', 'To consume a meal'] },
    { word: 'FLY', difficulty: 1, hints: ['Move through the air using wings', 'An insect with two wings'] },
    { word: 'KEY', difficulty: 1, hints: ['A small piece of shaped metal with incisions cut to fit the wards of a particular lock', 'A thing that provides a means of achieving or understanding something'] },

    // Difficulty 2-5 (General Use)
    { word: 'AREA', difficulty: 2, hints: ['A region or part of a town, a country, or the world', 'The extent or measurement of a surface'] },
    { word: 'BOOK', difficulty: 2, hints: ['A written or printed work consisting of pages glued or sewn together', 'To reserve accommodation, a place, etc.'] },
    { word: 'CASE', difficulty: 2, hints: ['An instance of a particular situation', 'A container designed to hold something'] },
    { word: 'DATA', difficulty: 2, hints: ['Facts and statistics collected together for reference or analysis', 'Information in electronic form'] },
    { word: 'EXIT', difficulty: 2, hints: ['A way out of a public building or vehicle', 'To go out of or leave a place'] },
    { word: 'FILM', difficulty: 3, hints: ['A story or event recorded by a camera as a set of moving images', 'A thin layer of something'] },
    { word: 'GOLD', difficulty: 3, hints: ['A yellow precious metal', 'A colour'] },
    { word: 'IDEA', difficulty: 3, hints: ['A thought or suggestion as to a possible course of action', 'A concept or mental impression'] },
    { word: 'KING', difficulty: 3, hints: ['The male ruler of an independent state', 'The most important chess piece'] },
    { word: 'LOVE', difficulty: 3, hints: ['An intense feeling of deep affection', 'A score of zero in tennis'] },
    { word: 'APPLE', difficulty: 3, hints: ['A round fruit with firm, white flesh and a green or red skin', 'A tech company logo'] },
    { word: 'BEACH', difficulty: 4, hints: ['A pebbly or sandy shore', 'An area of sand sloping down to the water of a sea or lake'] },
    { word: 'BRAIN', difficulty: 4, hints: ['An organ of soft nervous tissue contained in the skull', 'The centre of the nervous system'] },
    { word: 'DANCE', difficulty: 4, hints: ['Move rhythmically to music', 'A social gathering for dancing'] },
    { word: 'EARTH', difficulty: 4, hints: ['The planet on which we live', 'The substance of the land surface; soil'] },
    { word: 'FORCE', difficulty: 4, hints: ['Strength or energy as an attribute of physical action or movement', 'Coercion or compulsion'] },
    { word: 'GLASS', difficulty: 4, hints: ['A hard, brittle substance, typically transparent or translucent', 'A container for drinking from'] },
    { word: 'HEART', difficulty: 4, hints: ['A hollow muscular organ that pumps the blood', 'The centre of a person\'s thoughts and emotions'] },
    { word: 'INPUT', difficulty: 4, hints: ['What is put in, taken in, or operated on by any process or system', 'Contribution of information'] },
    { word: 'JAPAN', difficulty: 4, hints: ['An island country in East Asia', 'The land of the rising sun'] },
    { word: 'ACTION', difficulty: 4, hints: ['The fact or process of doing something', 'A thing done; a deed'] },
    { word: 'BRIDGE', difficulty: 5, hints: ['A structure carrying a road, path, railway, etc. across a river, road, or other obstacle', 'A card game'] },
    { word: 'CHOICE', difficulty: 5, hints: ['An act of selecting or making a decision', 'A range of possibilities'] },
    { word: 'CLIENT', difficulty: 5, hints: ['A person or organization using the services of a professional person or company', 'A customer'] },
    { word: 'CREDIT', difficulty: 5, hints: ['The ability of a customer to obtain goods or services before payment', 'Public acknowledgement or praise'] },
    { word: 'DESIGN', difficulty: 5, hints: ['A plan or drawing produced to show the look and function of something before it is built', 'To create a plan for something'] },
    { word: 'EFFECT', difficulty: 5, hints: ['A change which is a consequence or result of an action or other cause', 'The lighting, sound, or scenery used in a play or film'] },
    { word: 'ENERGY', difficulty: 5, hints: ['The strength and vitality required for sustained physical or mental activity', 'Power derived from the utilization of physical or chemical resources'] },
    { word: 'FLIGHT', difficulty: 5, hints: ['The action or process of flying through the air', 'An aeroplane trip'] },
    { word: 'FUTURE', difficulty: 5, hints: ['The time or a period of time following the moment of speaking or writing', 'What will happen to someone or something'] },
    { word: 'HAPPY', difficulty: 3, hints: ['Feeling or showing pleasure or contentment', 'Fortunate and convenient'] },
    { word: 'LIGHT', difficulty: 3, hints: ['The natural agent that stimulates sight and makes things visible', 'Not heavy'] },
    { word: 'MUSIC', difficulty: 3, hints: ['Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion', 'The art of arranging sounds in time'] },
    { word: 'WATER', difficulty: 3, hints: ['A transparent, odourless, tasteless liquid', 'Essential for life'] },
    { word: 'YOUTH', difficulty: 4, hints: ['The period between childhood and adult age', 'The quality of being young'] },
    { word: 'TABLE', difficulty: 2, hints: ['A piece of furniture with a flat top and one or more legs', 'A systematic arrangement of data'] },
    { word: 'CHAIR', difficulty: 2, hints: ['A separate seat for one person, typically with a back and four legs', 'The person in charge of a meeting'] },
    { word: 'HOUSE', difficulty: 2, hints: ['A building for human habitation', 'A family or household'] },
    { word: 'PLANT', difficulty: 3, hints: ['A living organism of the kind exemplified by trees, shrubs, herbs, grasses, ferns, and mosses', 'A place where an industrial or manufacturing process takes place'] },
    { word: 'GREEN', difficulty: 2, hints: ['Of the colour between blue and yellow in the spectrum', 'Environmentally friendly'] },
    { word: 'BLACK', difficulty: 2, hints: ['Of the very darkest colour owing to the absence of or complete absorption of light', 'Evil or harmful'] },
    { word: 'WHITE', difficulty: 2, hints: ['Of the colour of milk or fresh snow', 'Pure and innocent'] },
    { word: 'SMALL', difficulty: 2, hints: ['Of a size that is less than normal or usual', 'Not great in amount or degree'] },
    { word: 'LARGE', difficulty: 2, hints: ['Of considerable or relatively great size, extent, or capacity', 'Generous or extensive'] },
    { word: 'BUILD', difficulty: 3, hints: ['Construct (something, typically a building, road, or machine) by putting parts or materials together', 'The physique of a human body'] },
    { word: 'DRINK', difficulty: 3, hints: ['Take (a liquid) into the mouth and swallow', 'An amount of liquid for drinking'] },
    { word: 'SLEEP', difficulty: 3, hints: ['A condition of body and mind such as that which typically occurs every night', 'To be in a state of rest'] },
    { word: 'WRITE', difficulty: 3, hints: ['Mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or other implement', 'Compose (a text)'] },
    { word: 'READ', difficulty: 3, hints: ['Look at and comprehend the meaning of (written or printed matter)', 'To interpret or understand'] },
    { word: 'TEACH', difficulty: 4, hints: ['Impart knowledge to (someone) or instruct (someone) how to do something', 'To train to do something'] },
    { word: 'LEARN', difficulty: 4, hints: ['Gain or acquire knowledge of or skill in (something) by study, experience, or being taught', 'To memorize'] },
    { word: 'PHONE', difficulty: 3, hints: ['A telephone', 'To make a call to (someone) using a telephone'] },
    { word: 'WATCH', difficulty: 3, hints: ['Look at (someone or something) for an period of time, especially for something to happen', 'A small timepiece worn on the wrist'] },
    { word: 'MONEY', difficulty: 3, hints: ['A current medium of exchange in the form of coins and banknotes', 'Wealth regarded collectively'] },
    { word: 'POWER', difficulty: 4, hints: ['The ability or capacity to do something or act in a particular way', 'Energy that is produced by mechanical, electrical, or other means'] },
    { word: 'VALUE', difficulty: 4, hints: ['The regard that something is held to deserve; the importance, worth, or usefulness of something', 'To estimate the monetary worth of (something)'] },
    { word: 'VOICE', difficulty: 3, hints: ['The sound produced in a person\'s larynx and uttered through the mouth, as speech or song', 'An opinion or wish expressed'] },
    { word: 'WORLD', difficulty: 3, hints: ['The earth, together with all its countries and peoples', 'A particular section of the earth\'s surface'] },
    { word: 'PLACE', difficulty: 2, hints: ['A particular position, point, or area in space; a location', 'To put in a particular position'] },
    { word: 'RIVER', difficulty: 2, hints: ['A large natural stream of water flowing in a channel to the sea, a lake, or another such stream', 'A copious flow of something'] },
    { word: 'CLOUD', difficulty: 2, hints: ['A visible mass of condensed water vapour floating in the atmosphere, typically high above the general level of the ground', 'A state of gloom, suspicion, or anxiety'] },
    { word: 'FIELD', difficulty: 3, hints: ['An area of open land, especially one planted with crops or pasture, typically bounded by hedges or fences', 'A particular branch of study or sphere of activity or interest'] },
    { word: 'QUEST', difficulty: 3, hints: ['A long or arduous search for something', 'To search for something'] },
    { word: 'START', difficulty: 3, hints: ['The point in time or space at which something begins', 'To begin (an activity or venture)'] },
    { word: 'TRADE', difficulty: 3, hints: ['The action of buying and selling goods and services', 'A skilled craft, especially one requiring manual dexterity'] },
    { word: 'UNITY', difficulty: 4, hints: ['The state of being united or joined as a whole', 'The quality of forming a pleasing and consistent whole'] },
    { word: 'VALID', difficulty: 4, hints: ['(of an argument or point) having a sound basis in logic or fact; reasonable or cogent', 'Legally binding'] },
    { word: 'WAGON', difficulty: 3, hints: ['A vehicle used for transporting goods or another specified purpose', 'A shopping trolley'] },
    { word: 'YACHT', difficulty: 3, hints: ['A medium-sized sailboat equipped for cruising or racing', 'A relatively small ship for pleasure cruises or racing'] },
    { word: 'ZERO', difficulty: 2, hints: ['The numerical symbol 0 indicating an absence of quantity or magnitude', 'A non-existent or negligible amount or quantity'] },
    { word: 'QUEST', difficulty: 3, hints: ['A long or arduous search for something', 'To search for something'] },
    { word: 'SOLAR', difficulty: 3, hints: ['Relating to or determined by the sun', 'Using the sun\'s energy'] },
    { word: 'SHAPE', difficulty: 3, hints: ['The external form or appearance characteristic of someone or something; the outline of an area or figure', 'To give a particular form or impression to'] },
    { word: 'ROUND', difficulty: 3, hints: ['Having the shape of a circle or cylinder', 'A series of events or actions forming part of a larger sequence'] },
    { word: 'PEACE', difficulty: 3, hints: ['Freedom from disturbance; tranquillity', 'A state or period in which there is no war'] },
    { word: 'OCEAN', difficulty: 3, hints: ['A very large expanse of sea, in particular each of the main areas of sea on the earth', 'An immense quantity of something'] },
    { word: 'LUCKY', difficulty: 3, hints: ['Having, bringing, or resulting from good luck', 'Fortunate'] },
    { word: 'GRANT', difficulty: 4, hints: ['Agree to give or allow (something requested) to', 'A sum of money given by a government or other organization'] },
    { word: 'FRONT', difficulty: 3, hints: ['The side or part of an object that presents itself to view or that is normally seen or used first', 'A facade or appearance'] },
    { word: 'CROSS', difficulty: 3, hints: ['A mark, object, or figure formed by two short intersecting lines or pieces', 'To go across or to the other side of (an area, road, or line)'] },
    { word: 'DRIVE', difficulty: 3, hints: ['Operate and control a car, bus, or other vehicle', 'An innate, typically fixed pattern of behavior'] },
    { word: 'DREAM', difficulty: 3, hints: ['A series of thoughts, images, and sensations occurring in a person\'s mind during sleep', 'A cherished aspiration, ambition, or ideal'] },
    { word: 'COVER', difficulty: 3, hints: ['Put something on top of or in front of (something else) in order to protect or conceal it', 'Provide with an alibi'] },
    { word: 'CHASE', difficulty: 3, hints: ['Pursue in order to catch or catch up with', 'A pursuit'] },
    { word: 'CATCH', difficulty: 3, hints: ['Intercept and hold (something which has been thrown, propelled, or dropped)', 'An unexpected problem'] },
    { word: 'BREAK', difficulty: 3, hints: ['Separate into pieces as a result of a blow, shock, or strain', 'An interruption of continuity or uniformity'] },
    { word: 'BLEND', difficulty: 3, hints: ['Mix (a substance) with another substance so that they combine together', 'A mixture of different substances'] },
    { word: 'BLIND', difficulty: 3, hints: ['Unable to see', 'To deprive of sight'] },
    { word: 'BEGIN', difficulty: 3, hints: ['Start; perform or undergo the first part of (an action or activity)', 'To come into being'] },
    { word: 'BEING', difficulty: 3, hints: ['Existence', 'A living thing'] },
    { word: 'BASIC', difficulty: 3, hints: ['Forming an essential foundation or starting point; fundamental', 'Having a simple or unsophisticated form'] },
    { word: 'AHEAD', difficulty: 3, hints: ['Further forward in space; in the line of one\'s forward motion', 'In front'] },
    { word: 'ACUTE', difficulty: 3, hints: ['(of a bad, difficult, or unwelcome situation or phenomenon) present or experienced to a severe or intense degree', 'Having or showing a perceptive understanding or insight'] },
    { word: 'ADAPT', difficulty: 3, hints: ['Make (something) suitable for a new use or purpose; modify', 'Become adjusted to new conditions'] },
    { word: 'ADMIT', difficulty: 3, hints: ['Confess to be true or to be the case, typically with reluctance', 'Allow (someone) to enter a place'] },
    { word: 'ADULT', difficulty: 3, hints: ['A person who is fully grown or developed', 'Mature and developed'] },
    { word: 'APART', difficulty: 3, hints: ['(of two or more people or things) separated by a distance; at a distance from one another', 'Into pieces'] },
    { word: 'AVOID', difficulty: 3, hints: ['Keep away from or stop oneself from doing (something)', 'To refrain from'] },
    { word: 'AWARD', difficulty: 3, hints: ['Give (something) as an official prize or recompense to', 'A prize or other mark of recognition'] },
    { word: 'BLAME', difficulty: 3, hints: ['Assign responsibility for a fault or wrong to', 'Censorship or criticism'] },
    { word: 'BREAK', difficulty: 3, hints: ['Separate into pieces as a result of a blow, shock, or strain', 'An interruption of continuity or uniformity'] },
    { word: 'BRING', difficulty: 3, hints: ['Take or go with (someone or something) to a place', 'To cause to come into being'] },
    { word: 'CARRY', difficulty: 3, hints: ['Support and move (someone or something) from one place to another', 'To convey'] },
    { word: 'CLOSE', difficulty: 3, hints: ['(of a distance or interval) short; not far apart', 'To shut (something)'] },
    { word: 'COURT', difficulty: 3, hints: ['A body of people presided over by a judge, judges, or magistrate, and acting as a tribunal in civil and criminal cases', 'An area marked out for playing a ball game'] },
    { word: 'CRAZY', difficulty: 3, hints: ['Mad, especially as manifested in wild or aggressive behavior', 'Extremely enthusiastic'] },
    { word: 'CRIME', difficulty: 3, hints: ['An action or omission which constitutes an offense that may be prosecuted by the state and is punishable by law', 'An evil or immoral act'] },
    { word: 'DAILY', difficulty: 3, hints: ['Done, produced, or occurring every day or every weekday', 'A newspaper published every day'] },
    { word: 'DEATH', difficulty: 3, hints: ['The action or fact of dying or being killed', 'The end of the life of a person or organism'] },
    { word: 'DEEP', difficulty: 3, hints: ['Extending a long way down from the top or surface', 'Very intense or extreme'] },
    { word: 'DRIVE', difficulty: 3, hints: ['Operate and control a car, bus, or other vehicle', 'An innate, typically fixed pattern of behavior'] },
    { word: 'EAGER', difficulty: 3, hints: ['(of a person) wanting to do or have something very much', 'Keen or enthusiastic'] },
    { word: 'EASY', difficulty: 3, hints: ['Achieved without great effort; presenting few difficulties', 'Free from anxiety or discomfort'] },
    { word: 'EMPTY', difficulty: 3, hints: ['Containing nothing; not filled or occupied', 'To remove all the contents of (a container)'] },
    { word: 'FIGHT', difficulty: 3, hints: ['Take part in a violent struggle involving the exchange of blows or the use of weapons', 'A quarrel or conflict'] },
    { word: 'FINAL', difficulty: 3, hints: ['Last in a series, process, or progress; ultimate', 'A concluding part or session'] },
    { word: 'FIXED', difficulty: 3, hints: ['(of a thing) fastened securely in position and not able to be moved', 'Determined or decided in advance'] },
    { word: 'FLAT', difficulty: 3, hints: ['Having a level surface; without a slope or curve', 'An apartment'] },
    { word: 'FLYING', difficulty: 3, hints: ['Moving through the air with wings', 'Very quick'] },
    { word: 'FRESH', difficulty: 3, hints: ['(of food) not previously frozen, canned, or cooked', 'New or different'] },
    { word: 'FRONT', difficulty: 3, hints: ['The side or part of an object that presents itself to view or that is normally seen or used first', 'A facade or appearance'] },
    { word: 'FUNNY', difficulty: 3, hints: ['Causing laughter or amusement; humorous', 'Difficult to explain'] },
    { word: 'GATES', difficulty: 3, hints: ['A hinged barrier used to close an opening in a wall, fence, or hedge', 'A place that serves as a point of entry or exit'] },
    { word: 'GIVEN', difficulty: 3, hints: ['Stated or specified', 'A known or established fact'] },
    { word: 'GREAT', difficulty: 3, hints: ['Of an extent, amount, or intensity considerably above the normal or average', 'Remarkable or outstanding'] },
    { word: 'GREEN', difficulty: 3, hints: ['Of a colour between blue and yellow in the spectrum; coloured like grass or emeralds', 'Environmentally friendly'] },
    { word: 'GROUP', difficulty: 3, hints: ['A number of people or things that are located, gathered, or classed together', 'To form into a group'] },
    { word: 'HALF', difficulty: 3, hints: ['Either of two equal or corresponding parts into which something is or can be divided', 'Approximately one half'] },
    { word: 'HAPPY', difficulty: 3, hints: ['Feeling or showing pleasure or contentment', 'Fortunate and convenient'] },
    { word: 'HARD', difficulty: 3, hints: ['Solid, firm, or rigid; not easily broken, bent, or pierced', 'Difficult to do or understand'] },
    { word: 'HEAVY', difficulty: 3, hints: ['Of great weight; difficult to lift or move', 'Of high density'] },
    { word: 'HELLO', difficulty: 2, hints: ['A greeting used when meeting or telephoning someone', 'An exclamation to express surprise'] },
    { word: 'HENCE', difficulty: 3, hints: ['As a consequence; for this reason', 'From now (used after a period of time)'] },
    { word: 'HOLE', difficulty: 3, hints: ['A hollow place in a solid body or surface', 'A gap or opening'] },
    { word: 'HOPE', difficulty: 3, hints: ['A feeling of expectation and desire for a certain thing to happen', 'To wish for something to happen'] },
    { word: 'HOUSE', difficulty: 3, hints: ['A building for human habitation', 'A family or household'] },
    { word: 'HUMAN', difficulty: 3, hints: ['Relating to or characteristic of humankind', 'A human being'] },
    { word: 'IDEAL', difficulty: 3, hints: ['Satisfying one\'s conception of what is perfect; most suitable', 'Conceived as perfect'] },
    { word: 'ISSUE', difficulty: 3, hints: ['An important topic or problem for debate or discussion', 'To supply or provide (something)'] },
    { word: 'JOINT', difficulty: 3, hints: ['A point at which parts of an artificial structure are joined', 'A place where two or more bones meet'] },
    { word: 'JUDGE', difficulty: 3, hints: ['A public officer appointed to decide cases in a law court', 'To form an opinion or conclusion about'] },
    { word: 'JUMP', difficulty: 3, hints: ['Push oneself off a surface and into the air by using the muscles in one\'s legs and feet', 'A sudden increase or rise'] },
    { word: 'KIND', difficulty: 3, hints: ['A group of people or things having similar characteristics', 'Having or showing a friendly, generous, and considerate nature'] },
    { word: 'LATER', difficulty: 3, hints: ['At a subsequent time', 'At a time in the future or after the present'] },
    { word: 'LEAVE', difficulty: 3, hints: ['Go away from', 'Permission to do something'] },
    { word: 'LEVEL', difficulty: 3, hints: ['A flat, horizontal surface', 'A relative position or standing'] },
    { word: 'LIMIT', difficulty: 3, hints: ['A point or level beyond which something does not or may not extend or pass', 'To restrict or confine'] },
    { word: 'LINES', difficulty: 3, hints: ['A long, narrow mark or band', 'A connection between two or more points'] },
    { word: 'LIVING', difficulty: 3, hints: ['(of a person, animal, or plant) alive', 'The means of earning one\'s livelihood'] },
    { word: 'LOCAL', difficulty: 3, hints: ['Relating or restricted to a particular area or one\'s neighbourhood', 'A pub'] },
    { word: 'LONG', difficulty: 3, hints: ['Measuring a great distance from end to end', 'To have a strong desire for'] },
    { word: 'LOOSE', difficulty: 3, hints: ['Not firmly or tightly fixed in place; detached or able to be detached', 'Not exact or precise'] },
    { word: 'LOWER', difficulty: 3, hints: ['Reduce (something) in amount, extent, or intensity', 'To move something to a lower position'] },
    { word: 'MAGIC', difficulty: 3, hints: ['The power of apparently influencing the course of events by using mysterious or supernatural forces', 'A quality that makes something special'] },
    { word: 'MAINE', difficulty: 3, hints: ['A state in the northeastern United States', 'A type of cat'] },
    { word: 'MAJOR', difficulty: 3, hints: ['Important, serious, or significant', 'A senior military officer'] },
    { word: 'MAKER', difficulty: 3, hints: ['A person or thing that makes or produces something', 'The creator'] },
    { word: 'MARCH', difficulty: 3, hints: ['Walk in a military manner with a regular measured tread', 'The third month of the year'] },
    { word: 'MATCH', difficulty: 3, hints: ['A contest in which people or teams compete against each other', 'To correspond or be equal'] },
    { word: 'MEANS', difficulty: 3, hints: ['A method, course of action, or instrument by which something can be accomplished', 'Money or resources'] },
    { word: 'MIGHT', difficulty: 3, hints: ['(used to express possibility)', 'Great power, strength, or influence'] },
    { word: 'MINOR', difficulty: 3, hints: ['Of lesser importance, seriousness, or significance', 'A person under the age of full legal responsibility'] },
    { word: 'MODEL', difficulty: 3, hints: ['A three-dimensional representation of a person or thing or of a proposed structure', 'A person employed to display clothes or other merchandise'] },
    { word: 'MONTH', difficulty: 3, hints: ['Each of the twelve periods into which a year is divided', 'A period of about 30 days'] },
    { word: 'MORAL', difficulty: 3, hints: ['Concerned with the principles of right and wrong behavior and the goodness or badness of human character', 'A lesson, especially one concerning what is right or prudent'] },
    { word: 'MOUTH', difficulty: 3, hints: ['The opening in the lower part of the human face, surrounded by the lips, through which food is taken in', 'The opening of a cave'] },
    { word: 'MOVIE', difficulty: 3, hints: ['A motion picture', 'A cinema film'] },
    { word: 'MUSIC', difficulty: 3, hints: ['Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion', 'The art of arranging sounds in time'] },
    { word: 'NIGHT', difficulty: 3, hints: ['The period of darkness in each twenty-four hours', 'The time from sunset to sunrise'] },
    { word: 'NORTH', difficulty: 3, hints: ['The direction along the meridian in the direction of the North Pole', 'One of the four cardinal points of the compass'] },
    { word: 'NOTES', difficulty: 3, hints: ['A brief record of facts, topics, or thoughts, written down as an aid to memory', 'A musical sound of a particular pitch'] },
    { word: 'NOVEL', difficulty: 3, hints: ['A fictitious prose narrative of book length, typically representing character and action with some degree of realism', 'New or unusual in an interesting way'] },
    { word: 'OCEAN', difficulty: 3, hints: ['A very large expanse of sea, in particular each of the main areas of sea on the earth', 'An immense quantity of something'] },
    { word: 'OFFER', difficulty: 3, hints: ['Present or proffer (something) for (someone) to accept or reject', 'An expression of readiness to do or give something'] },
    { word: 'ORDER', difficulty: 3, hints: ['The arrangement or disposition of people or things in relation to each other according to a particular sequence, pattern, or method', 'A command or instruction'] },
    { word: 'OTHER', difficulty: 3, hints: ['Used to refer to a person or thing that is different or distinct from one already mentioned or known', 'Additional'] },
    { word: 'OWNER', difficulty: 3, hints: ['A person who owns something', 'One who has legal title'] },
    { word: 'PAINT', difficulty: 3, hints: ['A coloured substance which is spread over a surface and dries to form a thin decorative or protective coating', 'To apply paint to (a surface)'] },
    { word: 'PAPER', difficulty: 3, hints: ['Material manufactured in thin sheets from the pulp of wood or other fibrous substances, used for writing, drawing, or printing on', 'A newspaper'] },
    { word: 'PARTY', difficulty: 3, hints: ['A social gathering of people for entertainment or pleasure', 'A formally constituted political group'] },
    { word: 'PEACE', difficulty: 3, hints: ['Freedom from disturbance; tranquillity', 'A state or period in which there is no war'] },
    { word: 'PHONE', difficulty: 3, hints: ['A telephone', 'To make a call to (someone) using a telephone'] },
    { word: 'PLACE', difficulty: 3, hints: ['A particular position, point, or area in space; a location', 'To put in a particular position'] },
    { word: 'PLANE', difficulty: 3, hints: ['A flat surface in which a straight line joining any two points on it would wholly lie', 'An aeroplane'] },
    { word: 'POINT', difficulty: 3, hints: ['The tapered, sharp, or rounded end of an implement, tool, or weapon', 'A particular spot, place, or position'] },
    { word: 'POUND', difficulty: 3, hints: ['A unit of weight equal to 16 oz. avoirdupois (0.4536 kg)', 'To strike or hit heavily and repeatedly'] },
    { word: 'POWER', difficulty: 3, hints: ['The ability or capacity to do something or act in a particular way', 'Energy that is produced by mechanical, electrical, or other means'] },
    { word: 'PRICE', difficulty: 3, hints: ['The amount of money expected, required, or given in payment for something', 'To fix the price of (something)'] },
    { word: 'PRINT', difficulty: 3, hints: ['Produce (books, newspapers, etc.), especially in large quantities, by a mechanical process involving the transfer of text or designs from inked plates to paper', 'Marks made by ink'] },
    { word: 'PROOF', difficulty: 3, hints: ['Evidence or argument establishing a fact or the truth of a statement', 'To protect (something) against a harmful agency'] },
    { word: 'QUERY', difficulty: 3, hints: ['A question, especially one addressed to an official or organization', 'To ask a question about (something)'] },
    { word: 'RADIO', difficulty: 3, hints: ['The transmission and reception of electromagnetic waves bearing encoded information', 'A device used for receiving radio broadcasts'] },
    { word: 'RAISE', difficulty: 3, hints: ['Lift or move to a higher position or level', 'An increase in salary'] },
    { word: 'RANGE', difficulty: 3, hints: ['The area of variation between upper and lower limits on a particular scale', 'A set of different things of the same general type'] },
    { word: 'RATES', difficulty: 3, hints: ['A measure, quantity, or frequency, typically one measured against another quantity or measure', 'To assign a particular value or standard to (something)'] },
    { word: 'READY', difficulty: 3, hints: ['In a suitable state for an activity, action, or situation; fully prepared', 'Willing to do something'] },
    { word: 'RIGHT', difficulty: 3, hints: ['Morally good, justified, or acceptable', 'A moral or legal entitlement'] },
    { word: 'RIVER', difficulty: 3, hints: ['A large natural stream of water flowing in a channel to the sea, a lake, or another such stream', 'A copious flow of something'] },
    { word: 'ROUTE', difficulty: 3, hints: ['A way taken in getting from a starting point to a destination', 'To send (someone or something) by a particular route'] },
    { word: 'ROUND', difficulty: 3, hints: ['Having the shape of a circle or cylinder', 'A series of events or actions forming part of a larger sequence'] },
    { word: 'RULES', difficulty: 3, hints: ['One of a set of explicit or understood regulations or principles governing conduct or procedure within a particular area of activity', 'To exercise ultimate power or authority over (an area)'] },
    { word: 'SALES', difficulty: 3, hints: ['The exchange of a commodity for money; the action of selling something', 'The department in a company that is responsible for selling products'] },
    { word: 'SAVE', difficulty: 3, hints: ['Keep safe or rescue (someone or something) from harm or danger', 'To retain possession of (something)'] },
    { word: 'SCALE', difficulty: 3, hints: ['A set of marks or lines used for measuring something', 'The relative size or extent of something'] },
    { word: 'SCORE', difficulty: 3, hints: ['The number of points, goals, runs, etc. achieved in a game or contest', 'To gain (a point or goal) in a game'] },
    { word: 'SEATS', difficulty: 3, hints: ['A thing made or used for sitting on, such as a chair or stool', 'To provide with a seat'] },
    { word: 'SENSE', difficulty: 3, hints: ['A faculty by which external objects or states of the body are perceived', 'A feeling or sensation'] },
    { word: 'SHARE', difficulty: 3, hints: ['A part or portion of a larger amount which is divided among a number of people', 'To have or use (something) in common with others'] },
    { word: 'SHEET', difficulty: 3, hints: ['A broad, flat piece of material or fabric', 'A piece of paper'] },
    { word: 'SHIFT', difficulty: 3, hints: ['To move or cause to move from one place to another, especially over a small distance', 'A period of work'] },
    { word: 'SHIPS', difficulty: 3, hints: ['A large boat for transporting people or goods by sea', 'To send (goods) by ship'] },
    { word: 'SHORT', difficulty: 3, hints: ['Measuring a small distance from end to end', 'Abrupt or succinct'] },
    { word: 'SHOWS', difficulty: 3, hints: ['Allow (something) to be seen; display', 'A theatrical performance or other public entertainment'] },
    { word: 'SIGHT', difficulty: 3, hints: ['The faculty of seeing', 'A thing that one sees or that can be seen'] },
    { word: 'SIGNS', difficulty: ['An object, quality, or event whose presence or occurrence indicates the probable presence or occurrence of something else', 'To write one\'s name on (something) to authorize it'] },
    { word: 'SIZE', difficulty: 3, hints: ['The relative extent of something; a thing\'s overall dimensions or magnitude', 'To modify or adapt according to size'] },
    { word: 'SLEEP', difficulty: 3, hints: ['A condition of body and mind such as that which typically occurs every night', 'To be in a state of rest'] },
    { word: 'SMALL', difficulty: 3, hints: ['Of a size that is less than normal or usual', 'Not great in amount or degree'] },
    { word: 'SOUND', difficulty: 3, hints: ['Vibrations that travel through the air or another medium and can be heard when they reach a person\'s or animal\'s ear', 'In good condition'] },
    { word: 'SOUTH', difficulty: 3, hints: ['The direction along the meridian in the direction of the South Pole', 'One of the four cardinal points of the compass'] },
    { word: 'SPACE', difficulty: 3, hints: ['A continuous area or expanse which is free, available, or unoccupied', 'The physical universe beyond the earth\'s atmosphere'] },
    { word: 'SPEAK', difficulty: 3, hints: ['Say something in order to express one\'s opinion, intention, or feelings', 'To communicate with (someone)'] },
    { word: 'SPEED', difficulty: 3, hints: ['The rate at which someone or something is able to move or operate', 'To move quickly'] },
    { word: 'SPEND', difficulty: 3, hints: ['Pay out (money) in buying or hiring goods or services', 'To pass (time) in a specified way'] },
    { word: 'SPORT', difficulty: 3, hints: ['An activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment', 'To wear (something) conspicuously'] },
    { word: 'STAGE', difficulty: 3, hints: ['A point, period, or step in a process or development', 'A raised platform in a theatre'] },
    { word: 'STAND', difficulty: 3, hints: ['Have or maintain an upright position, supported by one\'s feet', 'A position or attitude'] },
    { word: 'STAFF', difficulty: 3, hints: ['All the people employed by a particular organization', 'A long stick used as a weapon or for support'] },
    { word: 'STEEL', difficulty: 3, hints: ['A hard, strong, grey or bluish-grey alloy of iron with carbon', 'To mentally prepare oneself to do or face something difficult'] },
    { word: 'STEPS', difficulty: ['A step in walking or running', 'A means to an end'] },
    { word: 'STICK', difficulty: 3, hints: ['A thin piece of wood that has fallen or been cut off a tree', 'To adhere or cling to (a surface or substance)'] },
    { word: 'STONE', difficulty: 3, hints: ['A hard solid non-metallic mineral matter of which rock is made', 'To throw stones at'] },
    { word: 'STORE', difficulty: 3, hints: ['Keep or accumulate (something) for future use', 'A shop'] },
    { word: 'STORY', difficulty: 3, hints: ['An account of imaginary or real people and events told for entertainment', 'A floor or level of a building'] },
    { word: 'STUDY', difficulty: 3, hints: ['The devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books', 'A room used for reading, writing, or academic work'] },
    { word: 'STYLE', difficulty: 3, hints: ['A distinctive appearance, typically determined by the principles according to which something is designed', 'To design or make in a particular form'] },
    { word: 'SUGAR', difficulty: 3, hints: ['A sweet crystalline substance obtained from various plants', 'To sweeten or coat with sugar'] },
    { word: 'SUITE', difficulty: 3, hints: ['A set of rooms designated for one person\'s or family\'s use or for a particular purpose', 'A set of musical compositions'] },
    { word: 'TABLE', difficulty: 3, hints: ['A piece of furniture with a flat top and one or more legs', 'A systematic arrangement of data'] },
    { word: 'TAKEN', difficulty: 3, hints: ['Past participle of take', 'Understood or assumed'] },
    { word: 'TALKS', difficulty: ['Engage in spoken communication; speak', 'An informal discussion or conversation'] },
    { word: 'TALL', difficulty: 3, hints: ['Of great or more than average height, especially (in reference to an object) relative to width', '(of a story or claim) difficult to believe'] },
    { word: 'TASKS', difficulty: ['A piece of work to be done or undertaken', 'To assign a task to (someone)'] },
    { word: 'TEACH', difficulty: 3, hints: ['Impart knowledge to (someone) or instruct (someone) how to do something', 'To train to do something'] },
    { word: 'TEAMS', difficulty: ['A group of players forming one side in a sporting contest', 'To come together as a team'] },
    { word: 'TELL', difficulty: 3, hints: ['Communicate information, facts, or news to someone in spoken or written words', 'To discern or distinguish'] },
    { word: 'TESTS', difficulty: ['A procedure intended to establish the quality, performance, or reliability of something', 'To take a test'] },
    { word: 'TEXAS', difficulty: 3, hints: ['A state in the south central United States', 'A type of poker game'] },
    { word: 'THINK', difficulty: 3, hints: ['Have a particular opinion, belief, or idea', 'To consider or deliberate'] },
    { word: 'THIRD', difficulty: 3, hints: ['Constituting number three in a sequence', 'One of three equal parts of something'] },
    { word: 'THROW', difficulty: 3, hints: ['Propel (something) with force through the air by a movement of the arm and hand', 'A single act of throwing'] },
    { word: 'TIMES', difficulty: ['The indefinite continued progress of existence and events in the past, present, and future regarded as a whole', 'An instance or occasion'] },
    { word: 'TODAY', difficulty: 3, hints: ['On this present day', 'The present time'] },
    { word: 'TOTAL', difficulty: 3, hints: ['Comprising a whole number or amount', 'An aggregate amount'] },
    { word: 'TOUCH', difficulty: 3, hints: ['Come into contact with (something)', 'The sense of touch'] },
    { word: 'TRADE', difficulty: 3, hints: ['The action of buying and selling goods and services', 'A skilled craft, especially one requiring manual dexterity'] },
    { word: 'TRAIN', difficulty: 3, hints: ['Teach (a person or animal) a particular skill or type of behaviour through practice and instruction over a period of time', 'A series of railway carriages or wagons'] },
    { word: 'TRICK', difficulty: 3, hints: ['A cunning or skilful act or scheme intended to deceive or outwit someone', 'A practical joke'] },
    { word: 'TRUTH', difficulty: 3, hints: ['The quality or state of being true', 'A fact or belief that is accepted as true'] },
    { word: 'TYPES', difficulty: ['A category of people or things having common characteristics', 'To classify or categorize'] },
    { word: 'UNION', difficulty: 3, hints: ['The action or fact of joining or being joined, especially in a political context', 'A society or association formed by people with common interests'] },
    { word: 'UNITY', difficulty: 3, hints: ['The state of being united or joined as a whole', 'The quality of forming a pleasing and consistent whole'] },
    { word: 'UNTIL', difficulty: 3, hints: ['Up to the point in time or the event mentioned', 'Up to the time that'] },
    { word: 'UPPER', difficulty: 3, hints: ['Higher in position, status, or rank', 'The part of a shoe or boot above the sole'] },
    { word: 'URBAN', difficulty: 3, hints: ['In, relating to, or characteristic of a town or city', 'Denoting or characterized by a dense population'] },
    { word: 'USERS', difficulty: ['A person who uses or operates something', 'A consumer of a service'] },
    { word: 'VALUE', difficulty: 3, hints: ['The regard that something is held to deserve; the importance, worth, or usefulness of something', 'To estimate the monetary worth of (something)'] },
    { word: 'VIDEO', difficulty: 3, hints: ['The recording, reproducing, or broadcasting of moving visual images', 'A recording of moving visual images'] },
    { word: 'VIEWS', difficulty: ['The ability to see something or to be seen from a particular place', 'An opinion or assessment'] },
    { word: 'VISIT', difficulty: 3, hints: ['Go to see and spend time with (someone) socially or in order to help or advise them', 'An act of visiting'] },
    { word: 'VOICE', difficulty: 3, hints: ['The sound produced in a person\'s larynx and uttered through the mouth, as speech or song', 'An opinion or wish expressed'] },
    { word: 'WAITS', difficulty: ['Stay where one is or delay action until a particular time or event', 'A period of waiting'] },
    { word: 'WALKS', difficulty: ['Move at a regular pace by lifting and setting down each foot in turn, never having both feet off the ground at once', 'A journey on foot'] },
    { word: 'WALLS', difficulty: ['A continuous vertical brick or stone structure that encloses or divides an area of land', 'To enclose (an area) with a wall'] },
    { word: 'WANTS', difficulty: ['Have a desire to possess or do (something); wish for', 'Lack or absence of something desired or needed'] },
    { word: 'WATCH', difficulty: 3, hints: ['Look at (someone or something) for an period of time, especially for something to happen', 'A small timepiece worn on the wrist'] },
    { word: 'WATER', difficulty: 3, hints: ['A transparent, odourless, tasteless liquid', 'Essential for life'] },
    { word: 'WEARS', difficulty: ['Have (something) on one\'s body as clothing, decoration, or protection', 'Damage, erosion, or removal by friction or use'] },
    { word: 'WEBEX', difficulty: 3, hints: ['A platform for video conferencing and online meetings', 'A virtual meeting tool'] },
    { word: 'WEEKS', difficulty: ['A period of seven days', 'A specified week'] },
    { word: 'WHOLE', difficulty: 3, hints: ['All of something', 'A complete thing'] },
    { word: 'WIDTH', difficulty: 3, hints: ['The measurement or extent of something from side to side', 'A piece of material cut to a particular width'] },
    { word: 'WINGS', difficulty: ['A part of an animal\'s body that is used for flying', 'A part of a building that projects from the main part'] },
    { word: 'WISHES', difficulty: ['Desire (something) to happen or be the case', 'A desire or hope'] },
    { word: 'WORDS', difficulty: ['A single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side of it when written or printed', 'News or a message'] },
    { word: 'WORK', difficulty: ['Activity involving mental or physical effort done in order to achieve a purpose or result', 'To perform duties or functions'] },
    { word: 'WORLD', difficulty: 3, hints: ['The earth, together with all its countries and peoples', 'A particular section of the earth\'s surface'] },
    { word: 'WORRY', difficulty: ['Feel or cause to feel anxious or troubled about actual or potential problems', 'A state of anxiety and concern'] },
    { word: 'WORTH', difficulty: ['The value equivalent at any one time to a specified amount in another form', 'The quality that renders something desirable or useful'] },
    { word: 'WOULD', difficulty: ['Used to express the conditional mood', 'Past tense of will'] },
    { word: 'WRITE', difficulty: ['Mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or other implement', 'Compose (a text)'] },
    { word: 'WRONG', difficulty: ['Not correct or true', 'An unjust or immoral act'] },
    { word: 'YEARS', difficulty: ['The period of 365 or 366 days (in the Gregorian calendar) divided into 12 months, beginning from the first of January and ending on the thirty-first of December', 'Age'] },
    { word: 'YOUTH', difficulty: ['The period between childhood and adult age', 'The quality of being young'] },
    { word: 'ZERO', difficulty: ['The numerical symbol 0 indicating an absence of quantity or magnitude', 'A non-existent or negligible amount or quantity'] }
];

const POOL_TIER_3_ADVANCED = [
    // Difficulty 6-10 (University Graduate Level)
    { word: 'ABNEGATION', difficulty: 8, hints: ['The act of renouncing or rejecting something', 'Self-denial'] },
    { word: 'ABSTRUSE', difficulty: 9, hints: ['Difficult to understand; obscure', 'Esoteric'] },
    { word: 'ACERBIC', difficulty: 7, hints: ['(especially of a comment or style of speaking) sharp and forthright', 'Sour or bitter-tasting'] },
    { word: 'ACRIMONY', difficulty: 8, hints: ['Bitterness or ill feeling', 'Animosity'] },
    { word: 'ADUMBRATE', difficulty: 9, hints: ['Report or represent in outline; foreshadow or symbolize', 'To give a faint indication of'] },
    { word: 'ALACRITY', difficulty: 8, hints: ['Brisk and cheerful readiness', 'Eagerness'] },
    { word: 'ANOMALOUS', difficulty: 7, hints: ['Deviating from what is standard, normal, or expected', 'Irregular'] },
    { word: 'ANTITHETICAL', difficulty: 9, hints: ['Directly opposed or contrasted; mutually incompatible', 'Constituting an antithesis'] },
    { word: 'APHORISM', difficulty: 8, hints: ['A pithy observation that contains a general truth', 'A maxim'] },
    { word: 'APLOMB', difficulty: 7, hints: ['Self-confidence or assurance, especially when in a demanding situation', 'Poise'] },
    { word: 'APOSTASY', difficulty: 8, hints: ['The abandonment or renunciation of a religious or political belief', 'Defection'] },
    { word: 'ARBITRARY', difficulty: 7, hints: ['Based on random choice or personal whim, rather than any reason or system', 'Capricious'] },
    { word: 'ASSIDUOUS', difficulty: 8, hints: ['Showing great care and perseverance', 'Diligent'] },
    { word: 'CAUSTIC', difficulty: 7, hints: ['Able to burn or corrode organic tissue by chemical action', 'Sarcastic in a scathing and bitter way'] },
    { word: 'CHARY', difficulty: 8, hints: ['Cautiously or suspiciously reluctant to do something', 'Wary'] },
    { word: 'CIRCUMLOCUTION', difficulty: 9, hints: ['The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive', 'Indirect language'] },
    { word: 'COALESCE', difficulty: 7, hints: ['Come together to form one mass or whole', 'Merge'] },
    { word: 'COGENT', difficulty: 8, hints: ['(of an argument or case) clear, logical, and convincing', 'Persuasive'] },
    { word: 'COMMENSURATE', difficulty: 9, hints: ['Corresponding in size or degree; in proportion', 'Equivalent'] },
    { word: 'COMPENDIUM', difficulty: 8, hints: ['A collection of concise but detailed information about a particular subject', 'A summary'] },
    { word: 'CONCOMITANT', difficulty: 9, hints: ['Naturally accompanying or associated', 'Accompanying'] },
    { word: 'CONFLAGRATION', difficulty: 9, hints: ['An extensive fire which destroys a great deal of land or property', 'Inferno'] },
    { word: 'CONJECTURE', difficulty: 8, hints: ['An opinion or conclusion formed on the basis of incomplete information', 'A guess'] },
    { word: 'CONVIVIAL', difficulty: 7, hints: ['(of an atmosphere or event) friendly, lively, and enjoyable', 'Jovial'] },
    { word: 'CORROBORATE', difficulty: 8, hints: ['Confirm or give support to (a statement, theory, or finding)', 'Substantiate'] },
    { word: 'CREDULOUS', difficulty: 7, hints: ['Having or showing too great a readiness to believe things', 'Gullible'] },
    { word: 'DEBACLE', difficulty: 7, hints: ['A sudden and ignominious failure; a fiasco', 'A complete collapse'] },
    { word: 'DENOUEMENT', difficulty: 9, hints: ['The final part of a play, film, or narrative in which the strands of the plot are drawn together and matters are explained or resolved', 'The outcome'] },
    { word: 'DESULTORY', difficulty: 8, hints: ['Lacking a plan, purpose, or enthusiasm; going from one subject to another in a half-hearted way', 'Random'] },
    { word: 'DIAPHANOUS', difficulty: 9, hints: ['(especially of fabric) light, delicate, and translucent', 'Sheer'] },
    { word: 'DIFFIDENT', difficulty: 7, hints: ['Modest or shy because of a lack of self-confidence', 'Bashful'] },
    { word: 'DILETTANTE', difficulty: 8, hints: ['A person who cultivates an area of interest, such as the arts, without real commitment or knowledge', 'An amateur'] },
    { word: 'DISCOMFIT', difficulty: 7, hints: ['Make (someone) feel uneasy or embarrassed', 'To disconcert'] },
    { word: 'DISPARATE', difficulty: 7, hints: ['Essentially different in kind; not able to be compared', 'Contrasting'] },
    { word: 'DIVAGATE', difficulty: 8, hints: ['Stray from the main topic or line of argument in discussion or writing', 'To digress'] },
    { word: 'DULCET', difficulty: 7, hints: ['(especially of sound) sweet and soothing (often used ironically)', 'Melodious'] },
    { word: 'EBULLIENT', difficulty: 8, hints: ['Cheerful and full of energy', 'Exuberant'] },
    { word: 'ECLECTIC', difficulty: 7, hints: ['Deriving ideas, style, or taste from a broad and diverse range of sources', 'Diverse'] },
    { word: 'EFFLUVIA', difficulty: 8, hints: ['An unpleasant or unhealthy smell or discharge', 'Odour'] },
    { word: 'EGREGIOUS', difficulty: 8, hints: ['Outstandingly bad; shocking', 'Appalling'] },
    { word: 'ELUCIDATE', difficulty: 7, hints: ['Make (something) clear; explain', 'Clarify'] },
    { word: 'ENERVATE', difficulty: 8, hints: ['Cause (someone) to feel drained of energy or vitality; weaken', 'To debilitate'] },
    { word: 'EQUIVOCATE', difficulty: 8, hints: ['Use ambiguous language so as to conceal the truth or avoid committing oneself', 'To prevaricate'] },
    { word: 'ESCHEW', difficulty: 7, hints: ['Deliberately avoid using; abstain from', 'To shun'] },
    { word: 'EVANESCENT', difficulty: 9, hints: ['Soon passing out of sight, memory, or existence; quickly fading or disappearing', 'Fleeting'] },
    { word: 'EVINCE', difficulty: 7, hints: ['Reveal the presence of (a quality or feeling)', 'To indicate'] },
    { word: 'EXACERBATE', difficulty: 8, hints: ['Make (a problem, bad situation, or negative feeling) worse', 'To aggravate'] },
    { word: 'EXIGENT', difficulty: 8, hints: ['Pressing; demanding', 'Urgent'] },
    { word: 'EXORBITANT', difficulty: 7, hints: ['(of a price or amount charged) unreasonably high', 'Excessive'] },
    { word: 'EXPATIATE', difficulty: 8, hints: ['Speak or write at length or in detail', 'To elaborate'] },
    { word: 'EXPIATE', difficulty: 8, hints: ['Acknowledge and make amends for (guilt or wrongdoing)', 'To atone for'] },
    { word: 'EXTANT', difficulty: 7, hints: ['(especially of a document or recording) still in existence; surviving', 'Still existing'] },
    { word: 'EXTEMPORANEOUS', difficulty: 9, hints: ['Done without preparation; impromptu', 'Unrehearsed'] },
    { word: 'EXTOL', difficulty: 7, hints: ['Praise enthusiastically', 'To laud'] },
    { word: 'FACETIOUS', difficulty: 7, hints: ['Treating serious issues with deliberately inappropriate humour; flippant', 'Joking or humorous, especially in an inappropriate way'] },
    { word: 'FALLACIOUS', difficulty: 8, hints: ['Based on a mistaken belief', 'Misleading'] },
    { word: 'FASTIDIOUS', difficulty: 8, hints: ['Very attentive to and concerned about accuracy and detail', 'Scrupulous'] },
    { word: 'FEALTY', difficulty: 7, hints: ['A feudal tenant\'s or vassal\'s sworn loyalty to a lord', 'Allegiance'] },
    { word: 'FECUND', difficulty: 7, hints: ['Producing or capable of producing an abundance of offspring or new growth; fertile', 'Productive'] },
    { word: 'FEY', difficulty: 7, hints: ['(of a person) giving an impression of otherworldly delicacy or grace', 'Otherworldly or fairy-like'] },
    { word: 'FICKLE', difficulty: 7, hints: ['Changing frequently, especially as regards one\'s loyalties, interests, or affection', 'Capricious'] },
    { word: 'FILIBUSTER', difficulty: 9, hints: ['An action such as a prolonged speech that obstructs progress in a legislative assembly while not technically contravening the required procedures', 'Delaying tactic'] },
    { word: 'FLIPPANT', difficulty: 7, hints: ['Not showing a serious or respectful attitude', 'Frivolous'] },
    { word: 'FLOUT', difficulty: 7, hints: ['Openly disregard (a rule, law, or convention)', 'To defy'] },
    { word: 'FOIBLE', difficulty: 7, hints: ['A minor weakness or eccentricity in someone\'s character', 'A slight peculiarity'] },
    { word: 'FOREGO', difficulty: 7, hints: ['Go without (something desirable)', 'To abstain from'] },
    { word: 'FORTE', difficulty: 7, hints: ['A thing at which someone excels', 'A strong point'] },
    { word: 'FRACAS', difficulty: 7, hints: ['A noisy disturbance or quarrel', 'A brawl'] },
    { word: 'FRACTIOUS', difficulty: 8, hints: ['(typically of children) irritable and quarrelsome', 'Refractory or unruly'] },
    { word: 'FULSOME', difficulty: 8, hints: ['Complimentary or flattering to an excessive degree', 'Extravagant'] },
    { word: 'FURTIVE', difficulty: 7, hints: ['Attempting to avoid notice or attention, typically because of guilt or a belief that discovery would lead to trouble; secretive', 'Stealthy'] },
    { word: 'GAFFE', difficulty: 7, hints: ['An unintentional act or remark causing embarrassment to its originator; a blunder', 'A social faux pas'] },
    { word: 'GALVANIZE', difficulty: 8, hints: ['Shock or excite (someone) into taking action', 'To stimulate'] },
    { word: 'GARISH', difficulty: 7, hints: ['Obtrusively bright and showy; lurid', 'Flashy'] },
    { word: 'GARNER', difficulty: 7, hints: ['Gather or collect (something, especially information or approval)', 'To acquire'] },
    { word: 'GAUCHE', difficulty: 7, hints: ['Lacking ease or grace; unsophisticated and socially awkward', 'Clumsy'] },
    { word: 'GERMANE', difficulty: 7, hints: ['Relevant to a subject under consideration', 'Pertinent'] },
    { word: 'GIBBERISH', difficulty: 7, hints: ['Unintelligible or meaningless speech or writing; nonsense', 'Meaningless language'] },
    { word: 'GREGARIOUS', difficulty: 8, hints: ['(of a person) fond of company; sociable', 'Living in flocks or herds'] },
    { word: 'GUFFLAW', difficulty: 7, hints: ['A loud and hearty laugh', 'A burst of laughter'] },
    { word: 'HAPLESS', difficulty: 7, hints: ['(especially of a person) unfortunate', 'Luckless'] },
    { word: 'HARANGUE', difficulty: 8, hints: ['A lengthy and aggressive speech', 'To lecture (someone) at length in an aggressive and critical manner'] },
    { word: 'HETEROGENEOUS', difficulty: 9, hints: ['Diverse in character or content', 'Consisting of dissimilar elements'] },
    { word: 'HOMOGENEOUS', difficulty: 8, hints: ['Of the same kind; alike', 'Uniform in composition'] },
    { word: 'HUBRIS', difficulty: 7, hints: ['Excessive pride or self-confidence', 'Arrogance'] },
    { word: 'IGNOMINIOUS', difficulty: 9, hints: ['Deserving or causing public disgrace or shame', 'Humiliating'] },
    { word: 'IMPECUNIOUS', difficulty: 9, hints: ['Having little or no money', 'Penniless'] },
    { word: 'IMPERIOUS', difficulty: 7, hints: ['Assuming power or authority without justification; arrogant and domineering', 'Haughty'] },
    { word: 'IMPERTINENT', difficulty: 8, hints: ['Not showing proper respect; rude', 'Irrelevant'] },
    { word: 'IMPLACABLE', difficulty: 8, hints: ['Unable to be placated; relentless', 'Unstoppable'] },
    { word: 'IMPRUDENT', difficulty: 7, hints: ['Not showing care for the consequences of an action; rash', 'Unwise'] },
    { word: 'INADVERTENT', difficulty: 8, hints: ['Not resulting from or achieved through deliberate planning', 'Unintentional'] },
    { word: 'INCHOATE', difficulty: 9, hints: ['Just begun and so not fully formed or developed; rudimentary', 'Unformed'] },
    { word: 'INCESSANT', difficulty: 7, hints: ['(of something regarded as unpleasant) continuing without pause or interruption', 'Unceasing'] },
    { word: 'INCIPIENT', difficulty: 8, hints: ['In an initial stage; beginning to happen or develop', 'Emerging'] },
    { word: 'INCISIVE', difficulty: 7, hints: ['(of a person or mental process) intelligently analytical and clear-thinking', 'Penetrating'] },
    { word: 'INCONGRUOUS', difficulty: 8, hints: ['Not in harmony or keeping with the surroundings or other aspects of something', 'Incompatible'] },
    { word: 'INDULGENT', difficulty: 7, hints: ['Having or indicating a readiness or over-readiness to be generous with or tolerant of something', 'Permissive'] },
    { word: 'INEFFABLE', difficulty: 8, hints: ['Too great or extreme to be expressed or described in words', 'Indescribable'] },
    { word: 'INEXORABLE', difficulty: 9, hints: ['Impossible to stop or prevent', 'Relentless'] },
    { word: 'INGENUOUS', difficulty: 7, hints: ['(of a person or action) innocent and unsuspecting', 'Naïve'] },
    { word: 'INHERENT', difficulty: 7, hints: ['Existing in something as a permanent, essential, or characteristic attribute', 'Innate'] },
    { word: 'INIMICAL', difficulty: 8, hints: ['Tending to obstruct or harm', 'Hostile'] },
    { word: 'INNUENDO', difficulty: 7, hints: ['An allusive or oblique remark or hint, typically a suggestive or disparaging one', 'An insinuation'] },
    { word: 'INSATIABLE', difficulty: 8, hints: ['(of an appetite or desire) impossible to satisfy', 'Unquenchable'] },
    { word: 'INSIDIOUS', difficulty: 8, hints: ['Proceeding in a gradual, subtle way, but with harmful effects', 'Treacherous'] },
    { word: 'INTRACTABLE', difficulty: 8, hints: ['Hard to control or deal with', 'Stubborn'] },
    { word: 'INTRANSIGENT', difficulty: 9, hints: ['Unwilling or refusing to change one\'s views or to agree about something', 'Inflexible'] },
    { word: 'INVETERATE', difficulty: 8, hints: ['Having a particular habit, activity, or interest that is long-established and unlikely to change', 'Deep-seated'] },
    { word: 'IRASCIBLE', difficulty: 7, hints: ['Having or showing a tendency to be easily angered', 'Irritable'] },
    { word: 'LACONIC', difficulty: 7, hints: ['(of a person, speech, or style of writing) using very few words', 'Concise'] },
    { word: 'LAUD', difficulty: 7, hints: ['Praise (a person or their achievements) highly, especially in a public context', 'To extol'] },
    { word: 'LAUDABLE', difficulty: 8, hints: ['(of an action, idea, or aim) deserving praise and commendation', 'Commendable'] },
    { word: 'LEVITY', difficulty: 7, hints: ['Humour or frivolity, especially the treatment of a serious matter with humour that is regarded as inappropriate', 'Frivolousness'] },
    { word: 'LUGUBRIOUS', difficulty: 9, hints: ['Looking or sounding sad and dismal', 'Mournful'] },
    { word: 'LUMINOUS', difficulty: 7, hints: ['Emitting or reflecting light; shining', 'Bright'] },
    { word: 'MALAISE', difficulty: 7, hints: ['A general feeling of discomfort, illness, or uneasiness whose exact cause is difficult to identify', 'Unease'] },
    { word: 'MALLEABLE', difficulty: 8, hints: ['(of a metal or other material) able to be hammered or pressed permanently out of shape without breaking or cracking', 'Easily influenced'] },
    { word: 'MAUDLIN', difficulty: 7, hints: ['Self-pityingly or tearfully sentimental', 'Sentimental'] },
    { word: 'MAVERICK', difficulty: 7, hints: ['An unorthodox or independent-minded person', 'A rebel'] },
    { word: 'MELLIFLUOUS', difficulty: 9, hints: ['(of a voice or words) sweet or musical; pleasant to hear', 'Euphonious'] },
    { word: 'MENDACIOUS', difficulty: 8, hints: ['Not telling the truth; lying', 'False'] },
    { word: 'METICULOUS', difficulty: 7, hints: ['Showing great attention to detail; very careful and precise', 'Thorough'] },
    { word: 'MITIGATE', difficulty: 7, hints: ['Make (something bad) less severe, serious, or painful', 'To alleviate'] },
    { word: 'MOLLIFY', difficulty: 7, hints: ['Appease the anger or anxiety of (someone)', 'To pacify'] },
    { word: 'MORIBUND', difficulty: 8, hints: ['(of a person) at the point of death; (of a thing) in terminal decline; lacking vitality or vigour', 'Dying'] },
    { word: 'MUNIFICENT', difficulty: 9, hints: ['(of a person) more generous than is usual or necessary', 'Bountiful'] },
    { word: 'NADIR', difficulty: 7, hints: ['The lowest point in the fortunes of a person or organization', 'The lowest point'] },
    { word: 'NEBULOUS', difficulty: 7, hints: ['(of a concept or idea) unclear, vague, or ill-defined', 'Hazy'] },
    { word: 'NONCHALANT', difficulty: 7, hints: ['(of a person or manner) feeling or appearing casually calm and relaxed; not displaying anxiety, interest, or enthusiasm', 'Indifferent'] },
    { word: 'NOXIOUS', difficulty: 7, hints: ['Harmful, poisonous, or very unpleasant', 'Toxic'] },
    { word: 'OBFUSCATE', difficulty: 8, hints: ['Make (something) unclear, obscure, or unintelligible', 'To confuse'] },
    { word: 'OBLIVIOUS', difficulty: 7, hints: ['Not aware of or not concerned about what is happening around one', 'Unaware'] },
    { word: 'OBSEQUIOUS', difficulty: 8, hints: ['Obedient or attentive to an excessive or servile degree', 'Servile'] },
    { word: 'OBVIATE', difficulty: 8, hints: ['Remove (a need or difficulty)', 'To prevent'] },
    { word: 'ONEROUS', difficulty: 7, hints: ['(of a task, duty, or responsibility) involving an amount of effort and difficulty that is oppressively burdensome', 'Burdensome'] }
];

const ONLINE_WORD_LIST_URL = 'https://example.com/your-dynamic-wordlist.json'; // 사용자 정의 온라인 단어 목록 URL을 여기에 입력하세요
const ONLINE_WORD_LIST_PLACEHOLDER_DATA = [
    // Placeholder for words fetched from an online source (e.g., neologisms, contemporary words)
    // 이 데이터는 실제 온라인 URL에서 가져올 데이터의 예시입니다.
    { word: 'UNBOXING', difficulty: 6, hints: ['The act of removing a new product from its packaging', 'Often shared on social media'] },
    { word: 'FOMO', difficulty: 5, hints: ['Fear of Missing Out', 'Anxiety that an exciting or interesting event may currently be happening elsewhere'] },
    { word: 'MASHUP', difficulty: 7, hints: ['A combination of elements from various sources', 'Often used in music or web applications'] },
    { word: 'GHOSTING', difficulty: 6, hints: ['Ending a personal relationship with someone by suddenly and without explanation withdrawing from all communication', 'Disappearing without a trace'] },
    { word: 'FLEX', difficulty: 4, hints: ['To show off', 'To display one\'s possessions or achievements ostentatiously'] },
    { word: 'STAN', difficulty: 4, hints: ['An overzealous or obsessive fan of a particular celebrity', 'Derived from an Eminem song'] },
    { word: 'BINGE', difficulty: 5, hints: ['An unrestrained and immoderate indulgence', 'To consume large quantities of something in a short period'] },
    { word: 'WOKE', difficulty: 5, hints: ['Alert to injustice in society, especially racism', 'Aware of current social issues'] },
    { word: 'SIMP', difficulty: 4, hints: ['A man who is overly submissive to a woman', 'Acting in a submissive way to impress someone'] },
    { word: 'CAP', difficulty: 3, hints: ['A lie or exaggeration', 'To not tell the truth (slang)'] }
];

// ===== Advanced Crossword Puzzle Game =====
class AdvancedCrosswordGame {
        constructor() {
            // Game Settings
            this.gridSize = 15;
            this.language = 'english';
            this.difficulty = 3; 
            this.gameTime = 180; // 3 minutes default
            this.timer = this.gameTime;
            this.score = 0;
            this.gameActive = false;
            this.isPaused = false;
            this.soundEnabled = true;
            this.theme = 'light';
    
            // Game State
            this.grid = [];
            this.solution = [];
            this.words = [];
            this.clues = { across: [], down: [] };
            this.wordPositions = new Map();
            this.completedWords = new Set();
            this.currentSelection = null;
            this.timerInterval = null;
    
            // Word Database
            this.wordDatabase = new Map();
    
            // Supabase 초기화 및 단어 로드
            this.initializeSupabase();
            this.initializeWordDatabase();
    
            this.initDOM();
            this.initEventListeners();
            this.initTheme();
            this.loadHighScores();
            this.updateWordCount();
            this.initSettingsUI(); // Call new method to initialize settings UI
        }
    
        // New method to initialize UI for settings
        initSettingsUI() {
            if (this.difficultySlider) {
                this.difficultySlider.value = this.difficulty;
            }
            if (this.sliderValue) {
                this.sliderValue.textContent = this.difficulty;
            }
            // Potentially add other settings here if they need initial UI sync
        }

    // ===== Supabase Initialization =====
    async initializeSupabase() {
        try {
            if (typeof supabase !== 'undefined') {
                supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
                console.log('✅ Supabase 클라이언트 초기화 완료');

                // 일회성 DB 정리 로직
                if (!localStorage.getItem('hasCleanedUpDB_v2')) {
                    await this.cleanupGeneratedWords();
                }

                let wordsInDB = [];
                try {
                    // DB에서 현재 단어를 로드합니다. (시딩 여부 판단용)
                    wordsInDB = await this.loadWordsFromSupabase(true);
                } catch (error) {
                    console.error('❌ Supabase 초기 단어 로드 실패:', error);
                    // 에러 발생 시에도 시딩은 시도할 수 있도록 처리
                }
                
                // Supabase DB가 비어있고, 아직 시딩되지 않았다면 내장 단어로 시딩합니다.
                if (wordsInDB.length === 0 && !localStorage.getItem('hasSeededDB_v1')) {
                    console.log('🌱 Supabase DB가 비어있어 내장 단어로 시딩을 시작합니다...');
                    await this._seedDatabaseFromLocalPools();
                    // 시딩 후 단어를 다시 로드합니다 (this.wordDatabase에 채우기 위함).
                    await this.loadWordsFromSupabase(); 
                } else if (wordsInDB.length > 0) {
                     console.log(`✅ Supabase에 ${wordsInDB.length}개의 단어가 이미 존재합니다.`);
                     // DB에 단어가 있으니 this.wordDatabase에 채우기 위해 다시 로드합니다.
                     await this.loadWordsFromSupabase();
                } else {
                     console.log('ℹ️ Supabase DB가 비어있지만, 이미 시딩된 것으로 표시됩니다. 단어 로드를 진행합니다.');
                     // DB가 비어있는데 시딩 플래그가 있다면, 이전에 시딩에 실패했거나 수동으로 지웠을 가능성
                     // 이 경우, 사용자가 AddWords 버튼을 눌러 다시 시딩하도록 유도하거나, 오류 처리
                     // 여기서는 단순히 loadWordsFromSupabase 호출만 합니다.
                     await this.loadWordsFromSupabase();
                }

            } else {
                console.warn('⚠️ Supabase 라이브러리를 찾을 수 없습니다. 로컬 단어만 사용합니다.');
                // Supabase가 없으면 내장 단어 풀을 직접 로드합니다.
                await this._loadWordsFromLocalPoolsDirectly();
            }
        } catch (error) {
            console.error('❌ Supabase 초기화 실패:', error);
        }
    }

    async cleanupGeneratedWords() {
        if (!supabaseClient) {
            console.warn('⚠️ DB 정리를 위한 Supabase 클라이언트가 없습니다.');
            return;
        }
        try {
            console.log('🧹 무작위 생성 단어 데이터베이스 정리 시작...');
            const { data, error } = await supabaseClient
                .from('crossword_words')
                .delete()
                .like('hints', '%A randomly generated%');

            if (error) {
                console.error('❌ 무작위 단어 삭제 실패:', error);
                return;
            }

            console.log('✅ 무작위 생성 단어 삭제 완료.');
            localStorage.setItem('hasCleanedUpDB_v2', 'true');
        } catch (error) {
            console.error('❌ 데이터베이스 정리 중 오류 발생:', error);
        }
    }

    // 내장 단어 풀에서 단어를 로드하는 헬퍼 함수 (Supabase 없을 때 사용, 또는 시딩용)
    _loadWordsFromLocalPoolsDirectly() {
        // 이 함수는 Supabase 클라이언트가 없을 때만 호출되어 this.wordDatabase를 직접 채웁니다.
        // 시딩 로직에서 사용되지 않습니다.
        const allPools = [...POOL_TIER_1_SAT, ...POOL_TIER_2_GENERAL, ...POOL_TIER_3_ADVANCED];
        allPools.forEach(wordObj => {
            const { word, language = 'english', difficulty, hints } = wordObj; // language 기본값 설정
            if (!this.wordDatabase.has(language)) {
                this.wordDatabase.set(language, new Map());
            }
            const langMap = this.wordDatabase.get(language);
            if (!langMap.has(difficulty)) {
                langMap.set(difficulty, []);
            }
            const wordsList = langMap.get(difficulty);
            // 중복 체크는 saveWordToSupabase에서 하지만, 여기서는 메모리에 로드하는 것이므로 한 번 더 확인합니다.
            const exists = wordsList.some(w => w.word === word); 
            if (!exists) {
                wordsList.push({ word, hints: Array.isArray(hints) ? hints : [hints] });
            }
        });
        this.updateWordCount();
        console.log('✅ Supabase 없이 내장 단어 풀에서 직접 단어 로드 완료');
    }

    // 내장 단어 풀을 Supabase DB에 시딩하는 함수 (한 번만 실행)
    async _seedDatabaseFromLocalPools() {
        if (!supabaseClient) {
            console.warn('⚠️ Supabase 클라이언트가 없어 DB 시딩을 할 수 없습니다.');
            return;
        }

        const allBuiltInWords = [...POOL_TIER_1_SAT, ...POOL_TIER_2_GENERAL, ...POOL_TIER_3_ADVANCED];
        let seededCount = 0;

        console.log('🔄 내장 단어 풀에서 Supabase DB로 단어 시딩 중...');

        // 이미 DB에 있는 단어 목록을 먼저 가져옵니다. (시딩 중복 방지)
        let existingWordsInSupabase = new Set();
        try {
             const { data, error } = await supabaseClient
                .from('crossword_words')
                .select('word'); // 단어만 가져와 효율성을 높입니다.
            if (error) throw error;
            existingWordsInSupabase = new Set(data.map(row => row.word));
        } catch (error) {
            console.error('❌ Supabase에서 기존 단어 로드 실패:', error);
            // 에러 발생 시 시딩을 중단하지 않고 계속 진행 (중복 단어 저장 시 오류 발생 가능)
        }

        for (const wordObj of allBuiltInWords) {
            if (!existingWordsInSupabase.has(wordObj.word)) {
                const { word, hints, difficulty, language = 'english' } = wordObj; // language 기본값 설정
                const success = await this.saveWordToSupabase(word, language, difficulty, hints);
                if (success) {
                    seededCount++;
                }
            }
            // Supabase에 저장된 단어가 너무 많으면 메모리 문제가 발생할 수 있으므로, 단어 수를 제한할 수 있습니다.
            // if (seededCount >= MAX_WORDS_TO_SEED) break;
        }
        localStorage.setItem('hasSeededDB_v1', 'true');
        console.log(`✅ Supabase DB 시딩 완료: ${seededCount}개의 새로운 단어가 추가되었습니다.`);
    }

    // ===== Word Database System =====
    initializeWordDatabase() {
        // Supabase에서만 단어를 로드하므로 빈 구조만 초기화
        console.log('📚 단어 데이터베이스 구조 초기화...');

        // 언어별로 빈 Map 구조 생성
        const languages = ['english', 'korean'];
        const difficulties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        languages.forEach(lang => {
            this.wordDatabase.set(lang, new Map());
            difficulties.forEach(diff => {
                this.wordDatabase.get(lang).set(diff, []);
            });
        });

        console.log('✅ 단어 데이터베이스 구조 초기화 완료');
        console.log('ℹ️ 실제 단어는 Supabase에서 로드됩니다.');

    }

    async updateWordDatabase() {
        this.showModal('wordUpdateModal');
        const progressBar = document.getElementById('updateProgress');
        const statusText = document.getElementById('updateStatus');

        try {
            progressBar.style.width = '30%';
            statusText.textContent = '새로운 단어를 준비하는 중...';

            // 새로운 단어 추가 및 Supabase에 저장 (우선순위 로직 적용)
            const addedCount = await this.addWordsToDBWithPriority();

            if (addedCount > 0) {
                progressBar.style.width = '100%';
                statusText.textContent = `업데이트 완료! ${addedCount}개의 새로운 단어가 추가되었습니다.`;
            } else {
                progressBar.style.width = '100%';
                statusText.textContent = '추가할 새로운 단어가 없거나, 모든 단어가 이미 DB에 있습니다.';
            }

            setTimeout(() => {
                this.closeModal('wordUpdateModal');
                this.updateWordCount();
            }, 1500);

        } catch (error) {
            console.error('단어 업데이트 실패:', error);
            statusText.textContent = '업데이트 중 오류가 발생했습니다.';
            setTimeout(() => {
                this.closeModal('wordUpdateModal');
            }, 2000);
        }
    }

    async addWordsToDBWithPriority() {
        const WORDS_TO_ADD_PER_CLICK = 10;
        let addedCount = 0;
        const wordsToAddQueue = [];
        const existingWords = new Set();
        
        // 현재 DB에 있는 모든 영어 단어를 Set으로 가져옵니다.
        const englishDB = this.wordDatabase.get('english');
        if (englishDB) {
            for (const words of englishDB.values()) {
                words.forEach(wordObj => existingWords.add(wordObj.word));
            }
        }

        // 헬퍼 함수: 풀에서 단어를 가져와 큐에 추가
        const addFromPool = (pool) => {
            const available = pool.filter(w => !existingWords.has(w.word) && !wordsToAddQueue.some(q => q.word === w.word));
            const shuffled = this.shuffleArray(available);
            for (const wordObj of shuffled) {
                if (wordsToAddQueue.length < WORDS_TO_ADD_PER_CLICK) {
                    wordsToAddQueue.push(wordObj);
                } else {
                    break;
                }
            }
        };

        // 1순위: POOL_TIER_1_SAT
        addFromPool(POOL_TIER_1_SAT);
        console.log(`1순위 풀 적용 후: ${wordsToAddQueue.length}개`);

        // 2순위: POOL_TIER_2_GENERAL
        if (wordsToAddQueue.length < WORDS_TO_ADD_PER_CLICK) {
            addFromPool(POOL_TIER_2_GENERAL);
            console.log(`2순위 풀 적용 후: ${wordsToAddQueue.length}개`);
        }

        // 3순위: POOL_TIER_3_ADVANCED
        if (wordsToAddQueue.length < WORDS_TO_ADD_PER_CLICK) {
            addFromPool(POOL_TIER_3_ADVANCED);
            console.log(`3순위 풀 적용 후: ${wordsToAddQueue.length}개`);
        }

        // 4순위: 온라인 단어 목록에서 가져오기 (비동기)
        if (wordsToAddQueue.length < WORDS_TO_ADD_PER_CLICK) {
            console.log('4순위: 온라인 단어 목록에서 가져오는 중...');
            try {
                // 실제 fetch 대신 placeholder 데이터 사용
                const onlineWords = ONLINE_WORD_LIST_PLACEHOLDER_DATA; //await this.fetchOnlineWordList();
                
                // 가져온 온라인 단어 목록에서 아직 DB에 없는 단어만 필터링하여 큐에 추가
                const availableOnlineWords = onlineWords.filter(w => !existingWords.has(w.word) && !wordsToAddQueue.some(q => q.word === w.word));
                const shuffledOnlineWords = this.shuffleArray(availableOnlineWords);

                for (const wordObj of shuffledOnlineWords) {
                    if (wordsToAddQueue.length < WORDS_TO_ADD_PER_CLICK) {
                        wordsToAddQueue.push(wordObj);
                    } else {
                        break;
                    }
                }
                console.log(`4순위 온라인 풀 적용 후: ${wordsToAddQueue.length}개`);
            } catch (onlineError) {
                console.error('❌ 온라인 단어 목록 가져오기 실패:', onlineError);
                this.showError('온라인 단어 목록을 가져오지 못했습니다.');
            }
        }
        
        // 최종적으로 큐에 있는 단어들을 DB에 저장
        for (const wordObj of wordsToAddQueue) {
            const { word, hints, difficulty } = wordObj;
            const lang = 'english'; // 현재는 영어만 가정

            // 로컬 DB에 추가
            if (this.wordDatabase.get(lang)?.has(difficulty)) {
                this.wordDatabase.get(lang).get(difficulty).push(wordObj);
                existingWords.add(word); // 다음 중복 체크를 위해 추가

                // Supabase에 저장
                await this.saveWordToSupabase(word, lang, difficulty, hints);
                addedCount++;
            }
        }

        return addedCount;
    }
    
    // 실제 온라인 단어 목록을 가져오는 함수 (지금은 placeholder 사용)
    async fetchOnlineWordList() {
        try {
            const response = await fetch(ONLINE_WORD_LIST_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('온라인 단어 목록 Fetch 실패:', error);
            // 에러 발생 시 placeholder 데이터 반환
            return ONLINE_WORD_LIST_PLACEHOLDER_DATA;
        }
    }


    getWordCount() {
        let totalWords = 0;
        for (const [lang, difficulties] of this.wordDatabase.entries()) {
            for (const [diff, words] of difficulties.entries()) {
                totalWords += words.length;
            }
        }
        return totalWords;
    }

    updateWordCount() {
        const totalWords = this.getWordCount();
        const countElement = document.getElementById('currentWordCount');
        if (countElement) {
            countElement.textContent = totalWords;
        }
    }

    // ===== Supabase Database Methods =====
    async loadWordsFromSupabase(returnOnlyData = false) {
        if (!supabaseClient) {
            // Supabase 클라이언트가 없으면 initializeSupabase에서 _loadWordsFromLocalPoolsDirectly가 호출됩니다.
            return [];
        }

        try {
            console.log('📥 Supabase에서 단어 로드 중...');
            // this.wordDatabase를 비우고 다시 채웁니다.
            this.wordDatabase.clear();
            this.initializeWordDatabase(); // 구조만 초기화

            const { data, error } = await supabaseClient
                .from('crossword_words')
                .select('*');

            if (error) {
                console.error('❌ 단어 로드 실패:', error);
                throw error; // 에러를 상위 호출자로 전달하여 시딩 로직에 영향
            }

            if (data && data.length > 0) {
                if (returnOnlyData) return data; // 데이터만 반환 요청 시 (시딩 여부 판단용)

                console.log(`✅ ${data.length}개의 단어를 로드했습니다.`);

                // DB에서 로드한 단어를 wordDatabase에 추가
                data.forEach(row => {
                    const { word, language, difficulty, hints } = row;

                    // language와 difficulty에 해당하는 Map 확보 (initializeWordDatabase에서 이미 했지만, 안전 장치)
                    if (!this.wordDatabase.has(language)) {
                        this.wordDatabase.set(language, new Map());
                    }
                    const langMap = this.wordDatabase.get(language);
                    if (!langMap.has(difficulty)) {
                        langMap.set(difficulty, []);
                    }

                    // 중복 체크 후 추가
                    const wordsList = langMap.get(difficulty);
                    const exists = wordsList.some(w => w.word === word);

                    if (!exists) {
                        wordsList.push({
                            word: word,
                            hints: Array.isArray(hints) ? hints : JSON.parse(hints)
                        });
                    }
                });

                // 단어 개수 업데이트
                this.updateWordCount();
                console.log('✅ 단어 데이터베이스 업데이트 완료');
                return data; // 로드된 데이터 반환
            } else {
                console.log('ℹ️ DB에 저장된 단어가 없습니다.');
                return []; // 빈 배열 반환
            }
        } catch (error) {
            console.error('❌ 단어 로드 중 오류:', error);
            throw error; // 에러를 상위 호출자로 전달
        }
    }

    async saveWordToSupabase(word, language, difficulty, hints) {
        if (!supabaseClient) {
            console.warn('⚠️ Supabase 클라이언트가 초기화되지 않았습니다.');
            return false;
        }

        try {
            console.log(`💾 단어 저장 중: ${word}`);

            const { data, error } = await supabaseClient
                .from('crossword_words')
                .insert([
                    {
                        word: word,
                        language: language,
                        difficulty: difficulty,
                        hints: hints
                    }
                ])
                .select();

            if (error) {
                console.error('❌ 단어 저장 실패:', error);
                return false;
            }

            console.log('✅ 단어가 Supabase에 저장되었습니다:', data);
            return true;
        } catch (error) {
            console.error('❌ 단어 저장 중 오류:', error);
            return false;
        }
    }

    async deleteWordFromSupabase(word, language, difficulty) {
        if (!supabaseClient) return false;

        try {
            const { error } = await supabaseClient
                .from('crossword_words')
                .delete()
                .eq('word', word)
                .eq('language', language)
                .eq('difficulty', difficulty);

            if (error) {
                console.error('❌ 단어 삭제 실패:', error);
                return false;
            }

            console.log('✅ 단어가 Supabase에서 삭제되었습니다:', word);
            return true;
        } catch (error) {
            console.error('❌ 단어 삭제 중 오류:', error);
            return false;
        }
    }

    // ===== DOM Initialization =====
    initDOM() {
        // Screens
        this.startScreen = document.getElementById('startScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.highScoreScreen = document.getElementById('highScoreScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        
        // Settings
        this.gridSizeSelect = document.getElementById('gridSize');
        this.languageSelect = document.getElementById('language');
        this.difficultySlider = document.getElementById('difficulty');
        this.gameTimerSelect = document.getElementById('gameTimer');
        this.sliderValue = document.querySelector('.slider-value');
        
        // Game elements
        this.crosswordGrid = document.getElementById('crosswordGrid');
        this.acrossClues = document.getElementById('acrossClues');
        this.downClues = document.getElementById('downClues');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.scoreDisplay = document.getElementById('gameScore');
        this.completedDisplay = document.getElementById('completedWords');
        this.totalDisplay = document.getElementById('totalWords');
        
        // Input panel
        this.wordNumberSelect = document.getElementById('wordNumber');
        this.wordDirectionSelect = document.getElementById('wordDirection');
        this.wordInput = document.getElementById('wordInput');
        this.autocompleteSuggestions = document.getElementById('autocompleteSuggestions');
        
        // Modals
        this.pauseModal = document.getElementById('pauseModal');
        this.nameModal = document.getElementById('nameModal');
        this.helpModal = document.getElementById('helpModal');
        this.wordUpdateModal = document.getElementById('wordUpdateModal');
        
        // Other
        this.celebrationCanvas = document.getElementById('celebrationCanvas');
        this.scoreList = document.getElementById('scoreList');
    }

    // ===== Event Listeners =====
    initEventListeners() {
        // Start screen
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('highScoreBtn').addEventListener('click', () => this.showHighScores());
        document.getElementById('backToMenuBtn').addEventListener('click', () => this.showStartScreen());
        document.getElementById('updateWordsBtn').addEventListener('click', () => this.updateWordDatabase());

        // Window resize listener for adaptive layout
        window.addEventListener('resize', () => {
            if (this.gameActive) {
                
            }
        });
        
        // Settings
        this.difficultySlider.addEventListener('input', (e) => {
            this.difficulty = parseInt(e.target.value);
            this.sliderValue.textContent = this.difficulty;
        });
        
        this.gridSizeSelect.addEventListener('change', (e) => {
            this.gridSize = parseInt(e.target.value);
        });
        
        this.languageSelect.addEventListener('change', (e) => {
            this.language = e.target.value;
        });
        
        this.gameTimerSelect.addEventListener('change', (e) => {
            this.gameTime = parseInt(e.target.value);
        });
        
        // Game controls
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('quitBtn').addEventListener('click', () => this.endGame());
        
        // Input panel
        this.wordNumberSelect.addEventListener('change', () => this.onNumberChange());
        this.wordDirectionSelect.addEventListener('change', () => this.onDirectionChange());
        this.wordInput.addEventListener('input', () => this.onWordInput());
        this.wordInput.addEventListener('keydown', (e) => this.onWordKeydown(e));
        document.getElementById('submitWord').addEventListener('click', () => this.submitWord());
        document.getElementById('showAnswerBtn').addEventListener('click', () => this.showAnswer());
        
        // Clues tabs
        document.querySelectorAll('.clue-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchClueTab(e.target.dataset.direction));
        });
        
        // Start screen controls
        document.getElementById('themeToggleStart').addEventListener('click', () => this.toggleTheme());
        document.getElementById('soundToggleStart').addEventListener('click', () => this.toggleSound());
        document.getElementById('helpBtnStart').addEventListener('click', () => this.showHelp());

        // Modal controls
        document.getElementById('saveScoreBtn').addEventListener('click', () => this.saveHighScore());
        document.getElementById('skipNameBtn').addEventListener('click', () => this.skipNameInput());
        document.getElementById('closeHelpBtn').addEventListener('click', () => this.closeModal('helpModal'));
        document.getElementById('cancelUpdateBtn').addEventListener('click', () => this.closeModal('wordUpdateModal'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Click outside autocomplete
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.word-input-container')) {
                this.hideAutocomplete();
            }
        });
    }

    // ===== Input Panel Logic =====
    onNumberChange() {
        const selectedNumber = parseInt(this.wordNumberSelect.value);
        if (selectedNumber) {
            this.updateDirectionOptions(selectedNumber);
            const direction = this.wordDirectionSelect.value;
            if (direction) {
                this.highlightWordInGrid(selectedNumber, direction);
                this.highlightCurrentClue(selectedNumber, direction);
                this.updateCurrentHintDisplay(selectedNumber, direction);
            }
        }
    }

    onDirectionChange() {
        const selectedNumber = parseInt(this.wordNumberSelect.value);
        const selectedDirection = this.wordDirectionSelect.value;
        if (selectedNumber && selectedDirection) {
            this.highlightWordInGrid(selectedNumber, selectedDirection);
            this.highlightCurrentClue(selectedNumber, selectedDirection);
            this.updateCurrentHintDisplay(selectedNumber, selectedDirection);
            this.wordInput.focus({ preventScroll: true });
        }
    }

    onWordInput() {
        const input = this.wordInput.value.toUpperCase();
        
        // Show autocomplete for difficulty <= 3
        if (this.difficulty <= 3 && input.length >= 2) {
            this.showAutocomplete(input);
        } else {
            this.hideAutocomplete();
        }
    }

    onWordKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.submitWord();
        } else if (e.key === 'Escape') {
            this.hideAutocomplete();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateAutocomplete(e.key === 'ArrowDown');
        }
    }

    updateDirectionOptions(number) {
        // Clear and rebuild direction options
        this.wordDirectionSelect.innerHTML = '<option value="">선택</option>';
        
        const acrossWord = this.clues.across.find(clue => clue.number === number);
        const downWord = this.clues.down.find(clue => clue.number === number);
        
        if (acrossWord && !this.completedWords.has(`across-${number}`)) {
            const option = document.createElement('option');
            option.value = 'across';
            option.textContent = '가로';
            this.wordDirectionSelect.appendChild(option);
        }
        
        if (downWord && !this.completedWords.has(`down-${number}`)) {
            const option = document.createElement('option');
            option.value = 'down';
            option.textContent = '세로';
            this.wordDirectionSelect.appendChild(option);
        }
        
        // Auto-select if only one option
        const options = this.wordDirectionSelect.querySelectorAll('option:not([value=""])');
        if (options.length === 1) {
            this.wordDirectionSelect.value = options[0].value;
            this.onDirectionChange();
        }
    }

    populateNumberOptions() {
        this.wordNumberSelect.innerHTML = '<option value="">선택</option>';
        
        const allNumbers = new Set();
        this.clues.across.forEach(clue => allNumbers.add(clue.number));
        this.clues.down.forEach(clue => allNumbers.add(clue.number));
        
        const sortedNumbers = Array.from(allNumbers).sort((a, b) => a - b);
        sortedNumbers.forEach(number => {
            // Only show numbers that have incomplete words
            const acrossComplete = this.completedWords.has(`across-${number}`);
            const downComplete = this.completedWords.has(`down-${number}`);
            const acrossExists = this.clues.across.some(clue => clue.number === number);
            const downExists = this.clues.down.some(clue => clue.number === number);
            
            if ((acrossExists && !acrossComplete) || (downExists && !downComplete)) {
                const option = document.createElement('option');
                option.value = number;
                option.textContent = number;
                this.wordNumberSelect.appendChild(option);
            }
        });

        // Automatically select the first unsolved word
        this._selectNextUnsolvedWord();
    }

    highlightWordInGrid(number, direction) {
        // Clear previous highlights
        document.querySelectorAll('.crossword-cell').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        if (!direction) return;
        
        const word = this.clues[direction].find(clue => clue.number === number);
        if (!word) return;
        
        // Highlight word cells
        for (let i = 0; i < word.answer.length; i++) {
            const row = direction === 'across' ? word.row : word.row + i;
            const col = direction === 'across' ? word.col + i : word.col;
            
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('highlighted');
            }
        }
    }

    // ===== Autocomplete System =====
    showAutocomplete(input) {
        if (this.difficulty > 3) return;
        
        const suggestions = this.getWordSuggestions(input);
        if (suggestions.length === 0) {
            this.hideAutocomplete();
            return;
        }
        
        this.autocompleteSuggestions.innerHTML = '';
        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => this.selectAutocomplete(suggestion));
            this.autocompleteSuggestions.appendChild(item);
        });
        
        this.autocompleteSuggestions.style.display = 'block';
        this.autocompleteSuggestions.style.bottom = '100%';
    }

    hideAutocomplete() {
        this.autocompleteSuggestions.style.display = 'none';
    }

    getWordSuggestions(input) {
        const currentNumber = parseInt(this.wordNumberSelect.value);
        const currentDirection = this.wordDirectionSelect.value;
        
        if (!currentNumber || !currentDirection) return [];
        
        const targetWord = this.clues[currentDirection].find(clue => clue.number === currentNumber);
        if (!targetWord) return [];
        
        // Get all possible words that match current input and length
        const suggestions = [];
        const langDatabase = this.wordDatabase.get(this.language);
        
        if (langDatabase) {
            for (const [difficulty, words] of langDatabase.entries()) {
                words.forEach(wordObj => {
                    if (wordObj.word.length === targetWord.answer.length && 
                        wordObj.word.startsWith(input)) {
                        suggestions.push(wordObj.word);
                    }
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }

    selectAutocomplete(word) {
        this.wordInput.value = word;
        this.hideAutocomplete();
        this.submitWord();
    }

    navigateAutocomplete(down) {
        const items = this.autocompleteSuggestions.querySelectorAll('.autocomplete-item');
        if (items.length === 0) return;
        
        const current = this.autocompleteSuggestions.querySelector('.autocomplete-item.selected');
        let newIndex = 0;
        
        if (current) {
            current.classList.remove('selected');
            const currentIndex = Array.from(items).indexOf(current);
            newIndex = down ? 
                Math.min(currentIndex + 1, items.length - 1) : 
                Math.max(currentIndex - 1, 0);
        }
        
        items[newIndex].classList.add('selected');
    }

    // ===== Word Submission =====
    submitWord() {
        const number = parseInt(this.wordNumberSelect.value);
        const direction = this.wordDirectionSelect.value;
        const word = this.wordInput.value.toUpperCase().trim();

        if (!number || !direction || !word) {
            this.showError('번호, 방향, 단어를 모두 입력해주세요.');
            return;
        }

        const targetWord = this.clues[direction].find(clue => clue.number === number);
        if (!targetWord) {
            this.showError('잘못된 번호입니다.');
            return;
        }

        if (word.length !== targetWord.answer.length) {
            this.showError(`이 단어는 ${targetWord.answer.length}글자여야 합니다.`);
            return;
        }

        if (word === targetWord.answer) {
            this.handleCorrectAnswer(number, direction, word);
        } else {
            this.handleIncorrectAnswer(number, direction, word);
        }

        // Clear input
        this.wordInput.value = '';
        this.hideAutocomplete();
    }

    // 정답 보기 기능
    showAnswer() {
        const number = parseInt(this.wordNumberSelect.value);
        const direction = this.wordDirectionSelect.value;

        if (!number || !direction) {
            this.showError('먼저 번호와 방향을 선택해주세요.');
            return;
        }

        const targetWord = this.clues[direction].find(clue => clue.number === number);
        if (!targetWord) {
            this.showError('잘못된 번호입니다.');
            return;
        }

        // 정답을 입력창에 표시
        this.wordInput.value = targetWord.answer;
        this.showError(`정답: ${targetWord.answer}`, 'success');
        this.playSound('click');

        // 입력창에 포커스
        this.wordInput.focus();
    }

    handleCorrectAnswer(number, direction, word) {
        const wordKey = `${direction}-${number}`;
        this.completedWords.add(wordKey);

        // Add score
        this.score += 100;
        this.updateScore();

        // Fill grid
        this.fillWordInGrid(number, direction, word);

        // Mark as completed
        this.markWordAsCompleted(number, direction);

        // Play sound
        this.playSound('correct');
        
        // Update UI
        this.populateNumberOptions();
        this.updateProgress();

        // Check for game completion BEFORE resetting timer or selecting next word
        if (this.completedWords.size === this.clues.across.length + this.clues.down.length) {
            this.showError('🎉 All words solved!', 'success');
            setTimeout(() => this.completeGame(), 500);
            return; // Exit to prevent timer reset on the final word
        }

        // Reset timer and notify user (only if game is not complete)
        this.timer = this.gameTime;
        this.updateTimer();
        this.showError('정답! 타이머가 초기화됩니다.', 'success');

        // Select the next unsolved word
        this._selectNextUnsolvedWord();
    }

    handleIncorrectAnswer(number, direction, word) {
        this.showError('틀렸습니다. 다시 시도해보세요.');
        this.playSound('error');
        
        // Show error animation on highlighted cells
        document.querySelectorAll('.crossword-cell.highlighted').forEach(cell => {
            cell.classList.add('error');
            setTimeout(() => cell.classList.remove('error'), 300);
        });
    }

    _selectNextUnsolvedWord() {
        const allNumbers = new Set();
        this.clues.across.forEach(clue => allNumbers.add(clue.number));
        this.clues.down.forEach(clue => allNumbers.add(clue.number));
        const sortedNumbers = Array.from(allNumbers).sort((a, b) => a - b);

        for (const number of sortedNumbers) {
            // Try 'across' first
            const acrossKey = `across-${number}`;
            if (this.clues.across.some(c => c.number === number) && !this.completedWords.has(acrossKey)) {
                this.selectWordFromClue(number, 'across');
                return; // Found the next word, exit
            }
            // If not across, try 'down'
            const downKey = `down-${number}`;
            if (this.clues.down.some(c => c.number === number) && !this.completedWords.has(downKey)) {
                this.selectWordFromClue(number, 'down');
                return; // Found the next word, exit
            }
        }
    }

    fillWordInGrid(number, direction, word) {
        const targetWord = this.clues[direction].find(clue => clue.number === number);
        if (!targetWord) return;

        for (let i = 0; i < word.length; i++) {
            const row = direction === 'across' ? targetWord.row : targetWord.row + i;
            const col = direction === 'across' ? targetWord.col + i : targetWord.col;

            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                // 기존 cell-number를 유지하기 위해 저장
                const existingNumber = cell.querySelector('.cell-number');

                // 셀의 내용을 지우고 문자를 추가
                cell.textContent = word[i];

                // cell-number가 있었다면 다시 추가하여 번호가 계속 표시되도록 함
                if (existingNumber) {
                    cell.insertBefore(existingNumber, cell.firstChild);
                }

                cell.classList.add('completed');
            }
        }
    }

    markWordAsCompleted(number, direction) {
        const clueElement = document.querySelector(
            `.${direction}-clues .clue-item[data-number="${number}"]`
        );
        if (clueElement) {
            clueElement.classList.add('completed');
        }
    }

    showError(message, type = 'error') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${message}`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ===== Game Logic =====
    syncSettingsFromUI() {
        this.gridSize = parseInt(this.gridSizeSelect.value);
        this.language = this.languageSelect.value;
        this.difficulty = parseInt(this.difficultySlider.value);
        this.gameTime = parseInt(this.gameTimerSelect.value);
        console.log(`Settings synced: Size=${this.gridSize}, Lang=${this.language}, Diff=${this.difficulty}`);
    }

    startGame() {
        // 게임 시작 시 UI의 현재 설정 값을 게임 상태에 동기화
        this.syncSettingsFromUI();

        // 게임 시작 전 단서 영역 완전 초기화 (가장 먼저 실행)
        this.clearAllClues();

        this.initializeGame();
        this.generateCrossword();
        this.renderGrid();
        this.renderClues();
        this.populateNumberOptions();
        this.showGameScreen();
        this.startTimer();
        this.gameActive = true;
        this.playSound('click');
    }

    // 모든 단서를 완전히 제거하는 헬퍼 메서드
    clearAllClues() {
        console.log('=== clearAllClues 시작 ===');

        // 1. 모든 clue-item 제거
        const allClueItems = document.querySelectorAll('.clue-item');
        console.log(`제거할 clue-item 개수: ${allClueItems.length}`);
        allClueItems.forEach(item => {
            item.remove();
        });

        // 2. 가로 단서 컨테이너 초기화
        const acrossClues = document.getElementById('acrossClues');
        if (acrossClues) {
            console.log(`가로 단서 컨테이너 자식 수 (제거 전): ${acrossClues.children.length}`);
            acrossClues.innerHTML = '';
            while (acrossClues.firstChild) {
                acrossClues.removeChild(acrossClues.firstChild);
            }
            console.log(`가로 단서 컨테이너 자식 수 (제거 후): ${acrossClues.children.length}`);
        }

        // 3. 세로 단서 컨테이너 초기화
        const downClues = document.getElementById('downClues');
        if (downClues) {
            console.log(`세로 단서 컨테이너 자식 수 (제거 전): ${downClues.children.length}`);
            downClues.innerHTML = '';
            while (downClues.firstChild) {
                downClues.removeChild(downClues.firstChild);
            }
            console.log(`세로 단서 컨테이너 자식 수 (제거 후): ${downClues.children.length}`);
        }

        // 4. this 참조 초기화
        if (this.acrossClues) {
            this.acrossClues.innerHTML = '';
        }
        if (this.downClues) {
            this.downClues.innerHTML = '';
        }

        // 5. clues 데이터도 완전히 새 객체로 초기화
        this.clues = {
            across: [],
            down: []
        };

        console.log('=== clearAllClues 완료 ===');
    }

    initializeGame() {
        console.log('=== initializeGame 시작 ===');

        // Reset game state - 각 셀을 독립적인 객체로 생성
        this.grid = Array(this.gridSize).fill(null).map(() =>
            Array(this.gridSize).fill(null).map(() => ({
                type: 'black',
                value: '',
                number: null
            }))
        );
        this.solution = Array(this.gridSize).fill(null).map(() =>
            Array(this.gridSize).fill(null).map(() => '')
        );

        // words 배열 완전 초기화 (이전 게임 단어 제거)
        this.words = [];
        console.log(`단어 배열 초기화: ${this.words.length}개`);

        // clues 완전히 새 객체로 초기화
        this.clues = {
            across: [],
            down: []
        };
        console.log(`단서 초기화 - 가로: ${this.clues.across.length}, 세로: ${this.clues.down.length}`);

        this.wordPositions.clear();
        this.completedWords.clear();
        this.score = 0;
        this.timer = this.gameTime;
        this.updateScore();
        this.updateProgress();

        // 단서 영역 완전 초기화 - DOM에서 모든 이전 단서 제거
        if (this.acrossClues) {
            this.acrossClues.innerHTML = '';
        }
        if (this.downClues) {
            this.downClues.innerHTML = '';
        }

        // 입력창 초기화
        if (this.wordNumberSelect) {
            this.wordNumberSelect.innerHTML = '<option value="">번호</option>';
        }
        if (this.wordDirectionSelect) {
            this.wordDirectionSelect.innerHTML = '<option value="">방향</option><option value="across">가로</option><option value="down">세로</option>';
        }
        if (this.wordInput) {
            this.wordInput.value = '';
        }

        // 힌트 표시 초기화
        const hintDisplay = document.getElementById('currentHintDisplay');
        if (hintDisplay) {
            hintDisplay.innerHTML = '<span class="hint-text">힌트가 여기에 표시됩니다</span>';
        }

        // 모든 셀에서 하이라이트 제거
        document.querySelectorAll('.crossword-cell').forEach(cell => {
            cell.classList.remove('highlighted', 'completed', 'error');
        });

        // 모든 단서 아이템에서 클래스 제거
        document.querySelectorAll('.clue-item').forEach(item => {
            item.classList.remove('active', 'completed', 'selected');
        });
    }

    generateCrossword() {
        // Select words for current settings
        this.selectWordsForCrossword();
        
        // Place words on grid
        this.placeWordsOnGrid();
        
        // Add numbers
        this.addNumbersToGrid();
        
        // Generate clues
        this.generateClues();
    }

    selectWordsForCrossword() {
        this.words = [];
        const langDatabase = this.wordDatabase.get(this.language);
        if (!langDatabase) {
            console.error('단어 데이터베이스를 찾을 수 없음');
            return;
        }

        // 1. 선택된 난이도까지의 모든 단어를 후보 목록에 추가
        let candidateWords = [];
        const maxDifficulty = Math.min(this.difficulty, 10);
        for (let diff = 1; diff <= maxDifficulty; diff++) {
            if (langDatabase.has(diff)) {
                candidateWords.push(...langDatabase.get(diff));
            }
        }
        
        // 2. 만약 선택된 난이도에서 단어를 찾지 못했고, 선택된 난이도가 3보다 낮다면, 난이도 3까지 확장하여 다시 검색합니다.
        if (candidateWords.length === 0 && maxDifficulty < 3) {
            console.warn(`난이도 ${maxDifficulty}에 단어가 없어, 난이도 3까지 확장하여 검색합니다.`);
            for (let diff = maxDifficulty + 1; diff <= 3; diff++) {
                if (langDatabase.has(diff)) {
                    candidateWords.push(...langDatabase.get(diff));
                }
            }
        }


        if (candidateWords.length === 0) {
            console.error('선택된 난이도에 해당하는 단어가 없습니다.');
            this.showError('플레이할 단어가 부족합니다. 단어 DB를 업데이트하거나 난이도를 조정해주세요.');
            return;
        }
        
        // 3. 후보 목록을 무작위로 섞음
        const shuffledCandidates = this.shuffleArray(candidateWords);

        // 4. 난이도에 따라 필요한 단어 개수를 계산하고 그만큼 자름
        const maxWordsForDifficulty = (this.difficulty * 2) + 4;
        const wordsToPlaceCount = Math.min(shuffledCandidates.length, maxWordsForDifficulty);
        
        this.words = shuffledCandidates.slice(0, wordsToPlaceCount).map(w => ({
            word: w.word,
            hints: Array.isArray(w.hints) ? [...w.hints] : [w.hints]
        }));
        
        console.log(`선택된 단어 수: ${this.words.length}`);
    }

    placeWordsOnGrid() {
        // Simple placement algorithm
        const centerRow = Math.floor(this.gridSize / 2);
        const centerCol = Math.floor(this.gridSize / 2);

        // Place first word horizontally in center
        if (this.words.length > 0) {
            const startCol = Math.max(0, centerCol - Math.floor(this.words[0].word.length / 2));
            this.placeWord(this.words[0], centerRow, startCol, 'across');
        }

        // Place remaining words
        for (let i = 1; i < this.words.length; i++) {
            const placed = this.findPlacementForWord(this.words[i]);

            // 배치에 실패한 단어는 words 배열에서 제거하지 않지만 clues에 추가하지 않음
            // generateClues 메서드에서 row, col이 undefined인 단어는 자동으로 제외됨
        }
    }

    placeWord(wordObj, row, col, direction) {
        const word = wordObj.word.toUpperCase();

        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;

            if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
                const currentCell = this.grid[r][c];

                // 교차점 검증: 이미 문자가 있는 경우, 같은 문자인지 확인
                if (currentCell.type === 'white' && currentCell.value !== '') {
                    if (currentCell.value !== word[i]) {
                        // 문자가 다르면 배치 실패 - 이 단어는 배치하지 않음
                        console.warn(`교차점 문자 불일치: 기존 '${currentCell.value}' vs 새로운 '${word[i]}' at (${r}, ${c})`);
                        return false; // 배치 실패
                    }
                    // 같은 문자면 덮어쓰지 않고 그냥 둠 (교차점)
                } else {
                    // 빈 셀이면 새로운 문자 배치
                    this.grid[r][c] = {
                        type: 'white',
                        value: word[i],
                        number: null
                    };
                    this.solution[r][c] = word[i];
                }
            }
        }

        // Store word info
        wordObj.row = row;
        wordObj.col = col;
        wordObj.direction = direction;
        wordObj.answer = word;
        return true; // 배치 성공
    }

    findPlacementForWord(wordObj) {
        const word = wordObj.word.toUpperCase();
        let placed = false;

        // Try to intersect with existing words
        // Create a shuffled list of potential intersection points to try
        const points = [];
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.grid[r][c].type === 'white' && this.grid[r][c].value !== '') {
                    points.push({r, c, value: this.grid[r][c].value});
                }
            }
        }
        this.shuffleArray(points);

        for (const point of points) {
            if (placed) break;
            const { r: row, c: col, value } = point;
            const directions = this.shuffleArray(['across', 'down']);

            for (const direction of directions) {
                if (placed) break;
                for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
                    // 교차점의 문자가 일치하는지 확인
                    if (word[letterIndex] === value) {
                        const startRow = direction === 'across' ? row : row - letterIndex;
                        const startCol = direction === 'across' ? col - letterIndex : col;

                        if (this.canPlaceWordAt(word, startRow, startCol, direction)) {
                            // placeWord가 성공했는지 확인 (교차점 문자 일치 검증 포함)
                            const success = this.placeWord(wordObj, startRow, startCol, direction);
                            if (success) {
                                placed = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        // 배치에 실패한 경우 로그 출력
        if (!placed) {
            console.log(`단어 배치 실패: ${word} (교차점을 찾을 수 없음)`);
        }

        return placed;
    }

    canPlaceWordAt(word, row, col, direction) {
        if (row < 0 || col < 0) return false;

        const wordLength = word.length;
        const endRow = direction === 'across' ? row : row + wordLength - 1;
        const endCol = direction === 'across' ? col + wordLength - 1 : col;

        if (endRow >= this.gridSize || endCol >= this.gridSize) return false;

        // 1. Check start/end boundaries to prevent merging words
        if (direction === 'across') {
            // Check before the word - 문자가 있으면 안됨
            if (col > 0 && this.grid[row][col - 1].type === 'white' && this.grid[row][col - 1].value !== '') {
                return false;
            }
            // Check after the word - 문자가 있으면 안됨
            if (endCol < this.gridSize - 1 && this.grid[row][endCol + 1].type === 'white' && this.grid[row][endCol + 1].value !== '') {
                return false;
            }
        } else { // direction === 'down'
            // Check before the word - 문자가 있으면 안됨
            if (row > 0 && this.grid[row - 1][col].type === 'white' && this.grid[row - 1][col].value !== '') {
                return false;
            }
            // Check after the word - 문자가 있으면 안됨
            if (endRow < this.gridSize - 1 && this.grid[endRow + 1][col].type === 'white' && this.grid[endRow + 1][col].value !== '') {
                return false;
            }
        }

        // 2. Check each cell for conflicts and adjacency
        for (let i = 0; i < wordLength; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;
            const currentCell = this.grid[r][c];

            // 교차점 검증 강화: 셀이 흰색이고 값이 있으면 반드시 같은 문자여야 함
            if (currentCell.type === 'white' && currentCell.value !== '') {
                // 이미 문자가 있는 경우, 교차점이므로 같은 문자인지 확인
                if (currentCell.value !== word[i]) {
                    return false; // 문자 불일치 - 배치 불가
                }
                // 같은 문자면 유효한 교차점
            } else if (currentCell.type === 'white' && currentCell.value === '') {
                // 흰색 셀인데 값이 없는 경우 - 이상한 상태이므로 거부
                return false;
            } else if (currentCell.type === 'black') {
                // 빈 셀(검은색)에 배치할 경우, 인접 셀 확인
                // Check adjacent cells for invalid neighbors
                if (direction === 'across') {
                    // Check above
                    if (r > 0 && this.grid[r - 1][c].type === 'white' && this.grid[r - 1][c].value !== '') return false;
                    // Check below
                    if (r < this.gridSize - 1 && this.grid[r + 1][c].type === 'white' && this.grid[r + 1][c].value !== '') return false;
                } else { // direction === 'down'
                    // Check left
                    if (c > 0 && this.grid[r][c - 1].type === 'white' && this.grid[r][c - 1].value !== '') return false;
                    // Check right
                    if (c < this.gridSize - 1 && this.grid[r][c + 1].type === 'white' && this.grid[r][c + 1].value !== '') return false;
                }
            }
        }

        return true; // If all checks pass, it's a valid placement
    }

    placeWordRandomly(wordObj) {
        const word = wordObj.word.toUpperCase();
        const direction = Math.random() < 0.5 ? 'across' : 'down';

        const maxRow = direction === 'across' ? this.gridSize - 1 : this.gridSize - word.length;
        const maxCol = direction === 'across' ? this.gridSize - word.length : this.gridSize - 1;

        if (maxRow >= 0 && maxCol >= 0) {
            // Try to find an empty area
            for (let attempts = 0; attempts < 50; attempts++) {
                const row = Math.floor(Math.random() * (maxRow + 1));
                const col = Math.floor(Math.random() * (maxCol + 1));

                if (this.canPlaceWordAt(word, row, col, direction)) {
                    const success = this.placeWord(wordObj, row, col, direction);
                    if (success) {
                        return true;
                    }
                }
            }
        }
        return false; // 배치 실패
    }

    addNumbersToGrid() {
        let number = 1;
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col].type === 'white') {
                    let needsNumber = false;
                    
                    // Check if start of across word
                    if (col === 0 || this.grid[row][col - 1].type === 'black') {
                        if (col + 1 < this.gridSize && this.grid[row][col + 1].type === 'white') {
                            needsNumber = true;
                        }
                    }
                    
                    // Check if start of down word
                    if (row === 0 || this.grid[row - 1][col].type === 'black') {
                        if (row + 1 < this.gridSize && this.grid[row + 1][col].type === 'white') {
                            needsNumber = true;
                        }
                    }
                    
                    if (needsNumber) {
                        this.grid[row][col].number = number;
                        number++;
                    }
                }
            }
        }
    }

    generateClues() {
        // 완전히 새로운 객체로 초기화 (참조 문제 방지)
        this.clues = {
            across: [],
            down: []
        };

        this.words.forEach(wordObj => {
            if (wordObj.row !== undefined && wordObj.col !== undefined) {
                const clue = {
                    number: this.grid[wordObj.row][wordObj.col].number,
                    hints: wordObj.hints,
                    answer: wordObj.answer,
                    row: wordObj.row,
                    col: wordObj.col,
                    length: wordObj.answer.length
                };

                if (clue.number && wordObj.direction) {
                    // direction이 유효한지 확인
                    if (wordObj.direction === 'across' || wordObj.direction === 'down') {
                        this.clues[wordObj.direction].push(clue);
                    }
                }
            }
        });

        // Sort clues by number
        this.clues.across.sort((a, b) => a.number - b.number);
        this.clues.down.sort((a, b) => a.number - b.number);

        // 디버깅: 생성된 단서 개수 확인
        console.log(`생성된 단서 - 가로: ${this.clues.across.length}, 세로: ${this.clues.down.length}`);
    }

    // ===== Rendering =====
    renderGrid() {
        this.crosswordGrid.innerHTML = '';
        this.crosswordGrid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                const cellData = this.grid[row][col];

                cell.className = `crossword-cell ${cellData.type}`;
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (cellData.type === 'white') {
                    if (cellData.number) {
                        const numberDiv = document.createElement('div');
                        numberDiv.className = 'cell-number';
                        numberDiv.textContent = cellData.number;
                        cell.appendChild(numberDiv);
                    }

                    // 클릭 이벤트 추가: 그리드 셀 클릭 시 입력창에 번호와 방향 자동 세팅
                    cell.addEventListener('click', () => {
                        this.selectWordFromCell(row, col);
                    });
                }

                this.crosswordGrid.appendChild(cell);
            }
        }

        // 적응형 그리드 크기 조정

    }

    // 그리드 셀 클릭 시 해당 셀이 속한 단어 선택
    selectWordFromCell(row, col) {
        // 이 셀이 속한 가로/세로 단어 찾기
        const wordsAtCell = this.findWordsAtCell(row, col);

        if (wordsAtCell.length === 0) return;

        // 완료되지 않은 단어만 필터링
        const incompleteWords = wordsAtCell.filter(w =>
            !this.completedWords.has(`${w.direction}-${w.number}`)
        );

        if (incompleteWords.length === 0) {
            // 모든 단어가 완료되었으면 아무것도 하지 않음
            return;
        }

        // 첫 번째 미완료 단어 선택 (가로 우선)
        const selectedWord = incompleteWords.find(w => w.direction === 'across') || incompleteWords[0];

        this.selectWordFromClue(selectedWord.number, selectedWord.direction);
    }

    // 특정 셀이 속한 모든 단어(가로/세로) 찾기
    findWordsAtCell(row, col) {
        const words = [];

        // 가로 단어 찾기
        for (const clue of this.clues.across) {
            if (clue.row === row && col >= clue.col && col < clue.col + clue.length) {
                words.push({ number: clue.number, direction: 'across' });
            }
        }

        // 세로 단어 찾기
        for (const clue of this.clues.down) {
            if (clue.col === col && row >= clue.row && row < clue.row + clue.length) {
                words.push({ number: clue.number, direction: 'down' });
            }
        }

        return words;
    }

    // ===== Adaptive Grid Layout =====

    renderClues() {
        // 1단계: 모든 기존 clue-item 완전 제거 (이벤트 리스너까지)
        document.querySelectorAll('.clue-item').forEach(item => {
            item.remove();
        });

        // 2단계: DOM 선택자로 직접 접근하여 컨테이너 완전히 초기화
        const acrossCluesContainer = document.getElementById('acrossClues');
        const downCluesContainer = document.getElementById('downClues');

        if (acrossCluesContainer) {
            // 모든 자식 노드 제거
            while (acrossCluesContainer.firstChild) {
                acrossCluesContainer.removeChild(acrossCluesContainer.firstChild);
            }
        }

        if (downCluesContainer) {
            // 모든 자식 노드 제거
            while (downCluesContainer.firstChild) {
                downCluesContainer.removeChild(downCluesContainer.firstChild);
            }
        }

        // 3단계: this 참조도 초기화
        if (this.acrossClues) {
            while (this.acrossClues.firstChild) {
                this.acrossClues.removeChild(this.acrossClues.firstChild);
            }
        }
        if (this.downClues) {
            while (this.downClues.firstChild) {
                this.downClues.removeChild(this.downClues.firstChild);
            }
        }

        // 4단계: 새로운 단서 렌더링
        this.renderClueList(this.acrossClues, this.clues.across, 'across');
        this.renderClueList(this.downClues, this.clues.down, 'down');
    }

    renderClueList(container, clues, direction) {
        // container 유효성 검증
        if (!container) {
            console.error(`Container is null for direction: ${direction}`);
            return;
        }

        // ID로 직접 접근하여 확실한 컨테이너 확보
        const targetContainer = direction === 'across'
            ? document.getElementById('acrossClues')
            : document.getElementById('downClues');

        if (!targetContainer) {
            console.error(`Cannot find container for direction: ${direction}`);
            return;
        }

        // 완전히 초기화
        targetContainer.innerHTML = '';
        while (targetContainer.firstChild) {
            targetContainer.removeChild(targetContainer.firstChild);
        }

        // 디버깅 로그
        console.log(`렌더링 ${direction} 단서 ${clues.length}개`);

        // 새로운 단서 추가
        clues.forEach((clue, index) => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-item';
            clueElement.dataset.number = clue.number;
            clueElement.dataset.direction = direction;
            clueElement.dataset.index = index; // 디버깅용

            clueElement.innerHTML = `
                <div class="clue-header">
                    <span class="clue-number">${clue.number}.</span>
                    <span class="clue-length">(${clue.length}글자)</span>
                </div>
                <div class="clue-hints">
                    ${clue.hints.map(hint => `<div class="clue-hint">• ${hint}</div>`).join('')}
                </div>
            `;

            clueElement.addEventListener('click', () => {
                this.selectWordFromClue(clue.number, direction);
            });

            targetContainer.appendChild(clueElement);
        });

        // 렌더링 후 확인
        console.log(`${direction} 컨테이너의 자식 요소 수: ${targetContainer.children.length}`);
    }

    selectWordFromClue(number, direction) {
        // 해당 방향의 단서 탭으로 자동 전환
        this.switchClueTab(direction);

        // Set the number dropdown's value
        this.wordNumberSelect.value = number;

        // Manually trigger the 'change' event on the number select to force
        // the direction options to repopulate via the onNumberChange handler.
        this.wordNumberSelect.dispatchEvent(new Event('change'));

        // Now that the direction options are correct for the new number, set the direction.
        this.wordDirectionSelect.value = direction;

        // Manually trigger the 'change' event on the direction select to ensure
        // highlights and hints are updated via the onDirectionChange handler.
        this.wordDirectionSelect.dispatchEvent(new Event('change'));

        // 단서 하이라이트 및 스크롤
        this.highlightCurrentClue(number, direction);

        // 힌트 표시
        this.updateCurrentHintDisplay(number, direction);

        // 입력창에 포커스
        this.wordInput.focus();
    }

    switchClueTab(direction) {
        // Update tab appearance
        document.querySelectorAll('.clue-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-direction="${direction}"]`).classList.add('active');

        // Show corresponding clue list
        document.querySelectorAll('.clues-list').forEach(list => {
            list.classList.remove('active');
        });
        document.querySelector(`.${direction}-clues`).classList.add('active');
    }

    // ===== Hint Display and Highlighting =====
    highlightCurrentClue(number, direction) {
        // 모든 힌트에서 active 클래스 제거
        document.querySelectorAll('.clue-item').forEach(item => {
            item.classList.remove('active');
        });

        // 현재 선택된 힌트에 active 클래스 추가
        const clueElement = document.querySelector(
            `.${direction}-clues .clue-item[data-number="${number}"]`
        );
        if (clueElement) {
            clueElement.classList.add('active');

            // 해당 힌트로 스크롤
            clueElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    updateCurrentHintDisplay(number, direction) {
        const hintDisplay = document.getElementById('currentHintDisplay');
        if (!hintDisplay) return;

        const clue = this.clues[direction].find(c => c.number === number);
        if (clue && clue.hints && clue.hints.length > 0) {
            // 첫 번째 힌트를 표시
            hintDisplay.innerHTML = `<span class="hint-text">${number}. ${clue.hints[0]}</span>`;
            hintDisplay.title = clue.hints.join(' | '); // 툴팁에 모든 힌트 표시
        } else {
            hintDisplay.innerHTML = '<span class="hint-text">힌트가 여기에 표시됩니다</span>';
        }
    }

    // ===== Timer and Game Flow =====
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimer();
            
            if (this.timer <= 0) {
                this.timeOut();
            }
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.timer <= 30) {
            this.timerDisplay.className = 'timer danger';
        } else if (this.timer <= 60) {
            this.timerDisplay.className = 'timer warning';
        } else {
            this.timerDisplay.className = 'timer';
        }
    }

    pauseGame() {
        if (!this.gameActive || this.isPaused) return;
        
        this.isPaused = true;
        clearInterval(this.timerInterval);
        this.showModal('pauseModal');
        this.playSound('click');
    }

    resumeGame() {
        if (!this.isPaused) return;
        
        this.isPaused = false;
        this.closeModal('pauseModal');
        this.startTimer();
        this.playSound('click');
    }

    timeOut() {
        this.endGame(false);
    }

    completeGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        console.log(`[DEBUG] Game complete! Final score: ${finalScore}`);
        
        this.showCelebration();
        this.playSound('complete');
        
        setTimeout(() => {
            console.log(`[DEBUG] Post-celebration: Checking high score. Current high scores loaded: ${this.highScores.length}`);
            console.log(`[DEBUG] Is ${finalScore} a high score? ${this.isHighScore(finalScore)}`);
            if (this.isHighScore(finalScore)) {
                console.log('[DEBUG] Showing name input.');
                this.showNameInput();
            } else {
                console.log('[DEBUG] Showing game over screen.');
                this.showGameOver(true);
            }
        }, 3000);
    }

    endGame(completed = false) {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.closeAllModals();
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        
        if (completed && this.isHighScore(finalScore)) {
            this.showNameInput();
        } else {
            this.showGameOver(completed);
        }
    }

    calculateFinalScore() {
        let baseScore = this.score;
        const timeBonus = this.timer * 2;
        const difficultyMultiplier = this.difficulty * 0.1 + 1;
        const completionRatio = this.completedWords.size / (this.clues.across.length + this.clues.down.length);
        const completionBonus = completionRatio === 1 ? 500 : 0;
        
        return Math.round((baseScore + timeBonus + completionBonus) * difficultyMultiplier);
    }

    // ===== UI Updates =====
    updateScore() {
        this.scoreDisplay.textContent = this.score;
    }

    updateProgress() {
        this.completedDisplay.textContent = this.completedWords.size;
        this.totalDisplay.textContent = this.clues.across.length + this.clues.down.length;
    }

    // ===== Theme and Sound =====
    initTheme() {
        const savedTheme = localStorage.getItem('crossword-theme') || 'light';
        this.theme = savedTheme;
        document.body.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('crossword-theme', this.theme);
        this.updateThemeIcon();
        this.playSound('click');
    }

    updateThemeIcon() {
        const themeClass = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        const icon = document.querySelector('#themeToggleStart i');
        if (icon) {
            icon.className = themeClass;
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundClass = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        const icon = document.querySelector('#soundToggleStart i');
        if (icon) {
            icon.className = soundClass;
        }
        localStorage.setItem('crossword-sound', this.soundEnabled);
        this.playSound('click');
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Simple sound effects using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'click':
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.1;
                    break;
                case 'correct':
                    oscillator.frequency.value = 1000;
                    gainNode.gain.value = 0.2;
                    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                    break;
                case 'error':
                    oscillator.frequency.value = 300;
                    gainNode.gain.value = 0.15;
                    break;
                case 'complete':
                    oscillator.frequency.value = 1200;
                    gainNode.gain.value = 0.3;
                    oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.2);
                    break;
            }
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // ===== Celebration Effects =====
    showCelebration() {
        this.celebrationCanvas.style.display = 'block';
        
        // Simple 2D confetti
        const canvas = this.celebrationCanvas;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 5 + 2,
                speed: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confetti.forEach((piece, index) => {
                piece.y += piece.speed;
                piece.rotation += 2;
                
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                ctx.restore();
                
                if (piece.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });
            
            if (confetti.length > 0) {
                requestAnimationFrame(animate);
            } else {
                canvas.style.display = 'none';
            }
        }
        
        animate();
    }

    // ===== Screen Management =====
    showStartScreen() {
        this.hideAllScreens();
        this.startScreen.classList.add('active');
    }

    showGameScreen() {
        this.hideAllScreens();
        this.gameScreen.classList.add('active');
    }

    showHighScores() {
        this.renderHighScores();
        this.hideAllScreens();
        this.highScoreScreen.classList.add('active');
        this.playSound('click');
    }

    showGameOver(isWin) {
        console.log('[DEBUG] showGameOver called, isWin:', isWin);
        this.hideAllScreens();
        this.gameOverScreen.classList.add('active');
        console.log('[DEBUG] Game over screen set to active');

        const content = document.getElementById('gameOverContent');
        console.log('[DEBUG] gameOverContent element:', content);

        content.innerHTML = `
            <div class="game-over-info">
                <h2>${isWin ? '🎉 축하합니다!' : '⏰ 시간 종료'}</h2>
                <p>최종 점수: <strong>${this.score.toLocaleString()}점</strong></p>
                <p>완성한 단어: <strong>${this.completedWords.size}/${this.clues.across.length + this.clues.down.length}개</strong></p>
                <p>완성률: <strong>${Math.round(this.completedWords.size / (this.clues.across.length + this.clues.down.length) * 100)}%</strong></p>
                <p>난이도: <strong>${this.difficulty}단계</strong></p>
            </div>
            <div class="game-over-actions">
                <button class="btn btn-primary slide-in-left visible" onclick="game.startGame()">
                    <i class="fas fa-redo"></i> 다시 하기
                </button>
                <button class="btn btn-secondary slide-in-right visible" onclick="game.showStartScreen()">
                    <i class="fas fa-home"></i> 메뉴로
                </button>
            </div>
        `;

        console.log('[DEBUG] Content HTML set. Buttons:', content.querySelectorAll('button').length);

        // Trigger animations after a short delay
        setTimeout(() => {
            const buttons = content.querySelectorAll('.slide-in-left, .slide-in-right');
            console.log('[DEBUG] Adding visible class to', buttons.length, 'buttons');
            buttons.forEach(btn => {
                btn.classList.add('visible');
                console.log('[DEBUG] Button classes:', btn.className);
            });
        }, 100);
    }

    showHelp() {
        this.showModal('helpModal');
        this.playSound('click');
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    // ===== Modal Management =====
    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // ===== High Score Management =====
    async loadHighScores() {
        if (!supabaseClient) {
            this.highScores = [];
            return;
        }
        try {
            const { data, error } = await supabaseClient
                .from('high_scores')
                .select('*')
                .order('score', { ascending: false })
                .limit(5);

            if (error) {
                console.error('❌ 최고 기록 로드 실패:', error);
                this.highScores = [];
                return;
            }
            this.highScores = data || [];
            console.log('✅ 최고 기록을 DB에서 로드했습니다.');
        } catch (error) {
            console.error('❌ 최고 기록 로드 중 오류:', error);
            this.highScores = [];
        }
    }

    isHighScore(score) {
        // Now, we just check if the new score is greater than the last of the top 5 scores.
        // Or if there are fewer than 5 scores in the list.
        return this.highScores.length < 5 || score > (this.highScores[this.highScores.length - 1]?.score || 0);
    }

    async saveHighScore() {
        if (!supabaseClient) {
            this.showError('최고 기록을 저장할 수 없습니다 (DB 연결 안됨).', 'error');
            this.closeModal('nameModal');
            this.showGameOver(true);
            return;
        }

        const name = document.getElementById('playerName').value.trim() || 'Anonymous';
        
        try {
            const { error } = await supabaseClient
                .from('high_scores')
                .insert([{
                    name: name,
                    score: this.score,
                    difficulty: this.difficulty,
                    language: this.language,
                    grid_size: this.gridSize
                }]);

            if (error) throw error;

            this.showError('최고 기록이 저장되었습니다!', 'success');
            await this.loadHighScores(); // Reload scores from DB
        } catch (error) {
            console.error('❌ 최고 기록 저장 실패:', error);
            this.showError('최고 기록 저장에 실패했습니다.', 'error');
        } finally {
            this.closeModal('nameModal');
            this.showGameOver(true);
            this.playSound('click');
        }
    }

    showNameInput() {
        console.log('[DEBUG] showNameInput called');
        // Clear previous input
        const playerNameInput = document.getElementById('playerName');
        if (playerNameInput) {
            playerNameInput.value = '';
        }
        this.showModal('nameModal');
        // Focus on input
        setTimeout(() => {
            if (playerNameInput) {
                playerNameInput.focus();
            }
        }, 100);
    }

    skipNameInput() {
        this.closeModal('nameModal');
        this.showGameOver(true);
        this.playSound('click');
    }

    renderHighScores() {
        this.scoreList.innerHTML = '';
        
        if (this.highScores.length === 0) {
            this.scoreList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">아직 기록이 없습니다.</p>';
            return;
        }
        
        this.highScores.forEach((score, index) => {
            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';
            scoreItem.innerHTML = `
                <div class="score-rank">#${index + 1}</div>
                <div class="score-details">
                    <div class="score-name">${score.name}</div>
                    <div class="score-meta">${score.language} • ${score.gridSize}x${score.gridSize} • 난이도 ${score.difficulty} • ${score.date}</div>
                </div>
                <div class="score-value">${score.score.toLocaleString()}</div>
            `;
            this.scoreList.appendChild(scoreItem);
        });
    }

    // ===== Keyboard Shortcuts =====
    handleKeyboard(e) {
        if (e.key === 'Escape') {
            if (this.gameActive && !this.isPaused) {
                this.pauseGame();
            } else {
                this.closeAllModals();
            }
        } else if (e.key === 'Enter' && !this.gameActive) {
            if (this.startScreen.classList.contains('active')) {
                this.startGame();
            }
        }
    }

    // ===== Utility Functions =====
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

// ===== Initialize Game =====
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new AdvancedCrosswordGame();
    
    // Load saved settings
    const savedSound = localStorage.getItem('crossword-sound');
    if (savedSound !== null) {
        game.soundEnabled = savedSound === 'true';
        const icon = document.querySelector('#soundToggle i');
        icon.className = game.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
});

// ===== Service Worker for PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}