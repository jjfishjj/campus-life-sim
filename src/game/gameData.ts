export interface Character {
  id: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  stats: Stats;
}

export interface Stats {
  academic: number;   // 學業
  social: number;     // 社交
  health: number;     // 健康
  money: number;      // 金錢
  stress: number;     // 壓力
}

export interface Location {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface GameEvent {
  id: string;
  locationId: string;
  title: string;
  description: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  effects: Partial<Stats>;
  result: string;
}

export const characters: Character[] = [
  {
    id: "studious",
    name: "小書",
    emoji: "📚",
    title: "學霸型",
    description: "從小名列前茅，目標是研究所。讀書是日常，社交是選修。",
    stats: { academic: 80, social: 30, health: 50, money: 40, stress: 60 },
  },
  {
    id: "social",
    name: "阿交",
    emoji: "🎉",
    title: "社交達人",
    description: "系學會會長候選人，認識全校一半的人。課業？期末再說！",
    stats: { academic: 40, social: 80, health: 60, money: 30, stress: 40 },
  },
  {
    id: "parttime",
    name: "打工仔",
    emoji: "💰",
    title: "打工戰士",
    description: "半工半讀的務實派，便利商店、家教、外送全都來。",
    stats: { academic: 50, social: 50, health: 40, money: 80, stress: 55 },
  },
  {
    id: "athlete",
    name: "體育哥",
    emoji: "⚽",
    title: "運動健將",
    description: "校隊王牌，體能滿分。最大的敵人不是對手，是必修學分。",
    stats: { academic: 35, social: 60, health: 90, money: 30, stress: 35 },
  },
  {
    id: "creative",
    name: "文青妹",
    emoji: "🎨",
    title: "創作者",
    description: "寫詩、畫畫、拍短片。IG追蹤者比GPA還高。",
    stats: { academic: 45, social: 55, health: 50, money: 35, stress: 50 },
  },
  {
    id: "gamer",
    name: "阿宅",
    emoji: "🎮",
    title: "電競選手",
    description: "rank比學分高，直播比上課認真。夢想是成為職業選手。",
    stats: { academic: 30, social: 40, health: 35, money: 45, stress: 45 },
  },
];

export const locations: Location[] = [
  { id: "library", name: "圖書館", emoji: "📖", description: "知識的殿堂，也是睡覺的好地方", color: "campus-blue" },
  { id: "cafeteria", name: "學生餐廳", emoji: "🍜", description: "便宜又大碗，社交的重要場所", color: "campus-yellow" },
  { id: "dorm", name: "宿舍", emoji: "🏠", description: "你的小天地，室友的大世界", color: "campus-green" },
  { id: "gym", name: "體育館", emoji: "🏋️", description: "流汗的地方，也是認識人的地方", color: "campus-pink" },
  { id: "club", name: "社團辦公室", emoji: "🎭", description: "熱情與才華碰撞的火花", color: "campus-purple" },
  { id: "parttime", name: "校外打工", emoji: "🏪", description: "賺錢的地方，也是學習社會的教室", color: "campus-yellow" },
];

export const gameEvents: GameEvent[] = [
  {
    id: "lib1", locationId: "library",
    title: "期中考前夕",
    description: "期中考就在明天！你翻開課本發現大部分內容都很陌生...",
    choices: [
      { text: "熬夜苦讀到天亮", effects: { academic: 15, health: -10, stress: 15 }, result: "你成功背完重點，但黑眼圈深得像熊貓。考試結果還不錯！" },
      { text: "找同學組讀書會", effects: { academic: 10, social: 5, stress: 5 }, result: "大家一起討論，效率意外地高！還交到了新朋友。" },
      { text: "放棄掙扎，早點睡", effects: { academic: -5, health: 10, stress: -10 }, result: "睡飽精神好，但看到考卷時有點後悔..." },
    ],
  },
  {
    id: "lib2", locationId: "library",
    title: "論文大魔王",
    description: "教授要求下週交一篇3000字的報告，題目是「AI對社會的影響」。",
    choices: [
      { text: "認真做研究寫原創", effects: { academic: 20, stress: 10, health: -5 }, result: "花了整整三天，但教授給了A+，還在課堂上表揚你！" },
      { text: "參考學長姐的範本改寫", effects: { academic: 8, stress: -5 }, result: "省了不少時間，拿到B+，算是及格了。" },
      { text: "用AI幫忙寫初稿再修改", effects: { academic: 12, stress: -3, money: -5 }, result: "效率很高，但需要花時間修改成自己的風格。最後拿到A-。" },
    ],
  },
  {
    id: "cafe1", locationId: "cafeteria",
    title: "午餐時光",
    description: "中午的學餐人山人海，你看到了幾個選擇...",
    choices: [
      { text: "吃學餐省錢", effects: { money: 5, health: 5, social: 5 }, result: "巧遇隔壁系的同學，聊得很開心！便宜又好吃。" },
      { text: "叫外送吃好的", effects: { money: -15, health: -5, stress: -10 }, result: "雖然花了不少錢，但吃到美食心情超好！" },
      { text: "省錢不吃了", effects: { money: 10, health: -15, stress: 5 }, result: "下午上課肚子一直叫，完全無法專心..." },
    ],
  },
  {
    id: "cafe2", locationId: "cafeteria",
    title: "系上聚餐",
    description: "系學會辦了一場聚餐，但你手頭有點緊...",
    choices: [
      { text: "開心參加！錢再賺就好", effects: { social: 15, money: -20, stress: -10 }, result: "認識了很多新朋友，還被推薦加入系籃！" },
      { text: "去但只點便宜的", effects: { social: 8, money: -8, stress: -5 }, result: "雖然有點尷尬，但大家都很nice，氣氛很好。" },
      { text: "找藉口不去", effects: { social: -10, money: 0, stress: 5 }, result: "省了錢，但看到大家在群組分享照片有點落寞..." },
    ],
  },
  {
    id: "dorm1", locationId: "dorm",
    title: "室友夜談",
    description: "半夜室友睡不著，開始聊起未來的規劃...",
    choices: [
      { text: "一起聊到天亮", effects: { social: 15, health: -10, academic: -5, stress: -15 }, result: "聊了很多人生大事，感覺彼此的距離更近了。但明天的早八..." },
      { text: "聊一下就睡", effects: { social: 5, health: 5, stress: -5 }, result: "適度交流後好好休息，明天精神不錯。" },
      { text: "戴耳機假裝沒聽到", effects: { social: -5, health: 10, stress: 0 }, result: "睡眠品質很好，但室友似乎有點失望。" },
    ],
  },
  {
    id: "dorm2", locationId: "dorm",
    title: "宿舍大掃除",
    description: "學校通知下週要做宿舍檢查，你的房間像被炸過一樣...",
    choices: [
      { text: "認真打掃一整天", effects: { health: 10, stress: -10, academic: -5 }, result: "房間煥然一新！連室友都驚呆了。檢查拿到滿分。" },
      { text: "只清表面應付檢查", effects: { stress: -3 }, result: "勉強過關，但衣櫃裡的東西隨時會雪崩..." },
      { text: "花錢請清潔服務", effects: { money: -15, stress: -8 }, result: "專業的就是不一樣，但錢包在哭泣。" },
    ],
  },
  {
    id: "gym1", locationId: "gym",
    title: "校際比賽邀請",
    description: "體育老師看到你的表現，邀請你參加校際運動會！",
    choices: [
      { text: "全力以赴參加！", effects: { health: 15, social: 10, academic: -10, stress: 10 }, result: "拿到第二名！雖然犧牲了讀書時間，但超有成就感。" },
      { text: "參加但不太認真練", effects: { health: 5, social: 5, stress: 0 }, result: "體驗了比賽氣氛，認識了其他學校的人。" },
      { text: "婉拒，專心課業", effects: { academic: 10, stress: -5, social: -5 }, result: "多了時間念書，但有點遺憾沒去嘗試。" },
    ],
  },
  {
    id: "gym2", locationId: "gym",
    title: "健身挑戰",
    description: "朋友邀你一起參加30天健身挑戰，每天運動30分鐘。",
    choices: [
      { text: "接受挑戰！", effects: { health: 20, social: 5, stress: -10, academic: -5 }, result: "30天後體能大幅提升，精神也變好了！" },
      { text: "偶爾去就好", effects: { health: 8, social: 3 }, result: "斷斷續續的，但至少有動起來。" },
      { text: "我是沙發馬鈴薯", effects: { health: -5, stress: 5 }, result: "看著朋友變壯，自己只是變胖了..." },
    ],
  },
  {
    id: "club1", locationId: "club",
    title: "社團成果發表",
    description: "社團的期末成果發表即將到來，身為幹部的你需要做決定...",
    choices: [
      { text: "全力籌備，完美演出", effects: { social: 15, academic: -10, stress: 15, money: -10 }, result: "演出大成功！觀眾的掌聲讓一切辛苦都值得了。" },
      { text: "分工合作，不必完美", effects: { social: 10, stress: 5 }, result: "團隊合作順利，大家都有參與感。不錯的結果！" },
      { text: "推掉責任給學弟妹", effects: { social: -10, stress: -10, academic: 5 }, result: "自己輕鬆了，但學弟妹們似乎對你有些不滿..." },
    ],
  },
  {
    id: "club2", locationId: "club",
    title: "社團招新",
    description: "新學期開始，社團需要招募新成員。你負責擺攤宣傳。",
    choices: [
      { text: "熱情拉人，使出渾身解數", effects: { social: 15, stress: 5, health: -5 }, result: "成功招到20個新成員！社團充滿活力。" },
      { text: "做精美海報和影片宣傳", effects: { social: 10, academic: -5, money: -5 }, result: "宣傳影片在IG爆紅，很多人主動來詢問！" },
      { text: "隨緣，有興趣的自然會來", effects: { social: -5, stress: -5 }, result: "只來了3個人...社團面臨存亡危機。" },
    ],
  },
  {
    id: "pt1", locationId: "parttime",
    title: "便利商店排班",
    description: "便利商店店長問你這週能不能多上幾班，時薪多加20元。",
    choices: [
      { text: "瘋狂加班賺錢！", effects: { money: 25, academic: -15, health: -10, stress: 15 }, result: "這週賺了不少錢，但完全沒時間念書，身體也很累。" },
      { text: "多上一班就好", effects: { money: 10, academic: -5, stress: 5 }, result: "多賺一些又不會太累，剛剛好。" },
      { text: "維持原本的班", effects: { money: 0, stress: -5 }, result: "保持平衡，專心應付期中考。" },
    ],
  },
  {
    id: "pt2", locationId: "parttime",
    title: "家教機會",
    description: "有人介紹一份高中生的數學家教，時薪很不錯！",
    choices: [
      { text: "接下來！教學相長", effects: { money: 20, academic: 5, social: 5, stress: 5 }, result: "學生成績進步了，家長還加了薪！教別人也讓自己複習了一遍。" },
      { text: "試上一堂看看", effects: { money: 5, social: 3 }, result: "發現教學比想像中難，但是很有成就感。" },
      { text: "沒時間，婉拒了", effects: { stress: -5 }, result: "少了收入來源，但也少了一份壓力。" },
    ],
  },
  {
    id: "lib3", locationId: "library",
    title: "選課大戰",
    description: "下學期選課開始了！熱門課程秒殺，你該怎麼辦？",
    choices: [
      { text: "凌晨搶課，志在必得", effects: { academic: 10, health: -5, stress: 10 }, result: "成功搶到夢幻課表！但整晚沒睡。" },
      { text: "選有興趣但冷門的課", effects: { academic: 8, social: -3, stress: -5 }, result: "小班教學，教授記得你的名字，收穫很多。" },
      { text: "隨便選，能畢業就好", effects: { academic: -5, stress: -10 }, result: "課表很輕鬆，但學到的東西好像不多..." },
    ],
  },
  {
    id: "cafe3", locationId: "cafeteria",
    title: "學長姐的建議",
    description: "在餐廳遇到已經畢業的學長，他分享了很多職場經驗...",
    choices: [
      { text: "認真聽取建議，開始規劃實習", effects: { academic: 5, social: 10, stress: 10 }, result: "學長幫你推薦了一個實習機會！但要準備履歷了。" },
      { text: "邊吃邊聽，記下重點", effects: { social: 5, stress: 3 }, result: "獲得了一些有用的資訊，之後慢慢消化。" },
      { text: "隨便聽聽，船到橋頭自然直", effects: { stress: -5, social: -3 }, result: "吃完飯就忘了，直到畢業前才想起來..." },
    ],
  },
];

export function getRandomEvent(locationId: string, usedEventIds: string[]): GameEvent | null {
  const available = gameEvents.filter(
    (e) => e.locationId === locationId && !usedEventIds.includes(e.id)
  );
  if (available.length === 0) {
    // Reset - allow all events for this location
    const all = gameEvents.filter((e) => e.locationId === locationId);
    return all[Math.floor(Math.random() * all.length)] || null;
  }
  return available[Math.floor(Math.random() * available.length)];
}

export function clampStat(value: number): number {
  return Math.max(0, Math.min(100, value));
}
