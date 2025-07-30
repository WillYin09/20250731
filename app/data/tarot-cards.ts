export interface TarotCardData {
  name: string
  translation: string
  description: string
  normal: string
  reversed: string
  detail: string
  image: string
}

export const CARD_BACK_IMAGE = "/images/tarot/card-back.png"

export const TAROT_CARDS: TarotCardData[] = [
  // 大阿卡纳 (Major Arcana) - 22张
  {
    name: "The Fool",
    translation: "愚人",
    description:
      "愚人牌描绘了一个快乐地走向世界的青年。他正在迈出他的第一步，他充满活力，快乐，兴奋。除了一个小袋子，他什么都没带，对路上可能出现的危险毫不在意。事实上，他很快就会遇到这些可能的危险中的第一个，因为如果他再多走一步，他就会从他前方的悬崖上跌落。但这似乎与他无关——我们不确定他是天真还是幼稚。跟在他身后的狗吠叫着警告他，如果他不尽快意识到周围的环境，他可能永远经历他梦想遇到的所有冒险。",
    normal: "新的开始，新的旅程，自由，纯真，无限潜力，冒险，理想主义，自发性",
    reversed: "鲁莽，粗心，心烦意乱，幼稚，愚蠢，容易上当受骗，古板，沉闷",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-fool-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/00-TheFool.png",
  },
  {
    name: "The Magician",
    translation: "魔术师",
    description: `魔术师是一张充满象征意义的卡牌。中央人物描绘了一个人，一只手指向天空，另一只手指向地面，仿佛在说 "天上如是，地上亦然"（as above, so below）。这是一个比较复杂的说法，但概括来说就是地反映天，外部反映内在，微观反映宏观。在这里也可以解释为，魔术师象征着在天上世界和人类世界之间充当中间人的能力。在他的桌子上，魔术师也摆放着所有的卡牌花色。这象征着由这位魔术师连接的四种元素——风，火，水和土。他头上的无穷大标志，预示着用意志可以创造无限可能。`,
    normal: "意志力，欲望，足智多谋，强大的技巧与能力，注意力，积极行动，愿望实现",
    reversed: "操纵，狡猾，诡计，幻觉，欺骗，才能被浪费或用到错误的方向",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-magician-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/01-TheMagician.png",
  },
  {
    name: "The High Priestess",
    translation: "女祭司",
    description:
      "女祭司坐在所罗门圣殿，雅斤和波阿斯两根柱子之间的立方石之上。雅斤（右）通常被称为建立之柱，波阿斯（左）是力量之柱。柱子描绘了自然的二元性：男性与女性，善与恶，消极与积极。女祭司位于两者之间，这表明她有责任充当现实深处的调解人。她是第三根支柱——两者之间的路径。她认为这两个支柱是平等的，并且在这两个世界中都有知识需要学习。你还会注意到她戴着伊希斯的王冠，这可能意味着她是魔法的信徒。佩戴太阳十字架的女祭司表明她与地球的季节和地球本身有关。她脚下的新月也出现在许多对圣母玛利亚的描绘中，这意味着她对自己的情绪有着完全的把握。背后的石榴则代表了女祭司的抱负。",
    normal: "直觉，神秘，灵性，更高的力量，更高的智慧，内心的声音，平衡，调和",
    reversed: "被压抑的直觉，隐藏的动机，肤浅，混乱，认知失调",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-high-priestess-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/02-TheHighPriestess.png",
  },
  {
    name: "The Empress",
    translation: "女皇",
    description:
      "女皇牌描绘了一个坐在宝座上的女人。从她周围丰富的大自然中，我们可以假设这个女人代表了地球母亲的原型，即生育女神。她的世界由金星统治，这意味着在这位女神的恩典下，有完整的爱，和谐，生育和奢华。这位女士本人有一头金色的头发，上面饰有星星，表明她与神秘领域的神圣联系。她穿着代表生育能力的石榴图案长袍，坐在绣有金星标志的垫子上。她被一片迷人的绿色森林所包围，一条河流穿过这片森林，这象征着蓬勃的生命力。女皇牌为抽中她的人带来繁荣和祝福。",
    normal: "神圣的女性，充足的活力，感官的享受，生育能力，孕育，创造力，美，丰富，自然",
    reversed: "不安全感，霸道，过强的控制欲，疏忽，缺乏成长，缺乏感受能力",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-empress-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/03-TheEmpress.png",
  },
  {
    name: "The Emperor",
    translation: "皇帝",
    description:
      "在皇帝卡牌中，可以看到一个坚忍的统治者形象。宝座上上面装饰着四只公羊的头，代表他的星座——白羊座。一方面，他手持权杖，代表他的统治；另一方面，他拿着一个球体，象征着他所守护的王国。皇帝的长胡子代表着他丰富的阅历。他身后的荒山，彰显着他的决心，更上一层楼的雄心和领导能力。皇帝用勇气，力量和权威来统治。",
    normal: "世俗力量，自律，稳定，实用，权威，控制，纪律",
    reversed: "暴君，霸道，死板，固执，缺乏纪律，缺乏自律，缺乏掌控，鲁莽",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-emperor-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/04-TheEmperor.png",
  },
  {
    name: "The Hierophant",
    translation: "教皇",
    description:
      "这张卡片描绘了一个宗教人物，他端坐在教堂的信众前。他穿着三件精心设计的法衣，分别代表三个不同的世界。他的右手正确地举起，表示祝福的手势——这与魔术师举起的手是同一只手。他头戴三重皇冠，象征着身心灵三个层次。另一方面，他带着三重十字架，十字架上的三根横杠被认为代表了圣父，圣子和圣灵。在他的下方，坐着两名侍僧，代表着机构内神圣知识的转移。通过这些追随者，这张牌也代表了通往知识和教育的道路。",
    normal: "传统，社会规范，教育，知识，信仰",
    reversed: "叛逆，打破常规，不循规蹈矩，新方法，无知",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hierophant-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/05-TheHierophant.png",
  },
  {
    name: "The Lovers",
    translation: "恋人",
    description:
      "在恋人牌中，图上的男人和女人正受到上方天使的保护和祝福。这对恋人似乎在他们的家中安全和快乐，这里似乎是伊甸园。女人身后有蛇的果树是对圣经故事的指称，它讲述了人类陷入诱惑，陷入肉体和欲望的境界。这里描绘的天使是拉斐尔，风之天使——他与这张牌所关联的星座相同：双子座。风与心理活动有关，尤其是沟通，这是健康关系的基础。他的祝福似乎给这张牌带来了一种平衡与和谐的感觉，象征着两种对立力量之间在宏大和普遍意义上的联合。",
    normal: "被祝福的爱，平衡、调和的关系，浪漫，暗示可以开展新的关系或关系的新阶段。",
    reversed: "不和谐、不平衡的关系，关系的停滞，冲突，分离，错误选择，优柔寡断",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-lovers-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/06-TheLovers.png",
  },
  {
    name: "The Chariot",
    translation: "战车",
    description:
      "战车牌描绘了一个人坐在一辆由两个黑白狮身人面像驾驶的车辆内。整张牌有点天籁之气；这个人物坐在一个由白色星星装饰的蓝色天篷下。在他的肩膀上，他带着新月的标志，代表引导着他的精神因素。他的头上戴着一顶王冠，这意味着他是开悟的，他的意志是纯洁的。在他的胸前印有一个正方形，表示地球的元素，物质世界的元素，这是他和他的行动的基础。狮身人面像以黑色和白色着色，象征着战车夫必须学会控制相互对抗的力量。战车的身后是城堡，这代表着他的初心——他要守护的家园。",
    normal: "训练有素的心智，前进的力量，守护初心，控制相互对抗的力量，协调冲突，成功",
    reversed: "未解决的冲突，矛盾，情绪的失衡，受到阻碍，忘记初心，忘记要守护的东西。",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-chariot-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/07-TheChariot.png",
  },
  {
    name: "Strength",
    translation: "力量",
    description:
      "在这张卡牌中，你会看到一个女人从容地握着成年狮子的下颚。尽管狮子看起来凶猛而强壮，但女人似乎对它有统治力。令人着迷的是她如何优雅地控制狮子。她镇定自若，这代表着控制和纪律，尤其是在逆境中。她握着狮子的下巴，这也表明她有勇气。她对狮子的控制并不粗暴，而是表现出爱和同情心。群山之上的蓝色背景显示了稳定和稳定带来的那种平静。",
    normal: "内心平静而柔和的力量，理智的力量，爱的力量，勇气，信心，同情心，自信",
    reversed: "软弱，恐惧，无力感，缺乏自信",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/strength-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/08-Strength.png",
  },
  {
    name: "The Hermit",
    translation: "隐士",
    description:
      "隐士牌描绘了一位老人独自站在山顶，一手拿着灯笼，一手拿着杖。山代表成就、发展和成功。隐士已经获得了很高的精神知识水平，他准备下山，将这种知识传授给每个人。他对自己的目标有着坚定的决心，并且对自己所走的道路有着坚定的认识。在灯笼内，你会看到一颗六角星，它也被称为所罗门的印章。这个符号代表智慧。他持有的权杖描绘了权威和权力。隐士牌中没有明亮的色彩，这反而能让他看见生命中幽微的事物。",
    normal: "独处，内省，沉思，寻找自我，寻找智慧",
    reversed: "缺乏省思，迷失方向，孤独，回归社会",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hermit-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/09-TheHermit.png",
  },
  {
    name: "The Wheel of Fortune",
    translation: "命运之轮",
    description:
      "命运之轮是卡牌中最具象征意义的牌之一，充满了意义不同的符号。在牌的中心，有一个巨大的轮子，上面覆盖着深奥的符号。轮子周围四种有不同的生物：天使、鹰、公牛和狮子。它们与十二生肖中的四个固定星座有关——狮子座、金牛座、天蝎座和水瓶座。这四只动物也是基督教传统中四位福音传道者的代表，这也许是它们都长有翅膀的原因。每个生物拿着的书籍代表了传达智慧和自我理解的《托拉》。蛇表示下降到物质世界的行为。在轮子上面骑着一个狮身人面像，轮子下面的生物看起来要么是魔鬼，要么是阿努比斯本人。这两个埃及形象既代表了神和国王的智慧（狮身人面像），也代表了冥界（阿努比斯）。它们永远在循环中旋转，当一个上升时，另一个下降。",
    normal: "改变，新的开始，命运，时来运转，意外事件",
    reversed: "时机未到，坏运气，当前的课题还未完成，重复",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-wheel-of-fortune-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/10-WheelOfFortune.png",
  },
  {
    name: "Justice",
    translation: "正义",
    description:
      "正义牌是真理、公平和法律的象征。当法官坐在椅子上时，她用左手的天平代表直觉应该如何平衡逻辑。她用右手的双刃剑象征着公正。她所戴的王冠上的正方形象征着主持正义所需的清晰思路。在她的身后，有一件紫色的斗篷和直立的灰色柱子。在红色斗篷下面，她露出了一只白鞋的鞋尖。这是在提醒台下众人，她所传达的是他们行动的结果。",
    normal: "正义，公正，诚实，平衡，法律，真理，承担责任，付出将有公正的回报",
    reversed: "不公正，不诚实，腐败，不平衡，逃避责任",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/justice-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/11-Justice.png",
  },
  {
    name: "The Hanged Man",
    translation: "倒吊人",
    description:
      "这张牌描绘了一个被倒吊着的人，他的脚被吊在世界树上。这棵树扎根于冥界深处，众所周知，它能支撑起天体。人们相信，被吊着的人实际上是遵从他自己的自由意志而安置在那里的。我们相信这一点是因为他脸上的表情很平静。他的右脚被绑在树枝上，但他的左脚仍然完全自由。同时，他的双手在背后握着，形成一个倒三角形。他穿的红色裤子代表着肉体和人类的激情，而他衬衫上的蓝色则代表着平静的情绪，这种颜色组合在圣人身上很常见。他的鞋子、头发和光环的黄色象征着他的智力。",
    normal: "换个角度看问题，静心省思，等待，牺牲，顺从命运安排，平静从容",
    reversed: "停滞不前，不感兴趣，视角受限，钻牛角尖",
    detail:
      "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hanged-man-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/12-TheHangedMan.png",
  },
  {
    name: "Death",
    translation: "死亡",
    description:
      "在图上，我们看到死神骑着一匹漂亮的白马，手举着一面绘有白色玫瑰的黑旗。他穿着盔甲，这赋予了他无敌的能力——这表明没有人可以摧毁死亡。他所骑的白马代表着纯洁，因为死亡净化了所有人。在他的身下，所有阶级的人类都躺在泥土中——一个国王和一个贫民，旨在提醒我们死亡不区分阶级、种族和性别。 然而，我们还是可以看到远处冉冉升起的太阳，这代表着重生，带来新的开始和新的希望。",
    normal: "结局，新生，放手，顺从于改变",
    reversed: "畏惧改变，抵制变化，不肯放手，停滞不前，衰败",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/death-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/13-Death.png",
  },
  {
    name: "Temperance",
    translation: "节制",
    description:
      "在节制牌上，有一个长着翅膀的天使，其性别并不明显，这表明两性之间存在着一种平衡。天使的一只脚在水中，代表潜意识，而另一只脚在地上，代表现实世界。在她的袍子上，有一个正方形，里面刻有一个三角形，是对有形的地球与神圣的三位一体的一种呼应。她拿着两个杯子，在被子里她可以将水混合，这代表了超意识和潜意识的融合。水在它们之间流动，暗示着联合和无限。这张牌的一切都代表着平衡，完美的和谐来自于二元性的结合。她带来的建议是，在跳入深渊之前，先探测任何新的水域。",
    normal: "平衡，和平，耐心，节制，平静，安宁，和谐，调和，沟通",
    reversed: "偏执，极端，不节制，不和谐，鲁莽，草率",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/temperance-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/14-Temperance.png",
  },
  {
    name: "The Devil",
    translation: "魔鬼",
    description:
      "这张牌中的魔鬼以他最著名的萨梯尔（Satyr）形式现身，也就是所谓的巴弗灭（Baphomet）。除了半羊半人的身躯外，这魔鬼还有蝙蝠的翅膀和额头上的倒五角星。他站在一个基座上，上面拴着裸体的一男一女，这似乎要表明魔鬼对他们有统治权。男人和女人都有角，似乎表明他们与魔鬼相处的时间越长，他们就越不像人。锁链使他们看起来好像被魔鬼俘虏了。男人的尾巴上有一团火焰，而女人的尾巴上有一碗葡萄，这分别象征着他们对权力和生活中美好事物的沉迷。 仔细看，男人和女人看起来都不高兴。他们的个人权力已被夺走，这让他们暴露在赤裸之中并感到羞耻。",
    normal: "欲望的枷锁，不纯粹、被束缚的关系，窒息或无力感，成瘾，痴迷",
    reversed: "独立，自由，释放，夺回掌控权，理性战胜欲望",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-devil-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/15-TheDevil.png",
  },
  {
    name: "The Tower",
    translation: "高塔",
    description:
      "高塔牌描绘了一个依偎在山顶上的高尖塔。一道闪电击中了塔楼，使其燃烧起来。火焰在窗户上爆开，人们从窗户跳出来，这是一种绝望的行为。他们想逃离内部的动荡和破坏。塔是一个象征，象征着建立在错误前提下的野心。塔的毁灭必须发生，以便清除旧的方式，迎接新的东西。",
    normal: "突然的、无可避免的改变，破坏性、爆发性的事件，灾难，混乱",
    reversed: "可能表示抗拒改变，拒绝放开你所压抑的东西，但这可能会带来更大的爆发。改变迟早要发生",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-tower-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/16-TheTower.png",
  },
  {
    name: "The Star",
    translation: "星星",
    description:
      "这张星星牌描绘一个女人跪在一个小池塘的边缘。她拿着两个装水的容器。一个容器将水倒向干涸的土地，似乎是为了滋养它，确保它的肥力。她周围郁郁葱葱的土地似乎在说，它正在发挥作用。一只脚在水里，这显示了这个女人的精神能力和内在力量。另一只脚踩在地上，显示了她的实际能力和力量。在她身后，有一颗中央大星，周围有七颗小星，代表脉轮。有一只鸟站在树枝上，是代表思想和智慧的圣朱鹮。这张牌的星座对应的是水瓶座。",
    normal: "希望，灵感，宁静，和平，疗愈，创造力，生命力",
    reversed: "失去潜意识的能量，失去保持内在平和和信心的能力，失去创造力和灵感，失去希望",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-star-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/17-TheStar.png",
  },
  {
    name: "The Moon",
    translation: "月亮",
    description:
      "当我们抽到月亮时，我们看到一条通向远方的道路。小路的两边站着一只狼和一只狗，代表我们的兽性——驯化的和未驯化的。有一只小龙虾正从池塘里爬出来，若隐若现的龙虾象征着比恐惧更深层次的面对未知和诡异的不安情绪。在远处，我们可以看到中央小路两侧的两座塔，对立两端的塔楼代表着善与恶的力量，而塔楼相似的外观可能暗示我们在区分善恶时面临的困难。这张牌中的一切似乎都在相互呼应，似乎在暗指两种可能性。当我们走在这条路上时，我们走在有意识和无意识之间，走在狗的文明驯服和狼的自然野性之间的窄道上。",
    normal: "恐惧，不安，疯狂，错觉，不确定性，混乱。指导你通过梦或是想象探索你的潜意识，正视你的恐惧和不安。",
    reversed: "拒绝对潜意识的探索，对事件的认识停留在表面。隐藏的事物逐渐浮现，因而恐惧、不安的情绪有所减弱。",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-moon-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/18-TheMoon.png",
  },
  {
    name: "The Sun",
    translation: "太阳",
    description:
      "太阳牌呈现出一种乐观和满足的感觉。这张牌代表着在最黑暗的夜晚之后出现的黎明。太阳是我们星球上所有生命的源泉，它代表生命能量本身。牌中有一个孩子，在前景中快乐地玩耍。它是我们纯真的象征，代表着当你与真正的自我保持一致时的快乐。孩子是赤裸的，意味着他完全没有什么可隐藏的。这张牌还描绘了童年的纯真和绝对的纯洁。这一点通过孩子所骑的白马得到了特别强调。这里的马也是力量和高贵的象征。",
    normal: "光明，幸福，成功，乐观，活力，欢乐，纯真，满足",
    reversed:
      "过度热情，悲观，不切实际的期望，自负，较小的成功，或成功了仍不满足。可能是乌云暂时遮住了阳光，仍有一些恐惧、怀疑和困难尚未克服。",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-sun-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/19-TheSun.png",
  },
  {
    name: "Judgement",
    translation: "审判",
    description:
      "这张牌描绘了人们想象中的最终审判在许多神话中采取的各种形式。审判牌中的图像显示，妇女、男子和儿童正从坟墓中站起来，响应加百列的号角声。他们伸出的手臂象征着他们已经准备好接受宇宙的审判。他们即将见到他们的造物主，他们的行为会被评估，并发现他们将在哪里度过余生的永恒：在天堂或在地狱。背景中的巨大潮汐标志着审判是不可避免的，而且这种审判将是最终的。审判是由冥王掌管的，他是冥界的统治者。这张牌与死亡牌交相呼应，因为它们都提醒我们，一切都会结束，新的开始即将到来。",
    normal: "自我评判，觉醒，更新，清算，清晰的判断力。审判指示你将过去经验做出结论，以此作为超越它的步骤。",
    reversed: "抗拒人生的转变，抗拒命运的召唤。可能做出错误的决定或错过重要的讯息，需多加防范。",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/judgement-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/20-Judgement.png",
  },
  {
    name: "The World",
    translation: "世界",
    description:
      "世界牌中心有一个跳舞的人物。牌上的舞蹈人物一条腿交叉在另一条腿上，两手拿着魔杖。她象征着运动中的平衡和进化。她所代表的圆满和统一不是静态的，而是不断变化的，动态的和永恒的。围绕中心人物的绿色花环是成功的象征，而环绕花环的红色丝带则让人联想到无穷。牌的每个角上都有一个形象——它们与命运之轮中的形象相同。这四个形象代表天蝎座、狮子座、水瓶座和金牛座——代表宇宙的四个角落、四个元素和四个福音传道者。他们一起象征着所有能量的大和谐。",
    normal: "完成，完满，和谐，发自内心的快乐满足和持久的成功。可能暗示旅行。",
    reversed: "不完满，空虚，不持久的成功，旅行",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-world-meaning-major-arcana-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/21-TheWorld.png",
  },

  // 权杖牌组 (Wands) - 14张
  {
    name: "Ace of Wands",
    translation: "权杖一",
    description:
      "权杖与火的能量有关，而权杖一是权杖牌组中火的核心代表。这张牌描绘的是一只手从云中伸出来，手中拿着一根权杖。当我们仔细看这张牌时，我们可以看到这只手中权杖还在生长。权杖上的一些叶子已经发芽，这意味着代表精神和物质的平衡和进步。远处是一座城堡，象征着未来的机会。",
    normal: "灵感，创意，新计划，新激情，热情，活力",
    reversed: "延缓，阻碍，缺乏激情，缺乏活力，犹豫不决，灵感枯竭",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands01.png",
  },
  {
    name: "Two of Wands",
    translation: "权杖二",
    description:
      "权杖二的图景是一个男人站在一座城堡的顶部，右手拿着一个微型地球仪。从他站立的方式来看，这个人俯视着广阔的地形，左侧是海洋，右侧是陆地。男子身穿橙色束腰外衣，头戴红色帽子，分别象征着他对生活本身的热情和对冒险的渴望。他手中的微型地球仪代表着他去探索更广阔的生活的可能性。",
    normal: "制定计划，迈出第一步，做出决定，离开舒适区，承担风险",
    reversed: "糟糕的计划，过度分析，不采取行动，谨慎行事，规避风险",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands02.png",
  },
  {
    name: "Three of Wands",
    translation: "权杖三",
    description:
      "权杖三描绘了一个站在悬崖边上的人，俯瞰大海和山脉。从悬崖边上，他看清了他前方的一切。权杖被种植于他身旁的土地，他手握着其中一根。他似乎在展望未来，并思考他对自己计划的承诺，以及执行的方法，以便把它们变成现实。",
    normal: "前进的势头，信心，扩张，增长，远见，向前看，新的阶段，将计划付诸实践",
    reversed: "限制，局限，缺乏进展，障碍，延误，沮丧，反思",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands03.png",
  },
  {
    name: "Four of Wands",
    translation: "权杖四",
    description:
      "权杖四描绘了一对夫妇在欢迎花环下跳舞，花环被绑在在四根权杖之间。似乎有一个正在进行的聚会，或者为这对夫妇举行的某种欢迎仪式。你可以从图上看到，这张牌代表了一个充满了成就感的时刻，一个因为目标真正实现而带来满足的时刻。",
    normal: "社群，家庭，庆祝活动，团聚，聚会，稳定，归属感",
    reversed: "缺乏支持，不稳定，不受欢迎，短暂性，缺乏根基，家庭冲突",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands04.png",
  },
  {
    name: "Five of Wands",
    translation: "权杖五",
    description:
      "权杖五描绘了五个年轻人，每人手持一根权杖，似乎在进行某种竞争或冲突。他们的权杖交叉在一起，但没有人真正受伤。这张牌代表竞争、冲突和不同观点之间的碰撞。虽然看起来混乱，但这种冲突往往是建设性的，可以带来成长和进步。",
    normal: "竞争，冲突，不同观点，挑战，争论，混乱但有建设性的冲突",
    reversed: "避免冲突，内在冲突，缺乏多样性，一致性",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands05.png",
  },
  {
    name: "Six of Wands",
    translation: "权杖六",
    description:
      "权杖六描绘了一个男人，他头戴胜利的花环，骑马穿过一群正在欢呼的人。这匹马是白色的，这是众所周知的力量、纯洁以及成功的象征。欢呼的群众表示大家对骑马人成就的认可。该男子携带的权杖上还系着一个花环，进一步强调他的成功。该男子对所有这些关注并不害怕，也不害羞，而是为自己的成就感到自豪。对此，他周围的人群做出了欢快和热情的反应。",
    normal: "自信，成功，胜利，凯旋，好消息，好的进展，认可，赞美",
    reversed: "失败，缺乏认可，缺乏成就感，过度骄傲自满",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands06.png",
  },
  {
    name: "Seven of Wands",
    translation: "权杖七",
    description:
      "权杖七描绘了一个人的形象，他站在高高的山上，受到下面对手的挑战。他似乎在捍卫这个位置，并进行报复性的攻击。有趣的是，在权杖七的描绘中，这个人穿的两只鞋不是同一双。这与牌面上的其它细节互相呼应，例如不平整的地面，以及主角没有一个稳定的立足点。",
    normal: "面临挑战，遭到反对，冲突对立的局面，自卫反击",
    reversed: "陷入焦虑，优柔寡断，没用勇气面对挑战，不利的局势，放弃，承认失败",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands07.png",
  },
  {
    name: "Eight of Wands",
    translation: "权杖八",
    description:
      "权杖八描绘了八根飞行的权杖，看起来好像它们悬浮在空中。他们飞行的背景是晴朗的天空，这代表着他们到达目的地的路上可能没有任何障碍。这张牌展现了壮丽的景色，河水在流淌，水给画面带来了生命力。权杖看起来似乎即将降落，这标志着漫长旅程的结束。",
    normal: "迅速，自由，旅行，自由流动、不受约束的能量",
    reversed: "进展过于迅速而失控，准备不充分；欲速则不达，进展受阻，延误，等待",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands08.png",
  },
  {
    name: "Nine of Wands",
    translation: "权杖九",
    description:
      "权杖九显示一个看起来很虚弱的人抓着一根魔杖，后面竖着另外8根魔杖。这个人看起来受伤了，但他似乎仍然准备好了再战，并且强烈地渴望胜利。他的脸上有一种希望和决心，应该可以帮助他完成最后一场战斗。这是一张显示挑战、希望和胜利的混合牌。",
    normal: "最后一搏，坚持，勇气，韧性，毅力，接近成功，疲劳",
    reversed: "固执，死板，防御，拒绝妥协，放弃",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands09.png",
  },
  {
    name: "Ten of Wands",
    translation: "权杖十",
    description:
      "画面中，一名男子背着一捆重重的木头，十根捆成一捆的权杖，向不远处的房子走去。权杖十上的这个形象，表明一个人已经在生活中奋斗并取得了收获，他现在正带着收成到达他的最终目的地。此时他承受着巨大的压力，因此显得疲累万分。但不远处的房子表示终点已并不遥远，一步一个脚印向前就能成功。",
    normal: "负担，责任，职责，压力，义务，精疲力竭，挣扎，奋斗",
    reversed: "承担过多的责任，压力过大，崩溃",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands10.png",
  },
  {
    name: "Page of Wands",
    translation: "权杖侍卫",
    description:
      "一个衣着光鲜的年轻人大胆地拿着一根权杖站在一片荒芜的土地上。他的衣衫上有一个像蝾螈一样的图案，这是一个从坏到好的转变的象征。这个年轻人是一个热情的倡导者，他不断地传播精神和社会进步的理念，提升他的同伴。他身后背景中的沙漠既表示他的元素——火，也代表他生活在一个还没有结出果实的世界。因此，他的想法完全是假设性的。然而，如果他选择实践这些想法，并开始他的旅程，他纯洁的心可以使他找到更好的财富。",
    normal: "冒险，兴奋，新鲜的想法，开朗，热情，活泼，天真，坦率，精力充沛，无所畏惧，性格外向",
    reversed: "三分钟热度，顽皮，缺乏想法，懒惰，无聊",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands11.png",
  },
  {
    name: "Knight of Wands",
    translation: "权杖骑士",
    description:
      "权杖骑士骑在他的马上，马匹扬起头颅，准备好了行动。从骑士的衣服和盔甲，以及他的马来看，他已经为未来做好了准备。他在金属盔甲上穿着一件黄色图案的衬衫。他还戴着一个头盔，上面插着红色的羽翼。他似乎已经做好了战斗的准备，只是他拿着一根大权杖而不是一把剑。他的马是橙色的，鬃毛看起来像火焰。当你看着权杖骑士的脸时，你会看到想要在他的努力中取得成功的决心。火是权杖骑士象征意义的主要因素。挂在他手臂和背上的装饰性流苏，还有马鬃，都是火焰的颜色。他还穿着一件印有火蝾螈符号的黄色衬衫。",
    normal: "勇敢的，迷人的，英雄气概的，自由的精神，性格火热、充满活力的行动派",
    reversed: "傲慢的，鲁莽的，没有耐心的，缺乏自我控制，消极，易怒，霸道",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands12.png",
  },
  {
    name: "Queen of Wands",
    translation: "权杖王后",
    description:
      "权杖王后所描绘的图像显示，一位王后骄傲地坐在宝座上，同时面向前方，这显然是力量和火的象征。她的左手拿着一朵向日葵，王座上也雕刻着向日葵的形象——这意味着幸福、满足和肥沃。她的右手拿着发芽的权杖，象征着生命。在她的积极示人的一面，权杖王后可以与忠诚、寄托和温暖联系在一起。她脚下的黑猫暗示了她隐秘的一面。黑猫在传统上是巫术和神秘主义的象征，但也可以指出她运用深刻直觉来把握的能力。",
    normal: "自信，热情，坚定，有魅力，阳光开朗，乐观，富有灵感，直觉灵敏，强大的内心，丰收，财富，",
    reversed: "专横，善妒，欺软怕硬，不够自信，控制欲，内心力量的匮乏",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands13.png",
  },
  {
    name: "King of Wands",
    translation: "权杖国王",
    description:
      "权杖国王坐在他的宝座上，穿着一件红色的长袍，象征着活力、热情和行动。他手持一根发芽的权杖，象征着创造力和生命力。他的宝座上装饰着狮子的图案，象征着力量和勇气。权杖国王代表着领导力、权威和行动力。他是一个充满活力和热情的人，能够激励和鼓舞他人。",
    normal: "领导力，权威，行动力，创造力，热情，活力",
    reversed: "专横，独裁，缺乏远见，冲动，鲁莽",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-wands-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Wands14.png",
  },

  // 圣杯牌组 (Cups) - 14张
  {
    name: "Ace of Cups",
    translation: "圣杯一",
    description:
      "圣杯与水的能量有关，而圣杯一是圣杯牌组中水的核心代表。这张牌描绘的是一只手从云中伸出来，手中拿着一个圣杯。圣杯中涌出五道水流，象征着情感的丰富和爱的源泉。一只鸽子飞向圣杯，口中衔着一片面包，象征着神圣的祝福和滋养。",
    normal: "爱，情感，喜悦，幸福，新的关系，创造力，灵感",
    reversed: "情感压抑，空虚，孤独，不快乐，缺乏创造力",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups01.png",
  },
  {
    name: "Two of Cups",
    translation: "圣杯二",
    description:
      "圣杯二描绘了一对男女互相凝视，交换圣杯。他们之间的纽带象征着和谐、吸引力和承诺。上方漂浮着一根带有双蛇缠绕的魔杖，象征着平衡和结合。这张牌代表着情感、友谊和合作。",
    normal: "情感，友谊，和谐，吸引力，承诺，合作",
    reversed: "不和谐，冲突，分离，误解，缺乏吸引力",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups02.png",
  },
  {
    name: "Three of Cups",
    translation: "圣杯三",
    description:
      "圣杯三描绘了三个女人举起圣杯庆祝。她们的姿势象征着友谊、欢乐和庆祝。这张牌代表着社交、聚会和分享快乐。",
    normal: "友谊，欢乐，庆祝，社交，聚会，分享快乐",
    reversed: "过度放纵，八卦，嫉妒，缺乏团结",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups03.png",
  },
  {
    name: "Four of Cups",
    translation: "圣杯四",
    description:
      "圣杯四描绘了一个人坐在树下，对递给他的圣杯视而不见。他的姿势象征着不满、厌倦和退缩。这张牌代表着内省、反思和错失机会。",
    normal: "内省，反思，不满，厌倦，退缩，错失机会",
    reversed: "接受新事物，重新燃起热情，走出舒适区",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups04.png",
  },
  {
    name: "Five of Cups",
    translation: "圣杯五",
    description:
      "圣杯五描绘了一个人悲伤地看着倒下的三个圣杯，而他身后还有两个圣杯仍然竖立着。他的姿势象征着失望、悲伤和失落。这张牌代表着哀悼、遗憾和从失败中学习。",
    normal: "失望，悲伤，失落，哀悼，遗憾，从失败中学习",
    reversed: "接受失败，向前看，恢复，宽恕",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups05.png",
  },
  {
    name: "Six of Cups",
    translation: "圣杯六",
    description:
      "圣杯六描绘了一个孩子向另一个孩子递送装满花朵的圣杯。这张牌象征着童年、纯真、怀旧和美好的回忆。它代表着过去的快乐时光和纯真的爱。",
    normal: "童年，纯真，怀旧，美好回忆，纯真的爱，过去",
    reversed: "沉溺于过去，幼稚，缺乏成长，失去纯真",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups06.png",
  },
  {
    name: "Seven of Cups",
    translation: "圣杯七",
    description:
      "圣杯七描绘了一个人面对着七个漂浮在云中的圣杯，每个圣杯中都有不同的象征物。这张牌代表着选择、幻想、愿望和可能性。它提醒我们要在众多选择中做出明智的决定。",
    normal: "选择，幻想，愿望，可能性，机会，诱惑",
    reversed: "缺乏选择，现实，专注，决心，清晰",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups07.png",
  },
  {
    name: "Eight of Cups",
    translation: "圣杯八",
    description:
      "圣杯八描绘了一个人背对着八个圣杯，向山中走去。他的姿势象征着放弃、寻找更深层的意义和精神追求。这张牌代表着离开舒适区，寻求更高的目标。",
    normal: "放弃，寻找意义，精神追求，离开舒适区，寻求更高目标",
    reversed: "害怕改变，停滞不前，缺乏勇气，逃避现实",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups08.png",
  },
  {
    name: "Nine of Cups",
    translation: "圣杯九",
    description:
      "圣杯九描绘了一个满足的人坐在九个圣杯前。他的姿势象征着满足、成就和愿望的实现。这张牌被称为'愿望牌'，代表着情感上的满足和幸福。",
    normal: "满足，成就，愿望实现，幸福，情感满足，成功",
    reversed: "不满足，贪婪，过度放纵，空虚，缺乏感激",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups09.png",
  },
  {
    name: "Ten of Cups",
    translation: "圣杯十",
    description:
      "圣杯十描绘了一个幸福的家庭在彩虹下庆祝，天空中有十个圣杯排成弧形。这张牌代表着家庭幸福、情感满足和完美的和谐。它象征着情感和关系的最高成就。",
    normal: "家庭幸福，情感满足，和谐，情感成就，完美关系，幸福结局",
    reversed: "家庭冲突，不和谐，破裂的关系，不满足",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups10.png",
  },
  {
    name: "Page of Cups",
    translation: "圣杯侍卫",
    description:
      "圣杯侍卫描绘了一个年轻人拿着一个圣杯，杯中有一条鱼。他的姿势象征着创造力、直觉和情感的敏感。这张牌代表着艺术才能、想象力和情感的表达。",
    normal: "创造力，直觉，情感敏感，艺术才能，想象力，情感表达",
    reversed: "情感不成熟，缺乏创造力，情绪化，不现实",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups11.png",
  },
  {
    name: "Knight of Cups",
    translation: "圣杯骑士",
    description:
      "圣杯骑士描绘了一个骑士骑着白马，手持圣杯。他的姿势象征着浪漫、理想主义和情感的追求。这张牌代表着情感的使者、浪漫的行动和情感的表达。",
    normal: "浪漫，理想主义，情感追求，情感使者，浪漫行动，情感表达",
    reversed: "不切实际，情绪化，缺乏行动，虚假的浪漫",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups12.png",
  },
  {
    name: "Queen of Cups",
    translation: "圣杯王后",
    description:
      "圣杯王后坐在海边的宝座上，手持一个装饰华丽的圣杯。她的姿势象征着情感的智慧、直觉和同情心。这张牌代表着母性的爱、情感的成熟和精神的洞察力。",
    normal: "情感智慧，直觉，同情心，母性爱，情感成熟，精神洞察力",
    reversed: "情感不稳定，过度敏感，缺乏界限，情绪化",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups13.png",
  },
  {
    name: "King of Cups",
    translation: "圣杯国王",
    description:
      "圣杯国王坐在宝座上，手持圣杯，周围是波涛汹涌的海水。他的姿势象征着情感的控制、智慧和平衡。这张牌代表着情感的领导力、同情心和精神的指导。",
    normal: "情感控制，智慧，平衡，情感领导力，同情心，精神指导",
    reversed: "情感失控，操纵，冷漠，缺乏同情心",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-cups-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Cups14.png",
  },

  // 宝剑牌组 (Swords) - 14张
  {
    name: "Ace of Swords",
    translation: "宝剑一",
    description:
      "宝剑与风的能量有关，而宝剑一是宝剑牌组中风的核心代表。这张牌描绘的是一只手从云中伸出来，手中拿着一把双刃剑。剑尖戴着一顶王冠，象征着胜利和成就。这张牌代表着新的想法、清晰的思维和突破。",
    normal: "新想法，清晰思维，突破，胜利，成就，真理，正义",
    reversed: "混乱思维，缺乏清晰，误解，失败，不公正",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords01.png",
  },
  {
    name: "Two of Swords",
    translation: "宝剑二",
    description:
      "宝剑二描绘了一个蒙着眼睛的女人，双手交叉持剑。她的姿势象征着犹豫不决、平衡和内心的冲突。背景中的海水和新月象征着情感和直觉。这张牌代表着艰难的选择和需要做出决定。",
    normal: "犹豫不决，平衡，内心冲突，艰难选择，需要决定，僵局",
    reversed: "做出决定，解决冲突，偏见，不平衡",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords02.png",
  },
  {
    name: "Three of Swords",
    translation: "宝剑三",
    description:
      "宝剑三描绘了一颗被三把剑刺穿的心，背景是暴风雨的天空。这张牌象征着心碎、痛苦和情感创伤。它代表着失恋、背叛和深深的悲伤。",
    normal: "心碎，痛苦，情感创伤，失恋，背叛，悲伤",
    reversed: "治愈，恢复，宽恕，释放痛苦，走出阴霾",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords03.png",
  },
  {
    name: "Four of Swords",
    translation: "宝剑四",
    description:
      "宝剑四描绘了一个躺在石棺上的骑士，三把剑悬挂在墙上，一把剑放在他身下。这张牌象征着休息、冥想和恢复。它代表着需要暂停和反思的时期。",
    normal: "休息，冥想，恢复，暂停，反思，平静，治愈",
    reversed: "不安，焦虑，缺乏休息，过度活跃，无法放松",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords04.png",
  },
  {
    name: "Five of Swords",
    translation: "宝剑五",
    description:
      "宝剑五描绘了一个人收集战场上的剑，而两个人在背景中离去。这张牌象征着冲突、失败和不光彩的胜利。它代表着争论、背叛和道德上的失败。",
    normal: "冲突，失败，不光彩胜利，争论，背叛，道德失败",
    reversed: "和解，宽恕，从冲突中学习，道德胜利",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords05.png",
  },
  {
    name: "Six of Swords",
    translation: "宝剑六",
    description:
      "宝剑六描绘了一个人划船载着一个女人和孩子，船上插着六把剑。这张牌象征着过渡、旅行和从困难中解脱。它代表着向更好的未来前进。",
    normal: "过渡，旅行，从困难中解脱，向更好未来前进，平静水域",
    reversed: "停滞不前，无法前进，困在过去，抗拒改变",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords06.png",
  },
  {
    name: "Seven of Swords",
    translation: "宝剑七",
    description:
      "宝剑七描绘了一个人偷偷地拿着五把剑离开，而两把剑留在地上。这张牌象征着欺骗、策略和不诚实。它代表着需要小心谨慎和保护自己。",
    normal: "欺骗，策略，不诚实，小心谨慎，保护自己，狡猾",
    reversed: "诚实，坦率，承认错误，道德行为",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords07.png",
  },
  {
    name: "Eight of Swords",
    translation: "宝剑八",
    description:
      "宝剑八描绘了一个被绑住眼睛的女人，被八把剑包围。她的姿势象征着束缚、限制和感到被困。这张牌代表着心理上的监禁和需要找到解脱的方法。",
    normal: "束缚，限制，感到被困，心理监禁，需要解脱，受害者心态",
    reversed: "自由，解脱，克服限制，重获控制，自我赋权",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords08.png",
  },
  {
    name: "Nine of Swords",
    translation: "宝剑九",
    description:
      "宝剑九描绘了一个人在床上坐起，双手捂脸，九把剑悬挂在墙上。这张牌象征着焦虑、恐惧和噩梦。它代表着心理上的痛苦和担忧。",
    normal: "焦虑，恐惧，噩梦，心理痛苦，担忧，失眠，绝望",
    reversed: "希望，治愈，克服恐惧，内心平静，释放焦虑",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords09.png",
  },
  {
    name: "Ten of Swords",
    translation: "宝剑十",
    description:
      "宝剑十描绘了一个人背部插着十把剑，躺在地上。背景中的太阳正在升起，象征着新的开始。这张牌代表着痛苦的结束、背叛和重新开始的希望。",
    normal: "痛苦结束，背叛，重新开始希望，触底反弹，完全失败",
    reversed: "恢复，重生，避免灾难，逐渐好转",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords10.png",
  },
  {
    name: "Page of Swords",
    translation: "宝剑侍卫",
    description:
      "宝剑侍卫描绘了一个年轻人高举宝剑，准备行动。他的姿势象征着好奇心、警觉和新想法。这张牌代表着学习、沟通和智力上的追求。",
    normal: "好奇心，警觉，新想法，学习，沟通，智力追求",
    reversed: "八卦，谎言，缺乏专注，分心，不成熟",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords11.png",
  },
  {
    name: "Knight of Swords",
    translation: "宝剑骑士",
    description:
      "宝剑骑士描绘了一个骑士骑着马冲锋，高举宝剑。他的姿势象征着行动、冲动和直接的方法。这张牌代表着快速行动、勇气和有时的鲁莽。",
    normal: "行动，冲动，直接方法，快速行动，勇气，有时鲁莽",
    reversed: "鲁莽，缺乏方向，冲动行为，不考虑后果",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords12.png",
  },
  {
    name: "Queen of Swords",
    translation: "宝剑王后",
    description:
      "宝剑王后坐在宝座上，右手举剑，左手伸出。她的姿势象征着智慧、独立和清晰的判断。这张牌代表着理性思维、诚实和有时的严厉。",
    normal: "智慧，独立，清晰判断，理性思维，诚实，有时严厉",
    reversed: "冷酷，报复，缺乏同情心，过度批判",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords13.png",
  },
  {
    name: "King of Swords",
    translation: "宝剑国王",
    description:
      "宝剑国王坐在宝座上，右手举剑，表情严肃。他的姿势象征着权威、理性和公正的判断。这张牌代表着领导力、智慧和道德标准。",
    normal: "权威，理性，公正判断，领导力，智慧，道德标准",
    reversed: "专制，不公正，滥用权力，缺乏同情心",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-swords-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Swords14.png",
  },

  // 金币牌组 (Pentacles) - 14张
  {
    name: "Ace of Pentacles",
    translation: "金币一",
    description:
      "金币与土的能量有关，而金币一是金币牌组中土的核心代表。这张牌描绘的是一只手从云中伸出来，手中拿着一个金币。下方是一个美丽的花园，象征着繁荣和丰收。这张牌代表着新的机会、物质成功和实际的开始。",
    normal: "新机会，物质成功，实际开始，繁荣，丰收，财富",
    reversed: "错失机会，缺乏规划，物质损失，不切实际",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles01.png",
  },
  {
    name: "Two of Pentacles",
    translation: "金币二",
    description:
      "金币二描绘了一个人在杂耍两个金币，背景中有船只在波涛汹涌的海上航行。这张牌象征着平衡、适应性和多任务处理。它代表着在变化中保持平衡的能力。",
    normal: "平衡，适应性，多任务处理，在变化中保持平衡，灵活性",
    reversed: "失去平衡，过度承担，无法应对变化，混乱",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles02.png",
  },
  {
    name: "Three of Pentacles",
    translation: "金币三",
    description:
      "金币三描绘了三个人在教堂内工作，一个建筑师和两个工匠。这张牌象征着团队合作、技能和协作。它代表着通过合作实现共同目标。",
    normal: "团队合作，技能，协作，通过合作实现目标，学习，指导",
    reversed: "缺乏团队合作，技能不足，不协调，个人主义",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles03.png",
  },
  {
    name: "Four of Pentacles",
    translation: "金币四",
    description:
      "金币四描绘了一个人紧紧抱着一个金币，脚下踩着两个金币，头上顶着一个金币。这张牌象征着保守、控制和对物质的执着。它代表着安全感和有时的贪婪。",
    normal: "保守，控制，对物质执着，安全感，有时贪婪，储蓄",
    reversed: "慷慨，释放控制，分��，克服贪婪",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles04.png",
  },
  {
    name: "Five of Pentacles",
    translation: "金币五",
    description:
      "金币五描绘了两个贫困的人在雪中行走，经过一个教堂窗户。这张牌象征着贫困、困难和感到被排斥。它代表着物质上的困难和需要寻求帮助。",
    normal: "贫困，困难，感到被排斥，物质困难，需要帮助，孤立",
    reversed: "恢复，改善，接受帮助，走出困境",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles05.png",
  },
  {
    name: "Six of Pentacles",
    translation: "金币六",
    description:
      "金币六描绘了一个富有的人向两个乞丐施舍金币，手中拿着天平。这张牌象征着慷慨、公平和给予。它代表着分享财富和帮助他人。",
    normal: "慷慨，公平，给予，分享财富，帮助他人，慈善",
    reversed: "自私，不公平，债务，依赖，滥用慷慨",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles06.png",
  },
  {
    name: "Seven of Pentacles",
    translation: "金币七",
    description:
      "金币七描绘了一个农夫靠在锄头上，看着他种植的金币植物。这张牌象征着耐心、投资和等待收获。它代表着长期努力的回报。",
    normal: "耐心，投资，等待收获，长期努力回报，评估进展",
    reversed: "缺乏耐心，急于求成，投资失败，缺乏进展",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles07.png",
  },
  {
    name: "Eight of Pentacles",
    translation: "金币八",
    description:
      "金币八描绘了一个工匠专心致志地雕刻金币。这张牌象征着技能、专注和对工艺的奉献。它代表着通过努力工作获得专业技能。",
    normal: "技能，专注，对工艺奉献，努力工作，专业技能，学徒",
    reversed: "缺乏专注，质量差，不完美，缺乏技能",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles08.png",
  },
  {
    name: "Nine of Pentacles",
    translation: "金币九",
    description:
      "金币九描绘了一个优雅的女人在她的花园中，周围有九个金币和一只鹰。这张牌象征着独立、奢华和自给自足。它代表着通过努力获得的成功和享受。",
    normal: "独立，奢华，自给自足，通过努力获得成功，享受成果",
    reversed: "依赖他人，缺乏独立，物质不安全，过度依赖",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles09.png",
  },
  {
    name: "Ten of Pentacles",
    translation: "金币十",
    description:
      "金币十描绘了一个多代家庭聚集在一起，周围有十个金币。这张牌象征着财富、传承和家族成功。它代表着长期的安全和繁荣。",
    normal: "财富，传承，家族成功，长期安全，繁荣，遗产",
    reversed: "财务不稳定，家族冲突，缺乏传承，短期思维",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles10.png",
  },
  {
    name: "Page of Pentacles",
    translation: "金币侍卫",
    description:
      "金币侍卫描绘了一个年轻人专心地看着手中的金币。这张牌象征着学习、实用性和新的机会。它代表着对物质世界的好奇和学习的态度。",
    normal: "学习，实用性，新机会，对物质世界好奇，学习态度",
    reversed: "缺乏专注，不切实际，错失机会，懒惰",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles11.png",
  },
  {
    name: "Knight of Pentacles",
    translation: "金币骑士",
    description:
      "金币骑士描绘了一个骑士坐在静止的马上，手持金币。这张牌象征着可靠性、耐心和稳定的进步。它代表着踏实的工作态度和持续的努力。",
    normal: "可靠性，耐心，稳定进步，踏实工作态度，持续努力",
    reversed: "懒惰，不可靠，缺乏进展，停滞不前",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles12.png",
  },
  {
    name: "Queen of Pentacles",
    translation: "金币王后",
    description:
      "金币王后坐在花园中的宝座上，手持金币，周围是丰富的自然。这张牌象征着滋养、实用性和物质上的安全。它代表着母性的关怀和对家庭的奉献。",
    normal: "滋养，实用性，物质安全，母性关怀，对家庭奉献",
    reversed: "忽视自己，过度给予，物质不安全，缺乏实用性",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles13.png",
  },
  {
    name: "King of Pentacles",
    translation: "金币国王",
    description:
      "金币国王坐在装饰华丽的宝座上，手持金币，周围是财富的象征。这张牌象征着财务成功、慷慨和实际的领导力。它代表着通过努力工作获得的成就和地位。",
    normal: "财务成功，慷慨，实际领导力，通过努力获得成就，地位",
    reversed: "贪婪，物质主义，滥用权力，财务不稳定",
    detail: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-pentacles-meaning-tarot-card-meanings",
    image: "https://cdn.jsdelivr.net/gh/WillYin09/tarot_card_assets@main/Cards-png/Pentacles14.png",
  },
]

// ---- Helper utilities -----------------------------------------------------

/**
 * Safely return a single card (index wraps around the array length).
 */
export function getTarotCard(index: number): TarotCardData {
  return TAROT_CARDS[index % TAROT_CARDS.length]
}

/**
 * Return <count> random cards, each with a 30 % chance of being reversed.
 */
export function getRandomTarotCards(count: number): Array<TarotCardData & { reversed: boolean }> {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((card) => ({
    ...card,
    reversed: Math.random() < 0.3,
  }))
}

/**
 * Convenience helper — select the correct meaning based on orientation.
 */
export function getCardMeaning(card: TarotCardData, reversed: boolean): string {
  return reversed ? card.reversed : card.normal
}
