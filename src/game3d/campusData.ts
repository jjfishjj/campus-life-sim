import { CampusBuilding, NPCData, FakePlayer } from './types';

export const campusBuildings: CampusBuilding[] = [
  {
    id: 'admin',
    name: '行政大樓',
    position: [0, 3, -20],
    size: [16, 6, 10],
    color: '#8B7355',
    entranceOffset: [0, 0, 5],
  },
  {
    id: 'library',
    name: '圖書館',
    position: [-25, 2.5, 0],
    size: [14, 5, 12],
    color: '#4A6741',
    entranceOffset: [7, 0, 0],
  },
  {
    id: 'gym',
    name: '體育館',
    position: [25, 3, 0],
    size: [18, 6, 14],
    color: '#5B7BA5',
    entranceOffset: [-9, 0, 0],
  },
  {
    id: 'classroom',
    name: '教學大樓',
    position: [0, 4, 20],
    size: [20, 8, 10],
    color: '#9E8B7E',
    entranceOffset: [0, 0, -5],
  },
  {
    id: 'cafeteria',
    name: '學生餐廳',
    position: [-20, 2, 20],
    size: [10, 4, 8],
    color: '#C4956A',
    entranceOffset: [5, 0, 0],
  },
  {
    id: 'dorm',
    name: '學生宿舍',
    position: [20, 3.5, 20],
    size: [12, 7, 10],
    color: '#7A8B99',
    entranceOffset: [-6, 0, 0],
  },
];

export const npcs: NPCData[] = [
  {
    id: 'librarian',
    name: '圖書館管理員 王阿姨',
    type: 'static',
    position: { x: -18, y: 0, z: 0, rotation: Math.PI / 2 },
    location: 'library',
    color: '#6B8E23',
    dialogue: [
      { speaker: '王阿姨', text: '歡迎來到圖書館！📚' },
      { speaker: '王阿姨', text: '最近有一批新書到館了，你有興趣看看嗎？' },
      { speaker: '王阿姨', text: '記得借書要在兩週內歸還喔，逾期一天罰5元。' },
    ],
  },
  {
    id: 'coach',
    name: '體育老師 陳教練',
    type: 'static',
    position: { x: 16, y: 0, z: 0, rotation: -Math.PI / 2 },
    location: 'gym',
    color: '#CD5C5C',
    dialogue: [
      { speaker: '陳教練', text: '同學！來運動一下吧！💪' },
      { speaker: '陳教練', text: '校際運動會快到了，我們需要更多選手。' },
      { speaker: '陳教練', text: '健康的身體是一切的本錢啊！' },
    ],
  },
  {
    id: 'professor',
    name: '李教授',
    type: 'static',
    position: { x: 0, y: 0, z: 15, rotation: Math.PI },
    location: 'classroom',
    color: '#4682B4',
    dialogue: [
      { speaker: '李教授', text: '你好，同學。🎓' },
      { speaker: '李教授', text: '下週的報告記得要交，佔學期成績30%。' },
      { speaker: '李教授', text: '有什麼問題可以來辦公室找我。' },
    ],
  },
  {
    id: 'student1',
    name: '路過的學生',
    type: 'wandering',
    position: { x: 5, y: 0, z: 5, rotation: 0 },
    location: 'campus',
    color: '#DDA0DD',
    dialogue: [
      { speaker: '學生', text: '嗨～你也是今年的新生嗎？' },
      { speaker: '學生', text: '聽說學餐今天有新菜色，要去看看嗎？' },
    ],
  },
  {
    id: 'student2',
    name: '趕路的同學',
    type: 'wandering',
    position: { x: -10, y: 0, z: 10, rotation: 0 },
    location: 'campus',
    color: '#87CEEB',
    dialogue: [
      { speaker: '同學', text: '啊不好意思，我趕著去上課！' },
      { speaker: '同學', text: '下次再聊吧～掰掰！' },
    ],
  },
];

export function createFakePlayers(): FakePlayer[] {
  const names = ['月光族', '夜貓子', '學霸王', '社團咖', '打工仔小美', '電競小王'];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  return names.map((name, i) => {
    const angle = (i / names.length) * Math.PI * 2;
    const radius = 8 + Math.random() * 10;
    return {
      id: `fake_${i}`,
      name,
      position: {
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
        rotation: Math.random() * Math.PI * 2,
      },
      targetPosition: {
        x: Math.cos(angle + 1) * radius,
        y: 0,
        z: Math.sin(angle + 1) * radius,
        rotation: 0,
      },
      color: colors[i],
      speed: 0.5 + Math.random() * 1,
    };
  });
}
