import { hc } from "hono/client"
import type { Api } from "~/index"

const client = hc<Api>("http://localhost:5173")

const resp = await client.api.admin.users.$get({ query: { role: "0" } })

const users = await resp.json()

const [user] = users

const 前期programs = [
  {
    name: "高齢者介護の基礎と実践",
    timeSlot: 1, // 1限
    weekSlot: 0, // 月曜日
    unitsCount: 2, // 2単位
    overview:
      "高齢者介護に必要な基礎知識や実務スキルを学び、現場での具体的なケア手法を実践的に理解します。",
  },
  {
    name: "介護福祉の倫理と法律",
    timeSlot: 3, // 3限
    weekSlot: 1, // 火曜日
    unitsCount: 2, // 2単位
    overview:
      "介護福祉における倫理的問題や法的枠組みを学び、現場での判断力と法遵守の重要性を理解します。",
  },
  {
    name: "障がい者福祉の現状と課題",
    timeSlot: 2, // 2限
    weekSlot: 2, // 水曜日
    unitsCount: 3, // 3単位
    overview:
      "障がい者福祉の現状と課題を理解し、支援の質向上に向けた取り組みや法制度の分析を行います。",
  },
  {
    name: "認知症ケアの理論と実践",
    timeSlot: 1, // 1限
    weekSlot: 3, // 木曜日
    unitsCount: 2, // 2単位
    overview:
      "認知症患者に対するケアの理論と具体的な介護手法を学び、適切な対応方法を実践的に習得します。",
  },
  {
    name: "在宅介護支援のマネジメント",
    timeSlot: 4, // 4限
    weekSlot: 4, // 金曜日
    unitsCount: 2, // 2単位
    overview:
      "在宅介護の計画立案や支援体制の構築、家族との連携について学び、在宅ケアの効率的な運営を目指します。",
  },
  {
    name: "福祉サービスの質向上とリーダーシップ",
    timeSlot: 2, // 2限
    weekSlot: 1, // 火曜日
    unitsCount: 3, // 3単位
    overview:
      "福祉サービスの質を高めるための方法と、介護現場で求められるリーダーシップの発揮法を学びます。",
  },
  {
    name: "多文化共生社会における福祉",
    timeSlot: 5, // 5限
    weekSlot: 3, // 木曜日
    unitsCount: 2, // 2単位
    overview:
      "多様な文化背景を持つ利用者に対応するための知識と、共生社会における福祉の役割を考察します。",
  },
  {
    name: "介護における家族支援と心理ケア",
    timeSlot: 3, // 3限
    weekSlot: 0, // 月曜日
    unitsCount: 2, // 2単位
    overview:
      "介護において家族を支える方法と心理ケアの重要性を学び、介護者・家族双方の負担軽減を目指します。",
  },
  {
    name: "福祉施設運営のための経営学入門",
    timeSlot: 6, // 6限
    weekSlot: 2, // 水曜日
    unitsCount: 3, // 3単位
    overview:
      "福祉施設の運営管理に必要な基本的経営学の知識を学び、運営効率とサービス向上を目指します。",
  },
  {
    name: "地域福祉とコミュニティケア",
    timeSlot: 1, // 1限
    weekSlot: 4, // 金曜日
    unitsCount: 2, // 2単位
    overview:
      "地域福祉における課題と解決策、コミュニティ全体でのケアの在り方について学びます。",
  },
  {
    name: "医療と介護の連携：総合的ケアの未来",
    timeSlot: 2, // 2限
    weekSlot: 0, // 月曜日
    unitsCount: 3, // 3単位
    overview:
      "医療と介護の連携を学び、患者中心の総合的ケアを提供するための実践的アプローチを習得します。",
  },
  {
    name: "リハビリテーションと福祉技術",
    timeSlot: 5, // 5限
    weekSlot: 1, // 火曜日
    unitsCount: 2, // 2単位
    overview:
      "リハビリテーション技術と最新の福祉技術を学び、現場での利用方法を理解し実践します。",
  },
  {
    name: "緊急時対応と介護現場",
    timeSlot: 3, // 3限
    weekSlot: 2, // 水曜日
    unitsCount: 2, // 2単位
    overview:
      "介護現場での緊急対応やリスク管理について学び、迅速かつ的確な対応スキルを習得します。",
  },
  {
    name: "在宅医療と介護連携の実践例",
    timeSlot: 4, // 4限
    weekSlot: 3, // 木曜日
    unitsCount: 2, // 2単位
    overview:
      "在宅医療と介護の連携事例を通じて、包括的なケアの提供方法や課題解決策を学びます。",
  },
  {
    name: "介護ロボットとテクノロジーの活用",
    timeSlot: 1, // 1限
    weekSlot: 5, // 土曜日
    unitsCount: 3, // 3単位
    overview:
      "介護現場でのロボット技術や先端テクノロジーの活用方法を学び、効率的なケア提供を目指します。",
  },
]
const 後期programs = [
  {
    name: "アルゴリズムとデータ構造",
    timeSlot: 2, // 2限
    weekSlot: 0, // 月曜日
    unitsCount: 3, // 3単位
    overview:
      "基本的なアルゴリズムとデータ構造を学び、効率的なプログラム設計と実装方法を習得します。",
  },
  {
    name: "人工知能と機械学習",
    timeSlot: 4, // 4限
    weekSlot: 1, // 火曜日
    unitsCount: 3, // 3単位
    overview:
      "人工知能の基本概念と、機械学習のアルゴリズムを学び、AIシステムの構築方法を実践的に学びます。",
  },
  {
    name: "オペレーティングシステムの原理",
    timeSlot: 3, // 3限
    weekSlot: 2, // 水曜日
    unitsCount: 3, // 3単位
    overview:
      "オペレーティングシステムの基礎理論と設計手法を学び、コンピュータシステムの効率的な管理方法を理解します。",
  },
  {
    name: "ネットワーク基礎",
    timeSlot: 1, // 1限
    weekSlot: 3, // 木曜日
    unitsCount: 2, // 2単位
    overview:
      "コンピュータネットワークの基礎理論を学び、プロトコルやネットワークアーキテクチャの設計を理解します。",
  },
  {
    name: "データベースシステム入門",
    timeSlot: 5, // 5限
    weekSlot: 4, // 金曜日
    unitsCount: 2, // 2単位
    overview:
      "リレーショナルデータベースの基本概念を学び、データベースの設計・実装・管理方法を理解します。",
  },
  {
    name: "コンピュータセキュリティ",
    timeSlot: 2, // 2限
    weekSlot: 0, // 月曜日
    unitsCount: 2, // 2単位
    overview:
      "ネットワークやシステムセキュリティの基礎を学び、脅威からの防御方法とセキュリティ対策を習得します。",
  },
  {
    name: "ソフトウェア工学",
    timeSlot: 3, // 3限
    weekSlot: 1, // 火曜日
    unitsCount: 3, // 3単位
    overview:
      "ソフトウェア開発のプロセス、テスト、保守に関する理論と実践的な手法を学びます。",
  },
  {
    name: "Webアプリケーション開発",
    timeSlot: 4, // 4限
    weekSlot: 2, // 水曜日
    unitsCount: 3, // 3単位
    overview:
      "Webアプリケーションの設計・開発手法を学び、フロントエンドとバックエンドの技術を実践的に習得します。",
  },
  {
    name: "データサイエンス入門",
    timeSlot: 1, // 1限
    weekSlot: 4, // 金曜日
    unitsCount: 2, // 2単位
    overview:
      "データ解析の基礎を学び、統計的手法やデータマイニングを活用したデータ分析能力を習得します。",
  },
  {
    name: "分散コンピューティング",
    timeSlot: 5, // 5限
    weekSlot: 3, // 木曜日
    unitsCount: 3, // 3単位
    overview:
      "分散システムの基本概念を学び、分散型アーキテクチャの設計と実装手法を習得します。",
  },
  {
    name: "モバイルアプリケーション開発",
    timeSlot: 3, // 3限
    weekSlot: 4, // 金曜日
    unitsCount: 2, // 2単位
    overview:
      "モバイルアプリの開発プロセスと技術を学び、実践的なアプリケーション開発スキルを習得します。",
  },
  {
    name: "コンピュータグラフィックス",
    timeSlot: 1, // 1限
    weekSlot: 2, // 水曜日
    unitsCount: 2, // 2単位
    overview:
      "コンピュータグラフィックスの基本理論とアルゴリズムを学び、3Dモデリングやレンダリング技術を理解します。",
  },
  {
    name: "パラレルプログラミング",
    timeSlot: 2, // 2限
    weekSlot: 1, // 火曜日
    unitsCount: 3, // 3単位
    overview:
      "並列処理の基礎理論とプログラミング手法を学び、高性能コンピューティングのための技術を習得します。",
  },
  {
    name: "クラウドコンピューティング",
    timeSlot: 4, // 4限
    weekSlot: 3, // 木曜日
    unitsCount: 2, // 2単位
    overview:
      "クラウドコンピューティングの基本概念を学び、クラウドサービスの構築・運用技術を理解します。",
  },
  {
    name: "自然言語処理入門",
    timeSlot: 5, // 5限
    weekSlot: 0, // 月曜日
    unitsCount: 3, // 3単位
    overview:
      "自然言語処理の基礎理論と技術を学び、テキスト分析や音声処理の実践的な手法を習得します。",
  },
]

for (const program of 後期programs) {
  await client.api.admin.programs.$post({
    json: {
      name: program.name,
      timeSlot: program.timeSlot,
      weekSlot: program.weekSlot,
      ownerId: user.id,
      unitsCount: program.unitsCount,
      overview: program.overview,
      year: 2025,
      period: 1,
    },
  })
}
