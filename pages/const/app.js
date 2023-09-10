const categoryMap = {
  guofeng: '国风',
  qingfengmingyue: '清风明月',
  zitenghua: '紫藤花（紫色主题）',
  luoli: '萝莉',
  qinghuaci: '青花瓷',
  menghuan: '梦幻',
  wangjiaokamen: '旺角卡门',
  hanshizhengjianzhao: '韩式证件照',
  chunyu: '纯欲',
  hongmeigui: '红玫瑰',
  miaozu: '苗族',
  yonglanfeng: '慵懒风',
  shengri: '生日',
  huoli: '活力',
  he: '荷',
  qingpingguo: '青苹果',
  yundongshaonu: '运动少女',
  minguo: '民国',
  zhuyun: '竹韵',
  xiarieshenzhen: '夏日写真',
  heben: '赫本',
  dunhuangfeng: '敦煌风',
  fenweijiaopian: '氛围胶片感',
  jiangnanyanyu: '江南烟雨',
  luolita: '洛丽塔',
  balei: '芭蕾',
  zangzu: '藏族',
  meishifugu: '美式复古',
  ccd: 'ccd',
  lvyexianzong: '绿野仙踪',
  rijiepian: '日系胶片感',
  qingyangshaonu: '轻氧少女',
  zaitaogongzhu: '在逃公主',
  qingsechulian: '青涩初恋',
  pishuai: '痞帅',
  huabanshaonian: '滑板少年',
  guofengshaonian: '国风少年',
};

const categoryObjects = category.map((chineseName) => {
  // 这里你可以定义一个映射表来将中文翻译成英文
  const englishName = translateChineseToEnglish(chineseName); // 请替换成实际的翻译逻辑

  return {
    chinese: chineseName,
    english: englishName,
  };
});
const description =
  '请选择一张人脸清晰的照片，生成图片需要等待一段时间，可在作品页查看生成作品和进度，作品将在12小时后删除，请及时保存图片';
