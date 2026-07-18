// ============================================================
// Formula Tool — Obsidian Plugin
// 数学/物理公式符号库 & 实时预览 & MathLive 可视化编辑
// Author: liqian
// ============================================================

const { Plugin, ItemView, MarkdownRenderer, Notice, SuggestModal } = require('obsidian');

const VIEW_TYPE_FORMULA = 'formula-tool-view';
const MATHLIVE_CDN = 'https://cdn.jsdelivr.net/npm/mathlive';

// ============================================================
// Formula Data
// ============================================================
const FORMULA_CATEGORIES = [
  {
    id: 'greek-lower', name: '希腊字母 (小写)', icon: 'α',
    items: [
      { label: '\\alpha', latex: '\\alpha', display: 'α' },
      { label: '\\beta', latex: '\\beta', display: 'β' },
      { label: '\\gamma', latex: '\\gamma', display: 'γ' },
      { label: '\\delta', latex: '\\delta', display: 'δ' },
      { label: '\\epsilon', latex: '\\epsilon', display: 'ϵ' },
      { label: '\\varepsilon', latex: '\\varepsilon', display: 'ε' },
      { label: '\\zeta', latex: '\\zeta', display: 'ζ' },
      { label: '\\eta', latex: '\\eta', display: 'η' },
      { label: '\\theta', latex: '\\theta', display: 'θ' },
      { label: '\\vartheta', latex: '\\vartheta', display: 'ϑ' },
      { label: '\\iota', latex: '\\iota', display: 'ι' },
      { label: '\\kappa', latex: '\\kappa', display: 'κ' },
      { label: '\\lambda', latex: '\\lambda', display: 'λ' },
      { label: '\\mu', latex: '\\mu', display: 'μ' },
      { label: '\\nu', latex: '\\nu', display: 'ν' },
      { label: '\\xi', latex: '\\xi', display: 'ξ' },
      { label: '\\pi', latex: '\\pi', display: 'π' },
      { label: '\\rho', latex: '\\rho', display: 'ρ' },
      { label: '\\sigma', latex: '\\sigma', display: 'σ' },
      { label: '\\tau', latex: '\\tau', display: 'τ' },
      { label: '\\upsilon', latex: '\\upsilon', display: 'υ' },
      { label: '\\phi', latex: '\\phi', display: 'ϕ' },
      { label: '\\varphi', latex: '\\varphi', display: 'φ' },
      { label: '\\chi', latex: '\\chi', display: 'χ' },
      { label: '\\psi', latex: '\\psi', display: 'ψ' },
      { label: '\\omega', latex: '\\omega', display: 'ω' },
    ]
  },
  {
    id: 'greek-upper', name: '希腊字母 (大写)', icon: 'Γ',
    items: [
      { label: '\\Gamma', latex: '\\Gamma', display: 'Γ' },
      { label: '\\Delta', latex: '\\Delta', display: 'Δ' },
      { label: '\\Theta', latex: '\\Theta', display: 'Θ' },
      { label: '\\Lambda', latex: '\\Lambda', display: 'Λ' },
      { label: '\\Xi', latex: '\\Xi', display: 'Ξ' },
      { label: '\\Pi', latex: '\\Pi', display: 'Π' },
      { label: '\\Sigma', latex: '\\Sigma', display: 'Σ' },
      { label: '\\Upsilon', latex: '\\Upsilon', display: 'ϒ' },
      { label: '\\Phi', latex: '\\Phi', display: 'Φ' },
      { label: '\\Psi', latex: '\\Psi', display: 'Ψ' },
      { label: '\\Omega', latex: '\\Omega', display: 'Ω' },
    ]
  },
  {
    id: 'operators', name: '运算符 & 大型算子', icon: '∑',
    items: [
      { label: '求和', latex: '\\sum_{i=1}^{n}' },
      { label: '求积', latex: '\\prod_{i=1}^{n}' },
      { label: '积分', latex: '\\int_{a}^{b}' },
      { label: '二重积分', latex: '\\iint_{D}' },
      { label: '三重积分', latex: '\\iiint_{V}' },
      { label: '闭合积分', latex: '\\oint_{C}' },
      { label: '极限', latex: '\\lim_{x \\to \\infty}' },
      { label: '偏导', latex: '\\partial' },
      { label: '梯度', latex: '\\nabla' },
      { label: '无穷', latex: '\\infty' },
      { label: '点乘', latex: '\\cdot' },
      { label: '叉乘', latex: '\\times' },
      { label: '除号', latex: '\\div' },
      { label: '正负', latex: '\\pm' },
      { label: '负正', latex: '\\mp' },
      { label: '直和', latex: '\\oplus' },
      { label: '直积', latex: '\\otimes' },
    ]
  },
  {
    id: 'relations', name: '关系符号', icon: '≤',
    items: [
      { label: '≤', latex: '\\leq' }, { label: '≥', latex: '\\geq' },
      { label: '≠', latex: '\\neq' }, { label: '≈', latex: '\\approx' },
      { label: '≡', latex: '\\equiv' }, { label: '∝', latex: '\\propto' },
      { label: '∼', latex: '\\sim' }, { label: '≃', latex: '\\simeq' },
      { label: '≫', latex: '\\gg' }, { label: '≪', latex: '\\ll' },
      { label: '⊥', latex: '\\perp' }, { label: '∥', latex: '\\parallel' },
      { label: '⊂', latex: '\\subset' }, { label: '⊃', latex: '\\supset' },
      { label: '⊆', latex: '\\subseteq' }, { label: '∈', latex: '\\in' },
      { label: '∉', latex: '\\notin' }, { label: '∀', latex: '\\forall' },
      { label: '∃', latex: '\\exists' }, { label: '∅', latex: '\\emptyset' },
    ]
  },
  {
    id: 'arrows', name: '箭头', icon: '→',
    items: [
      { label: '→', latex: '\\rightarrow' }, { label: '←', latex: '\\leftarrow' },
      { label: '⇒', latex: '\\Rightarrow' }, { label: '⇐', latex: '\\Leftarrow' },
      { label: '⇔', latex: '\\Leftrightarrow' }, { label: '↦', latex: '\\mapsto' },
      { label: '→(长)', latex: '\\longrightarrow' }, { label: '↑', latex: '\\uparrow' },
      { label: '↓', latex: '\\downarrow' }, { label: '↔', latex: '\\leftrightarrow' },
      { label: '⇌', latex: '\\rightleftharpoons' },
    ]
  },
  {
    id: 'brackets', name: '括号', icon: '⟮⟯',
    items: [
      { label: '圆括号', latex: '\\left( x \\right)' },
      { label: '方括号', latex: '\\left[ x \\right]' },
      { label: '花括号', latex: '\\left\\{ x \\right\\}' },
      { label: '绝对值', latex: '\\left| x \\right|' },
      { label: '范数', latex: '\\left\\| x \\right\\|' },
      { label: '角括号', latex: '\\langle x \\rangle' },
      { label: '上花括号', latex: '\\overbrace{x}^{n}' },
      { label: '下花括号', latex: '\\underbrace{x}_{n}' },
      { label: '分段函数', latex: '\\begin{cases} x & x > 0 \\\\ 0 & x \\le 0 \\end{cases}' },
    ]
  },
  {
    id: 'frac-root', name: '分数 & 根号', icon: '√',
    items: [
      { label: '分数', latex: '\\frac{a}{b}' },
      { label: '平方根', latex: '\\sqrt{x}' },
      { label: 'n次根', latex: '\\sqrt[n]{x}' },
      { label: '二项式系数', latex: '\\binom{n}{k}' },
      { label: '小分数', latex: '\\tfrac{a}{b}' },
      { label: '大分数', latex: '\\dfrac{a}{b}' },
      { label: '连续分数', latex: '\\cfrac{a}{b}' },
    ]
  },
  {
    id: 'sup-sub', name: '上下标', icon: 'x²',
    items: [
      { label: '上标', latex: 'x^{n}' }, { label: '下标', latex: 'x_{i}' },
      { label: '上下标', latex: 'x_{i}^{n}' }, { label: '向量箭头', latex: '\\vec{v}' },
      { label: '帽子', latex: '\\hat{x}' }, { label: '波浪线', latex: '\\tilde{x}' },
      { label: '横线', latex: '\\bar{x}' }, { label: '点', latex: '\\dot{x}' },
      { label: '双点', latex: '\\ddot{x}' }, { label: '撇号', latex: 'x^{\\prime}' },
    ]
  },
  {
    id: 'calculus', name: '微积分', icon: '∫',
    items: [
      { label: '导数', latex: '\\frac{d}{dx}f(x)' },
      { label: '偏导数', latex: '\\frac{\\partial}{\\partial x}f' },
      { label: '不定积分', latex: '\\int f(x) \\, dx' },
      { label: '定积分', latex: '\\int_{a}^{b} f(x) \\, dx' },
      { label: '二重积分', latex: '\\iint_{D} f(x,y) \\, dx\\,dy' },
      { label: '三重积分', latex: '\\iiint_{V} f(x,y,z) \\, dV' },
      { label: '闭合积分', latex: '\\oint_{C} \\vec{F} \\cdot d\\vec{r}' },
      { label: '梯度', latex: '\\nabla f' }, { label: '散度', latex: '\\nabla \\cdot \\vec{F}' },
      { label: '旋度', latex: '\\nabla \\times \\vec{F}' }, { label: '拉普拉斯', latex: '\\nabla^{2} f' },
      { label: '极值', latex: '\\lim_{x \\to a} f(x)' }, { label: '微分', latex: 'dx' },
    ]
  },
  {
    id: 'linear-algebra', name: '线性代数', icon: '⊕',
    items: [
      { label: 'pmatrix', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
      { label: 'bmatrix', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
      { label: 'Bmatrix', latex: '\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix}' },
      { label: '行列式', latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}' },
      { label: '⋯', latex: '\\cdots' }, { label: '⋮', latex: '\\vdots' },
      { label: '⋱', latex: '\\ddots' },
      { label: '列向量', latex: '\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}' },
      { label: '方程组', latex: '\\begin{cases} ax+by=c \\\\ dx+ey=f \\end{cases}' },
    ]
  },
  {
    id: 'trigonometry', name: '三角函数', icon: '∡',
    items: [
      { label: '\\sin', latex: '\\sin\\theta' }, { label: '\\cos', latex: '\\cos\\theta' },
      { label: '\\tan', latex: '\\tan\\theta' }, { label: '\\csc', latex: '\\csc\\theta' },
      { label: '\\sec', latex: '\\sec\\theta' }, { label: '\\cot', latex: '\\cot\\theta' },
      { label: '\\arcsin', latex: '\\arcsin x' }, { label: '\\arccos', latex: '\\arccos x' },
      { label: '\\arctan', latex: '\\arctan x' },
      { label: '\\sinh', latex: '\\sinh x' }, { label: '\\cosh', latex: '\\cosh x' },
      { label: '\\tanh', latex: '\\tanh x' }, { label: '度 (°)', latex: '90^{\\circ}' },
    ]
  },
  {
    id: 'set-logic', name: '集合 & 逻辑', icon: '∈',
    items: [
      { label: '属于', latex: 'x \\in A' }, { label: '不属于', latex: 'x \\notin A' },
      { label: '包含于', latex: 'A \\subset B' }, { label: '真包含于', latex: 'A \\subseteq B' },
      { label: '并集', latex: 'A \\cup B' }, { label: '交集', latex: 'A \\cap B' },
      { label: '补集', latex: 'A \\setminus B' }, { label: '空集', latex: '\\emptyset' },
      { label: 'ℕ', latex: '\\mathbb{N}' }, { label: 'ℤ', latex: '\\mathbb{Z}' },
      { label: 'ℚ', latex: '\\mathbb{Q}' }, { label: 'ℝ', latex: '\\mathbb{R}' },
      { label: 'ℂ', latex: '\\mathbb{C}' },
      { label: '∧', latex: 'p \\land q' }, { label: '∨', latex: 'p \\lor q' },
      { label: '¬', latex: '\\neg p' }, { label: '⇒', latex: 'p \\implies q' },
      { label: '⇔', latex: 'p \\iff q' }, { label: '∀', latex: '\\forall x' },
      { label: '∃', latex: '\\exists x' },
    ]
  },
  {
    id: 'physics', name: '⚛ 物理公式', icon: '⚛',
    items: [
      { label: '牛顿第二定律', latex: '\\vec{F} = m\\vec{a}' },
      { label: '万有引力', latex: 'F = G\\frac{m_1 m_2}{r^{2}}' },
      { label: '动能', latex: 'E_k = \\frac{1}{2}mv^{2}' },
      { label: '重力势能', latex: 'U = mgh' },
      { label: '动量', latex: '\\vec{p} = m\\vec{v}' },
      { label: '冲量定理', latex: '\\vec{J} = \\Delta \\vec{p} = \\vec{F}\\Delta t' },
      { label: '向心力', latex: 'F_c = \\frac{mv^{2}}{r} = m\\omega^{2}r' },
      { label: '胡克定律', latex: 'F = -kx' },
      { label: '速度公式', latex: 'v = v_0 + at' },
      { label: '位移公式', latex: 'x = x_0 + v_0 t + \\frac{1}{2}at^{2}' },
      { label: '功', latex: 'W = Fd\\cos\\theta' },
      { label: '功率', latex: 'P = \\frac{W}{t} = Fv' },
      { label: '库仑定律', latex: 'F = k\\frac{q_1 q_2}{r^{2}}' },
      { label: '欧姆定律', latex: 'V = IR' },
      { label: '电功率', latex: 'P = IV = I^{2}R = \\frac{V^{2}}{R}' },
      { label: '洛伦兹力', latex: '\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})' },
      { label: '高斯定律(电)', latex: '\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}' },
      { label: '法拉第定律', latex: '\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}' },
      { label: '理想气体', latex: 'PV = nRT' },
      { label: '质能方程', latex: 'E = mc^{2}' },
      { label: '光子能量', latex: 'E = h\\nu = \\frac{hc}{\\lambda}' },
      { label: '德布罗意波长', latex: '\\lambda = \\frac{h}{p}' },
      { label: '不确定性原理', latex: '\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}' },
      { label: '波速', latex: 'v = f\\lambda' },
      { label: '折射定律', latex: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2' },
      { label: '单摆周期', latex: 'T = 2\\pi\\sqrt{\\frac{L}{g}}' },
    ]
  },
  {
    id: 'power-electronics', name: '⚡ 电力电子', icon: '⚡',
    items: [
      { label: 'Buck 降压', latex: 'V_o = D \\cdot V_{in}' },
      { label: 'Boost 升压', latex: 'V_o = \\frac{V_{in}}{1 - D}' },
      { label: 'Buck-Boost', latex: 'V_o = -\\frac{D \\cdot V_{in}}{1 - D}' },
      { label: '占空比', latex: 'D = \\frac{t_{on}}{T_s}' },
      { label: '开关频率', latex: 'f_s = \\frac{1}{T_s}' },
      { label: '电感电压', latex: 'V_L = L \\frac{di_L}{dt}' },
      { label: '电感电流纹波(Buck)', latex: '\\Delta I_L = \\frac{(V_{in} - V_o)D T_s}{L}' },
      { label: '临界电感(Buck)', latex: 'L_c = \\frac{(1 - D)R}{2 f_s}' },
      { label: '输出电压纹波', latex: '\\Delta V_o = \\frac{\\Delta I_L}{8 f_s C}' },
      { label: 'LLC 谐振频率', latex: 'f_r = \\frac{1}{2\\pi\\sqrt{L_r C_r}}' },
      { label: 'LLC 品质因数', latex: 'Q = \\frac{\\sqrt{L_r / C_r}}{R_{ac}}' },
      { label: 'LLC 电压增益(FHA)', latex: 'M = \\frac{k f_n^{2}}{\\sqrt{((1+k)f_n^{2} - 1)^{2} + Q^{2} k^{2} f_n^{2} (f_n^{2} - 1)^{2}}}' },
      { label: 'PFC 电感', latex: 'L = \\frac{V_{in,rms} D T_s}{\\Delta I_L}' },
      { label: 'PFC 输出电容', latex: 'C_o = \\frac{P_o}{2\\pi f_{line} \\Delta V_o V_o}' },
      { label: 'Flyback 输出', latex: 'V_o = \\frac{D}{1 - D} \\frac{N_s}{N_p} V_{in}' },
      { label: 'Forward 输出', latex: 'V_o = D \\frac{N_s}{N_p} V_{in}' },
      { label: '有功功率', latex: 'P = VI\\cos\\phi' },
      { label: '无功功率', latex: 'Q = VI\\sin\\phi' },
      { label: '视在功率', latex: 'S = VI = \\sqrt{P^{2} + Q^{2}}' },
      { label: '功率因数', latex: 'PF = \\cos\\phi = \\frac{P}{S}' },
      { label: '三相有功功率', latex: 'P = \\sqrt{3} V_L I_L \\cos\\phi' },
      { label: '导通损耗(MOSFET)', latex: 'P_{cond} = I_{rms}^{2} R_{ds(on)}' },
      { label: '开关损耗', latex: 'P_{sw} = \\frac{1}{2} V_{ds} I_d (t_{on} + t_{off}) f_s' },
      { label: '结温', latex: 'T_j = T_a + P_{total} R_{th(j-a)}' },
      { label: '变压器匝比', latex: '\\frac{V_p}{V_s} = \\frac{N_p}{N_s} = \\frac{I_s}{I_p}' },
      { label: '磁通密度', latex: 'B = \\frac{V}{k_f f N A_c}' },
      { label: '电感储能', latex: 'E = \\frac{1}{2} L I^{2}' },
      { label: 'LC 截止频率', latex: 'f_c = \\frac{1}{2\\pi\\sqrt{LC}}' },
      { label: '相位裕度', latex: 'PM = 180^{\\circ} + \\angle G(f_c)H(f_c)' },
      { label: 'RC Snubber 电容', latex: 'C_{sn} = \\frac{I_{peak} t_{fall}}{2 V_{ds,max}}' },
      { label: '单相逆变输出', latex: 'V_o(t) = m_a V_{dc} \\sin(\\omega t)' },
      { label: '调制指数', latex: 'm_a = \\frac{V_{ref}}{V_{tri}}' },
      { label: '过压保护阈值', latex: 'V_{OVP} = V_{ref} (1 + \\frac{R_1}{R_2})' },
    ]
  },
];

const ALL_FORMULAS = FORMULA_CATEGORIES.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.name }))
);


