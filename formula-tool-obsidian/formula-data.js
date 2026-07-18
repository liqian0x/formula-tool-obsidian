// ============================================================
// Formula Data — symbol categories & physics/math templates
// Shared between standalone HTML tool and Obsidian plugin
// ============================================================

const FORMULA_CATEGORIES = [

  // ============================================
  // Greek Letters (Lowercase)
  // ============================================
  {
    id: 'greek-lower',
    name: '希腊字母 (小写)',
    icon: 'α',
    items: [
      { label: '\\alpha',        latex: '\\alpha',        display: 'α' },
      { label: '\\beta',         latex: '\\beta',         display: 'β' },
      { label: '\\gamma',        latex: '\\gamma',        display: 'γ' },
      { label: '\\delta',        latex: '\\delta',        display: 'δ' },
      { label: '\\epsilon',      latex: '\\epsilon',      display: 'ϵ' },
      { label: '\\varepsilon',   latex: '\\varepsilon',   display: 'ε' },
      { label: '\\zeta',         latex: '\\zeta',         display: 'ζ' },
      { label: '\\eta',          latex: '\\eta',          display: 'η' },
      { label: '\\theta',        latex: '\\theta',        display: 'θ' },
      { label: '\\vartheta',     latex: '\\vartheta',     display: 'ϑ' },
      { label: '\\iota',         latex: '\\iota',         display: 'ι' },
      { label: '\\kappa',        latex: '\\kappa',        display: 'κ' },
      { label: '\\lambda',       latex: '\\lambda',       display: 'λ' },
      { label: '\\mu',           latex: '\\mu',           display: 'μ' },
      { label: '\\nu',           latex: '\\nu',           display: 'ν' },
      { label: '\\xi',           latex: '\\xi',           display: 'ξ' },
      { label: '\\pi',           latex: '\\pi',           display: 'π' },
      { label: '\\rho',          latex: '\\rho',          display: 'ρ' },
      { label: '\\sigma',        latex: '\\sigma',        display: 'σ' },
      { label: '\\tau',          latex: '\\tau',          display: 'τ' },
      { label: '\\upsilon',      latex: '\\upsilon',      display: 'υ' },
      { label: '\\phi',          latex: '\\phi',          display: 'ϕ' },
      { label: '\\varphi',       latex: '\\varphi',       display: 'φ' },
      { label: '\\chi',          latex: '\\chi',          display: 'χ' },
      { label: '\\psi',          latex: '\\psi',          display: 'ψ' },
      { label: '\\omega',        latex: '\\omega',        display: 'ω' },
    ]
  },

  {
    id: 'greek-upper',
    name: '希腊字母 (大写)',
    icon: 'Γ',
    items: [
      { label: '\\Gamma',        latex: '\\Gamma',        display: 'Γ' },
      { label: '\\Delta',        latex: '\\Delta',        display: 'Δ' },
      { label: '\\Theta',        latex: '\\Theta',        display: 'Θ' },
      { label: '\\Lambda',       latex: '\\Lambda',       display: 'Λ' },
      { label: '\\Xi',           latex: '\\Xi',           display: 'Ξ' },
      { label: '\\Pi',           latex: '\\Pi',           display: 'Π' },
      { label: '\\Sigma',        latex: '\\Sigma',        display: 'Σ' },
      { label: '\\Upsilon',      latex: '\\Upsilon',      display: 'ϒ' },
      { label: '\\Phi',          latex: '\\Phi',          display: 'Φ' },
      { label: '\\Psi',          latex: '\\Psi',          display: 'Ψ' },
      { label: '\\Omega',        latex: '\\Omega',        display: 'Ω' },
    ]
  },

  {
    id: 'operators',
    name: '运算符 & 大型算子',
    icon: '∑',
    items: [
      { label: '求和',            latex: '\\sum_{i=1}^{n}' },
      { label: '求积',            latex: '\\prod_{i=1}^{n}' },
      { label: '积分',            latex: '\\int_{a}^{b}' },
      { label: '二重积分',        latex: '\\iint_{D}' },
      { label: '三重积分',        latex: '\\iiint_{V}' },
      { label: '闭合积分',        latex: '\\oint_{C}' },
      { label: '极限',            latex: '\\lim_{x \\to \\infty}' },
      { label: '偏导',            latex: '\\partial' },
      { label: '梯度',            latex: '\\nabla' },
      { label: '无穷',            latex: '\\infty' },
      { label: '点乘',            latex: '\\cdot' },
      { label: '叉乘',            latex: '\\times' },
      { label: '除号',            latex: '\\div' },
      { label: '正负',            latex: '\\pm' },
      { label: '负正',            latex: '\\mp' },
      { label: '直和',            latex: '\\oplus' },
      { label: '直积',            latex: '\\otimes' },
    ]
  },

  {
    id: 'relations',
    name: '关系符号',
    icon: '≤',
    items: [
      { label: '≤',               latex: '\\leq' },
      { label: '≥',               latex: '\\geq' },
      { label: '≠',               latex: '\\neq' },
      { label: '≈',               latex: '\\approx' },
      { label: '≡',               latex: '\\equiv' },
      { label: '∝',               latex: '\\propto' },
      { label: '∼',               latex: '\\sim' },
      { label: '≃',               latex: '\\simeq' },
      { label: '≫',               latex: '\\gg' },
      { label: '≪',               latex: '\\ll' },
      { label: '⊥',               latex: '\\perp' },
      { label: '∥',               latex: '\\parallel' },
      { label: '⊂',               latex: '\\subset' },
      { label: '⊃',               latex: '\\supset' },
      { label: '⊆',               latex: '\\subseteq' },
      { label: '∈',               latex: '\\in' },
      { label: '∉',               latex: '\\notin' },
      { label: '∀',               latex: '\\forall' },
      { label: '∃',               latex: '\\exists' },
      { label: '∅',               latex: '\\emptyset' },
    ]
  },

  {
    id: 'arrows',
    name: '箭头',
    icon: '→',
    items: [
      { label: '→',               latex: '\\rightarrow' },
      { label: '←',               latex: '\\leftarrow' },
      { label: '⇒',               latex: '\\Rightarrow' },
      { label: '⇐',               latex: '\\Leftarrow' },
      { label: '⇔',               latex: '\\Leftrightarrow' },
      { label: '↦',               latex: '\\mapsto' },
      { label: '→(长)',           latex: '\\longrightarrow' },
      { label: '↑',               latex: '\\uparrow' },
      { label: '↓',               latex: '\\downarrow' },
      { label: '↔',               latex: '\\leftrightarrow' },
      { label: '⇌',               latex: '\\rightleftharpoons' },
    ]
  },

  {
    id: 'brackets',
    name: '括号',
    icon: '⟮⟯',
    items: [
      { label: '圆括号',           latex: '\\left( x \\right)' },
      { label: '方括号',           latex: '\\left[ x \\right]' },
      { label: '花括号',           latex: '\\left\\{ x \\right\\}' },
      { label: '绝对值',           latex: '\\left| x \\right|' },
      { label: '范数',             latex: '\\left\\| x \\right\\|' },
      { label: '角括号',           latex: '\\langle x \\rangle' },
      { label: '上花括号',         latex: '\\overbrace{x}^{n}' },
      { label: '下花括号',         latex: '\\underbrace{x}_{n}' },
      { label: '分段函数',         latex: '\\begin{cases} x & x > 0 \\\\ 0 & x \\le 0 \\end{cases}' },
    ]
  },

  {
    id: 'frac-root',
    name: '分数 & 根号',
    icon: '√',
    items: [
      { label: '分数',             latex: '\\frac{a}{b}' },
      { label: '平方根',           latex: '\\sqrt{x}' },
      { label: 'n次根',            latex: '\\sqrt[n]{x}' },
      { label: '二项式系数',       latex: '\\binom{n}{k}' },
      { label: '小分数',           latex: '\\tfrac{a}{b}' },
      { label: '大分数',           latex: '\\dfrac{a}{b}' },
      { label: '连续分数',         latex: '\\cfrac{a}{b}' },
    ]
  },

  {
    id: 'sup-sub',
    name: '上下标',
    icon: 'x²',
    items: [
      { label: '上标',             latex: 'x^{n}' },
      { label: '下标',             latex: 'x_{i}' },
      { label: '上下标',           latex: 'x_{i}^{n}' },
      { label: '向量箭头',         latex: '\\vec{v}' },
      { label: '帽子',             latex: '\\hat{x}' },
      { label: '波浪线',           latex: '\\tilde{x}' },
      { label: '横线',             latex: '\\bar{x}' },
      { label: '点',               latex: '\\dot{x}' },
      { label: '双点',             latex: '\\ddot{x}' },
      { label: '撇号',             latex: 'x^{\\prime}' },
    ]
  },

  {
    id: 'calculus',
    name: '微积分',
    icon: '∫',
    items: [
      { label: '导数',             latex: '\\frac{d}{dx}f(x)' },
      { label: '偏导数',           latex: '\\frac{\\partial}{\\partial x}f' },
      { label: '不定积分',         latex: '\\int f(x) \\, dx' },
      { label: '定积分',           latex: '\\int_{a}^{b} f(x) \\, dx' },
      { label: '二重积分',         latex: '\\iint_{D} f(x,y) \\, dx\\,dy' },
      { label: '三重积分',         latex: '\\iiint_{V} f(x,y,z) \\, dV' },
      { label: '闭合积分',         latex: '\\oint_{C} \\vec{F} \\cdot d\\vec{r}' },
      { label: '梯度',             latex: '\\nabla f' },
      { label: '散度',             latex: '\\nabla \\cdot \\vec{F}' },
      { label: '旋度',             latex: '\\nabla \\times \\vec{F}' },
      { label: '拉普拉斯',         latex: '\\nabla^{2} f' },
      { label: '极值',             latex: '\\lim_{x \\to a} f(x)' },
      { label: '微分',             latex: 'dx' },
    ]
  },

  {
    id: 'linear-algebra',
    name: '线性代数',
    icon: '⊕',
    items: [
      { label: 'pmatrix 矩阵',     latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
      { label: 'bmatrix 矩阵',     latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
      { label: 'Bmatrix 矩阵',     latex: '\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix}' },
      { label: '行列式',           latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}' },
      { label: '范数矩阵',         latex: '\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}' },
      { label: '横向省略',         latex: '\\cdots' },
      { label: '竖向省略',         latex: '\\vdots' },
      { label: '对角省略',         latex: '\\ddots' },
      { label: '列向量',           latex: '\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}' },
      { label: '行向量',           latex: '\\begin{pmatrix} x & y & z \\end{pmatrix}' },
      { label: '方程组',           latex: '\\begin{cases} ax+by=c \\\\ dx+ey=f \\end{cases}' },
    ]
  },

  {
    id: 'trigonometry',
    name: '三角函数',
    icon: '∡',
    items: [
      { label: '\\sin',            latex: '\\sin\\theta' },
      { label: '\\cos',            latex: '\\cos\\theta' },
      { label: '\\tan',            latex: '\\tan\\theta' },
      { label: '\\csc',            latex: '\\csc\\theta' },
      { label: '\\sec',            latex: '\\sec\\theta' },
      { label: '\\cot',            latex: '\\cot\\theta' },
      { label: '\\arcsin',         latex: '\\arcsin x' },
      { label: '\\arccos',         latex: '\\arccos x' },
      { label: '\\arctan',         latex: '\\arctan x' },
      { label: '\\sinh',           latex: '\\sinh x' },
      { label: '\\cosh',           latex: '\\cosh x' },
      { label: '\\tanh',           latex: '\\tanh x' },
      { label: '度 (°)',           latex: '90^{\\circ}' },
    ]
  },

  // ... more categories abbreviated for brevity; full set in main.js
];

// Export for both Node.js (Obsidian plugin) and browser (standalone)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FORMULA_CATEGORIES;
}
