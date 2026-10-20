// Natural-conversation layer for the portfolio chatbot (Task 2.A).
//
// This is intentionally separate from CHATBOT_KNOWLEDGE_BASE in
// blueprintData.ts: small talk is not a "question with a factual answer",
// it is conversational glue (greetings, identity checks, thanks, goodbyes,
// confusion, language-capability checks). Keeping it in its own module
// keeps blueprintData.ts purely about Matteo's professional facts.
//
// Every rule is matched against a normalized (lowercased, accent-stripped)
// string. `responsesIt` / `responsesEn` hold 2-3 phrasing variants so the
// assistant doesn't repeat the exact same sentence on every greeting in a
// session -- the engine picks one pseudo-randomly.

export type SmallTalkCategory =
  | 'greeting'
  | 'identity'
  | 'howAreYou'
  | 'capabilities'
  | 'thanks'
  | 'goodbye'
  | 'confusion'
  | 'languageAbility';

export interface SmallTalkRule {
  id: string;
  category: SmallTalkCategory;
  /** Substrings (already normalized: lowercase, accents stripped) that trigger this rule. */
  keywords: string[];
  /**
   * Optional guard: if provided, the rule only fires when the normalized
   * message additionally matches this predicate. Used to stop short, common
   * words (e.g. "ok", "ciao") from firing when they appear inside a longer,
   * unrelated question.
   */
  maxWordCount?: number;
  responsesIt: string[];
  responsesEn: string[];
}

