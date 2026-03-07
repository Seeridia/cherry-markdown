import * as lucide from 'lucide';

/**
 * 现有图标名 -> Lucide 图标名映射
 * Lucide 图标列表: https://lucide.dev/icons
 */
export const iconMap = {
  // 基础格式
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strikethrough',
  sub: 'subscript',
  sup: 'superscript',

  // 代码
  code: 'code',
  codeBlock: 'code-2',

  // 链接和媒体
  link: 'link',
  image: 'image',
  video: 'video',

  // 标题
  header: 'heading',
  h1: 'heading-1',
  h2: 'heading-2',
  h3: 'heading-3',
  h4: 'heading-4',
  h5: 'heading-5',
  h6: 'heading-6',

  // 列表
  list: 'list',
  ul: 'list',
  ol: 'list-ordered',
  checklist: 'check-square',

  // 引用和分割线
  blockquote: 'quote',
  line: 'minus',
  br: 'corner-down-left',

  // 表格
  table: 'table',
  little_table: 'table-2',
  'cherry-table-delete': 'trash-2',
  'cherry-table-insert-bottom': 'arrow-down',
  'cherry-table-insert-left': 'arrow-left',
  'cherry-table-insert-right': 'arrow-right',
  'cherry-table-insert-top': 'arrow-up',

  // 预览和视图
  preview: 'eye',
  previewClose: 'eye-off',
  fullscreen: 'maximize',
  minscreen: 'minimize',
  expand: 'maximize-2',
  unExpand: 'minimize-2',
  toc: 'list-tree',

  // 编辑操作
  undo: 'undo',
  redo: 'redo',
  copy: 'copy',
  edit: 'edit',
  create: 'plus-circle',
  download: 'download',
  export: 'external-link',

  // 设置和帮助
  settings: 'settings',
  question: 'help-circle',
  help: 'help-circle',
  tips: 'lightbulb',
  keyboard: 'keyboard',
  command: 'terminal',
  search: 'search',
  menu: 'menu',

  // 文件和文件夹
  folder: 'folder',
  'folder-open': 'folder-open',
  pdf: 'file-text',
  word: 'file-text',
  normal: 'text',
  font: 'type',
  size: 'type',
  color: 'palette',

  // 状态和反馈
  check: 'check',
  ok: 'check',
  close: 'x',
  success: 'check-circle',
  danger: 'alert-octagon',
  info: 'info',
  warning: 'alert-triangle',
  warn: 'alert-triangle',
  mistake: 'x-circle',
  primary: 'circle',

  // 对齐
  align: 'align-left',
  alignLeft: 'align-left',
  alignCenter: 'align-center',
  alignRight: 'align-right',
  alignJustify: 'align-justify',
  justify: 'align-justify',
  justifyLeft: 'align-left',
  justifyCenter: 'align-center',
  justifyRight: 'align-right',

  // 导航
  chevronsLeft: 'chevrons-left',
  chevronsRight: 'chevrons-right',
  swap: 'arrow-left-right',
  'swap-vert': 'arrow-up-down',
  trendingUp: 'trending-up',

  // 插入图表
  insert: 'plus',
  insertChart: 'bar-chart-2',
  insertGraph: 'git-branch',
  insertFlow: 'git-merge',
  insertFormula: 'function-square',
  insertGantt: 'gantt-chart',
  insertSeq: 'list-checks',
  insertState: 'state-machine',
  insertPie: 'pie-chart',
  insertClass: 'bookmark',
  insertLineChart: 'line-chart',
  insertBarChart: 'bar-chart',
  insertRadarChart: 'radar',
  insertMapChart: 'map',
  insertHeatmapChart: 'flame',
  insertPieChart: 'pie-chart',
  insertScatterChart: 'scatter-chart',
  insertSankeyChart: 'sankey',

  // 图片装饰和对齐
  imgDecoBorder: 'square',
  imgDecoShadow: 'cloud',
  imgDecoRadius: 'circle',
  imgAlignLeft: 'align-left',
  imgAlignCenter: 'align-center',
  imgAlignRight: 'align-right',
  imgAlignFloatLeft: 'arrow-left-from-line',
  imgAlignFloatRight: 'arrow-right-from-line',

  // 主题
  'main-theme': 'palette',
  'code-theme': 'code-2',

  // 其他
  square: 'square',
  phone: 'smartphone',
  pen: 'pen',
  'pen-fill': 'pen-tool',
  pinyin: 'text-cursor-input',
  'sort-s': 'arrow-up-down',
};