// ============================================================
// Quick Search Modal
// ============================================================
class FormulaSearchModal extends SuggestModal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.setPlaceholder('搜索公式... 如 "积分", "欧姆", "alpha"');
  }

  getSuggestions(query) {
    const q = query.toLowerCase();
    if (!q) return ALL_FORMULAS.slice(0, 30);
    return ALL_FORMULAS.filter(f =>
      f.label.toLowerCase().includes(q) ||
      f.latex.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    ).slice(0, 30);
  }

  renderSuggestion(item, el) {
    el.createSpan({ text: item.label, cls: 'ft-search-label' });
    el.createSpan({ text: item.latex, cls: 'ft-search-latex' });
    el.createSpan({ text: item.category, cls: 'ft-search-cat' });
  }

  onChooseSuggestion(item, evt) {
    this.plugin.insertFormula(item.latex);
    new Notice(`已插入: ${item.label}`);
  }
}


// ============================================================
// Sidebar View
// ============================================================
class FormulaToolView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.recentFormulas = [];
    this.currentTab = 'code';     // 'code' | 'visual'
    this.mathLiveReady = false;
    this.mathLiveLoading = false;
  }

  getViewType() { return VIEW_TYPE_FORMULA; }
  getDisplayText() { return 'Formula Tool'; }
  getIcon() { return 'sigma'; }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass('ft-container');

    // ============================================================
    // MAIN LAYOUT: left main area + resizer + right library sidebar
    // ============================================================
    const mainLayout = container.createDiv('ft-main-layout');

    // --- LEFT: Main content (input + preview + actions) ---
    const leftPanel = mainLayout.createDiv('ft-left-panel');

    this.buildModeTabs(leftPanel);
    this.buildCodePanel(leftPanel);
    this.buildVisualPanel(leftPanel);
    this.buildPreview(leftPanel);
    this.buildActions(leftPanel);

    // --- RESIZER handle ---
    const resizer = mainLayout.createDiv('ft-resizer');
    this.resizerEl = resizer;
    this.rightPanelWidth = 280; // default right panel width (px)
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartWidth = 0;

    const LEFT_MIN_WIDTH = 300; // ensure code/visual tabs fit
    const RIGHT_MIN_WIDTH = 220; // ensure library symbols display fully
    const RESIZER_WIDTH = 6;

    const onMouseMove = (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const delta = this.dragStartX - e.clientX;
      let newWidth = this.dragStartWidth + delta;
      const containerWidth = mainLayout.getBoundingClientRect().width;
      // Right panel max = container - left min - resizer
      const maxRightWidth = containerWidth - LEFT_MIN_WIDTH - RESIZER_WIDTH;
      // Clamp between right min and calculated max
      newWidth = Math.max(RIGHT_MIN_WIDTH, Math.min(newWidth, maxRightWidth));
      this.rightPanelWidth = newWidth;
      this.rightPanelEl.style.width = newWidth + 'px';
    };

    const onMouseUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      resizer.classList.remove('ft-resizer-active');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartWidth = this.rightPanelWidth;
      resizer.classList.add('ft-resizer-active');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // --- RIGHT: Formula library sidebar (collapsed by default) ---
    const rightPanel = mainLayout.createDiv('ft-right-panel');
    this.rightPanelEl = rightPanel;
    rightPanel.style.width = this.rightPanelWidth + 'px';
    this.buildLibrary(rightPanel);

    // Show code mode by default
    this.showTab('code');

    // Load MathLive async
    this.loadMathLive();
  }

  // ==========================================================
  // Mode Tabs
  // ==========================================================
  buildModeTabs(parent) {
    const tabs = parent.createDiv('ft-mode-tabs');
    this.tabCodeBtn = tabs.createEl('button', { cls: 'ft-mode-tab active', text: '</> LaTeX 代码模式' });
    this.tabVisualBtn = tabs.createEl('button', { cls: 'ft-mode-tab', text: '✎ 可视化模式 (MathLive)' });

    this.tabCodeBtn.addEventListener('click', () => this.showTab('code'));
    this.tabVisualBtn.addEventListener('click', () => this.showTab('visual'));
  }

  showTab(tab) {
    this.currentTab = tab;
    this.tabCodeBtn.classList.toggle('active', tab === 'code');
    this.tabVisualBtn.classList.toggle('active', tab === 'visual');

    const codePanel = this.codePanelEl;
    const visualPanel = this.visualPanelEl;

    if (tab === 'code') {
      codePanel.style.display = 'block';
      visualPanel.style.display = 'none';
      // Sync LaTeX from visual mode back to code textarea
      if (this.mathField && this.mathLiveReady) {
        try {
          const latex = this.mathField.getValue('latex');
          if (latex && latex !== '\\displaystyle ') {
            this.latexTextarea.value = latex;
          }
        } catch (e) { /* ignore */ }
      }
      this.updatePreview();
    } else {
      codePanel.style.display = 'none';
      visualPanel.style.display = 'block';
      // Sync LaTeX from code textarea to math-field
      if (this.mathField && this.mathLiveReady) {
        const latex = this.latexTextarea.value.trim();
        if (latex) {
          try {
            this.mathField.setValue(latex, { silenceNotifications: true });
          } catch (e) { /* ignore */ }
        }
      }
    }
  }

  // ==========================================================
  // Code Mode Panel
  // ==========================================================
  buildCodePanel(parent) {
    this.codePanelEl = parent.createDiv('ft-code-panel');

    const inputSection = this.codePanelEl.createDiv('ft-input-section');
    inputSection.createDiv('ft-section-label').setText('📝 LaTeX 公式输入');

    const inputRow = inputSection.createDiv('ft-input-row');
    const textarea = inputRow.createEl('textarea', {
      placeholder: '在此输入 LaTeX 公式，或从右侧公式库点击插入...\n例如: \\frac{a}{b} 或 \\sum_{i=1}^{n}',
      cls: 'ft-latex-input'
    });
    this.latexTextarea = textarea;

    // Keyboard shortcut hints
    const hints = inputSection.createDiv('ft-input-hints');
    hints.createSpan({ text: 'Ctrl+Enter → 块级  ', cls: 'ft-hint' });
    hints.createSpan({ text: 'Ctrl+Shift+C → 行内', cls: 'ft-hint' });

    // Update preview on input
    let previewTimer = null;
    textarea.addEventListener('input', () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(() => this.updatePreview(), 300);
    });

    // Keyboard shortcuts
    textarea.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        this.insertCurrent('block');
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        this.insertCurrent('inline');
      }
    });
  }

  // ==========================================================
  // Visual Mode Panel (MathLive)
  // ==========================================================
  buildVisualPanel(parent) {
    this.visualPanelEl = parent.createDiv('ft-visual-panel');
    this.visualPanelEl.style.display = 'none';

    const visSection = this.visualPanelEl.createDiv('ft-input-section');
    visSection.createDiv('ft-section-label').setText('✎ 可视化公式编辑 (MathLive)');

    // MathLive math-field wrapper
    const wrapper = visSection.createDiv('ft-mathlive-wrapper');
    const mathField = wrapper.createEl('math-field', { cls: 'ft-math-field' });
    mathField.setAttribute('virtual-keyboard-mode', 'off');
    this.mathField = mathField;

    // Fallback for when MathLive fails to load
    const fallback = visSection.createDiv('ft-mathlive-fallback');
    fallback.style.display = 'none';
    const fallbackInput = fallback.createEl('textarea', {
      placeholder: 'MathLive 加载失败。请在 LaTeX 代码模式中输入公式，或在此输入...',
      cls: 'ft-latex-input'
    });
    fallbackInput.style.minHeight = '120px';
    this.mathliveFallback = fallback;
    this.mathliveFallbackInput = fallbackInput;

    // Sync fallback input to preview
    fallbackInput.addEventListener('input', () => {
      this.latexTextarea.value = fallbackInput.value;
      this.updatePreview();
    });

    // Listen to MathLive changes
    mathField.addEventListener('input', () => {
      try {
        const latex = mathField.getValue('latex');
        if (latex) {
          this.latexTextarea.value = latex;
          this.updatePreview();
        }
      } catch (e) { /* ignore */ }
    });

    // Generated LaTeX display
    const latexOut = visSection.createDiv('ft-visual-latex-output');
    latexOut.createSpan({ text: '生成 LaTeX: ', cls: 'ft-visual-latex-label' });
    this.visualLatexCode = latexOut.createEl('code', { cls: 'ft-visual-latex-code' });
  }

  loadMathLive() {
    if (this.mathLiveLoading) return;
    if (window.customElements && window.customElements.get('math-field')) {
      this.mathLiveReady = true;
      return;
    }

    this.mathLiveLoading = true;
    const script = document.createElement('script');
    script.src = MATHLIVE_CDN;
    script.defer = true;
    script.onload = () => {
      this.mathLiveReady = true;
      this.mathLiveLoading = false;
      // If on visual tab, refresh
      if (this.currentTab === 'visual' && this.mathField) {
        try {
          const latex = this.latexTextarea?.value?.trim();
          if (latex) this.mathField.setValue(latex, { silenceNotifications: true });
        } catch (e) { /* ignore */ }
      }
    };
    script.onerror = () => {
      this.mathLiveLoading = false;
      // Show fallback
      if (this.mathliveFallback) {
        this.mathliveFallback.style.display = 'block';
        if (this.mathField?.parentElement) {
          this.mathField.parentElement.style.display = 'none';
        }
      }
    };
    document.head.appendChild(script);
  }

  // ==========================================================
  // Preview
  // ==========================================================
  buildPreview(parent) {
    const previewSection = parent.createDiv('ft-preview-section');
    const previewHeader = previewSection.createDiv('ft-preview-header');
    previewHeader.createSpan({ text: '📺 实时预览', cls: 'ft-section-label' });
    this.modeBadge = previewHeader.createSpan({ text: '块级', cls: 'ft-mode-badge' });

    this.previewEl = previewSection.createDiv('ft-preview-box');
    this.previewEl.createDiv('ft-preview-placeholder').setText('预览将显示在这里');
  }

  async updatePreview() {
    const latex = this.latexTextarea?.value?.trim();
    if (!this.previewEl) return;
    this.previewEl.empty();

    if (!latex) {
      this.previewEl.createDiv('ft-preview-placeholder').setText('预览将显示在这里');
      return;
    }

    // Update visual latex code display
    if (this.visualLatexCode) {
      this.visualLatexCode.setText(latex);
    }

    try {
      await MarkdownRenderer.renderMarkdown(
        '$$\n' + latex + '\n$$',
        this.previewEl,
        '',
        this
      );
    } catch (e) {
      this.previewEl.createDiv('ft-preview-error').setText('渲染失败: ' + latex);
    }
  }

  // ==========================================================
  // Action Buttons
  // ==========================================================
  buildActions(parent) {
    const actions = parent.createDiv('ft-actions');

    const btnInline = actions.createEl('button', { cls: 'ft-btn ft-btn-inline' });
    btnInline.innerHTML = '<span>📋</span> 行内公式 $...$';
    btnInline.addEventListener('click', () => this.insertCurrent('inline'));

    const btnBlock = actions.createEl('button', { cls: 'ft-btn ft-btn-block' });
    btnBlock.innerHTML = '<span>📄</span> 块级公式 $$...$$';
    btnBlock.addEventListener('click', () => this.insertCurrent('block'));

    const btnClear = actions.createEl('button', { cls: 'ft-btn ft-btn-clear' });
    btnClear.innerHTML = '<span>🗑</span> 清空';
    btnClear.addEventListener('click', () => {
      this.latexTextarea.value = '';
      if (this.mathField && this.mathLiveReady) {
        try { this.mathField.setValue('', { silenceNotifications: true }); } catch (e) { /* ignore */ }
      }
      this.updatePreview();
    });
  }

  // ==========================================================
  // Formula Library (right sidebar, collapsed by default)
  // ==========================================================
  buildLibrary(parent) {
    const libContainer = parent.createDiv('ft-lib-container');

    // Header
    const libHeader = libContainer.createDiv('ft-lib-header');
    libHeader.createSpan({ text: '📐 公式 & 符号库', cls: 'ft-lib-title' });
    this.libToggle = libHeader.createSpan({ text: '▶', cls: 'ft-lib-toggle-btn' });
    libHeader.addEventListener('click', () => this.toggleLibrary());

    // Body (collapsed by default)
    this.libBody = libContainer.createDiv('ft-lib-body');
    this.libBody.style.display = 'none';

    // Search
    const searchRow = this.libBody.createDiv('ft-lib-search-row');
    const searchInput = searchRow.createEl('input', {
      type: 'text',
      placeholder: '🔍 搜索公式...',
      cls: 'ft-lib-search-input'
    });

    // Category list
    this.libCategories = this.libBody.createDiv('ft-lib-categories');

    let filteredCategories = FORMULA_CATEGORIES;

    const renderCategories = () => {
      this.libCategories.empty();

      filteredCategories.forEach(cat => {
        const block = this.libCategories.createDiv('ft-lib-cat-block');

        const header = block.createDiv('ft-lib-cat-header');
        header.createSpan({ text: cat.icon + '  ' + cat.name, cls: 'ft-lib-cat-name' });
        const toggle = header.createSpan({ text: '▶', cls: 'ft-lib-cat-toggle' });

        const grid = block.createDiv('ft-lib-cat-grid');
        grid.style.display = 'none'; // collapsed by default

        cat.items.forEach(item => {
          const btn = grid.createEl('button', { cls: 'ft-lib-symbol-btn' });
          const displayText = item.display || item.label;
          btn.setText(displayText);
          btn.setAttribute('title', item.latex);
          btn.addEventListener('click', () => {
            this.setLatexInput(item.latex);
            this.addRecent(item);
          });
        });

        header.addEventListener('click', () => {
          const isHidden = grid.style.display === 'none';
          grid.style.display = isHidden ? 'flex' : 'none';
          toggle.setText(isHidden ? '▼' : '▶');
        });
      });
    };

    renderCategories();

    // Search filter
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      if (!q) {
        filteredCategories = FORMULA_CATEGORIES;
      } else {
        filteredCategories = FORMULA_CATEGORIES.map(cat => ({
          ...cat,
          items: cat.items.filter(item =>
            item.label.toLowerCase().includes(q) ||
            item.latex.toLowerCase().includes(q)
          )
        })).filter(cat => cat.items.length > 0);
      }
      renderCategories();
      // Auto-expand matching categories
      this.libCategories.querySelectorAll('.ft-lib-cat-block').forEach(block => {
        const grid = block.querySelector('.ft-lib-cat-grid');
        const toggle = block.querySelector('.ft-lib-cat-toggle');
        if (grid && grid.children.length > 0) {
          grid.style.display = 'flex';
          if (toggle) toggle.setText('▼');
        }
      });
    });

    // Recent section
    const recentBlock = this.libBody.createDiv('ft-lib-recent');
    recentBlock.createDiv('ft-lib-recent-title').setText('🕐 最近使用');
    this.recentGrid = recentBlock.createDiv('ft-lib-recent-grid');
    this.renderRecent();
  }

  toggleLibrary() {
    const isHidden = this.libBody.style.display === 'none';
    this.libBody.style.display = isHidden ? 'block' : 'none';
    this.libToggle.setText(isHidden ? '▼' : '▶');
  }

  setLatexInput(latex) {
    if (this.latexTextarea) {
      this.latexTextarea.value = latex;
      this.updatePreview();
    }
    // Also sync to MathLive if in visual mode
    if (this.currentTab === 'visual' && this.mathField && this.mathLiveReady) {
      try {
        this.mathField.setValue(latex, { silenceNotifications: true });
      } catch (e) { /* ignore */ }
    }
  }

  insertCurrent(mode) {
    const latex = this.latexTextarea?.value?.trim();
    if (!latex) {
      new Notice('请先输入或选择公式');
      return;
    }
    let formatted;
    if (mode === 'inline') {
      formatted = '$' + latex + '$';
    } else {
      formatted = '$$\n' + latex + '\n$$';
    }
    this.plugin.insertFormula(formatted);
    this.addRecent({ label: latex, latex: latex, display: latex });
  }

  addRecent(item) {
    this.recentFormulas = [
      item,
      ...this.recentFormulas.filter(r => r.latex !== item.latex)
    ].slice(0, 20);
    this.renderRecent();
  }

  renderRecent() {
    if (!this.recentGrid) return;
    this.recentGrid.empty();
    if (this.recentFormulas.length === 0) {
      this.recentGrid.createDiv('ft-lib-recent-empty').setText('还没有使用记录');
      return;
    }
    const shown = this.recentFormulas.slice(0, 16);
    shown.forEach(item => {
      const btn = this.recentGrid.createEl('button', { cls: 'ft-lib-symbol-btn' });
      btn.setText(item.display || item.label);
      btn.setAttribute('title', item.latex);
      btn.addEventListener('click', () => this.setLatexInput(item.latex));
    });
  }

  async onClose() {
    // cleanup
  }
}