export const SMALL_TALK_RULES: SmallTalkRule[] = [
  {
    id: 'greeting',
    category: 'greeting',
    keywords: ['ciao', 'salve', 'buongiorno', 'buonasera', 'hey', 'hello', 'hi ', 'hi!', 'hi?'],
    maxWordCount: 6,
    responsesIt: [
      'Ciao! Sono l’assistente virtuale del portfolio di Matteo Cavo. Posso parlarti del suo percorso, delle sue competenze Data & BI o dei progetti in evidenza: cosa ti interessa?',
      'Ciao, benvenuto/a! Chiedimi pure dei progetti di Matteo, delle sue competenze tecniche o di come contattarlo.'
    ],
    responsesEn: [
      'Hi there! I’m Matteo Cavo’s virtual portfolio assistant. I can tell you about his background, Data & BI skills, or featured projects — what would you like to know?',
      'Hello! Feel free to ask about Matteo’s projects, technical skills, or how to get in touch.'
    ]
  },
  {
    id: 'are_you_there',
    category: 'greeting',
    keywords: ['ci sei', 'sei online', 'are you there', 'you there'],
    responsesIt: ['Sì, sono qui! Dimmi pure cosa vuoi sapere su Matteo e i suoi progetti.'],
    responsesEn: ['Yes, I’m here! Ask me anything about Matteo and his projects.']
  },
  {
    id: 'how_are_you',
    category: 'howAreYou',
    keywords: ['come stai', 'come va', 'how are you', 'how r u'],
    responsesIt: [
      'Tutto bene, grazie! Sono pronto ad aiutarti a esplorare il portfolio di Matteo: progetti, competenze o servizi?',
      'Bene, grazie per averlo chiesto! Di cosa vorresti parlare — progetti, competenze tecniche o disponibilità di Matteo?'
    ],
    responsesEn: [
      'Doing well, thanks for asking! Ready to help you explore Matteo’s portfolio — projects, skills, or services?',
      'All good, thanks! What would you like to look into — projects, technical skills, or Matteo’s availability?'
    ]
  },
  {
    id: 'identity',
    category: 'identity',
    keywords: ['chi sei', 'sei matteo', 'sei un bot', 'sei un assistente', 'who are you', 'are you matteo', 'are you a bot', 'are you an ai'],
    responsesIt: [
      'Sono l’assistente virtuale del portfolio di Matteo Cavo, non Matteo in persona. Rispondo a domande basate sui contenuti reali del sito: progetti, competenze, certificazioni e servizi.',
      'Non sono Matteo, sono il suo assistente virtuale: ti aiuto a navigare il portfolio rispondendo con informazioni verificate dal sito e dal CV.'
    ],
    responsesEn: [
      'I’m Matteo Cavo’s virtual portfolio assistant, not Matteo himself. I answer based on the real content of this site: projects, skills, certifications, and services.',
      'I’m not Matteo — I’m his virtual assistant, here to help you navigate the portfolio using verified information from the site and his CV.'
    ]
  },
  {
    id: 'capabilities',
    category: 'capabilities',
    keywords: ['cosa sai fare', 'come puoi aiutarmi', 'what can you do', 'how can you help'],
    responsesIt: [
      'Posso rispondere a domande sul background professionale di Matteo, le sue competenze Data & BI (Power BI, SQL, Python, Databricks), i suoi progetti in evidenza, le certificazioni e come contattarlo. Prova a chiedermi di un progetto specifico, ad esempio Quaero o il trasporto pubblico di Roma.'
    ],
    responsesEn: [
      'I can answer questions about Matteo’s professional background, his Data & BI skills (Power BI, SQL, Python, Databricks), featured projects, certifications, and how to get in touch. Try asking about a specific project, like Quaero or the Rome public transport analysis.'
    ]
  },
  {
    id: 'thanks',
    category: 'thanks',
    keywords: ['grazie', 'perfetto', 'thanks', 'thank you', 'thx'],
    maxWordCount: 12,
    responsesIt: [
      'Di nulla! Se hai altre domande su progetti, competenze o servizi, chiedi pure.',
      'Figurati! Sono qui se vuoi approfondire altro.'
    ],
    responsesEn: [
      'You’re welcome! Let me know if you have more questions about projects, skills, or services.',
      'Happy to help! I’m here if you want to dig into anything else.'
    ]
  },
  {
    id: 'ok_acknowledge',
    category: 'thanks',
    keywords: ['ok', 'okay', 'va bene', 'capito'],
    maxWordCount: 2,
    responsesIt: ['Perfetto. Fammi sapere se vuoi esplorare altri progetti o competenze.'],
    responsesEn: ['Great. Let me know if you’d like to explore other projects or skills.']
  },
  {
    id: 'goodbye',
    category: 'goodbye',
    keywords: ['arrivederci', 'a presto', 'ci vediamo', 'goodbye', 'bye', 'see you'],
    maxWordCount: 4,
    responsesIt: ['A presto! Trovi il modulo contatti nella sezione dedicata se vuoi scrivere direttamente a Matteo.'],
    responsesEn: ['Take care! You’ll find the contact form in the dedicated section if you’d like to reach Matteo directly.']
  },
  {
    id: 'confusion',
    category: 'confusion',
    keywords: ['non ho capito', 'puoi spiegare meglio', 'non capisco', "i don't understand", 'didn’t understand', 'can you explain'],
    responsesIt: [
      'Scusa, provo a essere più chiaro: puoi chiedermi di un progetto specifico (es. Quaero, Trasporto Pubblico di Roma), delle competenze tecniche di Matteo, delle certificazioni o di come contattarlo.'
    ],
    responsesEn: [
      'Sorry, let me be clearer: you can ask me about a specific project (e.g. Quaero, Rome Public Transport), Matteo’s technical skills, certifications, or how to get in touch.'
    ]
  },
  {
    id: 'language_ability',
    category: 'languageAbility',
    keywords: ['puoi parlare inglese', 'parli inglese', 'can you speak italian', 'do you speak italian', 'can you speak english'],
    responsesIt: ['Sì, posso risponderti sia in italiano sia in inglese: scrivi pure nella lingua che preferisci.'],
    responsesEn: ['Yes, I can reply in both Italian and English — feel free to write in whichever you prefer.']
  }
];