/**
 * 将 kebab-case 转换为 PascalCase
 * @param {string} str
 * @returns {string}
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * 根据 Lucide 图标数据创建 SVG 元素
 * @param {Array} iconData - Lucide 图标数据 [tagName, attributes, children]
 * @param {SVGElement} parent - 父元素
 */
function createSvgElement(iconData, parent) {
  const [tagName, attrs, children] = iconData;
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, String(value));
    });
  }

  if (children && Array.isArray(children)) {
    children.forEach((child) => {
      if (Array.isArray(child)) {
        createSvgElement(child, element);
      }
    });
  }

  parent.appendChild(element);
}

/**
 * 创建 Lucide 图标 SVG 元素
 * @param {string} iconName - 原有图标名称
 * @param {object} options - 配置选项
 * @param {number} [options.size=16] - 图标尺寸
 * @param {number} [options.strokeWidth=2] - 描边宽度
 * @param {string} [options.className] - 额外的 CSS 类名
 * @returns {SVGElement|null}
 */
export function createLucideIcon(iconName, options = {}) {
  const lucideName = iconMap[iconName] || iconName;
  const fnName = toPascalCase(lucideName);
  const iconData = lucide[fnName];

  if (!iconData) {
    console.warn(`Lucide icon "${lucideName}" (${fnName}) not found for "${iconName}"`);
    return null;
  }

  const size = options.size ?? 16;
  const strokeWidth = options.strokeWidth ?? 2;
  const className = `ch-icon ch-icon-${iconName}${options.className ? ` ${options.className}` : ''}`;

  // 创建 SVG 根元素
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', String(strokeWidth));
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('class', className);

  // 根据 Lucide 图标数据创建子元素
  if (Array.isArray(iconData)) {
    iconData.forEach((child) => {
      if (Array.isArray(child)) {
        createSvgElement(child, svg);
      }
    });
  }

  return svg;
}

/**
 * 检查图标是否在映射中
 * @param {string} iconName
 * @returns {boolean}
 */
export function hasLucideIcon(iconName) {
  return iconName in iconMap;
}

/**
 * 获取所有已映射的图标名称
 * @returns {string[]}
 */
export function getAllMappedIconNames() {
  return Object.keys(iconMap);
}

/**
 * 生成 SVG 子元素的 HTML 字符串
 * @param {Array} iconData - Lucide 图标数据
 * @returns {string}
 */
function generateSvgHtml(iconData) {
  let html = '';
  if (Array.isArray(iconData)) {
    iconData.forEach((child) => {
      if (Array.isArray(child)) {
        const [tagName, attrs, children] = child;
        let attrsStr = '';
        if (attrs) {
          attrsStr = Object.entries(attrs)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        }
        if (children && Array.isArray(children) && children.length > 0) {
          html += `<${tagName}${attrsStr ? ` ${attrsStr}` : ''}>${generateSvgHtml(children)}</${tagName}>`;
        } else {
          html += `<${tagName}${attrsStr ? ` ${attrsStr}` : ''}/>`;
        }
      }
    });
  }
  return html;
}

/**
 * 获取 Lucide 图标的 HTML 字符串（用于 innerHTML 拼接）
 * @param {string} iconName - 原有图标名称
 * @param {object} options - 配置选项
 * @param {number} [options.size=16] - 图标尺寸
 * @param {number} [options.strokeWidth=1.5] - 描边宽度
 * @param {string} [options.className] - 额外的 CSS 类名
 * @returns {string}
 */
export function getLucideIconHtml(iconName, options = {}) {
  const lucideName = iconMap[iconName] || iconName;
  const fnName = toPascalCase(lucideName);
  const iconData = lucide[fnName];

  if (!iconData) {
    console.warn(`Lucide icon "${lucideName}" (${fnName}) not found for "${iconName}"`);
    return '';
  }

  const size = options.size ?? 16;
  const strokeWidth = options.strokeWidth ?? 1.5;
  const className = `ch-icon ch-icon-${iconName}${options.className ? ` ${options.className}` : ''}`;

  const svgHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}">${generateSvgHtml(iconData)}</svg>`;

  return svgHtml;
}