// ============================================================
// Plugin Entry
// ============================================================
class FormulaToolPlugin extends Plugin {
  async onload() {
    console.log('Formula Tool (liqian): loaded');

    // Register sidebar view
    this.registerView(
      VIEW_TYPE_FORMULA,
      (leaf) => new FormulaToolView(leaf, this)
    );

    // Ribbon icon
    this.addRibbonIcon('sigma', 'Formula Tool — 公式工具', () => {
      this.activateView();
    });

    // Commands
    this.addCommand({
      id: 'open-formula-tool',
      name: '打开公式工具面板',
      callback: () => this.activateView(),
    });

    this.addCommand({
      id: 'search-formula',
      name: '搜索并插入公式',
      callback: () => {
        new FormulaSearchModal(this.app, this).open();
      },
    });

    this.addCommand({
      id: 'wrap-selection-inline',
      name: '将选中文本包装为行内公式 $...$',
      editorCallback: (editor) => {
        const selection = editor.getSelection();
        if (selection) {
          editor.replaceSelection('$' + selection + '$');
        } else {
          new Notice('请先选中文本');
        }
      },
    });

    this.addCommand({
      id: 'wrap-selection-block',
      name: '将选中文本包装为块级公式 $$...$$',
      editorCallback: (editor) => {
        const selection = editor.getSelection();
        if (selection) {
          editor.replaceSelection('$$\n' + selection + '\n$$');
        } else {
          new Notice('请先选中文本');
        }
      },
    });
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_FORMULA)[0];

    if (!leaf) {
      const rightLeaf = workspace.getRightLeaf(false);
      await rightLeaf.setViewState({
        type: VIEW_TYPE_FORMULA,
        active: true,
      });
      leaf = rightLeaf;
    }

    workspace.revealLeaf(leaf);
  }

  insertFormula(text) {
    const editor = this.app.workspace.activeEditor?.editor;
    if (editor) {
      const cursor = editor.getCursor();
      editor.replaceRange(text, cursor);
      const newPos = {
        line: cursor.line,
        ch: cursor.ch + text.length,
      };
      editor.setCursor(newPos);
      editor.focus();
    } else {
      navigator.clipboard.writeText(text).then(() => {
        new Notice('已复制到剪贴板 (未找到活动编辑器)');
      });
    }
  }

  onunload() {
    console.log('Formula Tool: unloaded');
  }
}

module.exports = FormulaToolPlugin;
